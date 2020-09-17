import { trabalhos } from "../../data/trabalhos.js";

const main = document.querySelector(".trabalhos");

self.addEventListener("load", function (evento) {
  trabalhos.forEach((trabalho) => {
    let card = `
        <div class="col l4 m6 s12">
          <div class="card small indigo darken-4">
            <div class="card-content white-text">
              <p class="small-text">${trabalho.titulo}</p>
            </div>
            <div class="card-action">
              <a href="${trabalho.link_trabalho}" title="Trabalho Escrito"><i class="material-icons orange-text">picture_as_pdf</i></a>
              <a href="${trabalho.link_video}" title="Apresentação"><i class="material-icons red-text">play_circle_filled</i></a>
              <span class="badge blue darken-3 white-text">${trabalho.area}</span>
              <span class="badge indigo darken-3 white-text">${trabalho.modalidade}</span>
            </div>
          </div>
        </div>
    `;
    main.innerHTML += card;
  });
});

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        console.log("Service Worker Registrado com Sucesso!", reg);
      })
      .catch((e) => console.error("Erro ao registrar o service worker:", e));
  } else {
    console.warn("Service Worker não é suportado pelo dispositivo");
  }
}

registerServiceWorker();
