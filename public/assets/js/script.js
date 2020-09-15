import { trabalhos } from "./trabalhos.js";

const main = document.querySelector(".main");

self.addEventListener("load", function (evento) {
  trabalhos.forEach((trabalho) => {
    let card = `
        <div class="row">
            <div class="column">
                <a href="${trabalho.link_video}" class="link_video" target="_blank">
                    <div class="card">
                        <img src="public/assets/image/youtube.jpg">
                        <p class="titulo">${trabalho.titulo}</p>
                    </div>
                </a>
            </div>
        </div>
    `;

    main.innerHTML += card;
  });
});
