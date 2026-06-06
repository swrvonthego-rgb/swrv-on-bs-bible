// SWRV Kingdom Bible — background preloader.
// Lazy-loads every canonical book listed in BIBLE_INDEX so the global
// search index is no longer limited to whatever the user has navigated to.
// Runs during browser idle time so it never blocks first paint or interaction.
// Genesis is bundled via data/genesis.js (window.GENESIS) and is skipped here.

(function(){
  if(!window.BIBLE_INDEX) return;

  var idle = window.requestIdleCallback || function(cb){ return setTimeout(function(){ cb({timeRemaining:function(){return 50;}}); }, 1); };

  var queue = window.BIBLE_INDEX
    .map(function(b){ return b.slug; })
    .filter(function(slug){ return slug !== 'Genesis'; });

  var inflight = 0;
  var loaded = 0;
  var total = queue.length;
  var MAX_PARALLEL = 6;
  window.SWRV_PRELOAD_STATUS = { loaded: 0, total: total, complete: false };

  function loadOne(slug, done){
    if(window.BIBLE && window.BIBLE[slug]){ done(); return; }
    var s = document.createElement('script');
    s.src = 'data/bible/' + slug + '.js';
    s.async = true;
    s.onload = function(){ loaded++; window.SWRV_PRELOAD_STATUS.loaded = loaded; done(); };
    s.onerror = function(){ console.warn('[preload] missing data/bible/' + slug + '.js'); window.SWRV_PRELOAD_STATUS.loaded = loaded; done(); };
    document.head.appendChild(s);
  }

  function pump(){
    while(queue.length && inflight < MAX_PARALLEL){
      var slug = queue.shift();
      inflight++;
      loadOne(slug, function(){
        inflight--;
        if(queue.length){
          idle(pump);
        } else if(inflight === 0){
          window.SWRV_PRELOAD_STATUS.loaded = loaded;
          window.SWRV_PRELOAD_STATUS.complete = true;
          if(typeof window.invalidateSearchIndex === 'function'){
            window.invalidateSearchIndex();
          }
          window.dispatchEvent(new CustomEvent('swrv-bible-preload-complete', { detail:{ loaded: loaded, total: total } }));
          console.log('[preload] all ' + loaded + '/' + total + ' books loaded — search is now global');
        }
      });
    }
  }

  idle(pump);
})();
