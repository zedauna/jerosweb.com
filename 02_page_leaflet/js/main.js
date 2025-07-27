import {
  map,
  icoRed,
  icoGreen,
  icoBlue,
  icoOrange,
  icoPurple,
  icoYellow,
} from "./app.js";

import {
  markColor,
  addOjectOnMap,
  CentreMap,
  createMap,
  createCircle,
  MapAnimation,
} from "./map.js";

//calcul annee_experience
const d = new Date();
let year = d.getFullYear();
// document.querySelector(".annee_experience").textContent = year - 2019;
document.querySelector(".year").textContent = year;

// instance de Notyf
var notyf = new Notyf({
  duration: 3000,
  position: {
    x: "right",
    y: "top",
  },
  types: [
    {
      type: "warning",
      background: "orange",
      icon: {
        className: "material-icons",
        tagName: "i",
        text: "warning",
      },
    },
  ],
});

/**

 * 

 * @param {*} evt 

 */

var positions = [];
var apiUrl = "https://wxs.ign.fr/choisirgeoportail/itineraire/rest/route.json";
var layer_routing = "";
var layer_buffer = "";

//gestion des markers (ajouter et supprimer par leur _leaflet_id)

var markerGroup = L.layerGroup();
addOjectOnMap(markerGroup, map);
var layerIds = [];
var layer_geocodeIds = [];
var layer_geodecodeIds = [];

/**
 * todo Arrondir à N chiffres
 * @param {*} nombre
 * @param {*} precision
 * @returns
 */

function roundDecimal(nombre, precision) {
  var precision = precision || 2;
  var tmp = Math.pow(10, precision);
  return Math.round(nombre * tmp) / tmp;
}

/**
 *TODO récuperation des coordonnées par clique sur la carte
 * @param {*} e
 */
function onMapClick(e) {
  positions.push({
    lat: e.latlng.lat,
    lng: e.latlng.lng,
  });

  var marker = L.marker({
    lat: e.latlng.lat,
    lng: e.latlng.lng,
  }).addTo(map);
  notyf.success("Position prise en compte!");
}

map.on("click", onMapClick);

/**
 * TODO affichage des points
 * @param {*} positions
 */
function affichage_points() {
  var p = 0;
  document.querySelector("#points").innerHTML = "";
  positions.forEach(function (position) {
    p += 1;
    var tepoints = ` Points n° ${p}:  Lng : ${position.lng}  et  Lat : ${position.lat}`;
    var tpoin = document.createTextNode(tepoints);
    let li = document.createElement("li");
    li.appendChild(tpoin);
    document.querySelector("#points").appendChild(li);
  });

  document.querySelector("#info_reset").classList.remove("btn-primary");
  document.querySelector("#info_reset").classList.add("btn-danger");
  document.querySelector("#afficher_positions").classList.remove("btn-primary");
  document
    .querySelector("#afficher_positions")
    .classList.add("btn-outline-success");
}

document
  .querySelector("#afficher_positions")
  .addEventListener("click", affichage_points);

/**
 * TODO Style des markers
 */
function product_style() {
  var indexMax = positions.length - 1;
  const depart = L.marker([positions[0].lat, positions[0].lng], {
    icon: icoRed,
  }).bindPopup("<center>Depart !</center>");
  addOjectOnMap(depart, map);

  const arrive = L.marker([positions[indexMax].lat, positions[indexMax].lng], {
    icon: icoGreen,
  }).bindPopup("<center>Arrivée !</center>");

  addOjectOnMap(arrive, map);

  if (positions.length > 2) {
    for (var i = 1; i < indexMax; i++) {
      const intermediaire = L.marker([positions[i].lat, positions[i].lng], {
        icon: icoOrange,
      }).bindPopup(`<center>position : ${i}</center>`);
      addOjectOnMap(intermediaire, map);
    }
  }
}

/**
 * Todo message de warning
 */
function message_positions() {
  if (positions.length == 0) {
    notyf.error("Aucune position prise en compte");
    notyf.open({
      type: "warning",
      message: "Recommencer, Merci!",
      duration: 4000,
    });
  }
}

/**
 * TODO calcul des distances
 * @param {*} positions
 */

function distance_routing() {
  affichage_points();
  var indexMax = positions.length - 1;
  if (positions.length == 0) {
    notyf.error("Aucune position prise en compte");
    notyf.open({
      type: "warning",
      message: "Recommencer, Merci!",
      duration: 4000,
    });
    document.querySelector("#info_reset").classList.add("btn-primary");
    document.querySelector("#info_reset").classList.remove("btn-danger");
    document.querySelector("#afficher_positions").classList.add("btn-primary");
    document
      .querySelector("#afficher_positions")
      .classList.remove("btn-outline-success");
  } else if (positions.length > 1 && positions.length < 3) {
    product_style();

    /**
     * todo calcul de la distance cote client avec turf.js
     */
    var from = turf.point([
      parseFloat(positions[0].lng),
      parseFloat(positions[0].lat),
    ]);
    var to = turf.point([positions[indexMax].lng, positions[indexMax].lat]);
    var options = {
      units: "kilometers",
    };

    var distance_rhumb = turf.rhumbDistance(from, to, options);
    document.querySelector("#turf").value = `${roundDecimal(
      distance_rhumb
    )} KM`;

    /**
     * todo calcul de la distance cote client avec geolib.js
     */
    var start = {
      longitude: positions[0].lng,
      latitude: positions[0].lat,
    };

    var end = {
      longitude: positions[indexMax].lng,
      latitude: positions[indexMax].lat,
    };

    var distance_geolib = window.geolib.getDistance(start, end) / 1000;
    document.querySelector("#geolib").value = `${distance_geolib} KM`;
    document.querySelector("#remove_distance").classList.remove("btn-primary");
    document.querySelector("#remove_distance").classList.add("btn-dark");
  } else {
    // alert('Au plus deux points , Merci !');
    notyf.open({
      type: "warning",
      message: "Il faut 2 positions ! Merci",
      duration: 2000,
    });
  }
}

document
  .querySelector("#calcul_distance")
  .addEventListener("click", distance_routing);

/**
 * TODO effacer les distances
 */
document.querySelector("#remove_distance").addEventListener("click", () => {
  document.querySelector("#turf").value = "";
  document.querySelector("#geolib").value = "";
  document.querySelector("#remove_distance").classList.add("btn-primary");
  document.querySelector("#remove_distance").classList.remove("btn-dark");
});

/**
 * TODO cacul le centre des points
 * @param {*} positions
 */
function centre_routing() {
  affichage_points();
  var pos = positions.slice(-2);
  var indexMax = pos.length - 1;

  if (positions.length == 0) {
    notyf.error("Aucune position prise en compte");
    notyf.open({
      type: "warning",
      message: "Recommencer, Merci!",
      duration: 4000,
    });
    document.querySelector("#info_reset").classList.add("btn-primary");
    document.querySelector("#info_reset").classList.remove("btn-danger");
    document.querySelector("#afficher_positions").classList.add("btn-primary");
    document
      .querySelector("#afficher_positions")
      .classList.remove("btn-outline-success");
  } else if (positions.length > 1 && positions.length < 3) {
    product_style();
    /**
     * todo calcul le centre des points cote client avec geolib.js
     */

    var start = {
      longitude: positions[0].lng,
      latitude: positions[0].lat,
    };

    var end = {
      longitude: positions[indexMax].lng,
      latitude: positions[indexMax].lat,
    };

    var distance_center = window.geolib.getCenter([start, end]);
    document.querySelector(
      "#lat_centre_geolib"
    ).value = `Lat : ${distance_center.latitude}`;
    document.querySelector(
      "#lng_centre_geolib"
    ).value = `Lng:  ${distance_center.longitude}`;

    const centre_dist = L.marker(
      [distance_center.latitude, distance_center.longitude],
      {
        icon: icoYellow,
      }
    ).bindPopup("<center>Centre Calculé !</center>");

    addOjectOnMap(centre_dist, map);

    document.querySelector("#remove_centre").classList.remove("btn-primary");
    document.querySelector("#remove_centre").classList.add("btn-dark");
  } else {
    // alert('Au plus deux points , Merci !');
    notyf.open({
      type: "warning",
      message: "Il faut 2 positions !",
      duration: 2000,
    });
  }
}

document
  .querySelector("#calcul_centre")
  .addEventListener("click", centre_routing);

/**
 * TODO effacer le centre
 */
document.querySelector("#remove_centre").addEventListener("click", () => {
  document.querySelector("#lat_centre_geolib").value = "";
  document.querySelector("#lng_centre_geolib").value = "";
  document.querySelector("#remove_centre").classList.add("btn-primary");
  document.querySelector("#remove_centre").classList.remove("btn-dark");
});

/**
 * TODO Production de buffer
 */
function buffer_turf(pt, options, r) {
  if (positions.length > 0) {
    message_positions();
    var buffered = turf.buffer(pt, r, options);
    var layer_buffer = L.geoJSON(buffered);
    layerIds.push(layer_buffer._leaflet_id);

    // console.log(layerIds);
    markerGroup.addLayer(layer_buffer);
    document.querySelector("#r_buffer").value = `${r} KM`;
    document.querySelector("#remove_buffer").classList.remove("btn-primary");
    document.querySelector("#remove_buffer").classList.add("btn-dark");
  } else {
    document.querySelector("#info_reset").classList.add("btn-primary");
    document.querySelector("#info_reset").classList.remove("btn-danger");
    document.querySelector("#afficher_positions").classList.add("btn-primary");
    document
      .querySelector("#afficher_positions")
      .classList.remove("btn-outline-success");
  }
}

/**
 * TODO buffer sur leaflet avec turf
 */
function buffer_routing() {
  if (positions.length > 0) {
    message_positions();
    affichage_points();
    var r = document.querySelector("#r_buffer").value;
    var indexMax = positions.length - 1;
    if (r == "") {
      r = 10;
      var pt = turf.point([
        parseFloat(positions[indexMax].lng),
        parseFloat(positions[indexMax].lat),
      ]);
      var options = {
        units: "kilometers",
      };
      buffer_turf(pt, options, r);
    } else {
      if (!r.match(/[+-]?([0-9]*[.])?[0-9]+/)) {
        // alert(" Type numérique ou decimal ! Merci...😊");
        notyf.error(" Type numérique ou decimal ! Merci...😊");
        notyf.open({
          type: "warning",
          message: "Recommencer, Merci!",
          duration: 4000,
        });
      } else {
        var pt = turf.point([
          parseFloat(positions[indexMax].lng),
          parseFloat(positions[indexMax].lat),
        ]);
        var options = {
          units: "kilometers",
        };
        buffer_turf(pt, options, r);
      }
    }
  } else {
    notyf.error("Aucune position prise en compte");
    notyf.open({
      type: "warning",
      message: "Recommencer, Merci!",
      duration: 4000,
    });
    document.querySelector("#info_reset").classList.add("btn-primary");
    document.querySelector("#info_reset").classList.remove("btn-danger");
    document.querySelector("#afficher_positions").classList.add("btn-primary");
    document
      .querySelector("#afficher_positions")
      .classList.remove("btn-outline-success");
  }
}

document
  .querySelector("#calcul_buffer")
  .addEventListener("click", buffer_routing);

/**
 * TODO effacer le buffer
 */
function effacer_buffer() {
  // alert(`buffer de rayon :${document.querySelector('#r_buffer').value} effacé avec succès, Merci. !`);
  if (document.querySelector("#r_buffer").value != "") {
    notyf.success(
      `buffer de rayon :${
        document.querySelector("#r_buffer").value
      } effacé avec succès, Merci. !`
    );
  }

  layerIds.forEach(function (id) {
    markerGroup.removeLayer(id);
  });

  layerIds = [];
  document.querySelector("#r_buffer").value = "";
  document.querySelector("#points").innerHTML = "";
  document.querySelector("#remove_buffer").classList.add("btn-primary");
  document.querySelector("#remove_buffer").classList.remove("btn-dark");
}
document
  .querySelector("#remove_buffer")
  .addEventListener("click", effacer_buffer);

/**
 * TODO chargement des fichiers depuis geoportail
 */
function routing_geoportail() {
  if (positions.length > 0) {
    message_positions();
    affichage_points();
    product_style();
  } else {
    document.querySelector("#info_reset").classList.add("btn-primary");
    document.querySelector("#info_reset").classList.remove("btn-danger");
    document.querySelector("#afficher_positions").classList.add("btn-primary");
    document
      .querySelector("#afficher_positions")
      .classList.remove("btn-outline-success");
  }
  if (positions.length > 1) {
    notyf.success("Connexion : geoportail.gouv.fr ");
    var indexMax = positions.length - 1;
    var origin = `${positions[0].lng},${positions[0].lat}`;
    var destination = `${positions[indexMax].lng},${positions[indexMax].lat}`;
    var waypoints = "";
    if (positions.length > 2) {
      for (var i = 1; i < indexMax; i++) {
        waypoints += `${positions[i].lng},${positions[i].lat};`;
      }
    }
    var url = `${apiUrl}?origin=${origin}&destination=${destination}`;

    if (waypoints !== "") {
      url += `&waypoints=${waypoints}`;
    }

    /**
     * TODO Chargement de la couche json depuis l'url par methode fetch
     */
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var wkt = data["geometryWkt"];
        /**
         * TODO 2eme technique pour tracer l'itineaire sur la carte
         */
        var geojson = omnivore.wkt.parse(wkt);
        layer_routing = L.featureGroup([geojson]);
        addOjectOnMap(layer_routing, map);
        /**
         *todo aficher de la distance et de la duréé
         */
        document.querySelector("#distance_geoportail").value = data["distance"];
        document.querySelector("#duration_geoportail").value = data["duration"];
        document
          .querySelector("#remove_geoportail")
          .classList.remove("btn-primary");
        document.querySelector("#remove_geoportail").classList.add("btn-dark");
      });
  } else {
    notyf.error("Au moins deux positions !");
    notyf.open({
      type: "warning",
      message: "Recommencer, Merci!",
      duration: 4000,
    });
  }
}

document
  .querySelector("#routing_geoportail")
  .addEventListener("click", routing_geoportail);

/**
 * TODO effacer le routing geoportail
 */
document.querySelector("#remove_geoportail").addEventListener("click", () => {
  document.querySelector("#distance_geoportail").value = "";
  document.querySelector("#duration_geoportail").value = "";
  document.querySelector("#remove_geoportail").classList.add("btn-primary");
  document.querySelector("#remove_geoportail").classList.remove("btn-dark");
});

/**
 * TODO afficher et masque l'itinéraire selon l'opacité
 */
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("#itineraire_cache")
    .addEventListener("click", function () {
      let state = this.checked;
      if (state == true) {
        layer_routing.setStyle({
          opacity: 1,
        });
      } else {
        layer_routing.setStyle({
          opacity: 0,
        });
      }
    });
});

//Recharger la page

document.querySelector("#info_reset").addEventListener("click", function () {
  positions = [];
  document.querySelector("#points").innerHTML = "";
  document.querySelector("#geolib").value = "";
  document.querySelector("#turf").value = "";
  document.querySelector("#lat_centre_geolib").value = "";
  document.querySelector("#lng_centre_geolib").value = "";
  document.querySelector("#lat_centre_geolib").value = "";
  document.querySelector("#lng_centre_geolib").value = "";
  document.querySelector("#r_buffer").value = "";
  document.querySelector("#distance_geoportail").value = "";
  document.querySelector("#duration_geoportail").value = "";
  document.querySelector("#info_reset").classList.add("btn-primary");
  document.querySelector("#info_reset").classList.remove("btn-danger");
  document.querySelector("#ChargerData").classList.add("btn-primary");
  document.querySelector("#ChargerData").classList.remove("btn-success");
  document.querySelector("#afficher_positions").classList.add("btn-primary");
  document
    .querySelector("#afficher_positions")
    .classList.remove("btn-outline-success");
  markerGroup.clearLayers();
  notyf.dismissAll();
  window.location.reload(true);
});

/**
 * TODO réogranisation ou positionnement
 */
// rendre les boxes interactifs
interact(".item")
  // Faire glisser des éléments
  .draggable({
    onmove: function onMove(evt) {
      const target = evt.target;

      // Déterminez les coordonnées x et y initiales de notre élément avec les attributs
      const dataX = target.getAttribute("data-x");
      const dataY = target.getAttribute("data-y");

      // convertir en nombres à partir de chaînes avec parseFloat().
      const initialX = parseFloat(dataX) || 0;
      const initialY = parseFloat(dataY) || 0;

      // delta (ou la différence) entre les coordonnées initiales et
      // l'endroit où se trouve maintenant la souris avec les valeurs dxet dy
      const deltaX = evt.dx;
      const deltaY = evt.dy;

      // Ajoutez les valeurs initiales à la distance parcourue pour obtenir la nouvelle position de x et y.
      const newX = initialX + deltaX;
      const newY = initialY + deltaY;

      // nouvelles positions avec la transformpropriété CSS
      target.style.transform = `translate(${newX}px, ${newY}px)`;

      // Mettez à jour les attributs de données data-xet data-yvers cette nouvelle position
      target.setAttribute("data-x", newX);
      target.setAttribute("data-y", newY);
    },

    // controle de vitesse de deplacement
    inertia: true,
    restrict: {
      restriction: "parent",
    },
  });

interact(".dropzone").dropzone({
  accept: ".item",
  overlap: 0.75,

  // l'élément est en train d'être glissé. Utiliser la classe.dragging
  ondropactivate: function (event) {
    const item = event.relatedTarget;
    item.classList.add("dragging");
  },

  // L'élément n'est plus glissé. Supprimer la classe.dragging
  ondropdeactivate: function (event) {
    const item = event.relatedTarget;
    item.classList.remove("dragging", "cannot-drop");
  },

  // L'item est considéré comme étant dans la dropzone. Ajouter la classe.can-drop
  ondragenter: function (event) {
    const item = event.relatedTarget;
    item.classList.remove("cannot-drop");
    item.classList.add("can-drop");
  },

  // L'élément est déplacé hors de la zone de dépôt. Ajouter la classe.cannot-drop
  ondragleave: function (event) {
    const item = event.relatedTarget;
    item.classList.remove("can-drop");
    item.classList.add("cannot-drop");
  },
});

/**
 * TODO reposition la carte selon les recherches
 */
var position_map = (lat, lng, icon, message, layer, zoom) => {
  var pop = `<h5>[${lat} , ${lng}]</h5>`;
  pop = pop + `<h5> Source : ${message}</h5>`;

  var marker = L.marker([lat, lng], {
    icon: icon,
    CustomId: id,
  })
    .bindPopup(`${pop}`)
    .openPopup();
  // console.log(marker);
  layer.push(marker);
  markerGroup.addLayer(marker);
  MapAnimation(lat, lng, zoom, map);
};

/**
 * TODO ETL sur l'adresse
 * @param {*} adresse
 * @returns
 */
function etl_adresse(adresse) {
  let boucle = true;
  let adresse_modif = adresse;
  do {
    adresse_modif = adresse_modif.replace(" ", "+");
    if (adresse_modif.indexOf(" ") == -1) {
      boucle = false;
      return adresse_modif;
    }
  } while (boucle);
}

/**
 * TODO Géocodage
 */
async function geoCode(adresse) {
  let state = document.querySelector("#choice_param_1").checked;
  let zoom = 18;
  if (state == true) {
    // pour url2
    notyf.success("Connexion : data.gouv.fr");
    notyf.open({
      type: "warning",
      message: "Uniquement la FRANCE",
      duration: 4000,
    });

    var adresse_modif = etl_adresse(adresse);
    let url2 = `https://api-adresse.data.gouv.fr/search/?q=${adresse_modif}`;
    let resp = await fetch(url2);
    let datas = await resp.json();
    let coord = datas.features[0].geometry.coordinates;
    if (coord.length > 0) {
      let lat = parseFloat(coord[1]).toFixed(4);
      let lng = parseFloat(coord[0]).toFixed(4);
      document.querySelector("#lat_geocodage").value = lat;
      document.querySelector("#lng_geocodage").value = lng;
      if (document.querySelector("#position_map_1").checked == true) {
        var message = "data.gouv.fr";
        position_map(lat, lng, icoBlue, message, layer_geocodeIds, zoom);
      }
    } else {
      document.querySelector("#lat_geocodage").value = "Non trouvé";
      document.querySelector("#lng_geocodage").value = "Non trouvé";
    }
  } else {
    // pour url1
    notyf.success("Connexion : ORSM");
    let url1 = `https://nominatim.openstreetmap.org/search/?format=json&q=${adresse}`;
    let resp = await fetch(url1);
    let datas = await resp.json();
    if (datas.length > 0) {
      let lat = parseFloat(datas[0].lat).toFixed(4);
      let lng = parseFloat(datas[0].lon).toFixed(4);
      document.querySelector("#lat_geocodage").value = lat;
      document.querySelector("#lng_geocodage").value = lng;
      if (document.querySelector("#position_map_1").checked == true) {
        var message = "ORSM";
        position_map(lat, lng, icoOrange, message, layer_geocodeIds, zoom);
      }
    } else {
      document.querySelector("#lat_geocodage").value = "Non trouvé";
      document.querySelector("#lng_geocodage").value = "Non trouvé";
    }
  }
}

document
  .querySelector("#calcul_geocodage_adresse")
  .addEventListener("click", () => {
    var adresse = document.querySelector("#geocodage_adresse").value;
    if (adresse != "") {
      document
        .querySelector("#calcul_geocodage_adresse")
        .classList.remove("btn-primary");
      document
        .querySelector("#calcul_geocodage_adresse")
        .classList.add("btn-success");
      document
        .querySelector("#effacer_geocodage_adresse")
        .classList.remove("btn-primary");
      document
        .querySelector("#effacer_geocodage_adresse")
        .classList.add("btn-dark");
      geoCode(adresse);
    } else {
      notyf.error("Champ adresse vide");
      notyf.open({
        type: "warning",
        message: "Recommencer, Merci!",
        duration: 4000,
      });
    }
  });

/**
 * TODO Géodécodage
 */
async function geoDecode(lat, lng) {
  document.querySelector("#geodecodage_adresse").value = " patientez... ";
  let zoom = 18;

  let state = document.querySelector("#choice_param_2").checked;
  if (state == true) {
    // pour url2
    notyf.success("Connexion : data.gouv.fr");
    notyf.open({
      type: "warning",
      message: "Uniquement la FRANCE",
      duration: 4000,
    });

    let url2 = `https://api-adresse.data.gouv.fr/reverse/?lat=${lat}&lon=${lng}`; // que de la france
    let resp = await fetch(url2);
    let datas = await resp.json();
    if (datas.features.length > 0) {
      document.querySelector("#geodecodage_adresse").value =
        datas.features[0].properties.label;
      if (document.querySelector("#position_map_2").checked == true) {
        var message = "data.gouv.fr";
        position_map(lat, lng, icoBlue, message, layer_geodecodeIds, zoom);
      }
    } else {
      document.querySelector("#geodecodage_adresse").value = "Non trouvé";
    }
  } else {
    // pour url1
    notyf.success("Connexion : ORSM");
    let url1 = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`; // le monde avec quelles erreurs
    let resp = await fetch(url1);
    let datas = await resp.json();
    if (datas.display_name.length > 0) {
      document.querySelector("#geodecodage_adresse").value = datas.display_name;
      if (document.querySelector("#position_map_2").checked == true) {
        var message = "ORSM";
        position_map(lat, lng, icoOrange, message, layer_geodecodeIds, zoom);
      }
    } else {
      document.querySelector("#geodecodage_adresse").value = "Non trouvé";
    }
  }
}

document.querySelector("#calcul_geodecodage").addEventListener("click", () => {
  var lat = document.querySelector("#lat_geodecodage").value;
  var lng = document.querySelector("#lng_geodecodage").value;
  if (lat.length > 0 && lng.length > 0) {
    if (
      !lat.match(/[+-]?([0-9]*[.])?[0-9]+/) &&
      !lng.match(/[+-]?([0-9]*[.])?[0-9]+/)
    ) {
      notyf.error("Champs Latitude et longitude ne sont pas numériques");
      notyf.open({
        type: "warning",
        message: "Recommencer, Merci!",
        duration: 4000,
      });
    } else {
      lat = parseFloat(lat);
      lng = parseFloat(lng);
      document
        .querySelector("#calcul_geodecodage")
        .classList.remove("btn-primary");
      document
        .querySelector("#calcul_geodecodage")
        .classList.add("btn-success");
      document
        .querySelector("#effacer_geodecodage")
        .classList.remove("btn-primary");
      document.querySelector("#effacer_geodecodage").classList.add("btn-dark");
      geoDecode(lat, lng);
    }
  } else {
    notyf.error("Champs latitude et longitude sont vides");
    notyf.open({
      type: "warning",
      message: "Recommencer, Merci!",
      duration: 4000,
    });
  }
});

/**
 * TODO effacer
 */
function effacer_1() {
  document.querySelector("#lat_geocodage").value = "";
  document.querySelector("#lng_geocodage").value = "";
  document.querySelector("#geocodage_adresse").value = "";
  document
    .querySelector("#calcul_geocodage_adresse")
    .classList.add("btn-primary");
  document
    .querySelector("#calcul_geocodage_adresse")
    .classList.remove("btn-success");
  document
    .querySelector("#effacer_geocodage_adresse")
    .classList.add("btn-primary");
  document
    .querySelector("#effacer_geocodage_adresse")
    .classList.remove("btn-dark");
  layer_geocodeIds.forEach(function (marker) {
    markerGroup.removeLayer(marker);
  });

  layer_geocodeIds = [];
  let lat = 46.227638;
  let lng = 2.213749;
  let zoom = 6;
  MapAnimation(lat, lng, zoom, map);
}

document
  .querySelector("#effacer_geocodage_adresse")
  .addEventListener("click", effacer_1);

/**
 * TODO effacer
 */
function effacer_2() {
  document.querySelector("#lat_geodecodage").value = "";
  document.querySelector("#lng_geodecodage").value = "";
  document.querySelector("#geodecodage_adresse").value = "Adresse";
  document.querySelector("#calcul_geodecodage").classList.add("btn-primary");
  document.querySelector("#calcul_geodecodage").classList.remove("btn-success");
  document.querySelector("#effacer_geodecodage").classList.add("btn-primary");
  document.querySelector("#effacer_geodecodage").classList.remove("btn-dark");

  layer_geodecodeIds.forEach(function (marker) {
    markerGroup.removeLayer(marker);
  });

  layer_geodecodeIds = [];

  let lat = 46.227638;
  let lng = 2.213749;
  let zoom = 6;
  MapAnimation(lat, lng, zoom, map);
}

document
  .querySelector("#effacer_geodecodage")
  .addEventListener("click", effacer_2);

/**
 * TODO Réoganisation
 */
document.querySelector("#reog").addEventListener("click", () => {
  var test_class = document.querySelector("#reog").className;
  test_class = test_class.replace("btn btn-primary mb-3 mt-3 ", "");

  if (test_class != "reog") {
    var dropzone = document.querySelector(".dropzone");
    var item = dropzone.querySelectorAll(".item_off");
    document.querySelector("#reog").className += " reog";
    item.forEach(function (item) {
      item.classList.remove("item_off");
      item.className += " item";
    });
    notyf.success("Vous pouvez réorganiser les boites de fonctionnalités");
  } else {
    var dropzone = document.querySelector(".dropzone");
    var item = dropzone.querySelectorAll(".item");
    document.querySelector("#reog").classList.remove("reog");
    item.forEach(function (item) {
      item.classList.remove("item");
      item.className += " item_off";
    });
    notyf.success("Fonction de réorganisation désactivée !");
  }
});

/**
 * TODO activation et desactivation des fonctionnalités
 * @param {*} btn_ctrl
 * @param {*} active_btn
 */
function ctrl_btn(btn_ctrl, active_btn) {
  document.querySelector(btn_ctrl).addEventListener("click", (e) => {
    if (document.querySelector(btn_ctrl).className != "btn btn-success") {
      document.querySelector(btn_ctrl).classList.remove("btn-outline-success");
      document.querySelector(btn_ctrl).classList.add("btn-success");
      // document.querySelector("#map").style.width="100%";
      notyf.success("Fonctionnalité activée !");
    } else {
      document.querySelector(btn_ctrl).classList.remove("btn-success");
      document.querySelector(btn_ctrl).classList.add("btn-outline-success");
      // document.querySelector("#map").style.width="70%";
      notyf.error("Fonctionnalité désactivée !");
    }

    var active = document
      .querySelector(active_btn)
      .classList.contains("on_btn");
    document.querySelector(active_btn).classList.toggle("on_btn");

    Velocity(
      document.querySelector(active_btn),
      active ? "fadeIn" : "fadeOut",
      {
        duration: 1200,
      }
    );
    e.preventDefault();
  });
}

ctrl_btn("#btn_distance", "#active_distance");
ctrl_btn("#btn_centre", "#active_centre");
ctrl_btn("#btn_buffer", "#active_buffer");
ctrl_btn("#btn_routing", "#active_routing");
ctrl_btn("#btn_geo", "#active_geo");

/**
   * Todo volet Horizontal && volet vertical
   */
(function(){
  let btn_ctrl=document.querySelector("#btn_lateral_hz");
  btn_ctrl.addEventListener("click", (e) =>{
      if (btn_ctrl.className != "btn btn-success") {
        btn_ctrl.classList.remove("btn-outline-success");
        btn_ctrl.classList.add("btn-success");
        document.querySelector("#barreHoz").style.transform= "translateX(" + (830) + "px)";
        notyf.success("Fonctionnalité activée !");
      } else {
        btn_ctrl.classList.remove("btn-success");
        btn_ctrl.classList.add("btn-outline-success");
        document.querySelector("#barreHoz").style.transform= "translateX(" + (0) + "px)";
        notyf.error("Fonctionnalité désactivée !");
      }
    e.preventDefault();
  });
})();

/**
 * TODO Gestion des animations : effet de neige
 * @param {*} pos
 */
// Get temperature by api : api.openweathermap.org
function loadUrlTemperature(pos) {
  let lat = pos.coords.latitude;
  let long = pos.coords.longitude;
  let url = `${URL_MAIN}?lat=${lat}&lon=${long}&units=${UNITS}&APPID=${API_KEY}`;
  fetchApi(url);
}
// const CITY = document.getElementById("city");
// const TEMPERATURE = document.getElementById("temperature");
const URL_MAIN = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "8f57cb746c4c1d4b48b7f35eba6f6230";
const UNITS = "metric";
navigator.geolocation.getCurrentPosition(loadUrlTemperature);

async function fetchApi(url) {
  let response = await fetch(url);
  let { main, name } = await response.json();
  const get_temperature = main.temp.toFixed(1);
  // CITY.innerText = `${name}:`;
  // TEMPERATURE.innerText = `${get_temperature} ºC`;

  //console.log(get_temperature);
  var count_var = 50;
  var speed_var = 1;
  var stop_var = true;

  // condictionnalité avec les neiges
  if (get_temperature < 0) {
    count_var = 100;
    speed_var = 2;
  } else if (get_temperature < -5) {
    count_var = 150;
    speed_var = 3;
  } else if (get_temperature > 2) {
    {
      stop_var = true;
    }
  } else {
    count_var;
    speed_var;
    stop_var;
  }

  // Tomber la neige
  var snowflakes = new Snowflakes({
    color: "#5ECDEF",
    container: document.body,
    count: count_var,
    speed: speed_var,
    stop: stop_var,
    rotation: true,
    minOpacity: 0.1,
    maxOpacity: 0.95,
    minSize: 10,
    maxSize: 25,
    types: 6,
    width: undefined,
    height: undefined,
    wind: true,
    zIndex: 9999,
    autoResize: true,
  });
}
