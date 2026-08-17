// BSB audio Bible chapter player.
//
// WHAT THIS IS: whole-chapter playback of the real Faith Comes By Hearing
// BSB recording, streamed from R2 with Range support so the browser's
// native <audio> controls can seek. WHAT THIS IS NOT: per-verse synced
// narration. There is no per-verse timing data in the source recording —
// the manifest maps book -> chapter -> one audio file, nothing finer. The
// OT text in this app is JPS 1917 while this audio is BSB, so OT audio
// only ever lines up at chapter level; NT text and audio are both BSB and
// match word-for-word (see manifest.textAlignment).
(function () {
  var MANIFEST_URL = (window.SWRV_API_BASE || '') + '/data/bsb-audio-manifest.json';
  var manifest = null;
  var manifestState = 'idle'; // idle | loading | ready | unavailable
  var lastKey = null; // "Book:chapter" of what the player is currently showing

  function bar()   { return document.getElementById('audioBibleBar'); }
  function audioEl(){ return document.getElementById('audioBibleEl'); }
  function noteEl(){ return document.getElementById('audioBibleNote'); }

  function loadManifest(cb) {
    if (manifestState === 'ready' || manifestState === 'unavailable') { cb(); return; }
    if (manifestState === 'loading') {
      // Another call is already in flight — check back shortly rather than
      // firing a second fetch.
      setTimeout(function () { loadManifest(cb); }, 150);
      return;
    }
    manifestState = 'loading';
    fetch(MANIFEST_URL).then(function (res) {
      if (!res.ok) throw new Error('manifest not available (status ' + res.status + ')');
      return res.json();
    }).then(function (data) {
      manifest = data;
      manifestState = 'ready';
      cb();
    }).catch(function () {
      manifest = null;
      manifestState = 'unavailable';
      cb();
    });
  }

  function refresh() {
    var book = window.currentBook, ch = window.currentChapter;
    if (!book || !ch) { hide(); return; }
    var key = book + ':' + ch;
    if (key === lastKey) return; // already showing this chapter (or already hidden for it)
    lastKey = key;

    loadManifest(function () {
      if (!manifest || !manifest.books) { hide(); return; }
      var entry = manifest.books[book];
      var r2Key = entry && entry.chapters && entry.chapters[ch];
      if (!r2Key) { hide(); return; }
      show(entry.testament, r2Key);
    });
  }

  function show(testament, r2Key) {
    var b = bar();
    var a = audioEl();
    if (!b || !a) return;
    var src = (window.SWRV_API_BASE || '') + '/api/audio-bible/' + r2Key.split('/').map(encodeURIComponent).join('/');
    if (a.getAttribute('data-src') !== src) {
      a.pause();
      a.src = src;
      a.setAttribute('data-src', src);
    }
    var n = noteEl();
    if (n) {
      if (testament === 'OT') {
        n.textContent = 'ⓘ chapter-aligned only';
        n.title = 'This app’s Old Testament text is the 1917 JPS translation; this audio is the Berean Standard Bible (BSB). Wording will differ — the chapter matches, individual words will not.';
      } else {
        n.textContent = 'ⓘ BSB, matches text';
        n.title = 'This app’s New Testament text is also the Berean Standard Bible (BSB), so this audio matches the on-screen wording.';
      }
    }
    b.style.display = '';
  }

  function hide() {
    var b = bar();
    if (b) b.style.display = 'none';
    var a = audioEl();
    if (a && a.src) { a.pause(); }
  }

  // No chapter-change event exists to hook (checked: app.js dispatches none
  // for navigation), and wiring this into every navigation call site
  // (loadBook/loadChapter/nextChapter/prevChapter/goToVerse/...) would be
  // invasive across a large, unfamiliar codebase. A light poll comparing
  // window.currentBook/currentChapter is simple, can't desync, and costs
  // nothing noticeable at this interval.
  setInterval(refresh, 400);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', refresh);
  } else {
    refresh();
  }
})();
