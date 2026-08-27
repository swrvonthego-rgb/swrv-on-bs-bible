/**
 * SWRV on the Go — Hybrid Worker
 *
 * Serves static assets (Bible study tool, lexicons, sources) AND provides
 * API endpoints for AI relay, the real recorded audio Bible, and native
 * auth + user data (Cloudflare D1).
 *
 * Routes:
 *   /api/health                 -> GET:  health check
 *   /api/groq                   -> POST: relay to Groq API with server-side key
 *   /api/audio-bible/<key>      -> GET:  streams a BSB audio Bible chapter file from R2 (Range-request/seek support)
 *   /data/bsb-audio-manifest.json -> GET: book -> chapter -> audio file manifest, served from R2
 *   /data/bsb-timings/<Book>.json -> GET: per-verse timing spans for that book, served from R2
 *   /data/jubilees.js           -> GET:  Book of Jubilees text, served from R2
 *   /api/auth/signup            -> POST: email + password signup
 *   /api/auth/login             -> POST: email + password login
 *   /api/auth/google/start      -> GET:  begin Google OAuth
 *   /api/auth/google/callback   -> GET:  Google OAuth redirect target
 *   /api/auth/me                -> GET:  current session's user
 *   /api/notes                  -> GET/POST/DELETE
 *   /api/bookmarks              -> GET/POST (toggle)
 *   /api/progress               -> GET (latest) / POST (save)
 *   /api/delete-account         -> POST: delete the signed-in user + all their data
 *   /api/internal/r2-list       -> GET:  lists R2 objects by prefix (deploy pipeline only, requires SESSION_SECRET bearer token)
 *   /*                          -> static assets
 *
 * No AI-generated ("text to speech") voice reading exists in this app —
 * removed entirely in favor of the real recorded BSB audio Bible above,
 * which needs no daily quota and never runs out.
 */

// ============= CRYPTO / SESSION HELPERS =============
// No external auth vendor — sessions are a signed, stateless token:
// base64url(JSON payload) + "." + base64url(HMAC-SHA256 signature).
// Passwords are hashed with PBKDF2-SHA256 (Web Crypto, built into Workers).

function nowSec() { return Math.floor(Date.now() / 1000); }

function b64urlEncode(bytes) {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let str = '';
  for (let i = 0; i < arr.length; i++) str += String.fromCharCode(arr[i]);
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function b64urlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  const bin = atob(str);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}
function utf8Encode(str) { return new TextEncoder().encode(str); }
function utf8Decode(bytes) { return new TextDecoder().decode(bytes); }
function bytesToHex(bytes) { return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join(''); }
function hexToBytes(hex) {
  const arr = new Uint8Array(hex.length / 2);
  for (let i = 0; i < arr.length; i++) arr[i] = parseInt(hex.substr(i * 2, 2), 16);
  return arr;
}

async function hmacKey(secret) {
  return crypto.subtle.importKey('raw', utf8Encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}
async function hmacHex(str, secret) {
  const key = await hmacKey(secret);
  const sig = await crypto.subtle.sign('HMAC', key, utf8Encode(str));
  return bytesToHex(new Uint8Array(sig));
}

async function signSession(payload, secret) {
  const payloadB64 = b64urlEncode(utf8Encode(JSON.stringify(payload)));
  const key = await hmacKey(secret);
  const sig = await crypto.subtle.sign('HMAC', key, utf8Encode(payloadB64));
  return payloadB64 + '.' + b64urlEncode(sig);
}
async function verifySession(token, secret) {
  if (!token || token.indexOf('.') === -1) return null;
  const [payloadB64, sigB64] = token.split('.');
  try {
    const key = await hmacKey(secret);
    const valid = await crypto.subtle.verify('HMAC', key, b64urlDecode(sigB64), utf8Encode(payloadB64));
    if (!valid) return null;
    const payload = JSON.parse(utf8Decode(b64urlDecode(payloadB64)));
    if (!payload.exp || nowSec() > payload.exp) return null;
    return payload;
  } catch (e) { return null; }
}
function issueSession(user, secret) {
  return signSession(
    { uid: user.id, email: user.email, name: user.name || null, iat: nowSec(), exp: nowSec() + 60 * 60 * 24 * 30 },
    secret
  );
}

// PBKDF2-SHA256, 100k iterations. (OWASP's current minimum is higher for
// general servers; 100k is a deliberate tradeoff to stay well inside
// Cloudflare Workers' per-request CPU budget. Each password also gets its
// own random 16-byte salt, which is the part that matters most against
// rainbow-table attacks.)
async function pbkdf2Hash(password, saltHex) {
  const salt = saltHex ? hexToBytes(saltHex) : crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey('raw', utf8Encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, keyMaterial, 256);
  return { hash: bytesToHex(new Uint8Array(bits)), salt: bytesToHex(salt) };
}
async function verifyPassword(password, saltHex, hashHex) {
  const { hash } = await pbkdf2Hash(password, saltHex);
  if (hash.length !== hashHex.length) return false;
  let diff = 0;
  for (let i = 0; i < hash.length; i++) diff |= hash.charCodeAt(i) ^ hashHex.charCodeAt(i);
  return diff === 0;
}

function uuid() { return crypto.randomUUID(); }

// (TTS voice-persona system — Aura-2/Edge TTS/FreeTTS.org relay, R2 TTS
// cache, and the daily pre-cache cron — removed. The app now plays only
// the real recorded BSB audio Bible; see /api/audio-bible/ below.)
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS — allow your own domains
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
    function json(obj, status) {
      return new Response(JSON.stringify(obj), { status: status || 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }
    async function requireSession(req) {
      if (!env.SESSION_SECRET) return null;
      const authz = req.headers.get('Authorization') || '';
      const token = authz.replace(/^Bearer\s+/i, '').trim();
      if (!token) return null;
      return verifySession(token, env.SESSION_SECRET);
    }

    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // ============= API ROUTES =============

    // Health check
    if (url.pathname === '/api/health') {
      return json({
        status: 'ok',
        hasGroqKey: !!env.GROQ_API_KEY,
        hasAudioBucket: !!env.LIBRARY_BUCKET,
        hasDatabase: !!env.DB,
        hasAuth: !!env.SESSION_SECRET,
        hasGoogleSignIn: !!(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET),
        timestamp: new Date().toISOString()
      });
    }

    // Groq AI relay — Roadmap Experience uses this
    if (url.pathname === '/api/groq' && request.method === 'POST') {
      if (!env.GROQ_API_KEY) {
        return json({ error: 'GROQ_API_KEY not configured on Worker' }, 500);
      }
      try {
        const body = await request.json();
        const payload = {
          model: body.model || 'llama-3.3-70b-versatile',
          messages: body.messages || [],
          temperature: body.temperature ?? 0.7,
          max_tokens: body.max_tokens || 1024,
        };
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await groqResponse.json();
        return json(data, groqResponse.status);
      } catch (err) {
        return json({ error: 'Groq relay failed', detail: err.message }, 500);
      }
    }


    // ============= AUTH: EMAIL + PASSWORD =============
    if (url.pathname === '/api/auth/signup' && request.method === 'POST') {
      if (!env.DB) return json({ error: 'database not configured yet' }, 501);
      if (!env.SESSION_SECRET) return json({ error: 'auth not configured yet' }, 501);
      try {
        const { email, password, name } = await request.json();
        if (!email || !password) return json({ error: 'Email and password required.' }, 400);
        if (password.length < 6) return json({ error: 'Password must be at least 6 characters.' }, 400);
        const normEmail = String(email).trim().toLowerCase();
        const existing = await env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(normEmail).first();
        if (existing) return json({ error: 'An account with that email already exists.' }, 409);
        const { hash, salt } = await pbkdf2Hash(password);
        const uid = uuid();
        await env.DB.prepare('INSERT INTO users (id, email, name, password_hash, password_salt) VALUES (?,?,?,?,?)')
          .bind(uid, normEmail, name || null, hash, salt).run();
        const user = { id: uid, email: normEmail, name: name || null };
        const token = await issueSession(user, env.SESSION_SECRET);
        return json({ token, user });
      } catch (err) {
        return json({ error: 'Signup failed', detail: err.message }, 500);
      }
    }

    if (url.pathname === '/api/auth/login' && request.method === 'POST') {
      if (!env.DB) return json({ error: 'database not configured yet' }, 501);
      if (!env.SESSION_SECRET) return json({ error: 'auth not configured yet' }, 501);
      try {
        const { email, password } = await request.json();
        if (!email || !password) return json({ error: 'Email and password required.' }, 400);
        const normEmail = String(email).trim().toLowerCase();
        const row = await env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(normEmail).first();
        if (!row || !row.password_hash) return json({ error: 'Invalid email or password.' }, 401);
        const ok = await verifyPassword(password, row.password_salt, row.password_hash);
        if (!ok) return json({ error: 'Invalid email or password.' }, 401);
        const user = { id: row.id, email: row.email, name: row.name };
        const token = await issueSession(user, env.SESSION_SECRET);
        return json({ token, user });
      } catch (err) {
        return json({ error: 'Login failed', detail: err.message }, 500);
      }
    }

    // ============= AUTH: GOOGLE (native OAuth, no third-party auth vendor) =============
    if (url.pathname === '/api/auth/google/start' && request.method === 'GET') {
      if (!env.GOOGLE_CLIENT_ID) return json({ error: 'Google sign-in not configured yet' }, 501);
      const redirectUri = url.origin + '/api/auth/google/callback';
      const ts = String(nowSec());
      const state = ts + '.' + (await hmacHex(ts, env.SESSION_SECRET || 'dev-only'));
      const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
      authUrl.searchParams.set('client_id', env.GOOGLE_CLIENT_ID);
      authUrl.searchParams.set('redirect_uri', redirectUri);
      authUrl.searchParams.set('response_type', 'code');
      authUrl.searchParams.set('scope', 'openid email profile');
      authUrl.searchParams.set('state', state);
      authUrl.searchParams.set('prompt', 'select_account');
      return Response.redirect(authUrl.toString(), 302);
    }

    if (url.pathname === '/api/auth/google/callback' && request.method === 'GET') {
      function errRedirect(msg) {
        const dest = new URL(url.origin + '/');
        dest.searchParams.set('auth_error', msg);
        return Response.redirect(dest.toString(), 302);
      }
      if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) return errRedirect('Google sign-in is not configured yet.');
      if (!env.DB || !env.SESSION_SECRET) return errRedirect('Account system is not configured yet.');
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state') || '';
      const [ts, sig] = state.split('.');
      const expectedSig = ts ? await hmacHex(ts, env.SESSION_SECRET) : null;
      const fresh = ts && (nowSec() - parseInt(ts, 10) < 600);
      if (!code || !fresh || sig !== expectedSig) return errRedirect('Sign-in link expired — please try again.');
      try {
        const redirectUri = url.origin + '/api/auth/google/callback';
        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            code, client_id: env.GOOGLE_CLIENT_ID, client_secret: env.GOOGLE_CLIENT_SECRET,
            redirect_uri: redirectUri, grant_type: 'authorization_code'
          })
        });
        if (!tokenRes.ok) {
          // Surface Google's actual OAuth error code (e.g. invalid_client,
          // redirect_uri_mismatch) instead of a generic message — that
          // generic message was making every failure indistinguishable,
          // so a real misconfiguration looked identical to a fluke.
          let detail = '';
          try { const eb = await tokenRes.json(); detail = eb.error || ''; } catch (e) {}
          return errRedirect('Google sign-in failed' + (detail ? ' (' + detail + ')' : '') + '.');
        }
        const tokenData = await tokenRes.json();
        const uinfoRes = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
          headers: { Authorization: `Bearer ${tokenData.access_token}` }
        });
        if (!uinfoRes.ok) return errRedirect('Could not read your Google profile.');
        const profile = await uinfoRes.json();
        const normEmail = (profile.email || '').toLowerCase();

        let row = await env.DB.prepare('SELECT * FROM users WHERE google_sub = ?').bind(profile.sub).first();
        if (!row && normEmail) {
          row = await env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(normEmail).first();
          if (row) await env.DB.prepare('UPDATE users SET google_sub = ? WHERE id = ?').bind(profile.sub, row.id).run();
        }
        if (!row) {
          const uid = uuid();
          await env.DB.prepare('INSERT INTO users (id, email, name, google_sub) VALUES (?,?,?,?)')
            .bind(uid, normEmail, profile.name || null, profile.sub).run();
          row = { id: uid, email: normEmail, name: profile.name || null };
        }
        const token = await issueSession({ id: row.id, email: row.email, name: row.name }, env.SESSION_SECRET);
        const dest = new URL(url.origin + '/');
        dest.searchParams.set('auth_token', token);
        return Response.redirect(dest.toString(), 302);
      } catch (err) {
        return errRedirect('Google sign-in failed (' + String(err.message || err).slice(0, 120) + ').');
      }
    }

    if (url.pathname === '/api/auth/me' && request.method === 'GET') {
      const session = await requireSession(request);
      if (!session) return json({ error: 'not signed in' }, 401);
      return json({ user: { id: session.uid, email: session.email, name: session.name } });
    }

    // ============= NOTES =============
    if (url.pathname === '/api/notes' && request.method === 'GET') {
      const session = await requireSession(request);
      if (!session) return json({ error: 'not signed in' }, 401);
      if (!env.DB) return json({ error: 'database not configured yet' }, 501);
      const book = url.searchParams.get('book');
      const chapter = parseInt(url.searchParams.get('chapter'), 10);
      const verseParam = url.searchParams.get('verse');
      let q = 'SELECT id, body, updated_at FROM notes WHERE user_id = ? AND book = ? AND chapter = ?';
      const binds = [session.uid, book, chapter];
      if (verseParam !== null && verseParam !== '') { q += ' AND verse = ?'; binds.push(parseInt(verseParam, 10)); }
      else { q += ' AND verse IS NULL'; }
      q += ' ORDER BY updated_at DESC LIMIT 1';
      const row = await env.DB.prepare(q).bind(...binds).first();
      return json({ note: row || null });
    }

    if (url.pathname === '/api/notes' && request.method === 'POST') {
      const session = await requireSession(request);
      if (!session) return json({ error: 'not signed in' }, 401);
      if (!env.DB) return json({ error: 'database not configured yet' }, 501);
      const { book, chapter, verse, body, noteId } = await request.json();
      if (noteId) {
        await env.DB.prepare("UPDATE notes SET body = ?, updated_at = datetime('now') WHERE id = ? AND user_id = ?")
          .bind(body, noteId, session.uid).run();
        return json({ id: noteId });
      }
      const id = uuid();
      await env.DB.prepare('INSERT INTO notes (id, user_id, book, chapter, verse, body) VALUES (?,?,?,?,?,?)')
        .bind(id, session.uid, book, chapter, verse ?? null, body).run();
      return json({ id });
    }

    if (url.pathname === '/api/notes' && request.method === 'DELETE') {
      const session = await requireSession(request);
      if (!session) return json({ error: 'not signed in' }, 401);
      if (!env.DB) return json({ error: 'database not configured yet' }, 501);
      const { noteId } = await request.json();
      await env.DB.prepare('DELETE FROM notes WHERE id = ? AND user_id = ?').bind(noteId, session.uid).run();
      return json({ deleted: true });
    }

    // ============= BOOKMARKS (toggle) =============
    if (url.pathname === '/api/bookmarks' && request.method === 'POST') {
      const session = await requireSession(request);
      if (!session) return json({ error: 'not signed in' }, 401);
      if (!env.DB) return json({ error: 'database not configured yet' }, 501);
      const { book, chapter, verse, label } = await request.json();
      let q = 'SELECT id FROM bookmarks WHERE user_id = ? AND book = ? AND chapter = ?';
      const binds = [session.uid, book, chapter];
      if (verse !== null && verse !== undefined) { q += ' AND verse = ?'; binds.push(verse); } else { q += ' AND verse IS NULL'; }
      const existing = await env.DB.prepare(q).bind(...binds).first();
      if (existing) {
        await env.DB.prepare('DELETE FROM bookmarks WHERE id = ?').bind(existing.id).run();
        return json({ bookmarked: false });
      }
      const id = uuid();
      await env.DB.prepare('INSERT INTO bookmarks (id, user_id, book, chapter, verse, label) VALUES (?,?,?,?,?,?)')
        .bind(id, session.uid, book, chapter, verse ?? null, label ?? null).run();
      return json({ bookmarked: true });
    }

    // ============= READING PROGRESS =============
    if (url.pathname === '/api/progress' && request.method === 'POST') {
      const session = await requireSession(request);
      if (!session) return json({ error: 'not signed in' }, 401);
      if (!env.DB) return json({ error: 'database not configured yet' }, 501);
      const { book, chapter, verse } = await request.json();
      const id = uuid();
      await env.DB.prepare(`
        INSERT INTO reading_progress (id, user_id, book, chapter, verse, updated_at)
        VALUES (?, ?, ?, ?, ?, datetime('now'))
        ON CONFLICT(user_id, book) DO UPDATE SET chapter=excluded.chapter, verse=excluded.verse, updated_at=datetime('now')
      `).bind(id, session.uid, book, chapter, verse ?? null).run();
      return json({ saved: true });
    }

    if (url.pathname === '/api/progress/latest' && request.method === 'GET') {
      const session = await requireSession(request);
      if (!session) return json({ error: 'not signed in' }, 401);
      if (!env.DB) return json({ error: 'database not configured yet' }, 501);
      const row = await env.DB.prepare('SELECT book, chapter, verse FROM reading_progress WHERE user_id = ? ORDER BY updated_at DESC LIMIT 1')
        .bind(session.uid).first();
      return json({ progress: row || null });
    }

    // ============= DELETE ACCOUNT =============
    // Apple 5.1.1(v): users who can create an account must be able to delete it
    // in-app. Now that auth + data both live in our own D1 database, this is a
    // direct delete — no third-party admin API or service-role key needed.
    if (url.pathname === '/api/delete-account' && request.method === 'POST') {
      const session = await requireSession(request);
      if (!session) return json({ error: 'not signed in' }, 401);
      if (!env.DB) return json({ error: 'database not configured yet' }, 501);
      try {
        await env.DB.batch([
          env.DB.prepare('DELETE FROM notes WHERE user_id = ?').bind(session.uid),
          env.DB.prepare('DELETE FROM bookmarks WHERE user_id = ?').bind(session.uid),
          env.DB.prepare('DELETE FROM reading_progress WHERE user_id = ?').bind(session.uid),
          env.DB.prepare('DELETE FROM users WHERE id = ?').bind(session.uid),
        ]);
        return json({ deleted: true });
      } catch (err) {
        return json({ error: 'delete-account failed', detail: err.message }, 500);
      }
    }

    // ============= LIBRARY DATA (served from R2, not bundled) =============
    // Large library texts live in R2 instead of the static-assets bundle —
    // see .assetsignore (excludes data/jubilees.js from the deploy's asset
    // upload) and the "Sync library data to R2" deploy step (keeps the R2
    // object in sync with the git-tracked file on every push). The client
    // still just does <script src="data/jubilees.js">, unaware anything
    // changed — this route transparently serves that exact path from R2.
    if (url.pathname === '/data/jubilees.js' && request.method === 'GET') {
      if (!env.LIBRARY_BUCKET) {
        return new Response('// Library bucket not configured', { status: 500, headers: { 'Content-Type': 'application/javascript' } });
      }
      const obj = await env.LIBRARY_BUCKET.get('jubilees.js');
      if (!obj) {
        return new Response('// jubilees.js not yet synced to R2', { status: 404, headers: { 'Content-Type': 'application/javascript' } });
      }
      const headers = new Headers();
      obj.writeHttpMetadata(headers);
      headers.set('etag', obj.httpEtag);
      headers.set('Content-Type', 'application/javascript; charset=utf-8');
      headers.set('Cache-Control', 'public, max-age=3600'); // short cache, not immutable — no query-string versioning on this path
      return new Response(obj.body, { headers });
    }

    // BSB audio Bible manifest — same R2-not-bundled pattern as jubilees.js.
    // Built by tools/build-audio-manifest.mjs (deploy workflow) from the
    // ACTUAL R2 object keys, not a guessed naming pattern, and only ever
    // written when every book/chapter validates against the canon — so its
    // mere presence in R2 already means the audio behind it is complete.
    if (url.pathname === '/data/bsb-audio-manifest.json' && request.method === 'GET') {
      if (!env.LIBRARY_BUCKET) return json({ error: 'Library bucket not configured' }, 500);
      const obj = await env.LIBRARY_BUCKET.get('bsb-audio-manifest.json');
      if (!obj) return json({ error: 'audio manifest not yet built' }, 404);
      const headers = new Headers();
      obj.writeHttpMetadata(headers);
      headers.set('etag', obj.httpEtag);
      headers.set('Content-Type', 'application/json; charset=utf-8');
      headers.set('Cache-Control', 'public, max-age=3600');
      return new Response(obj.body, { headers, status: 200 });
    }

    // Per-verse alignment timings, one file per book (e.g.
    // /data/bsb-timings/Genesis.json). Split per-book deliberately: the full
    // set is ~31,100 verse spans, which is too much to pull on every page
    // load, but a single book is small enough to fetch lazily when that book
    // is opened. Produced by the alignment pipeline; absent until a book has
    // actually been aligned, and the client treats 404 as "no per-verse sync
    // for this book yet" rather than an error.
    if (url.pathname.startsWith('/data/bsb-timings/') && request.method === 'GET') {
      if (!env.LIBRARY_BUCKET) return json({ error: 'Library bucket not configured' }, 500);
      const name = decodeURIComponent(url.pathname.slice('/data/bsb-timings/'.length));
      if (!name || name.includes('/') || name.includes('..') || !/^[A-Za-z0-9]+\.json$/.test(name)) {
        return json({ error: 'invalid timings name' }, 400);
      }
      const obj = await env.LIBRARY_BUCKET.get('bsb-timings/' + name);
      if (!obj) return json({ error: 'timings not available for this book' }, 404);
      const headers = new Headers();
      obj.writeHttpMetadata(headers);
      headers.set('etag', obj.httpEtag);
      headers.set('Content-Type', 'application/json; charset=utf-8');
      headers.set('Cache-Control', 'public, max-age=86400');
      return new Response(obj.body, { status: 200, headers });
    }

    // BSB audio Bible chapter files — streamed straight from R2 with Range
    // support, required for the browser's native <audio> element to be able
    // to seek/scrub rather than only ever play from the start. Key is
    // whatever the manifest gave the client (e.g.
    // "ENGBERO1DA/ENGBERO1DA_A01_GEN_001.mp3"), passed through unmodified —
    // this route never lists or guesses keys, only serves exactly what the
    // manifest already validated exists.
    if (url.pathname.startsWith('/api/audio-bible/') && request.method === 'GET') {
      if (!env.LIBRARY_BUCKET) return json({ error: 'Library bucket not configured' }, 500);
      const key = decodeURIComponent(url.pathname.slice('/api/audio-bible/'.length));
      if (!key || key.includes('..')) return json({ error: 'invalid key' }, 400);
      const obj = await env.LIBRARY_BUCKET.get(key, { range: request.headers, onlyIf: request.headers });
      if (!obj) return json({ error: 'audio file not found' }, 404);
      const headers = new Headers();
      obj.writeHttpMetadata(headers);
      headers.set('etag', obj.httpEtag);
      headers.set('Accept-Ranges', 'bytes');
      headers.set('Cache-Control', 'public, max-age=604800, immutable'); // audio files never change once uploaded
      if (!('body' in obj)) {
        // A conditional header (If-None-Match etc.) was satisfied — no body.
        return new Response(null, { status: 304, headers });
      }
      if (obj.range) {
        const total = obj.size;
        const start = 'offset' in obj.range ? obj.range.offset : Math.max(0, total - (obj.range.suffix || 0));
        const len = 'length' in obj.range ? obj.range.length : (obj.range.suffix || total - start);
        headers.set('Content-Range', `bytes ${start}-${start + len - 1}/${total}`);
        return new Response(obj.body, { status: 206, headers });
      }
      return new Response(obj.body, { status: 200, headers });
    }

    // Internal-only R2 object listing, used exclusively by the deploy
    // pipeline's tools/build-audio-manifest.mjs to discover the real BSB
    // audio file keys and build the manifest above from actual bucket
    // contents rather than a guessed naming pattern. Gated behind
    // SESSION_SECRET as a plain shared-secret check (not a user session
    // token) so bucket contents can't be enumerated by the public — this
    // is deliberately the only route in the app that lists rather than
    // serves a specific known key.
    if (url.pathname === '/api/internal/r2-list' && request.method === 'GET') {
      if (!env.LIBRARY_BUCKET) return json({ error: 'Library bucket not configured' }, 500);
      if (!env.SESSION_SECRET) return json({ error: 'listing not configured' }, 503);
      const authz = request.headers.get('Authorization') || '';
      const token = authz.replace(/^Bearer\s+/i, '').trim();
      if (!token || token !== env.SESSION_SECRET) return json({ error: 'unauthorized' }, 401);
      const prefix = url.searchParams.get('prefix') || '';
      const cursor = url.searchParams.get('cursor') || undefined;
      const listed = await env.LIBRARY_BUCKET.list({ prefix, cursor, limit: 1000 });
      return json({
        objects: listed.objects.map(o => ({ key: o.key, size: o.size })),
        truncated: listed.truncated,
        cursor: listed.truncated ? listed.cursor : undefined,
      });
    }

    // ============= STATIC ASSETS =============
    // Fall through to Cloudflare's static asset binding
    if (!env.ASSETS) {
      return new Response('Static assets binding not configured', { status: 500 });
    }
  }
};
