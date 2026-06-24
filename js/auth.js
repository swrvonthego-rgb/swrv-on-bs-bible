// SWRV Kingdom Bible — Supabase Auth + User Data
// Handles: Google/email sign-in, reading progress, notes, bookmarks

(function(){
  const SUPABASE_URL = 'https://lbtyfrcfwgyauzefvwqd.supabase.co';
  const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxidHlmcmNmd2d5YXV6ZWZ2d3FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyNjI0MjksImV4cCI6MjA5NzgzODQyOX0.CqlmUmjP3FtRVPu3FqFx5RTEtqgNk8reIMt0rXJhiog';

  let sb = null;
  let currentUser = null;

  function initSupabase(){
    if(typeof window.supabase === 'undefined'){ console.warn('Supabase SDK not loaded'); return; }
    sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
    sb.auth.onAuthStateChange(function(event, session){
      currentUser = session ? session.user : null;
      _updateAuthUI();
      if(currentUser && event === 'SIGNED_IN'){
        _onSignIn();
      }
    });
    sb.auth.getSession().then(function(res){
      currentUser = res.data && res.data.session ? res.data.session.user : null;
      _updateAuthUI();
      if(currentUser) _loadResumePrompt();
    });
  }

  // ---- UI helpers ----

  function _updateAuthUI(){
    const btn = document.getElementById('authHeaderBtn');
    const avatar = document.getElementById('authAvatar');
    if(!btn) return;
    if(currentUser){
      const name = (currentUser.user_metadata && (currentUser.user_metadata.full_name || currentUser.user_metadata.name)) || currentUser.email || 'You';
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
    if(currentUser){
      _showAccountModal();
      return;
    }
    const m = document.getElementById('authModal');
    if(m){ m.classList.add('show'); document.getElementById('authOverlay').classList.add('show'); }
    // Reset to login view
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

  // Google OAuth
  window.authSignInGoogle = async function(){
    if(!sb) return;
    _clearAuthError();
    const { error } = await sb.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + window.location.pathname }
    });
    if(error) _showAuthError(error.message);
  };

  // Email sign-in
  window.authSignInEmail = async function(){
    if(!sb) return;
    _clearAuthError();
    const email = document.getElementById('authEmail').value.trim();
    const pass  = document.getElementById('authPass').value;
    if(!email || !pass){ _showAuthError('Please fill in email and password.'); return; }
    const btn = document.getElementById('authEmailBtn');
    if(btn) btn.disabled = true;
    const { error } = await sb.auth.signInWithPassword({ email, password: pass });
    if(btn) btn.disabled = false;
    if(error){ _showAuthError(error.message); return; }
    window.closeAuthModal();
  };

  // Email sign-up
  window.authSignUpEmail = async function(){
    if(!sb) return;
    _clearAuthError();
    const email = document.getElementById('authSignupEmail').value.trim();
    const pass  = document.getElementById('authSignupPass').value;
    const pass2 = document.getElementById('authSignupPass2').value;
    if(!email || !pass){ _showAuthError('Please fill in email and password.', true); return; }
    if(pass !== pass2){ _showAuthError('Passwords do not match.', true); return; }
    if(pass.length < 6){ _showAuthError('Password must be at least 6 characters.', true); return; }
    const btn = document.getElementById('authSignupBtn');
    if(btn) btn.disabled = true;
    const { error } = await sb.auth.signUp({ email, password: pass });
    if(btn) btn.disabled = false;
    if(error){ _showAuthError(error.message, true); return; }
    _showAuthView('check-email');
  };

  // Sign out
  window.authSignOut = async function(){
    if(!sb) return;
    await sb.auth.signOut();
    _closeAccountModal();
    currentUser = null;
    _updateAuthUI();
  };

  function _showAccountModal(){
    const m = document.getElementById('accountModal');
    if(!m) return;
    const name = currentUser ? ((currentUser.user_metadata && (currentUser.user_metadata.full_name || currentUser.user_metadata.name)) || currentUser.email || 'Account') : '';
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
    // Refresh notes tab if study sheet is open
    if(document.getElementById('studySheet') && document.getElementById('studySheet').classList.contains('open')){
      if(typeof window.switchStudyTab === 'function') window.switchStudyTab('notes');
    }
  }

  async function _loadResumePrompt(){
    if(!sb || !currentUser) return;
    const { data, error } = await sb.from('reading_progress').select('book,chapter,verse').eq('user_id', currentUser.id).order('updated_at', { ascending: false }).limit(1).single();
    if(error || !data) return;
    _showResumeBar(data.book, data.chapter, data.verse);
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
    if(!sb || !currentUser) return;
    await sb.from('reading_progress').upsert(
      { user_id: currentUser.id, book: book, chapter: chapter, verse: verse || null, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,book' }
    );
  };

  // ---- Notes ----

  window.authGetUser = function(){ return currentUser; };

  window.authLoadNote = async function(book, chapter, verse){
    if(!sb || !currentUser) return null;
    const query = sb.from('notes').select('id,body').eq('user_id', currentUser.id).eq('book', book).eq('chapter', chapter);
    if(verse != null) query.eq('verse', verse); else query.is('verse', null);
    const { data } = await query.order('updated_at', { ascending: false }).limit(1).single();
    return data || null;
  };

  window.authSaveNote = async function(book, chapter, verse, body, noteId){
    if(!sb || !currentUser) return null;
    if(noteId){
      const { data, error } = await sb.from('notes').update({ body, updated_at: new Date().toISOString() }).eq('id', noteId).eq('user_id', currentUser.id).select('id').single();
      return data ? data.id : null;
    } else {
      const { data, error } = await sb.from('notes').insert({ user_id: currentUser.id, book, chapter, verse: verse != null ? verse : null, body }).select('id').single();
      return data ? data.id : null;
    }
  };

  window.authDeleteNote = async function(noteId){
    if(!sb || !currentUser) return;
    await sb.from('notes').delete().eq('id', noteId).eq('user_id', currentUser.id);
  };

  // ---- Bookmarks ----

  window.authToggleBookmark = async function(book, chapter, verse, label){
    if(!sb || !currentUser){ window.openAuthModal(); return; }
    // Check if already bookmarked
    const q = sb.from('bookmarks').select('id').eq('user_id', currentUser.id).eq('book', book).eq('chapter', chapter);
    if(verse != null) q.eq('verse', verse); else q.is('verse', null);
    const { data } = await q.limit(1).single();
    if(data){
      await sb.from('bookmarks').delete().eq('id', data.id);
      return false;
    } else {
      await sb.from('bookmarks').insert({ user_id: currentUser.id, book, chapter, verse: verse!=null?verse:null, label: label||null });
      return true;
    }
  };

  // ---- Init ----

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initSupabase);
  } else {
    initSupabase();
  }

})();
