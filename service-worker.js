const CACHE_NAME = 'portfolio-v1';
const OFFLINE_URLS = [
  '/',                 // GitHub may serve index.html at /
  '/Portfolio/',       // adjust if your repo name is different
  '/Portfolio/index.html',
  '/Portfolio/style.css',
  '/Portfolio/game/game.html',
  '/Portfolio/game/game.css',
  '/Portfolio/game/game.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_URLS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// For any navigation request, if network fails, show the game page
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        return await fetch(event.request);
      } catch (err) {
        const cache = await caches.open(CACHE_NAME);
        // fallback to game
        return await cache.match('/Portfolio/game/game.html');
      }
    })());
  }
});
