// home.js
export default class MyHomePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1>Accueil</h1>`;
  }
};

