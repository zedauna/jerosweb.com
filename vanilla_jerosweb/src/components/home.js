// home.js
class MyHomePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1>Accueil</h1>`;
  }
}
customElements.define('my-home-page', MyHomePage);
