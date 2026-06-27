const CACHE = 'ptg-games-v1';
const ASSETS = [
  '/PTG-Board-Game/',
  '/PTG-Board-Game/index.html',
  '/PTG-Board-Game/manifest.json',
  '/PTG-Board-Game/icon-192.png',
  '/PTG-Board-Game/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).catch(() => caches.match('/PTG-Board-Game/index.html'));
    })
  );
});
