// svg-controller.js
export default class SvgController extends HTMLElement {
  connectedCallback() {
    fetch('../svg/controller.svg')  // Chemin vers ton script PHP (à adapter)
      .then(res => res.text())
      .then(svg => {
        this.innerHTML = svg;
        // Ici, tu peux ajouter des interactions JS si besoin
      });
  }
};
