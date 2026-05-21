// SWRV Kingdom Bible — service worker for offline / PWA support
// Pre-caches the app shell + the deep Definition Bible Engine data layers
// so the entire study tool works offline after the first online visit.
// HTML is network-first so a new deployment reaches users without trapping them
// on an old build. The 65 per-book Bible files cache lazily on first fetch
// (preloader pulls them at idle) — keeps install fast while still going fully
// offline within ~10 seconds of first load.
const CACHE_NAME = 'swrv-kingdom-bible-v20260518-completenesspack1';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/styles.css',
  './js/app.js?v=20260521layersfix1',
  './js/search.js?v=20260521layersfix1',
  './js/preload-bible.js?v=20260521layersfix1',
  './data/english-bible-dictionary.js?v=20260521layersfix1',
  './data/foundational-word-families.js?v=20260521layersfix1',
  './data/concept-completeness-pack.js?v=20260521layersfix1',
  './data/context-sense-disambiguator.js?v=20260521layersfix1',
  './data/cultural-context-cards.js?v=20260521layersfix1',
  './data/instruction-classification.js?v=20260521layersfix1',
  './data/person-context-cards.js?v=20260521layersfix1',
  './data/group-nation-cards.js?v=20260521layersfix1',
  './data/religion-context-cards.js?v=20260521layersfix1',
  './assets/cover.png',
  './assets/icons/icon-180.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png'
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
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (resp.ok && resp.type === 'basic') {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return resp;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
