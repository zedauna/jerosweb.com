export function renderLeaflet() {
  return fetch('./src/pages/02_page_leaflet/index.html')
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
