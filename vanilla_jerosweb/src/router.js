import Navigo from 'navigo';
import { render as renderHome } from './pages/01_page_svg/index.js';
import { render as renderSvgAvance } from './pages/02_page_svg_v2/index.js';
import { render as renderLeaflet } from './pages/02_page_leaflet/index.js';

const router = new Navigo('/', { hash: false});

router.on({
  '/home': () => {
    document.getElementById('app').innerHTML = '<my-home-page></my-home-page>';
  },
  '': renderHome,
  '/svg_v2': renderSvgAvance,
  '/leaflet':renderLeaflet,
  '*': () => console.log('404')
}).resolve();

export { router };
