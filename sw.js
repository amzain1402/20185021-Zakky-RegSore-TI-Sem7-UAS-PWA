const CACHE_NAME = 'UAS-PWA';
const urlsToCache = [
  '/',
  'index.html',
  'style.css',
  'indexDB.html',
  'CV.html',
  'manifest.json',
  'Gambar/pp.jpg',
  'app.js',
  'sw.js',
  'form-style.css',
  'cv-style.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});