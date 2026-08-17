// SWRV Kingdom Bible — first-run interactive tour
// Walks a new user through the app's real, live UI: a dimmed overlay with a
// "spotlight" cut around each real button, a short tooltip explaining it,
// and Back / Next / Skip controls. Steps point at actual DOM elements, not
// screenshots, so what's taught always matches what's actually there.
(function(){
  var TOUR_SEEN_KEY = 'swrv_tour_seen';

  var STEPS = [
    {
      selector: '#searchBtn',
      title: 'Find Anything Instantly',
      body: 'Tap here to search any verse, word, person, place, event, or ancient source — even Strong\'s Hebrew and Greek numbers like H430 or G26.<br><br><span style="opacity:0.75;font-size:12px;">Tip: this whole menu row scrolls left and right — swipe it to see everything.</span>'
    },
    {
      // The reading-mode-group wrapper (New Reader/Study/Scholar/Threads) can
      // render as a thin, collapsed sliver on narrower screens if it's been
      // flex-shrunk in the scrollable header row — spotlighting a single real
      // button inside it (New Reader) is both more robust and clearer to
      // teach from than "look at this whole cluster."
      selector: '#readingModeRead',
      title: 'Choose Your Depth',
      body: '<b>New Reader</b> keeps it simple and plain-English. <b>Study</b> opens deep context on any verse you tap. <b>Scholar</b> shows everything — lexicons, sources, translation notes.'
    },
    {
      selector: '.definable',
      title: 'Tap Any Underlined Word',
      body: 'Every underlined word opens the original Hebrew or Greek behind it, explained in plain English — no seminary required.'
    },
    {
      selector: '#audioBibleBar',
      title: 'Listen to Any Chapter',
      body: 'Real recorded Bible audio appears automatically here — no button to press. The verse being read highlights itself as it plays, and you can tap any verse number to jump the audio there.'
    },
    {
      selector: '#musicMini',
      title: 'Ambient Music, Optional',
      body: 'This little player floats here the whole time you\'re reading. Tap it to expand — load your own tracks or an embedded station, and play it quietly behind your reading or study time.'
    },
    {
      selector: '#memoryBtn',
      title: 'Save Your Place',
      body: 'Bookmark verses and write your own notes. Sign in with Google or email to sync them across your devices.'
    },
    {
      selector: '#libraryBtn',
      title: 'Explore the Full Library',
      body: 'Enoch, Jubilees, the Dead Sea Scrolls, Tobit, Sirach, and more — every companion text sourced, dated, and clearly labeled.'
    }
  ];

  var idx = 0;
  var active = false;
  var resizeHandler = null;

  function $(id){ return document.getElementById(id); }

  function positionTour(dir){
    if(!active) return;
    var step = STEPS[idx];
    var el = document.querySelector(step.selector);
    var spotlight = $('tourSpotlight');
    var card = $('tourCard');
    if(!el){
      // Target isn't on screen right now (no chapter loaded yet, this
      // reading-mode group hidden, etc.) — skip past it in the direction
      // we were already moving, rather than spotlighting nothing.
      _advance(dir || 1);
      return;
    }
    el.scrollIntoView({behavior:'smooth', block:'center', inline:'center'});
    setTimeout(function(){
      var r = el.getBoundingClientRect();
      var pad = 6;
      spotlight.style.top    = (r.top - pad) + 'px';
      spotlight.style.left   = (r.left - pad) + 'px';
      spotlight.style.width  = (r.width + pad*2) + 'px';
      spotlight.style.height = (r.height + pad*2) + 'px';

      // Content MUST be set before measuring card.offsetHeight below — this
      // step's text can be longer or shorter than whatever was showing
      // before. Measuring first (the old order) used the PREVIOUS step's
      // height, so a longer card (like the music-player step) would render
      // taller than the position was calculated for and its bottom would
      // hang down past the target — e.g. covering the music player itself.
      $('tourStepTitle').textContent = step.title;
      $('tourStepBody').innerHTML = step.body;
      $('tourStepCount').textContent = 'Step ' + (idx+1) + ' of ' + STEPS.length;
      $('tourBackBtn').style.visibility = idx === 0 ? 'hidden' : 'visible';
      $('tourNextBtn').textContent = idx === STEPS.length - 1 ? 'Finish' : 'Next →';

      var cardW = 300;
      var cardH = card.offsetHeight || 160;
      var spaceBelow = window.innerHeight - r.bottom;
      var spaceAbove = r.top;
      var top;
      if(spaceBelow > cardH + 24){
        top = r.bottom + pad + 14;
      } else if(spaceAbove > cardH + 24){
        top = r.top - pad - cardH - 14;
      } else {
        // Neither side has a clean gap (target near an edge, card tall) —
        // pin to whichever edge has more room, and clamp so the card can
        // never actually overlap the spotlighted target's own box.
        top = spaceAbove > spaceBelow
          ? Math.max(12, r.top - pad - cardH - 14)
          : Math.min(window.innerHeight - cardH - 12, r.bottom + pad + 14);
      }
      var left = Math.min(Math.max(12, r.left), window.innerWidth - cardW - 12);
      card.style.top = top + 'px';
      card.style.left = left + 'px';
    }, 260);
  }

  function _advance(dir){
    var next = idx + dir;
    if(next < 0) next = 0;
    if(next >= STEPS.length){ window.finishTour(); return; }
    idx = next;
    positionTour(dir);
  }

  window.tourNext = function(){ _advance(1); };
  window.tourBack = function(){ _advance(-1); };

  window.finishTour = function(){
    active = false;
    idx = 0;
    var overlay = $('tourOverlay');
    if(overlay) overlay.classList.remove('show');
    if(resizeHandler){ window.removeEventListener('resize', resizeHandler); resizeHandler = null; }
    try { localStorage.setItem(TOUR_SEEN_KEY, '1'); } catch(e){}
  };
  window.skipTour = window.finishTour;

  window.startAppTour = function(){
    idx = 0;
    active = true;
    var overlay = $('tourOverlay');
    if(!overlay) return;
    overlay.classList.add('show');
    positionTour(1);
    resizeHandler = function(){ positionTour(0); };
    window.addEventListener('resize', resizeHandler);
  };

  // The splash page's "Take the Tour" button dismisses the splash, waits a
  // beat for the main app underneath to settle, then starts the tour on the
  // real, now-visible UI.
  window.dismissSplashAndStartTour = function(){
    if(typeof dismissSplash === 'function') dismissSplash();
    setTimeout(function(){ window.startAppTour(); }, 500);
  };

  window.hasSeenTour = function(){
    try { return localStorage.getItem(TOUR_SEEN_KEY) === '1'; } catch(e){ return false; }
  };
})();
