export function render() {
  return fetch('/pages/01_page_svg/index.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('app').innerHTML = html;
      // Initialise les composants ou scripts spécifiques
    });
}
