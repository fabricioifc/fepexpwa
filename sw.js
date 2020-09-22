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
      .catch(error => console.warn('[INSTALL] Erro', error))
  )
});