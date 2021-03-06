const CACHE_NAME = "fepex-v2";
const CACHE_FILES = [
  "/",
  "manifest.json",
  "public/assets/css/styles.css",
  "public/assets/js/script.js",
  "public/data/trabalhos.js",
  "public/assets/image/logo.png",
  "public/assets/image/logo96.png",
  "public/assets/image/logo192.png",
  "public/assets/image/logo144.png",
  "public/assets/image/logo512.png",
  "//fonts.googleapis.com/icon?family=Material+Icons"
];

self.addEventListener("install", (evento) => {
  console.log("[ServiceWorker] Instalado");

  evento.waitUntil(
    // Abre o cache
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        // Adiciona os arquivos ao cache
        console.log("[ServiceWorker] Cacheando arquivos desejados");
        return cache.addAll(CACHE_FILES);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", function (evento) {
  console.log("[ServiceWorker] Ativado");

  evento.waitUntil(
    // Pega todos os caches existentes
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (thisCacheName) {
          console.log(`Cache Antigo ${thisCacheName}`);
          // Se não for a versão atual, então remove
          if (thisCacheName !== CACHE_NAME) {
            console.log("[ServiceWorker] Removendo cache - ", thisCacheName);
            return caches.delete(thisCacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function (evento) {
  console.log('Requisição na URL \n', evento.request.url);
  evento.respondWith(
    // Veja se tem no cache
    caches
      .match(evento.request)
      .then(function (response) {
        return response || fetch(evento.request);
      })
      .catch(function (error) {
        console.log("[ServiceWorker] fetch error", error);
      })
  );
});

// self.addEventListener("fetch", function (e) {
//   console.log("[ServiceWorker] Fetch", e.request.url);

//   e.respondWith(
//     // Verifica no cache pela requisição
//     caches.match(e.request).then(function (response) {
//       // Se tiver no cache, então não precisa buscar na internet
//       if (response) {
//         console.log("Encontrado no cache", e.request.url, response);
//         return response;
//       }

//       // Se NÃO estiver no cache, busca na internet e adiciona ao cache
//       var requestClone = e.request.clone();
//       return fetch(requestClone)
//         .then(function (response) {
//           if (!response || !response.ok) {
//             console.log("[ServiceWorker] Resposta inválida! ");
//             return response;
//           }

//           var responseClone = response.clone();

//           //  Abre o cache
//           caches.open(CACHE_NAME).then(function (cache) {
//             // Coloca a resposta obtida no cache
//             cache.put(e.request, responseClone);
//           });
//           return response;
//         })
//         .catch(function (err) {
//           console.log("[ServiceWorker] Ocorreu um Erro", err);
//           // if (response) return response;
//         });
//     })
//   );
// });
