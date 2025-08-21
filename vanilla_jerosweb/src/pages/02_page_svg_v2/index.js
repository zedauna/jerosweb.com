export function render() {
  return fetch('/pages/02_page_svg_v2/index.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('app').innerHTML = html;
      // Initialise les composants ou scripts spécifiques
    });
}
