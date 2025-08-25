
// export function render() {
//   document.getElementById('app').innerHTML = '<app-legende></app-legende>';
// }

export function renderSvg() {
  return fetch('./src/pages/01_page_svg/index.html')
    .then(res => {
      if (!res.ok) {
        throw new Error(`Erreur de chargement : ${res.statusText}`);
      }
      return res.text();
    })
    .then(html => {
      document.getElementById('app').innerHTML = html;
    })
    .catch(err => {
      console.error('Erreur dans fetch:', err);
    });
}

