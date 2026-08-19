// Right-side tool dock — Music / Font / Tour.
//
// Fixed in one place, never draggable. Tapping a tab opens that tool's
// panel beside the rail; tapping the same tab again, or double-tapping the
// open panel itself, sends it back to just the tab. Tour has no panel of
// its own — it's a one-shot action, so its tab never shows an "open" state.
(function(){
  var OPEN_KEY = 'swrv_side_dock_open'; // which panel (if any) was left open
  var current = null; // 'music' | 'font' | null

  function musicMini(){ return document.getElementById('musicMini'); }
  function musicFull(){ return document.getElementById('musicFull'); }
  function fontPopover(){ return document.getElementById('fontSizePopover'); }
  function tab(which){ return document.getElementById('dock' + which.charAt(0).toUpperCase() + which.slice(1) + 'Tab'); }

  function setActiveTab(which){
    ['music', 'font', 'tour'].forEach(function(w){
      var el = tab(w);
      if(el) el.classList.toggle('is-open', w === which && w !== 'tour');
    });
  }

  function closeAll(){
    var mm = musicMini();
    if(mm) mm.classList.add('hidden');
    var mf = musicFull();
    if(mf && mf.style.display !== 'none'){
      // Closing the dock also closes the expanded full player, so re-opening
      // the Music tab always starts from the compact view, not wherever the
      // player was left.
      mf.style.display = 'none';
    }
    var fp = fontPopover();
    if(fp) fp.classList.remove('open');
    if(typeof window._typoClose === 'function'){
      window._typoClose();
    }
    document.body.classList.remove('side-dock-music-open', 'side-dock-font-open');
    setActiveTab(null);
    current = null;
    try { localStorage.removeItem(OPEN_KEY); } catch(e){}
  }

  function openMusic(){
    closeAll();
    var mf = musicFull();
    if(mf) mf.style.display = '';
    if(typeof window._renderPlaylist === 'function'){
      window._renderPlaylist();
    }
    document.body.classList.add('side-dock-music-open');
    setActiveTab('music');
    current = 'music';
    try { localStorage.setItem(OPEN_KEY, 'music'); } catch(e){}
  }

  function openFont(){
    closeAll();
    var btn = document.getElementById('fontSizeBtn');
    if(btn && btn.onclick) {
      btn.onclick();
    }
    document.body.classList.add('side-dock-font-open');
    setActiveTab('font');
    current = 'font';
    try { localStorage.setItem(OPEN_KEY, 'font'); } catch(e){}
  }

  window.sideDockToggle = function(which){
    if(which === 'tour'){
      // One-shot action — always fires, never toggles an "open" panel.
      if(typeof window.startAppTour === 'function') window.startAppTour();
      return;
    }
    if(current === which){ closeAll(); return; }
    if(which === 'music') openMusic();
    else if(which === 'font') openFont();
  };

  window.toggleSideDockCollapse = function(){
    document.body.classList.toggle('side-dock-show');
    var btn = document.getElementById('sideDockToggleBtn');
    if(btn) {
      var isShown = document.body.classList.contains('side-dock-show');
      btn.setAttribute('aria-expanded', isShown ? 'true' : 'false');
      btn.textContent = isShown ? '‹' : '›';
    }
    try { localStorage.setItem('swrv_side_dock_show', document.body.classList.contains('side-dock-show') ? '1' : '0'); } catch(e){}
  };

  // Double-tap the open panel itself sends it back to the dock. The
  // native dblclick event (not a hand-rolled timer) so two fast, separate
  // taps on two different inner controls — e.g. Play then Volume — are
  // never mistaken for a double-tap the way a naive timer would.
  function wireDoubleTapClose(el){
    if(!el || el._swrvDockDblTap) return;
    el._swrvDockDblTap = true;
    el.addEventListener('dblclick', function(e){
      // Ignore double-clicks on the progress bar / text inputs inside the
      // full player — those are legitimate double-click targets for
      // scrubbing/selecting text, not a request to dock.
      if(e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      closeAll();
    });
  }

  function init(){
    wireDoubleTapClose(musicMini());
    wireDoubleTapClose(musicFull());
    wireDoubleTapClose(fontPopover());
    // Music starts docked (hidden) until the tab is tapped — it no longer
    // sits permanently visible bottom-right the way the old floating pill did.
    var mm = musicMini();
    if(mm) mm.classList.add('hidden');
    // Restore side dock visibility state from localStorage
    try {
      var shouldShow = localStorage.getItem('swrv_side_dock_show') === '1';
      if(shouldShow) {
        document.body.classList.add('side-dock-show');
        var btn = document.getElementById('sideDockToggleBtn');
        if(btn) {
          btn.setAttribute('aria-expanded', 'true');
          btn.textContent = '‹';
        }
      }
    } catch(e){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
