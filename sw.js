const CACHE_NAME = 'hsmarket-v2';
const urlsToCache = [
  '/hs-market/',
  '/hs-market/index.html',
  '/hs-market/manifest.json',
  '/hs-market/icon-192x192.png',
  '/hs-market/icon-512x512.png',
  '/hs-market/offline.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    )).then(() => self.clients.claim())
  );
});