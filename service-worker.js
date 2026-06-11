const CACHE = "grafica-personalizada-v2";

const ARQUIVOS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./logo-192.png",
  "./logo-512.png"
];

self.addEventListener("install", event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ARQUIVOS))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match("./index.html"))
  );
});
