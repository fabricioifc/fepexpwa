import { trabalhos } from "../../data/trabalhos.js";

const main = document.querySelector(".main");
const tamanho = 4;
const trabalhos_em_partes = new Array(Math.ceil(trabalhos.length / tamanho))
  .fill()
  .map((_) => trabalhos.splice(0, tamanho));

self.addEventListener("load", function (evento) {
  trabalhos_em_partes.forEach((itens) => {
    let html = "<div class='row'>";

    itens.forEach((trabalho) => {
      let card = `
      <div class="column">
        <a href="${trabalho.link_video}" class="link_video" target="_blank">
            <div class="card">
                <img src="public/assets/image/youtube.jpg">
                <p class="titulo">${trabalho.titulo}</p>
            </div>
        </a>
        </div>
    `;
      html += card;
    });
    html += "</div>";

    main.innerHTML += html;
  });
});
