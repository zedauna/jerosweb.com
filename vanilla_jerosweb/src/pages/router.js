import Navigo from 'navigo';

import { renderSvg } from './01_page_svg/index.js';
import { renderSvgAvance } from './02_page_svg_v2/index.js';
import { renderLeaflet } from './02_page_leaflet/index.js';

const router = new Navigo('/', { hash: false});

export function setupRouter() {
router
  .on({
  'home': () => { document.getElementById('app').innerHTML = '<my-home-page></my-home-page>'; },
  '/svg': renderSvg,
  '/svg_v2': renderSvgAvance,
  '/leaflet':renderLeaflet,
  '**': () => console.log('404')
})

.on('/s',() => {import('./01_page_svg/index.js').then(m =>m.renderSvg())})

 router.resolve();

}

