// SWRV Kingdom Bible — background preloader for the Historical Bible
// Dictionary (Easton's 1897 + Smith's 1863, both public domain; this
// specific merged/structured dataset compiled by NEUU, CC BY 4.0 —
// see data/historical-dict/ATTRIBUTION.md).
// Split into 26 per-letter files so the ~4.6MB dataset never blocks first
// paint. Loads during browser idle time, same pattern as preload-bible.js.

(function(){
  var LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');
  var VERSION = 'v=20260821hist1';

  var idle = window.requestIdleCallback || function(cb){ return setTimeout(function(){ cb({timeRemaining:function(){return 50;}}); }, 1); };

  var queue = LETTERS.slice();
  var inflight = 0;
  var loaded = 0;
  var total = queue.length;
  window.SWRV_HISTDICT_STATUS = { loaded: 0, total: total, complete: false };

  function loadOne(letter, done){
    var s = document.createElement('script');
    s.src = 'data/historical-dict/' + letter + '.js?' + VERSION;
    s.async = true;
    s.onload = function(){ loaded++; window.SWRV_HISTDICT_STATUS.loaded = loaded; done(); };
    s.onerror = function(){ console.warn('[hist-dict] missing data/historical-dict/' + letter + '.js'); loaded++; window.SWRV_HISTDICT_STATUS.loaded = loaded; done(); };
    document.head.appendChild(s);
  }

  function pump(){
    while(queue.length && inflight < 4){
      var letter = queue.shift();
      inflight++;
      loadOne(letter, function(){
        inflight--;
        if(queue.length){
          idle(pump);
        } else if(inflight === 0){
          window.SWRV_HISTDICT_STATUS.complete = true;
          window.dispatchEvent(new CustomEvent('swrv-histdict-ready'));
        }
      });
    }
  }

  idle(pump);
})();
