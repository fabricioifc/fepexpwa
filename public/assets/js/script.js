import { trabalhos } from "../../data/trabalhos.js";

const main = document.querySelector(".trabalhos");
const tamanho = 3;
const trabalhos_em_partes = new Array(Math.ceil(trabalhos.length / tamanho))
  .fill()
  .map((_) => trabalhos.splice(0, tamanho));

self.addEventListener("load", function (evento) {
  trabalhos_em_partes.forEach((itens) => {
    let html = "<div class='row'>";

    itens.forEach((trabalho) => {
      let card = `
        <div class="col l4 s12">
          <div class="card indigo darken-4">
            <div class="card-content white-text">
              <span class="sm">${trabalho.titulo}</span>
            </div>
            <div class="card-action">
              <a href="${trabalho.link_trabalho}" target="_blank" title="Trabalho Escrito"><i class="material-icons orange-text">picture_as_pdf</i></a>
              <a href="${trabalho.link_video}" target="_blank" title="Apresentação"><i class="material-icons red-text">play_circle_filled</i></a>
              <span class="badge blue darken-3 white-text">${trabalho.area}</span>
              <span class="badge indigo darken-3 white-text">${trabalho.modalidade}</span>
            </div>
          </div>
        </div>
    `;
      html += card;
    });
    html += "</div>";

    main.innerHTML += html;
  });
});

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        console.log("Registration successful", reg);
      })
      .catch((e) =>
        console.error("Error during service worker registration:", e)
      );
  } else {
    console.warn("Service Worker is not supported");
  }
}

registerServiceWorker();
