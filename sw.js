const CACHE_NAME = 'hs-market-v1';
const urlsToCache = [
  '/hs-market/',
  '/hs-market/index.html',
  '/hs-market/manifest.json',
  '/hs-market/icon-192x192.png',
  '/hs-market/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});