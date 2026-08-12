/**
 * SWRV on the Go — Hybrid Worker
 *
 * Serves static assets (Bible study tool, lexicons, sources) AND provides
 * API endpoints for AI relay, TTS, and native auth + user data (Cloudflare D1).
 *
 * Routes:
 *   /api/health                 -> GET:  health check
 *   /api/groq                   -> POST: relay to Groq API with server-side key
 *   /api/tts                    -> POST: TTS relay — ElevenLabs, else free Edge TTS fallback
 *   /api/auth/signup            -> POST: email + password signup
 *   /api/auth/login             -> POST: email + password login
 *   /api/auth/google/start      -> GET:  begin Google OAuth
 *   /api/auth/google/callback   -> GET:  Google OAuth redirect target
 *   /api/auth/me                -> GET:  current session's user
 *   /api/notes                  -> GET/POST/DELETE
 *   /api/bookmarks              -> GET/POST (toggle)
 *   /api/progress               -> GET (latest) / POST (save)
 *   /api/delete-account         -> POST: delete the signed-in user + all their data
 *   /*                          -> static assets
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

// ============= EDGE TTS =============
// Free, no API key, no quota — taps the same cloud neural voices Microsoft
// Edge's own "Read Aloud" feature uses internally. Not an official
// third-party API (there's no public documentation and no one at Microsoft
// "issued" the client token below — it's the same fixed value the Edge
// browser itself sends), but it's the same reverse-engineered protocol
// widely used in production by rany2/edge-tts (Python) and
// DIYgod/cloudflare-edge-tts (this Worker's implementation is ported from
// that project) — actively maintained, large community, currently stable.
// Used automatically below whenever ElevenLabs is unavailable, so a reader
// only ever hears the browser's true robotic fallback if BOTH of these fail.
const EDGE_TRUSTED_CLIENT_TOKEN = '6A5AA1D4EAFF4E9FB37E23D68491D6F4';
const EDGE_SYNTHESIS_URL = 'https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1';
// Kept close to the actual current Edge/Chromium release train — a
// UA/token pair years stale is itself a plausible signal Microsoft's
// service flags when rejecting a handshake.
const EDGE_CHROMIUM_FULL_VERSION = '131.0.0.0';
const EDGE_CHROMIUM_MAJOR_VERSION = EDGE_CHROMIUM_FULL_VERSION.split('.')[0];
const EDGE_SEC_MS_GEC_VERSION = `1-${EDGE_CHROMIUM_FULL_VERSION}`;
const EDGE_UPGRADE_HEADERS = {
  'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${EDGE_CHROMIUM_MAJOR_VERSION}.0.0.0 Safari/537.36 Edg/${EDGE_CHROMIUM_MAJOR_VERSION}.0.0.0`,
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Pragma': 'no-cache',
  'Cache-Control': 'no-cache',
  // Microsoft's speech service checks this Origin as part of its client
  // fingerprint and 403s the handshake without it — it's the extension ID
  // of Edge's own "Read Aloud" feature, not a real website. Every working
  // reverse-engineered Edge-TTS client sends this exact value.
  'Origin': 'chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold',
  'Sec-WebSocket-Version': '13',
  'Upgrade': 'websocket',
};
// Maps this app's ElevenLabs persona voice_ids to a comparable Edge neural
// voice, so the fallback still matches each persona's intended character
// instead of reading every persona in the same generic voice.
const EDGE_VOICE_MAP = {
  'onwK4e9ZLuTAKqWW03F9': 'en-US-GuyNeural',                // Teacher: deep, authoritative male
  'TxGEqnHWrfWFTfGW9XjX': 'en-US-AndrewMultilingualNeural',  // Narrator: warm, storytelling male
  '21m00Tcm4TlvDq8ikWAM': 'en-US-AvaMultilingualNeural',     // Shepherd: gentle, calming female (default)
  'AZnzlk1XvdvUeBnXmlld': 'en-US-EmmaMultilingualNeural',    // Prophet: clear, expressive female
};
const EDGE_DEFAULT_VOICE = 'en-US-AvaMultilingualNeural';

function edgeEscapeXml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}
function edgeRemoveInvalidXmlChars(text) {
  var out = '';
  for (var i = 0; i < text.length; i++) {
    var c = text.charCodeAt(i);
    var bad = (c <= 8) || (c === 11) || (c === 12) || (c >= 14 && c <= 31) || (c >= 127 && c <= 159);
    out += bad ? ' ' : text[i];
  }
  return out;
}
function edgeMakeConnectionId() { return crypto.randomUUID().replace(/-/g, ''); }
function edgeMakeMuid() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}
async function edgeMakeSecMsGec() {
  // Microsoft buckets the token to the current 5-minute window (300s) in
  // "Windows ticks" (100ns units since 1601-01-01) — not a secret computed
  // from anything private, just a timestamp hash both sides can derive.
  const winEpoch = 11644473600;
  const secondsToNs = 1e9;
  let ticks = Date.now() / 1000;
  ticks += winEpoch;
  ticks -= ticks % 300;
  ticks *= secondsToNs / 100;
  const payload = `${ticks.toFixed(0)}${EDGE_TRUSTED_CLIENT_TOKEN}`;
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}
function edgeBuildSynthesisUrl(secMsGec, connectionId) {
  const u = new URL(EDGE_SYNTHESIS_URL);
  u.searchParams.set('TrustedClientToken', EDGE_TRUSTED_CLIENT_TOKEN);
  u.searchParams.set('Sec-MS-GEC', secMsGec);
  u.searchParams.set('Sec-MS-GEC-Version', EDGE_SEC_MS_GEC_VERSION);
  u.searchParams.set('ConnectionId', connectionId);
  return u.toString();
}
function edgeTimestamp() { return new Date().toISOString().replace(/[-:.]/g, '').slice(0, -1); }
function edgeBuildSpeechConfigMessage() {
  return `X-Timestamp:${edgeTimestamp()}\r\n` +
    'Content-Type:application/json; charset=utf-8\r\n' +
    'Path:speech.config\r\n\r\n' +
    '{"context":{"synthesis":{"audio":{"metadataoptions":{"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"true"},"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}\r\n';
}
function edgeBuildSsmlMessage(requestId, voice, text) {
  const ssml = "<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'>" +
    `<voice name='${voice}'><prosody pitch='+0Hz' rate='+0%' volume='+0%'>${edgeEscapeXml(edgeRemoveInvalidXmlChars(text))}</prosody></voice></speak>`;
  return `X-RequestId:${requestId}\r\n` +
    'Content-Type:application/ssml+xml\r\n' +
    `X-Timestamp:${edgeTimestamp()}Z\r\n` +
    'Path:ssml\r\n\r\n' + ssml;
}
function edgeParseTextHeaders(message) {
  const sep = message.indexOf('\r\n\r\n');
  const headerText = sep >= 0 ? message.slice(0, sep) : message;
  const headers = {};
  for (const line of headerText.split('\r\n')) {
    const i = line.indexOf(':');
    if (i <= 0) continue;
    headers[line.slice(0, i)] = line.slice(i + 1).trim();
  }
  return headers;
}
function edgeParseBinaryAudioFrame(data) {
  if (data.length < 2) throw new Error('binary websocket frame missing header length');
  const headerLength = (data[0] << 8) | data[1];
  if (data.length < 2 + headerLength) throw new Error('binary websocket frame truncated');
  const headerText = new TextDecoder().decode(data.slice(2, 2 + headerLength));
  const headers = {};
  for (const line of headerText.split('\r\n')) {
    const i = line.indexOf(':');
    if (i <= 0) continue;
    headers[line.slice(0, i)] = line.slice(i + 1).trim();
  }
  return { headers, body: data.slice(2 + headerLength) };
}
function edgeToUint8Array(data) {
  if (data instanceof Uint8Array) return data;
  if (data instanceof ArrayBuffer) return new Uint8Array(data);
  if (typeof Blob !== 'undefined' && data instanceof Blob) return data.arrayBuffer().then(b => new Uint8Array(b));
  return null;
}
function edgeCreateReadableAudioStream(socket, text, voice, requestId) {
  let controllerRef = null, audioReceived = false, settled = false;
  const cleanup = () => {
    socket.removeEventListener('message', onMessage);
    socket.removeEventListener('close', onClose);
    socket.removeEventListener('error', onError);
  };
  const finishWithError = (error) => {
    if (settled) return;
    settled = true; cleanup();
    controllerRef && controllerRef.error(error instanceof Error ? error : new Error(String(error)));
  };
  const finish = () => {
    if (settled) return;
    settled = true; cleanup();
    controllerRef && controllerRef.close();
  };
  const onMessage = (event) => {
    if (settled) return;
    const data = event.data;
    if (typeof data === 'string') {
      const headers = edgeParseTextHeaders(data);
      const path = headers.Path;
      if (path === 'turn.end') {
        try { socket.close(); } catch (e) { finish(); }
        return;
      }
      if (path === 'response' || path === 'turn.start' || path === 'audio.metadata') return;
      finishWithError(new Error(`unexpected websocket text path: ${path}`));
      return;
    }
    const maybeBinary = edgeToUint8Array(data);
    if (!maybeBinary) { finishWithError(new Error('unsupported websocket message type')); return; }
    const handleBinary = (binary) => {
      if (settled) return;
      const { headers, body } = edgeParseBinaryAudioFrame(binary);
      if (headers.Path !== 'audio') throw new Error(`unexpected websocket binary path: ${headers.Path}`);
      if (headers['Content-Type'] !== 'audio/mpeg') {
        if (body.length === 0) return;
        throw new Error(`unexpected websocket binary content type: ${headers['Content-Type']}`);
      }
      audioReceived = true;
      controllerRef && controllerRef.enqueue(body);
    };
    if (maybeBinary instanceof Promise) {
      maybeBinary.then(handleBinary).catch(finishWithError);
    } else {
      try { handleBinary(maybeBinary); } catch (error) { finishWithError(error); }
    }
  };
  const onClose = () => {
    if (!audioReceived) { finishWithError(new Error('no audio received')); return; }
    finish();
  };
  const onError = (event) => { finishWithError(event); };
  return new ReadableStream({
    start(controller) {
      controllerRef = controller;
      socket.addEventListener('message', onMessage);
      socket.addEventListener('close', onClose);
      socket.addEventListener('error', onError);
      socket.accept();
      socket.send(edgeBuildSpeechConfigMessage());
      socket.send(edgeBuildSsmlMessage(requestId, voice, text));
    },
    cancel(reason) {
      cleanup(); settled = true;
      try { socket.close(1000, typeof reason === 'string' ? reason : 'cancelled'); } catch (e) {}
    }
  });
}
async function edgeCreateAudioStream(text, elevenLabsVoiceId) {
  const voice = EDGE_VOICE_MAP[elevenLabsVoiceId] || EDGE_DEFAULT_VOICE;
  const secMsGec = await edgeMakeSecMsGec();
  const connectionId = edgeMakeConnectionId();
  const websocketUrl = edgeBuildSynthesisUrl(secMsGec, connectionId);
  const response = await fetch(websocketUrl, {
    headers: { ...EDGE_UPGRADE_HEADERS, 'Cookie': `muid=${edgeMakeMuid()};` }
  });
  if (response.status !== 101 || !response.webSocket) {
    throw new Error(`Edge TTS WebSocket upgrade failed with status ${response.status}`);
  }
  return edgeCreateReadableAudioStream(response.webSocket, text, voice, edgeMakeConnectionId());
}

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
        hasElevenLabsKey: !!env.ELEVENLABS_API_KEY,
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

    // ============= TTS RELAY: ElevenLabs, then Edge TTS, then give up =============
    // Two independent tiers before this ever tells the client to fall back to
    // the browser's robotic built-in voice. ElevenLabs is tried first when
    // configured — it's the better voice when it's working. Any failure
    // (no key, exhausted quota, bad voice_id, upstream outage) falls through
    // to Edge TTS: free, no key, no quota, genuinely neural. Only if that
    // ALSO fails does the client ever see an error and drop to speechSynthesis.
    if (url.pathname === '/api/tts' && request.method === 'POST') {
      let text, voice_id, stability, similarity_boost, style;
      try {
        const body = await request.json();
        text = body.text; voice_id = body.voice_id;
        stability = body.stability != null ? body.stability : 0.5;
        similarity_boost = body.similarity_boost != null ? body.similarity_boost : 0.75;
        style = body.style != null ? body.style : 0.3;
      } catch (err) {
        return json({ error: 'invalid request body' }, 400);
      }
      if (!text || !voice_id) return json({ error: 'text and voice_id required' }, 400);

      let elError = null;
      if (env.ELEVENLABS_API_KEY) {
        try {
          // eleven_multilingual_v2, not eleven_turbo_v2: turbo is tuned for low
          // latency over expressiveness and reads flat/monotone ("robotic").
          // multilingual_v2 costs a bit more per character and is a little
          // slower, but is ElevenLabs' natural-sounding model — worth it for a
          // read-aloud feature where a verse's worth of extra generation time
          // is invisible against how long the verse takes to speak anyway.
          const elRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`, {
            method: 'POST',
            headers: { 'xi-api-key': env.ELEVENLABS_API_KEY, 'Content-Type': 'application/json', 'Accept': 'audio/mpeg' },
            body: JSON.stringify({ text, model_id: 'eleven_multilingual_v2', voice_settings: { stability, similarity_boost, style, use_speaker_boost: true } })
          });
          if (elRes.ok) {
            return new Response(elRes.body, { status: 200, headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'no-store', 'X-TTS-Provider': 'elevenlabs', ...corsHeaders } });
          }
          elError = `status ${elRes.status} — ${await elRes.text()}`;
        } catch (err) {
          elError = 'ElevenLabs request failed: ' + err.message;
        }
      } else {
        elError = 'ELEVENLABS_API_KEY not configured';
      }

      try {
        const stream = await edgeCreateAudioStream(text, voice_id);
        return new Response(stream, {
          status: 200,
          headers: {
            'Content-Type': 'audio/mpeg', 'Cache-Control': 'no-store',
            'X-TTS-Provider': 'edge', 'X-ElevenLabs-Error': elError.slice(0, 300),
            ...corsHeaders
          }
        });
      } catch (edgeErr) {
        return json({ error: elError, edge_error: edgeErr.message }, 502);
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
        if (!tokenRes.ok) return errRedirect('Google sign-in failed.');
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
        return errRedirect('Google sign-in failed.');
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

    // ============= STATIC ASSETS =============
    // Fall through to Cloudflare's static asset binding
    if (!env.ASSETS) {
      return new Response('Static assets binding not configured', { status: 500 });
    }
    return env.ASSETS.fetch(request);
  }
};
