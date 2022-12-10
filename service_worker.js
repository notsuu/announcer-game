const cacheName = 'cache6';

const filesToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/index.js',
  '/alertify.js',
  '/alertify.min.js',
  '/style.css',
  '/assets/announcer.png',
  '/assets/announcer2.png',
  '/assets/fonts/v2.ttf',
  '/v2',
  '/v2/index.html',
  '/v2/index.js',
  '/css/alertify.css',
  '/css/alertify.min.css',
  '/css/alertify.rtl.css',
  '/css/alertify.rtl.min.css',
  '/css/themes/default.css',
  '/css/themes/default.min.css',
  '/css/themes/default.rtl.css',
  '/css/themes/default.rtl.min.css',
];

self.addEventListener('activate', e => self.clients.claim());

self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(filesToCache)));
  e.waitUntil((async () => {
    const cacheNames = await caches.keys();

    await Promise.all(cacheNames.map(async (cachen) => {
      if (cacheName !== cachen) {
        await caches.delete(cachen);
      }
    }));
  })());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(async function() {
    try {
      return await fetch(event.request);
    } catch (err) {
      return caches.match(event.request);
    }
  }());
});

