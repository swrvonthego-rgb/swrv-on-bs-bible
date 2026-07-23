// SWRV Kingdom Bible — Native Auth + User Data (Cloudflare Worker + D1)
// Replaces Supabase entirely: email/password + Google OAuth, notes, bookmarks,
// reading progress, account deletion. Sessions are signed tokens issued by
// the Worker, stored in localStorage, sent as "Authorization: Bearer <token>".

(function(){
  const TOKEN_KEY = 'swrv_session_token';
  function apiBase(){ return window.SWRV_API_BASE || ''; }

  let currentUser = null;

  function getToken(){ try { return localStorage.getItem(TOKEN_KEY); } catch(e){ return null; } }
  function setToken(t){ try { if(t) localStorage.setItem(TOKEN_KEY, t); else localStorage.removeItem(TOKEN_KEY); } catch(e){} }

  async function apiFetch(path, opts){
    opts = opts || {};
    const headers = Object.assign({}, opts.headers||{});
    const token = getToken();
    if(token) headers['Authorization'] = 'Bearer ' + token;
    if(opts.body && !headers['Content-Type']) headers['Content-Type'] = 'application/json';
    try {
      const res = await fetch(apiBase() + path, Object.assign({}, opts, { headers }));
      let data = null;
      try { data = await res.json(); } catch(e){}
      return { ok: res.ok, status: res.status, data: data || {} };
    } catch(e){
      return { ok:false, status:0, data:{ error: 'Could not reach the server. Check your connection and try again.' } };
    }
  }

  // ---- UI helpers ----

  function _updateAuthUI(){
    const btn = document.getElementById('authHeaderBtn');
    if(!btn) return;
    if(currentUser){
      const name = currentUser.name || currentUser.email || 'You';
      const initials = name.split(' ').map(function(w){ return w[0]; }).slice(0,2).join('').toUpperCase();
      btn.innerHTML = '<span class="auth-avatar-initials">'+_esc(initials)+'</span>';
      btn.title = 'Signed in as ' + name + ' — tap to manage account';
      btn.classList.add('signed-in');
    } else {
      btn.innerHTML = '👤 Sign In';
      btn.title = 'Sign in with Google or email to save your reading progress and notes';
      btn.classList.remove('signed-in');
    }
  }

  function _esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  // ---- Auth modal ----

  window.openAuthModal = function(){
    if(currentUser){ _showAccountModal(); return; }
    const m = document.getElementById('authModal');
    if(m){ m.classList.add('show'); document.getElementById('authOverlay').classList.add('show'); }
    _showAuthView('login');
  };

  window.closeAuthModal = function(){
    document.getElementById('authModal').classList.remove('show');
    document.getElementById('authOverlay').classList.remove('show');
    _clearAuthError();
  };

  function _showAuthView(view){
    document.querySelectorAll('.auth-view').forEach(function(el){ el.style.display='none'; });
    const el = document.getElementById('authView_'+view);
    if(el) el.style.display='';
    _clearAuthError();
  }

  function _clearAuthError(){
    ['authError','authSignupError'].forEach(function(id){
      const el = document.getElementById(id);
      if(el){ el.textContent=''; el.style.display='none'; }
    });
  }

  function _showAuthError(msg, isSignup){
    const id = isSignup ? 'authSignupError' : 'authError';
    const el = document.getElementById(id);
    if(el){ el.textContent=msg; el.style.display='block'; }
  }

  window.authSwitchToSignup = function(){ _showAuthView('signup'); };
  window.authSwitchToLogin  = function(){ _showAuthView('login'); };

  // Google OAuth — full-page redirect to the Worker's own /api/auth/google/start,
  // which redirects to Google, then back to the Worker's callback, which
  // finally redirects here with ?auth_token=... in the URL (see
  // _handleOAuthRedirect below). No third-party auth vendor in the loop.
  //
  // NOTE (native/iOS build): once this app is wrapped in Capacitor, Google's
  // redirect lands on the Worker's own https origin, not the app's
  // capacitor://localhost bundle origin — so the token wouldn't land in the
  // native shell's localStorage automatically. That needs an in-app browser
  // (@capacitor/app deep link + a custom URL scheme callback) wired in once
  // the actual Xcode project exists. The live web/PWA app (what's deployed
  // today) works correctly as written here.
  window.authSignInGoogle = function(){
    document.querySelectorAll('.auth-google-btn').forEach(function(b){
      b.disabled = true;
      b.innerHTML = b.innerHTML.replace(/Continue with Google/i, 'Connecting…');
    });
    window.location.href = apiBase() + '/api/auth/google/start';
  };

  // Email sign-in
  window.authSignInEmail = async function(){
    _clearAuthError();
    const email = document.getElementById('authEmail').value.trim();
    const pass  = document.getElementById('authPass').value;
    if(!email || !pass){ _showAuthError('Please fill in email and password.'); return; }
    const btn = document.getElementById('authEmailBtn');
    if(btn) btn.disabled = true;
    const { ok, data } = await apiFetch('/api/auth/login', { method:'POST', body: JSON.stringify({ email, password: pass }) });
    if(btn) btn.disabled = false;
    if(!ok){ _showAuthError(data.error || 'Sign-in failed.'); return; }
    setToken(data.token);
    currentUser = data.user;
    _updateAuthUI();
    window.closeAuthModal();
    _onSignIn();
  };

  // Email sign-up
  window.authSignUpEmail = async function(){
    _clearAuthError();
    const email = document.getElementById('authSignupEmail').value.trim();
    const pass  = document.getElementById('authSignupPass').value;
    const pass2 = document.getElementById('authSignupPass2').value;
    if(!email || !pass){ _showAuthError('Please fill in email and password.', true); return; }
    if(pass !== pass2){ _showAuthError('Passwords do not match.', true); return; }
    if(pass.length < 6){ _showAuthError('Password must be at least 6 characters.', true); return; }
    const btn = document.getElementById('authSignupBtn');
    if(btn) btn.disabled = true;
    const { ok, data } = await apiFetch('/api/auth/signup', { method:'POST', body: JSON.stringify({ email, password: pass }) });
    if(btn) btn.disabled = false;
    if(!ok){ _showAuthError(data.error || 'Sign-up failed.', true); return; }
    setToken(data.token);
    currentUser = data.user;
    _updateAuthUI();
    window.closeAuthModal();
    _onSignIn();
  };

  // Sign out
  window.authSignOut = async function(){
    setToken(null);
    currentUser = null;
    _closeAccountModal();
    _updateAuthUI();
  };

  // Delete account + all associated data (Apple 5.1.1(v) requirement)
  window.authDeleteAccount = async function(){
    const errEl = document.getElementById('accountDeleteError');
    function showErr(m){ if(errEl){ errEl.textContent = m; errEl.style.display='block'; } }
    if(errEl){ errEl.textContent=''; errEl.style.display='none'; }
    if(!currentUser){ showErr('You are not signed in.'); return; }
    if(!window.confirm('Delete your account and everything in it — notes, bookmarks, and reading progress? This cannot be undone.')) return;
    if(!window.confirm('Final confirmation: permanently delete your SWRV Kingdom Bible account?')) return;
    const { ok, data } = await apiFetch('/api/delete-account', { method:'POST' });
    if(!ok){ showErr(data.error || 'Could not complete deletion. Please try again, or email contact@swrvonthego.pro.'); return; }
    setToken(null);
    currentUser = null;
    _closeAccountModal();
    _updateAuthUI();
    alert('Your account and all your data have been deleted.');
  };

  function _showAccountModal(){
    const m = document.getElementById('accountModal');
    if(!m) return;
    const name = currentUser ? (currentUser.name || currentUser.email || 'Account') : '';
    const email = currentUser ? currentUser.email : '';
    const nameEl = document.getElementById('accountName');
    const emailEl = document.getElementById('accountEmail');
    if(nameEl) nameEl.textContent = name;
    if(emailEl) emailEl.textContent = email;
    m.classList.add('show');
    document.getElementById('accountOverlay').classList.add('show');
  }

  function _closeAccountModal(){
    const m = document.getElementById('accountModal');
    if(m) m.classList.remove('show');
    const o = document.getElementById('accountOverlay');
    if(o) o.classList.remove('show');
  }
  window.closeAccountModal = _closeAccountModal;

  // ---- Reading progress ----

  function _onSignIn(){
    _loadResumePrompt();
    if(document.getElementById('studySheet') && document.getElementById('studySheet').classList.contains('open')){
      if(typeof window.switchStudyTab === 'function') window.switchStudyTab('notes');
    }
  }

  async function _loadResumePrompt(){
    if(!currentUser) return;
    const { ok, data } = await apiFetch('/api/progress/latest');
    if(!ok || !data.progress) return;
    _showResumeBar(data.progress.book, data.progress.chapter, data.progress.verse);
  }

  function _showResumeBar(book, chapter, verse){
    const bar = document.getElementById('resumeBar');
    if(!bar) return;
    const ref = book + ' ' + chapter + (verse ? ':'+verse : '');
    document.getElementById('resumeBarText').textContent = 'Resume reading: ' + ref;
    bar.style.display = 'flex';
    bar.dataset.book = book;
    bar.dataset.chapter = chapter;
    bar.dataset.verse = verse || '';
  }

  window.resumeReading = function(){
    const bar = document.getElementById('resumeBar');
    if(!bar) return;
    const book = bar.dataset.book;
    const ch = parseInt(bar.dataset.chapter);
    if(book && ch && typeof window.loadBook === 'function') window.loadBook(book, ch);
    bar.style.display = 'none';
  };

  window.dismissResumeBar = function(){
    const bar = document.getElementById('resumeBar');
    if(bar) bar.style.display = 'none';
  };

  // Called by app.js whenever the user navigates to a chapter
  window.authSaveProgress = async function(book, chapter, verse){
    if(!currentUser) return;
    await apiFetch('/api/progress', { method:'POST', body: JSON.stringify({ book, chapter, verse: verse || null }) });
  };

  // ---- Notes ----

  window.authGetUser = function(){ return currentUser; };

  window.authLoadNote = async function(book, chapter, verse){
    if(!currentUser) return null;
    const q = '?book='+encodeURIComponent(book)+'&chapter='+encodeURIComponent(chapter)+(verse!=null?'&verse='+encodeURIComponent(verse):'');
    const { ok, data } = await apiFetch('/api/notes'+q);
    return ok ? data.note : null;
  };

  window.authSaveNote = async function(book, chapter, verse, body, noteId){
    if(!currentUser) return null;
    const { ok, data } = await apiFetch('/api/notes', { method:'POST', body: JSON.stringify({ book, chapter, verse: verse!=null?verse:null, body, noteId: noteId||null }) });
    return ok ? data.id : null;
  };

  window.authDeleteNote = async function(noteId){
    if(!currentUser) return;
    await apiFetch('/api/notes', { method:'DELETE', body: JSON.stringify({ noteId }) });
  };

  // ---- Bookmarks ----

  window.authToggleBookmark = async function(book, chapter, verse, label){
    if(!currentUser){ window.openAuthModal(); return; }
    const { ok, data } = await apiFetch('/api/bookmarks', { method:'POST', body: JSON.stringify({ book, chapter, verse: verse!=null?verse:null, label: label||null }) });
    return ok ? data.bookmarked : false;
  };

  // ---- Init ----

  // Google's callback redirects back here with ?auth_token=... (or
  // ?auth_error=...) in the URL. Grab it, store it, and scrub it from the
  // visible URL/history immediately so a session token never lingers there.
  function _handleOAuthRedirect(){
    const params = new URLSearchParams(window.location.search);
    const token = params.get('auth_token');
    const err = params.get('auth_error');
    if(!token && !err) return;
    params.delete('auth_token'); params.delete('auth_error');
    const clean = window.location.pathname + (params.toString() ? '?'+params.toString() : '') + window.location.hash;
    window.history.replaceState({}, '', clean);
    if(token){
      setToken(token);
    } else if(err){
      setTimeout(function(){ window.openAuthModal(); _showAuthError(err); }, 300);
    }
  }

  async function initAuth(){
    _handleOAuthRedirect();
    const token = getToken();
    if(!token){ _updateAuthUI(); return; }
    const { ok, data } = await apiFetch('/api/auth/me');
    if(ok && data.user){
      currentUser = data.user;
      _updateAuthUI();
      _loadResumePrompt();
    } else {
      setToken(null);
      currentUser = null;
      _updateAuthUI();
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initAuth);
  } else {
    initAuth();
  }

})();
