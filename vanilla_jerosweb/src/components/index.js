import Footer from "./footer.js";
import Legende from "./legende.js";
import MenuAccessiblite from "./menuAccessibilite.js";
import MenuAccessibliteLeaflet from "./menuAccessibiliteLeaflet.js";
import MenuCallFunctionLeaflet from "./menuCallFunctionLeaflet.js";
import MenuCallFunctionSvg from "./menuCallFunctionSvg.js";
import MenuNavBar from "./menuNavBar.js";
import ModalAideLeaflet from "./modalAideLeaflet.js";
import ModalAideSvg from "./modalAideSvg.js";
import Position from "./position.js";
import PositionAvance from "./positionAvance.js";
import PositionLeaflet from "./positionLeaflet.js";
import SidebarFunction from "./sidebarFunction.js";
import SidebarFunctionLeaflet from "./sidebarFunctionLeaflet.js";
import SvgController from "./svgController.js";
import  MyHomePage from "./home.js"



customElements.define('app-footer',Footer);
customElements.define("app-legende", Legende);
customElements.define("app-menu-accessibilite", MenuAccessiblite);
customElements.define("app-menu-accessibilite-leaflet", MenuAccessibliteLeaflet);
customElements.define('app-menu-call-function-leaflet',MenuCallFunctionLeaflet);
customElements.define("app-menu-call-function-svg", MenuCallFunctionSvg);
customElements.define("app-menu-navbar", MenuNavBar);
customElements.define("app-modal-aide-leaflet", ModalAideLeaflet);
customElements.define("app-modal-aide-svg", ModalAideSvg);
customElements.define("app-position", Position);
customElements.define('app-position-avance',PositionAvance);
customElements.define('app-position-leaflet',PositionLeaflet);
customElements.define("app-sidebar-function", SidebarFunction);
customElements.define('app-sidebar-function-leaflet',SidebarFunctionLeaflet);
customElements.define('svg-controller', SvgController);
customElements.define('my-home-page', MyHomePage);