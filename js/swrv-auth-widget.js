/*!
 * SWRV Auth Widget v1.0
 * Drop-in sign-in modal for any SWRV site.
 * Usage: <script src="https://swrv-on-bs-bible.swrvonthego.workers.dev/js/swrv-auth-widget.js"></script>
 *        <script>SWRVAuth.init({ appName: 'My App' });</script>
 */
(function(global){
  'use strict';

  var SUPABASE_URL  = 'https://lbtyfrcfwgyauzefvwqd.supabase.co';
  var SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxidHlmcmNmd2d5YXV6ZWZ2d3FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyNjI0MjksImV4cCI6MjA5NzgzODQyOX0.CqlmUmjP3FtRVPu3FqFx5RTEtqgNk8reIMt0rXJhiog';
  var SUPABASE_CDN  = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js';

  var sb = null;
  var _user = null;
  var _listeners = [];
  var _opts = { appName: 'SWRV', buttonTarget: null };

  /* ---- CSS ---- */
  var CSS = `
.swrv-auth-btn{display:inline-flex;align-items:center;gap:6px;padding:7px 16px;border-radius:999px;border:1.5px solid #d4af37;background:rgba(212,175,55,0.08);color:#d4af37;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;transition:background .15s}
.swrv-auth-btn:hover{background:rgba(212,175,55,0.2)}
.swrv-auth-btn.swrv-signed-in{background:rgba(212,175,55,0.15)}
.swrv-auth-avatar{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:#d4af37;color:#111;font-weight:700;font-size:10px}
.swrv-auth-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:99998}
.swrv-auth-overlay.swrv-show{display:block}
.swrv-auth-modal{display:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:99999;background:#1a1610;border:1.5px solid #3a3020;border-radius:18px;padding:32px 28px 28px;width:min(90vw,370px);box-shadow:0 24px 80px rgba(0,0,0,.8);font-family:inherit;color:#e8dcc8}
.swrv-auth-modal.swrv-show{display:block}
.swrv-auth-x{position:absolute;top:12px;right:14px;background:none;border:none;color:#888;font-size:20px;cursor:pointer;padding:4px 8px;line-height:1}
.swrv-auth-brand{font-size:14px;font-weight:700;color:#d4af37;text-align:center;margin-bottom:6px;letter-spacing:.05em;text-transform:uppercase}
.swrv-auth-title{font-size:18px;font-weight:700;text-align:center;color:#e8dcc8;margin-bottom:6px}
.swrv-auth-sub{font-size:13px;text-align:center;color:#888;line-height:1.5;margin-bottom:18px}
.swrv-auth-google{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:11px 16px;border-radius:999px;background:#fff;color:#222;border:none;font-size:14px;font-weight:600;cursor:pointer;margin-bottom:16px;box-sizing:border-box}
.swrv-auth-google:hover{background:#f5f5f5}
.swrv-auth-divider{text-align:center;position:relative;margin:12px 0;color:#666;font-size:12px}
.swrv-auth-divider::before,.swrv-auth-divider::after{content:'';position:absolute;top:50%;width:38%;height:1px;background:#3a3020}
.swrv-auth-divider::before{left:0}.swrv-auth-divider::after{right:0}
.swrv-auth-divider span{position:relative;padding:0 8px}
.swrv-auth-input{display:block;width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1.5px solid #3a3020;background:#0d0d0f;color:#e8dcc8;font-size:14px;margin-bottom:10px;outline:none;font-family:inherit}
.swrv-auth-input:focus{border-color:#d4af37}
.swrv-auth-err{background:rgba(200,60,60,.12);border:1px solid rgba(200,60,60,.3);border-radius:6px;color:#e05050;font-size:12px;padding:8px 10px;margin-bottom:10px;line-height:1.4;display:none}
.swrv-auth-primary{display:block;width:100%;padding:12px;border-radius:999px;background:#d4af37;color:#111;border:none;font-size:15px;font-weight:700;cursor:pointer;margin-bottom:12px;font-family:inherit}
.swrv-auth-primary:disabled{opacity:.5;cursor:not-allowed}
.swrv-auth-switch{text-align:center;font-size:13px;color:#888}
.swrv-auth-link{background:none;border:none;color:#d4af37;font-size:13px;font-weight:600;cursor:pointer;text-decoration:underline;padding:0;font-family:inherit}
.swrv-auth-acct-name{font-size:18px;font-weight:700;text-align:center;margin-bottom:4px}
.swrv-auth-acct-email{font-size:13px;color:#888;text-align:center;margin-bottom:20px}
`;

  var GOOGLE_SVG = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/><path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>';

  /* ---- helpers ---- */
  function esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function el(id){ return document.getElementById(id); }

  function injectCSS(){
    if(document.getElementById('swrv-auth-css')) return;
    var s = document.createElement('style');
    s.id = 'swrv-auth-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function injectHTML(){
    if(document.getElementById('swrv-auth-modal')) return;
    var div = document.createElement('div');
    div.innerHTML = [
      '<div class="swrv-auth-overlay" id="swrv-auth-overlay" onclick="SWRVAuth.closeModal()"></div>',

      // Login modal
      '<div class="swrv-auth-modal" id="swrv-auth-modal" role="dialog">',
        '<button class="swrv-auth-x" onclick="SWRVAuth.closeModal()">✕</button>',
        // login view
        '<div id="swrv-view-login">',
          '<div class="swrv-auth-brand" id="swrv-auth-brand-l"></div>',
          '<div class="swrv-auth-title">Sign in to your account</div>',
          '<div class="swrv-auth-sub">Save your progress and settings across all SWRV apps.</div>',
          '<button class="swrv-auth-google" onclick="SWRVAuth._google()">'+GOOGLE_SVG+' Continue with Google</button>',
          '<div class="swrv-auth-divider"><span>or sign in with email</span></div>',
          '<input class="swrv-auth-input" id="swrv-email" type="email" placeholder="Email address" autocomplete="email">',
          '<input class="swrv-auth-input" id="swrv-pass" type="password" placeholder="Password" autocomplete="current-password">',
          '<div class="swrv-auth-err" id="swrv-err-login"></div>',
          '<button class="swrv-auth-primary" id="swrv-login-btn" onclick="SWRVAuth._emailLogin()">Sign In</button>',
          '<div class="swrv-auth-switch">No account? <button class="swrv-auth-link" onclick="SWRVAuth._view(\'signup\')">Create one free</button></div>',
        '</div>',
        // signup view
        '<div id="swrv-view-signup" style="display:none">',
          '<div class="swrv-auth-brand" id="swrv-auth-brand-s"></div>',
          '<div class="swrv-auth-title">Create your account</div>',
          '<button class="swrv-auth-google" onclick="SWRVAuth._google()">'+GOOGLE_SVG+' Sign up with Google</button>',
          '<div class="swrv-auth-divider"><span>or sign up with email</span></div>',
          '<input class="swrv-auth-input" id="swrv-su-email" type="email" placeholder="Email address" autocomplete="email">',
          '<input class="swrv-auth-input" id="swrv-su-pass" type="password" placeholder="Password (6+ chars)" autocomplete="new-password">',
          '<input class="swrv-auth-input" id="swrv-su-pass2" type="password" placeholder="Confirm password" autocomplete="new-password">',
          '<div class="swrv-auth-err" id="swrv-err-signup"></div>',
          '<button class="swrv-auth-primary" id="swrv-signup-btn" onclick="SWRVAuth._emailSignup()">Create Account</button>',
          '<div class="swrv-auth-switch">Have an account? <button class="swrv-auth-link" onclick="SWRVAuth._view(\'login\')">Sign in</button></div>',
        '</div>',
        // check email
        '<div id="swrv-view-check" style="display:none">',
          '<div style="font-size:40px;text-align:center;margin-bottom:12px">✉️</div>',
          '<div class="swrv-auth-title">Check your email</div>',
          '<div class="swrv-auth-sub">Click the confirmation link we sent you, then come back and sign in.</div>',
          '<button class="swrv-auth-primary" onclick="SWRVAuth._view(\'login\')">Back to Sign In</button>',
        '</div>',
        // account (signed-in)
        '<div id="swrv-view-account" style="display:none">',
          '<div class="swrv-auth-brand" id="swrv-auth-brand-a"></div>',
          '<div class="swrv-auth-title">Your Account</div>',
          '<div class="swrv-auth-acct-name" id="swrv-acct-name"></div>',
          '<div class="swrv-auth-acct-email" id="swrv-acct-email"></div>',
          '<button class="swrv-auth-primary" style="background:rgba(200,60,60,.15);border:1.5px solid rgba(200,60,60,.4);color:#e05050;" onclick="SWRVAuth._signOut()">Sign Out</button>',
        '</div>',
      '</div>'
    ].join('');
    document.body.appendChild(div);
  }

  /* ---- state updates ---- */
  function _updateBtn(){
    var btns = document.querySelectorAll('[data-swrv-auth-btn]');
    btns.forEach(function(btn){
      if(_user){
        var meta = _user.user_metadata || {};
        var name = meta.full_name || meta.name || _user.email || 'You';
        var init = name.split(' ').map(function(w){return w[0]||'';}).slice(0,2).join('').toUpperCase();
        btn.innerHTML = '<span class="swrv-auth-avatar">'+esc(init)+'</span> Account';
        btn.classList.add('swrv-signed-in');
      } else {
        btn.innerHTML = '👤 Sign In';
        btn.classList.remove('swrv-signed-in');
      }
    });
  }

  function _notify(){ _listeners.forEach(function(fn){ try{ fn(_user); }catch(e){} }); }

  /* ---- view switching ---- */
  function _view(v){
    ['login','signup','check','account'].forEach(function(n){
      var d = el('swrv-view-'+n);
      if(d) d.style.display = (n===v?'':'none');
    });
    _clearErr();
    var appName = _opts.appName || 'SWRV';
    ['l','s','a'].forEach(function(sfx){
      var b = el('swrv-auth-brand-'+sfx);
      if(b) b.textContent = appName;
    });
    if(v==='account' && _user){
      var meta = _user.user_metadata || {};
      var name = meta.full_name || meta.name || 'Account';
      if(el('swrv-acct-name'))  el('swrv-acct-name').textContent  = name;
      if(el('swrv-acct-email')) el('swrv-acct-email').textContent = _user.email || '';
    }
  }

  function _clearErr(){
    ['swrv-err-login','swrv-err-signup'].forEach(function(id){
      var e = el(id); if(e){e.textContent='';e.style.display='none';}
    });
  }

  function _err(id, msg){ var e = el(id); if(e){e.textContent=msg;e.style.display='block';} }

  /* ---- auth actions ---- */
  function _google(){
    if(!sb) return;
    _clearErr();
    sb.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: location.origin + location.pathname }
    }).then(function(res){ if(res.error) _err('swrv-err-login', res.error.message); });
  }

  async function _emailLogin(){
    if(!sb) return;
    _clearErr();
    var email = (el('swrv-email')||{}).value||'';
    var pass  = (el('swrv-pass')||{}).value||'';
    if(!email||!pass){ _err('swrv-err-login','Please enter email and password.'); return; }
    var btn = el('swrv-login-btn');
    if(btn) btn.disabled = true;
    var res = await sb.auth.signInWithPassword({ email: email, password: pass });
    if(btn) btn.disabled = false;
    if(res.error){ _err('swrv-err-login', res.error.message); return; }
    _closeModal();
  }

  async function _emailSignup(){
    if(!sb) return;
    _clearErr();
    var email = (el('swrv-su-email')||{}).value||'';
    var pass  = (el('swrv-su-pass')||{}).value||'';
    var pass2 = (el('swrv-su-pass2')||{}).value||'';
    if(!email||!pass){ _err('swrv-err-signup','Please enter email and password.'); return; }
    if(pass!==pass2){ _err('swrv-err-signup','Passwords do not match.'); return; }
    if(pass.length<6){ _err('swrv-err-signup','Password must be 6+ characters.'); return; }
    var btn = el('swrv-signup-btn');
    if(btn) btn.disabled = true;
    var res = await sb.auth.signUp({ email: email, password: pass });
    if(btn) btn.disabled = false;
    if(res.error){ _err('swrv-err-signup', res.error.message); return; }
    _view('check');
  }

  async function _signOut(){
    if(!sb) return;
    await sb.auth.signOut();
    _closeModal();
  }

  function _openModal(){
    var overlay = el('swrv-auth-overlay');
    var modal   = el('swrv-auth-modal');
    if(overlay) overlay.classList.add('swrv-show');
    if(modal)   modal.classList.add('swrv-show');
    _view(_user ? 'account' : 'login');
  }

  function _closeModal(){
    var overlay = el('swrv-auth-overlay');
    var modal   = el('swrv-auth-modal');
    if(overlay) overlay.classList.remove('swrv-show');
    if(modal)   modal.classList.remove('swrv-show');
  }

  /* ---- init ---- */
  function _loadSupabase(cb){
    if(global.supabase){ cb(); return; }
    var s = document.createElement('script');
    s.src = SUPABASE_CDN;
    s.onload = cb;
    document.head.appendChild(s);
  }

  function _initSupabase(){
    sb = global.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
    sb.auth.onAuthStateChange(function(event, session){
      _user = session ? session.user : null;
      _updateBtn();
      _notify();
    });
    sb.auth.getSession().then(function(res){
      _user = res.data && res.data.session ? res.data.session.user : null;
      _updateBtn();
      _notify();
    });
  }

  function _createButton(target){
    var btn = document.createElement('button');
    btn.className = 'swrv-auth-btn';
    btn.setAttribute('data-swrv-auth-btn','1');
    btn.innerHTML = '👤 Sign In';
    btn.onclick = _openModal;
    if(target){
      var t = typeof target === 'string' ? document.querySelector(target) : target;
      if(t) t.appendChild(btn);
    } else {
      // Float top-right if no target given
      btn.style.cssText = 'position:fixed;top:12px;right:12px;z-index:9999;';
      document.body.appendChild(btn);
    }
    return btn;
  }

  /* ---- public API ---- */
  var SWRVAuth = {
    init: function(opts){
      _opts = Object.assign({ appName: 'SWRV', buttonTarget: null }, opts || {});
      injectCSS();
      var ready = function(){
        injectHTML();
        _createButton(_opts.buttonTarget);
        _loadSupabase(_initSupabase);
      };
      if(document.readyState === 'loading'){
        document.addEventListener('DOMContentLoaded', ready);
      } else {
        ready();
      }
    },
    openModal:   _openModal,
    closeModal:  _closeModal,
    getUser:     function(){ return _user; },
    isSignedIn:  function(){ return !!_user; },
    onAuthChange: function(fn){ _listeners.push(fn); if(_user !== null) fn(_user); },
    signOut:     _signOut,
    // internals exposed for onclick handlers
    _google:      _google,
    _emailLogin:  _emailLogin,
    _emailSignup: _emailSignup,
    _signOut:     _signOut,
    _view:        _view,
    supabase:     function(){ return sb; }
  };

  global.SWRVAuth = SWRVAuth;

})(window);
