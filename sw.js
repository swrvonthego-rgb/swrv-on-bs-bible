// SWRV Kingdom Bible — service worker for offline / PWA support
// Pre-caches the app shell PLUS the full curated study layer at install time
// so the entire study tool — Genesis deep build, all 16 NT cards, lexicons,
// people/place/theme cards, cultural / instruction / religion cards,
// chronological events, parallel passages, prophecy fulfillment, AMP-style,
// plot panels, heartbeat, culture boxes, BDB, Strong's HEB+GRK, Enoch,
// glossary, definitions, context resolver — is offline-ready immediately
// after install. The 65 per-book BIBLE/*.js files still cache lazily via
// the preloader (44 MB total) to keep install fast; everything else is
// pre-cached at install for true install-time offline.
const CACHE_NAME = 'swrv-kingdom-bible-v20260721-appstore1';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/styles.css',
  // Active JS bundle
  './js/app.js?v=20260721appstore1',
  './js/search.js?v=20260721study1',
  './js/preload-bible.js?v=20260721search1',
  './js/enrichments.js?v=20260721search1',
  // PWA icons + splash
  './assets/cover.png',
  './assets/icons/icon-180.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  // Red Letter data — Jesus's direct words
  './data/red-letters.js',
  // Deep Definition Bible Engine — new layers
  './data/english-bible-dictionary.js?v=20260721study1',
  './data/study-adam-eve.js?v=20260721study1',
  './data/strongs-sense-map.js?v=20260522deepword3',
  './data/foundational-word-families.js?v=20260522deepword3',
  './data/concept-completeness-pack.js?v=20260522deepword3',
  './data/contextual-sense-notes.js?v=20260522deepword3',
  './data/context-sense-disambiguator.js?v=20260522deepword3',
  './data/cultural-context-cards.js?v=20260522deepword3',
  './data/instruction-classification.js?v=20260522deepword3',
  // People / nations / religion layer
  './data/person-context-cards.js?v=20260522deepword3',
  './data/group-nation-cards.js?v=20260522deepword3',
  './data/religion-context-cards.js?v=20260522deepword3',
  './data/peoples.js?v=20260522deepword3',
  './data/places.js?v=20260522deepword3',
  './data/place-coords.js?v=20260624coords1',
  './data/themes.js?v=20260522deepword3',
  // Core data + audit + index
  './data/audit.js?v=20260522deepword3',
  './data/bible-index.js?v=20260522deepword3',
  './data/source-categories.js?v=20260522deepword3',
  './data/sources-manifest.js?v=20260522deepword3',
  './data/sources.js?v=20260522deepword3',
  './data/definitions.js?v=20260522deepword3',
  // Chronology + cross-refs + companion sources
  './data/chronological-events.js?v=20260522deepword3',
  './data/chronological-map.js?v=20260522deepword3',
  './data/cross-refs.js?v=20260522deepword3',
  './data/cross-source-map.js?v=20260522deepword3',
  './data/parallel-passages.js?v=20260522deepword3',
  './data/prophecy-fulfillment.js?v=20260522deepword3',
  './data/enoch.js?v=20260522deepword3',
  // Lexicons (Strong's HEB+GRK, BDB)
  './data/strongs-hebrew.js?v=20260522deepword3',
  './data/strongs-greek.js?v=20260522deepword3',
  './data/bdb-hebrew.js?v=20260522deepword3',
  // Audio narration + media glue
  './data/audio-narration.js?v=20260522deepword3',
  // Genesis 1-4 + Exodus + Leviticus deep-build enrichments
  './data/genesis.js?v=20260522deepword3',
  './data/pre-history.js?v=20260522deepword3',
  './data/plot-panels.js?v=20260522deepword3',
  './data/heartbeat-callouts.js?v=20260522deepword3',
  './data/culture-boxes-deep.js?v=20260522deepword3',
  './data/amp-style.js?v=20260522deepword3',
  // Exodus chapter-by-chapter enrichments (8 segments × 5 types)
  './data/exodus-pre-history.js?v=20260522deepword3',
  './data/exodus-amp-style.js?v=20260522deepword3',
  './data/exodus-culture.js?v=20260522deepword3',
  './data/exodus-definitions.js?v=20260522deepword3',
  './data/exodus-heartbeat.js?v=20260522deepword3',
  './data/exodus-plot-panels.js?v=20260522deepword3',
  './data/exodus34-amp-style.js?v=20260522deepword3',
  './data/exodus34-culture.js?v=20260522deepword3',
  './data/exodus34-definitions.js?v=20260522deepword3',
  './data/exodus34-heartbeat.js?v=20260522deepword3',
  './data/exodus34-plot-panels.js?v=20260522deepword3',
  './data/exodus57-amp-style.js?v=20260522deepword3',
  './data/exodus57-culture.js?v=20260522deepword3',
  './data/exodus57-definitions.js?v=20260522deepword3',
  './data/exodus57-heartbeat.js?v=20260522deepword3',
  './data/exodus57-plot-panels.js?v=20260522deepword3',
  './data/exodus812-amp-style.js?v=20260522deepword3',
  './data/exodus812-culture.js?v=20260522deepword3',
  './data/exodus812-definitions.js?v=20260522deepword3',
  './data/exodus812-heartbeat.js?v=20260522deepword3',
  './data/exodus812-plot-panels.js?v=20260522deepword3',
  './data/exodus1315-amp-style.js?v=20260522deepword3',
  './data/exodus1315-culture.js?v=20260522deepword3',
  './data/exodus1315-definitions.js?v=20260522deepword3',
  './data/exodus1315-heartbeat.js?v=20260522deepword3',
  './data/exodus1315-plot-panels.js?v=20260522deepword3',
  './data/exodus1618-amp-style.js?v=20260522deepword3',
  './data/exodus1618-culture.js?v=20260522deepword3',
  './data/exodus1618-definitions.js?v=20260522deepword3',
  './data/exodus1618-heartbeat.js?v=20260522deepword3',
  './data/exodus1618-plot-panels.js?v=20260522deepword3',
  './data/exodus1924-amp-style.js?v=20260522deepword3',
  './data/exodus1924-culture.js?v=20260522deepword3',
  './data/exodus1924-definitions.js?v=20260522deepword3',
  './data/exodus1924-heartbeat.js?v=20260522deepword3',
  './data/exodus1924-plot-panels.js?v=20260522deepword3',
  './data/exodus2540-amp-style.js?v=20260522deepword3',
  './data/exodus2540-culture.js?v=20260522deepword3',
  './data/exodus2540-definitions.js?v=20260522deepword3',
  './data/exodus2540-heartbeat.js?v=20260522deepword3',
  './data/exodus2540-plot-panels.js?v=20260522deepword3',
  // Leviticus enrichments
  './data/leviticus-pre-history.js?v=20260522deepword3',
  './data/leviticus-amp-style.js?v=20260522deepword3',
  './data/leviticus-culture.js?v=20260522deepword3',
  './data/leviticus-definitions.js?v=20260522deepword3',
  './data/leviticus-heartbeat.js?v=20260522deepword3',
  './data/leviticus-plot-panels.js?v=20260522deepword3'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(c => c.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const accept = e.request.headers.get('accept') || '';
  const isHtmlNavigation = e.request.mode === 'navigate' || accept.includes('text/html');

  // HTML/navigation must be network-first so a new deployment reaches users.
  if (isHtmlNavigation) {
    e.respondWith(
      fetch(e.request).then(resp => {
        if (resp.ok) {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return resp;
      }).catch(() => caches.match(e.request).then(cached => cached || caches.match('./index.html')))
    );
    return;
  }

  // Static assets stay cache-first for offline speed.
  // IMPORTANT: never fall back to index.html for script/style/font/JSON asset
  // requests. Returning the HTML shell for a .js request makes the browser try
  // to parse HTML as JavaScript — a syntax error that silently breaks whatever
  // that file defines (this is what was killing the search: search.js would
  // resolve to index.html on a flaky fetch and openSearch was never defined).
  const dest = e.request.destination;
  const isCodeAsset = dest === 'script' || dest === 'style' || dest === 'font' ||
                      /\.(js|css|json|woff2?|ttf)(\?|$)/i.test(new URL(e.request.url).pathname);

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (resp.ok && resp.type === 'basic') {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return resp;
      }).catch(() => {
        // For code assets, fail honestly (network error) instead of handing
        // back HTML. For images/other, index.html fallback is harmless enough,
        // but for code it must never happen.
        if (isCodeAsset) return Response.error();
        return caches.match('./index.html');
      });
    })
  );
});
