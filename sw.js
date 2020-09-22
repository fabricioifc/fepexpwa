const CACHE_NAME = 'v1';
const CACHE_FILES = [
  "/",
  "manifest.json",
  "public/assets/css/styles.css",
  "public/assets/js/script.js",
  "public/data/trabalhos.js",
  "public/assets/image/logo.png",
  "public/assets/image/logo192.png",
  "public/assets/image/logo144.png",
  "public/assets/image/logo96.png",
  "public/assets/image/logo512.png",
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[ServiceWorker] Cacheando Arquivos!');
        return cache.addAll(CACHE_FILES);
      })
      .then(self.skipWaiting()) // O sw é ativado após ser instalado
      .catch(error => console.warn('[INSTALL] Erro', error))
  )
});

self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Ativado');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            console.log(`Cache Atual ${cacheName}`);

            if (cacheName !== CACHE_NAME) {
              console.log('[ServiceWorker] Removendo o Cache ', cacheName);
              return caches.delete(cacheName);

            }
          })
        )
      })
  )

});

self.addEventListener('fetch', evento => {
  evento.respondWith(
    caches
      .match(evento.request)
      .then(response => {
        return response || fetch(evento.request)
      })
      .catch(error => console.log('[ServiceWorker] fetch error', error))
  )
})