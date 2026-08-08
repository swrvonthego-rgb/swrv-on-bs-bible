// SWRV Kingdom Bible — background lexicon preloader.
// BDB Hebrew (2.2MB), Strong's Hebrew (2.0MB), Strong's Greek (1.1MB) are
// reference/lookup data — nothing in the verse-render path touches them —
// but they used to sit in the eager <script> batch, adding ~5.2MB to what
// every visitor had to download before the app became usable. They now load
// here at browser idle, same pattern as js/preload-bible.js for the 66 KJV
// books. Every read site for STRONGS_HEB/STRONGS_GRK/BDB_HEB is already
// guarded (`window.X && ...`) for exactly this: a tap in the first moment
// after load just gets fewer lexicon cross-references until this finishes,
// rather than a broken page.

(function(){
  var FILES = [
    { global: 'STRONGS_HEB', src: 'data/strongs-hebrew.js' },
    { global: 'STRONGS_GRK', src: 'data/strongs-greek.js' },
    { global: 'BDB_HEB',     src: 'data/bdb-hebrew.js' }
  ];

  var idle = window.requestIdleCallback || function(cb){ return setTimeout(function(){ cb({timeRemaining:function(){return 50;}}); }, 1); };

  var queue = FILES.filter(function(f){ return !window[f.global]; });
  var total = queue.length;
  var loaded = 0;
  window.SWRV_LEXICON_PRELOAD_STATUS = { loaded: 0, total: total, complete: total === 0 };

  function loadOne(file, done){
    var s = document.createElement('script');
    s.src = file.src;
    s.async = true;
    s.onload = function(){ loaded++; window.SWRV_LEXICON_PRELOAD_STATUS.loaded = loaded; done(); };
    s.onerror = function(){ console.warn('[preload] missing ' + file.src); loaded++; window.SWRV_LEXICON_PRELOAD_STATUS.loaded = loaded; done(); };
    document.head.appendChild(s);
  }

  function pump(){
    if(!queue.length){
      window.SWRV_LEXICON_PRELOAD_STATUS.complete = true;
      window.dispatchEvent(new CustomEvent('swrv-lexicons-preload-complete', { detail: { loaded: loaded, total: total } }));
      if(total) console.log('[preload] all ' + loaded + '/' + total + ' lexicons loaded');
      return;
    }
    var file = queue.shift();
    loadOne(file, function(){ idle(pump); });
  }

  if(total) idle(pump);
})();
