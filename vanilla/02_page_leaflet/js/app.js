// importation des modules

import { controlerCarte, controlerCarteCopy } from "./layer.js";

import {
  markColor,
  addOjectOnMap,
  CentreMap,
  createMap,
  createCircle,
} from "./map.js";

//Les letiables par defaut
let zoom = 6;
let lat = 42.2;
let lng = 2.25;
let text = "Je suis ici!";

const centre_france = {
  lat: 46.227638,
  lng: 2.213749,
};

//Personnalisation des icons
export let icoRed = markColor("img/icon/marker-red.svg");
export let icoGreen = markColor("img/icon/marker-green.svg");
export let icoBlue = markColor("img/icon/marker-blue.svg");
export let icoOrange = markColor("img/icon/marker-orange.svg");
export let icoPurple = markColor("img/icon/marker-purple.svg");
export let icoYellow = markColor("img/icon/marker-yellow.svg");
export let icoIndigo = markColor("img/icon/Marker_metropole.svg");
export let icoCarca = markColor("img/icon/Marker_carcassonne.svg");

//Metropoles
const Paris = L.marker([48.856697, 2.351462], {
  icon: icoIndigo,
}).bindPopup("<center>Paris</center>");

const Lyon = L.marker([45.757814, 4.832011], {
  icon: icoIndigo,
}).bindPopup("<center>Lyon</center>");

const Toulouse = L.marker([43.604462, 1.444247], {
  icon: icoIndigo,
}).bindPopup("<center>Toulouse</center>");

const Marseille = L.marker([43.2961743, 5.3699525], {
  icon: icoIndigo,
}).bindPopup("<center>Marseille</center>");

//groupe de points
let Grandes_villes = L.layerGroup([Paris, Lyon, Toulouse, Marseille]);

//parametres de la carte
let coordsFromBrowser = {
  lat: centre_france.lat,
  lng: centre_france.lng,
};

const map = new L.map("map", {
  center: coordsFromBrowser,
  zoom: zoom,
  layers: [controlerCarte.OpenStreetMap, Grandes_villes],
});

export default map;

let controlerMarqueurs = {
  "Métropoles <img src='img/icon/Marker_metropole.svg' width = '20px'/>":
    Grandes_villes,
};

//Positionner la carte à l'adresse courante
navigator.geolocation.getCurrentPosition(function (position) {
  //console.log("position trouvée",position.coords.latitude,position.coords.longitude);
  coordsFromBrowser.lat = position.coords.latitude;
  coordsFromBrowser.lng = position.coords.longitude;
  zoom = zoom;
  CentreMap(coordsFromBrowser.lat, coordsFromBrowser.lng, zoom, map);

  // MapAnimation(coordsFromBrowser.lat,coordsFromBrowser.lng,zoom,map);
});

let layer_control = L.control.layers(controlerCarte, controlerMarqueurs, {
  collapsed: true,
  position: "topleft",
});
addOjectOnMap(layer_control, map);

/**
 * TODO MiniMap
 * TODO bouton de plein écran
 * TODO geocoder
 * TODO locate me
 * TODO bar personnalisé
 * TODO home
 * TODO impression
 */

//MiniMap
let miniMap = new L.Control.MiniMap(controlerCarteCopy.OpenStreetMap, {
  toggleDisplay: true,
});
addOjectOnMap(miniMap, map);
map.on("baselayerchange", function (e) {
  miniMap.changeLayer(controlerCarteCopy[e.name]);
});

// bouton de plein écran
let fsControl = new L.Control.FullScreen();
addOjectOnMap(fsControl, map);

// leaflet-control-geocoder
let geocoder = L.Control.geocoder();
addOjectOnMap(geocoder, map);

// locate me
let locate = L.control.locate();
addOjectOnMap(locate, map);

// bar
let bar = L.control.betterscale({
  position: "bottomleft",
  imperial: false,
  metric: true,
});
addOjectOnMap(bar, map);

// home
let home = L.control.defaultExtent();
addOjectOnMap(home, map);

//Print
let printer = L.easyPrint({
  title: "impression",
  sizeModes: ["Current", "A4Landscape", "A4Portrait"],
  filename: "Projet ISA",

  // exportOnly: true,
  hideControlContainer: true,
});
addOjectOnMap(printer, map);

/**
 * TODO legende 
 * TODO logoProjet
 * TODO logoUniversite
 * Todo echelle 
 */

// logoUniv
// let logoUniv = L.control({
//   position: 'bottomleft'
// });

// logoUniv.onAdd = function (map) {
//   let img = L.DomUtil.create('img');
//   img.src = "img/LogoUni.png";
//   img.style.width = "2em";
//   return img;
// };

// addOjectOnMap(logoUniv, map);
//logoProjet

let logoProjet = L.control({
  position: "bottomleft",
});

logoProjet.onAdd = function (map) {
  let img = L.DomUtil.create("img");
  img.src = "img/globe.gif";
  img.style.width = "3em";
  return img;
};
addOjectOnMap(logoProjet, map);

//coordonnées de la souris
map.on("mousemove", function (e) {
  let coordMouse = document.getElementsByClassName("coordinate")[0];
  let lat = parseFloat(e.latlng.lat).toFixed(4);
  let lng = parseFloat(e.latlng.lng).toFixed(4);
  coordMouse.innerHTML = "lat: " + lat + " lng: " + lng;
});

/**
 *  TODO Machine routine
 */
// fonction de traçage route
function fct_route() {
  let geoPlan = L.Routing.Plan.extend({
    // creation d'objet

    createGeocoders: function () {
      let container = L.Routing.Plan.prototype.createGeocoders.call(this);
      return container;
    },
  });

  // creation de l'objet de plan de routing

  let plan = new geoPlan(
      [],
      {
        createMarker: function (i, wp, nWps) {
          let depart = markColor("img/icon/marker-red.svg");
          let dest = markColor("img/icon/marker-green.svg");
          let intermediaire = markColor("img/icon/marker-inter.svg");

          if (i == 0) {
            return L.marker(wp.latLng, {
              icon: depart,
            });
          } else if (i == nWps - 1) {
            return L.marker(wp.latLng, {
              icon: dest,
            });
          } else if (0 < i < nWps - 1) {
            return L.marker(wp.latLng, {
              icon: intermediaire,
            });
          }
        },

        // géodecoge par défaut
        geocoder: new L.Control.Geocoder.Nominatim(),
        routeWhileDragging: true,
        reverseWaypoints: true,
      }
    ),
    // creation de l'objet de plan de routing depuis le fournisseur graphHopper

    graphRouting = L.Routing.control({
      waypoints: [],
      position: "topright",
      routeWhileDragging: true,
      showAlternatives: true,
      router: new L.Routing.osrmv1({
        language: "fr",
      }),

      plan: plan,
      show: true,
      collapsible: false,
      collapseBtn: function (itinerary) {
        let collapseBtn = L.DomUtil.create(
          "span",
          itinerary.options.collapseBtnClass
        );
        L.DomEvent.on(collapseBtn, "click", itinerary._toggle, itinerary);
        itinerary._container.insertBefore(
          collapseBtn,
          itinerary._container.firstChild
        );
      },

      // styles

      altLineOptions: {
        styles: [
          {
            color: "black",
            opacity: 0.15,
            weight: 9,
          },
          {
            color: "white",
            opacity: 0.8,
            weight: 6,
          },
          {
            color: "blue",
            opacity: 0.5,
            weight: 2,
          },
        ],
      },
    });

  map.addControl(graphRouting);

  function getCoordonnee(e) {
    function createButton(label, container) {
      let btn = L.DomUtil.create("button", "", container);
      btn.setAttribute("type", "button");
      btn.innerHTML = label;
      btn.title = "Trouve l'itinéraire";
      return btn;
    };

    let container = L.DomUtil.create("div"),
      startBtn = createButton("Depart", container),
      destBtn = createButton("Arrivée", container);
    L.DomEvent.on(startBtn, "click", function () {
      graphRouting.spliceWaypoints(0, 1, e.latlng);
      map.closePopup();
    });

    L.DomEvent.on(destBtn, "click", function () {
      graphRouting.spliceWaypoints(
        graphRouting.getWaypoints().length - 1,
        1,
        e.latlng
      );
      map.closePopup();
    });

    L.popup()
      .setContent(container)
      .setLatLng(e.latlng)
      .openOn(map);
  }

  map.on("click", getCoordonnee);
}

export { fct_route };
document.querySelector("#routing_osm").addEventListener("click", fct_route);
