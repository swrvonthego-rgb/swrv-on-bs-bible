// SWRV Kingdom Bible — background library-text preloader.
// The Apocrypha books, Dead Sea Scrolls, 1 Enoch, Jubilees, the cross-source
// map, and Thread Commentary are all "open this from a dedicated reader"
// content (~1.3MB combined) — none of them sit on the default Genesis
// verse-render path. Every consumer already treats them as load-may-not-be-
// finished-yet: the Apocrypha/Enoch/DSS reader functions show a "loading /
// not loaded" state instead of crashing, and CROSS_SOURCE_MAP/
// THREAD_COMMENTARY reads are all `if(window.X)`-guarded. That made them safe
// to move off the critical path the same way js/preload-lexicons.js did for
// the Hebrew/Greek/BDB lexicons — background-loaded at idle instead of
// blocking every visitor's first paint on data most sessions never open.
(function(){
  var FILES = [
    { global: 'TOBIT',           src: 'data/apocrypha-tobit.js' },
    { global: 'JUDITH',          src: 'data/apocrypha-judith.js' },
    { global: 'WISDOM',          src: 'data/apocrypha-wisdom.js' },
    { global: 'SIRACH',          src: 'data/apocrypha-sirach.js' },
    { global: 'MACCABEES1',      src: 'data/apocrypha-1maccabees.js' },
    { global: 'MACCABEES2',      src: 'data/apocrypha-2maccabees.js' },
    { global: 'BARUCH',          src: 'data/apocrypha-baruch.js' },
    { global: 'AZARIAH',         src: 'data/apocrypha-azariah.js' },
    { global: 'MANASSEH',        src: 'data/apocrypha-manasseh.js' },
    { global: 'DSS',             src: 'data/dead-sea-scrolls.js' },
    { global: 'ENOCH',           src: 'data/enoch.js' },
    { global: 'JUBILEES',        src: 'data/jubilees.js' },
    { global: 'CROSS_SOURCE_MAP',src: 'data/cross-source-map.js' },
    { global: 'THREAD_COMMENTARY',src:'data/thread-commentary.js' }
  ];

  var idle = window.requestIdleCallback || function(cb){ return setTimeout(function(){ cb({timeRemaining:function(){return 50;}}); }, 1); };

  var queue = FILES.filter(function(f){ return !window[f.global]; });
  var total = queue.length;
  var loaded = 0;
  window.SWRV_LIBRARY_PRELOAD_STATUS = { loaded: 0, total: total, complete: total === 0 };

  function loadOne(file, done){
    var s = document.createElement('script');
    s.src = file.src;
    s.async = true;
    s.onload = function(){ loaded++; window.SWRV_LIBRARY_PRELOAD_STATUS.loaded = loaded; done(); };
    s.onerror = function(){ console.warn('[preload] missing ' + file.src); loaded++; window.SWRV_LIBRARY_PRELOAD_STATUS.loaded = loaded; done(); };
    document.head.appendChild(s);
  }

  function pump(){
    if(!queue.length){
      window.SWRV_LIBRARY_PRELOAD_STATUS.complete = true;
      window.dispatchEvent(new CustomEvent('swrv-library-preload-complete', { detail: { loaded: loaded, total: total } }));
      if(total) console.log('[preload] all ' + loaded + '/' + total + ' library texts loaded');
      return;
    }
    var file = queue.shift();
    loadOne(file, function(){ idle(pump); });
  }

  if(total) idle(pump);
})();
