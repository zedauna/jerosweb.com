//calcul annee_experience
const d = new Date();
let year = d.getFullYear();
// document.querySelector(".annee_experience").textContent = year - 2019;
document.querySelector(".year").textContent = year;

// instance de Notyf
const notyf = new Notyf({
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
 * todo buttons de navigation
 */
var btns = () => {
  const svg = document.querySelector("#carte");
  // console.log(svg.style.transform);

  const getTransformParameters = (element) => {
    const transform = element.style.transform;
    let scale = 1,
      x = 0,
      y = 0;

    if (transform.includes("scale"))
      scale = parseFloat(transform.slice(transform.indexOf("scale") + 6));
    if (transform.includes("translateX"))
      x = parseInt(transform.slice(transform.indexOf("translateX") + 11));
    if (transform.includes("translateY"))
      y = parseInt(transform.slice(transform.indexOf("translateY") + 11));

    return {
      scale,
      x,
      y,
    };
  };

  const getTransformString = (scale, x, y) =>
    "scale(" + scale + ") " + "translateX(" + x + "%) translateY(" + y + "%)";

  const pan = (direction) => {
    const { scale, x, y } = getTransformParameters(svg);
    let dx = 0,
      dy = 0;
    switch (direction) {
      case "left":
        dx = -3;
        break;
      case "right":
        dx = 3;
        break;
      case "up":
        dy = -3;
        break;
      case "down":
        dy = 3;
        break;
    }
    svg.style.transform = getTransformString(scale, x + dx, y + dy);
  };

  const zoom = (direction) => {
    const { scale, x, y } = getTransformParameters(svg);
    let dScale = 0.1;
    if (direction == "out") dScale *= -1;
    if (scale == 0.1 && direction == "out") dScale = 0;
    svg.style.transform = getTransformString(scale + dScale, x, y);
  };

  // document.querySelector("left-button").onclick = () => pan("left");
  document.querySelector("#right-button").onclick = () => pan("right");
  document.querySelector("#up-button").onclick = () => pan("up");
  document.querySelector("#down-button").onclick = () => pan("down");
  document.querySelector("#left-button").addEventListener("click", () => {
    pan("left");
  });

  document.querySelector("#zoom-in-button").onclick = () => zoom("in");
  document.querySelector("#zoom-out-button").onclick = () => zoom("out");

  /**
   * Todo zoom svg souris
   */
  var point = svg.createSVGPoint();
  var viewBox = svg.viewBox.baseVal;

  var cachedViewBox = {
    x: viewBox.x,
    y: viewBox.y,
    width: viewBox.width,
    height: viewBox.height,
  };
  const canvas = document.querySelector(".loader_content");
  canvas.addEventListener("dblclick", onClick);

  function onClick(event) {
    event.preventDefault();

    canvas.removeEventListener("dblclick", onClick);
    canvas.addEventListener("dblclick", resetView);

    //   var normalized;
    //   var delta = event.wheelDelta;

    //   if (delta) {
    //     normalized = (delta % 120) == 0 ? delta / 120 : delta / 12;
    //   } else {
    //     delta = event.deltaY || event.detail || 0;
    //     normalized = -(delta % 3 ? delta * 10 : delta / 3);
    //   }

    // var scaleFactor = 1.6;
    var scaleFactor = 3;
    //   var scaleDelta = normalized > 0 ? 1 / scaleFactor : scaleFactor;
    var scaleDelta = 1 / scaleFactor;

    point.x = event.clientX;
    point.y = event.clientY;

    var startPoint = point.matrixTransform(svg.getScreenCTM().inverse());

    var fromVars = {
      x: viewBox.x,
      y: viewBox.y,
      width: viewBox.width,
      height: viewBox.height,
      ease: Power2.easeOut,
    };

    viewBox.x -= (startPoint.x - viewBox.x) * (scaleDelta - 1);
    viewBox.y -= (startPoint.y - viewBox.y) * (scaleDelta - 1);
    viewBox.width *= scaleDelta;
    viewBox.height *= scaleDelta;

    TweenLite.from(viewBox, 0.5, fromVars);
  }

  function resetView() {
    // window.removeEventListener("click", resetView);
    // window.addEventListener("click", onClick);

    TweenLite.to(viewBox, 0.4, {
      x: cachedViewBox.x,
      y: cachedViewBox.y,
      width: cachedViewBox.width,
      height: cachedViewBox.height,
      onComplete: function () {
        canvas.removeEventListener("dblclick", resetView);
        canvas.addEventListener("dblclick", onClick);
      },
    });
  }
};

/**
 * TODO gestion des fonds de cartes SVG
 * @param {*} url
 * @returns
 */
async function chargerDonnees(url) {
  var resp = await fetch(url);
  var response = await resp.text();
  return response;
}

window.addEventListener("load", () => {
  chargerDonnees("/01_page_svg/php/map_france.php").then(function (response) {
    document.querySelectorAll(".loader").className += " hidden";
    document.querySelector("#chargeCarte").innerHTML = response;
    btns();
  });
});

/**
 *
 * @param {*} evt
 */

var positions = [];
var tablo = [];
var tablo_dico = [];

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
 * TODO style sur le point de proximité
 * @param {*} lat
 * @param {*} lng
 */
function style_point(lat, lng, couleur = "green") {
  var map = document.querySelector("#map");
  var circles = map.querySelectorAll("circle");
  circles.forEach((circle) => {
    if (
      parseFloat(circle.getAttribute("lat")) == parseFloat(lat) &&
      parseFloat(circle.getAttribute("lng")) == parseFloat(lng)
    ) {
      circle.setAttribute("r", "1.5%");
      circle.setAttribute("fill", couleur);
      circle.setAttribute("class", "innerCircle");
    }
  });
}

/**
 * TODO Style des centroïds
 */
function product_style() {
  var indexMax = positions.length - 1;
  // style
  style_point(positions[0].lat, positions[0].lng, (couleur = "yellow"));
  style_point(
    positions[indexMax].lat,
    positions[indexMax].lng,
    (couleur = "RebeccaPurple")
  );

  if (positions.length > 2) {
    for (var i = 1; i < indexMax; i++) {
      style_point(positions[i].lat, positions[i].lng, (couleur = "red"));
    }
  }
}

/**
 * TODO recuperation des points
 * @param {*} evt
 */
function recup_routing(evt) {
  positions.push({
    lat: parseFloat(evt.target.getAttribute("lat")),
    lng: parseFloat(evt.target.getAttribute("lng")),
    nom: evt.target.getAttribute("nom"),
  });

  document.querySelector(
    "#dep_centroid_result"
  ).value = `Centre du département : ${evt.target.getAttribute("nom")}`;
  notyf.success("Position prise en compte!");
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
 * TODO affichage des points
 * @param {*} positions
 */
function affichage_points() {
  document.querySelector("#points").innerHTML = "";
  var p = 0;
  if (positions.length == 0) {
    notyf.error("Aucune position prise en compte");
    notyf.open({
      type: "warning",
      message: "Au moins une position! Merci.",
      duration: 4000,
    });
    document.querySelector("#info_reset").classList.add("btn-primary");
    document.querySelector("#info_reset").classList.remove("btn-danger");
    document.querySelector("#afficher_positions").classList.add("btn-primary");
    document
      .querySelector("#afficher_positions")
      .classList.remove("btn-outline-success");
  } else {
    positions.forEach(function (position) {
      p += 1;
      var tepoints = ` Points n° ${p}:  Lng : ${position.lng.toFixed(
        4
      )}  et  Lat : ${position.lat.toFixed(4)} : ✹ ${position.nom} ✹`;
      var tpoin = document.createTextNode(tepoints);
      let li = document.createElement("li");
      li.appendChild(tpoin);
      document.querySelector("#points").appendChild(li);
    });
    document.querySelector("#info_reset").classList.remove("btn-primary");
    document.querySelector("#info_reset").classList.add("btn-danger");
    document
      .querySelector("#afficher_positions")
      .classList.remove("btn-primary");
    document
      .querySelector("#afficher_positions")
      .classList.add("btn-outline-success");
  }
}
document
  .querySelector("#afficher_positions")
  .addEventListener("click", affichage_points);

/**
 * TODO calcul des distances
 * @param {*} positions
 */
function distance_routing() {
  affichage_points();
  if (positions.length > 0) {
    var indexMax = positions.length - 1;
    if (positions.length > 1 && positions.length < 3) {
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

      document.querySelector("#info_reset").classList.remove("btn-primary");
      document.querySelector("#info_reset").classList.add("btn-danger");
      document
        .querySelector("#remove_distance")
        .classList.remove("btn-primary");
      document.querySelector("#remove_distance").classList.add("btn-dark");
    } else {
      notyf.error("Au plus deux points , Merci !");
      notyf.open({
        type: "warning",
        message: "Il faut 2 positions !",
        duration: 2000,
      });
    }
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
  if (positions.length > 0) {
    var indexMax = positions.length - 1;

    if (positions.length > 1 && positions.length < 3) {
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
      // console.log(distance_center);
      document.querySelector(
        "#lat_centre_geolib"
      ).value = `Lat : ${distance_center.latitude}`;
      document.querySelector(
        "#lng_centre_geolib"
      ).value = `Lng:  ${distance_center.longitude}`;

      //positon sur la carte
      var point = {
        latitude: parseFloat(distance_center.latitude),
        longitude: parseFloat(distance_center.longitude),
      };
      recup_tablo_routing();
      var distance_proche = window.geolib.findNearest(point, tablo_dico);
      style_point(
        distance_proche.latitude,
        distance_proche.longitude,
        (couleur = "black")
      );

      document.querySelector("#info_reset").classList.remove("btn-primary");
      document.querySelector("#info_reset").classList.add("btn-danger");
      document.querySelector("#remove_centre").classList.remove("btn-primary");
      document.querySelector("#remove_centre").classList.add("btn-dark");
    } else {
      notyf.error("Au plus deux poitns !");
      notyf.open({
        type: "warning",
        message: "Il faut 2 positions !",
        duration: 2000,
      });
    }
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
 * TODO recuperation de toutes coordonnées des points
 */
function recup_tablo_routing() {
  var map = document.querySelector("#map");
  var circles = map.querySelectorAll("circle");

  circles.forEach(function (circle) {
    tablo.push([
      parseFloat(circle.getAttribute("lat")),
      parseFloat(circle.getAttribute("lng")),
    ]);
    tablo_dico.push({
      latitude: parseFloat(circle.getAttribute("lat")),
      longitude: parseFloat(circle.getAttribute("lng")),
    });
  });
}

/**
 * TODO recuperation la position géographique
 */
document.querySelector("#afficher_locate").addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((position) => {
    var r = window.confirm(
      `Votre position est : latitude  ${position.coords.latitude} et longitude ${position.coords.longitude}, Calculer votre proximité !`
    );
    if (r == true) {
      document.querySelector("#lat_geolib").value = position.coords.latitude;
      document.querySelector("#lng_geolib").value = position.coords.longitude;
      document
        .querySelector("#afficher_locate")
        .classList.remove("btn-primary");
      document.querySelector("#afficher_locate").classList.add("btn-success");
      document.querySelector("#info_reset").classList.remove("btn-primary");
      document.querySelector("#info_reset").classList.add("btn-danger");
    } else {
      notyf.success(" Pas de proximité ! Merci !");
    }
  });
});

/**
 * TODO calcul le point le plus proche
 * @param {*} tablo
 */
function proxi_routing() {
  var lat = document.querySelector("#lat_geolib").value;
  var lng = document.querySelector("#lng_geolib").value;

  if (lat != "" && lng != "") {
    if (
      !lat.match(/[+-]?([0-9]*[.])?[0-9]+/) &&
      !lng.match(/[+-]?([0-9]*[.])?[0-9]+/)
    ) {
      notyf.error(" Type numérique ou decimal ! Merci...🧐 !");
      document.querySelector("#lat_geolib").value = "";
      document.querySelector("#lng_geolib").value = "";
    } else {
      var point = {
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
      };
      recup_tablo_routing();
      var distance_proche = window.geolib.findNearest(point, tablo_dico);
      console.log(distance_proche.latitude, distance_proche.longitude);
      document.querySelector(
        "#lat_result"
      ).value = `Lat : ${distance_proche.latitude}`;
      document.querySelector(
        "#lng_result"
      ).value = `Lng:  ${distance_proche.longitude}`;
      style_point(
        distance_proche.latitude,
        distance_proche.longitude,
        (couleur = "violet")
      );
      document.querySelector("#info_reset").classList.remove("btn-primary");
      document.querySelector("#info_reset").classList.add("btn-danger");
      document
        .querySelector("#remove_proximite")
        .classList.remove("btn-primary");
      document.querySelector("#remove_proximite").classList.add("btn-dark");
    }
  } else {
    notyf.error("Erreur, veuillez les champs latitude et longitude , Merci !");
    notyf.open({
      type: "warning",
      message: "Champs latitude et longitude, svp!",
      duration: 2000,
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
  .querySelector("#calcul_proximite")
  .addEventListener("click", proxi_routing);

/**
 * TODO effacer la proximité
 */
document.querySelector("#remove_proximite").addEventListener("click", () => {
  document.querySelector("#lat_result").value = "";
  document.querySelector("#lng_result").value = "";
  document.querySelector("#lat_geolib").value = "";
  document.querySelector("#lng_geolib").value = "";
  document.querySelector("#remove_proximite").classList.add("btn-primary");
  document.querySelector("#remove_proximite").classList.remove("btn-dark");
});

/**
 * TODO construction buffer defaut 10%
 */
function buffer_point() {
  affichage_points();
  if (positions.length > 0) {
    var map = document.querySelector("#map");
    var circles = map.querySelectorAll("circle");
    var r = document.querySelector("#r_buffer").value;
    message_positions();
    var indexMax = positions.length - 1;
    if (r == "") {
      r = "10%";
      circles.forEach((circle) => {
        if (
          parseFloat(circle.getAttribute("lat")) ==
            parseFloat(positions[indexMax].lat) &&
          parseFloat(circle.getAttribute("lng")) ==
            parseFloat(positions[indexMax].lng)
        ) {
          var svgRacine = document.querySelector("#carte");
          var SVG_NS = "http://www.w3.org/2000/svg";
          var nouv = document.createElementNS(SVG_NS, "circle");
          nouv.setAttribute("cx", circle.getAttribute("cx"));
          nouv.setAttribute("cy", circle.getAttribute("cy"));
          nouv.setAttribute("r", r);
          nouv.setAttribute("fill", "red");
          nouv.setAttribute("opacity", "0.3");
          // nouv.setAttribute("fill-opacity", '0.5');
          nouv.setAttribute("stroke", "none");
          nouv.setAttribute(
            "onmouseover",
            "evt.target.setAttribute('stroke','tomato');"
          );
          nouv.setAttribute(
            "onmouseout",
            "evt.target.setAttribute('stroke', 'none');"
          );
          nouv.setAttribute("stroke-width", "0.8");
          nouv.setAttribute("class", "buffer_class");
          svgRacine.appendChild(nouv);
          document
            .querySelector("#remove_buffer")
            .classList.remove("btn-primary");
          document.querySelector("#remove_buffer").classList.add("btn-dark");
          document.querySelector("#r_buffer").value = r;
          document.querySelector("#info_reset").classList.remove("btn-primary");
          document.querySelector("#info_reset").classList.add("btn-danger");
        }
      });
    } else {
      if (!r.match(/[+-]?([0-9]*[.])?[0-9]+/)) {
        // alert(" Type numérique ou decimal ! Merci...🧐!");
        notyf.error(" Type numérique ou decimal ! Merci...🧐!");
        notyf.open({
          type: "warning",
          message: "Il faut 2 positions !",
          duration: 2000,
        });
      } else {
        circles.forEach((circle) => {
          if (
            parseFloat(circle.getAttribute("lat")) ==
              parseFloat(positions[indexMax].lat) &&
            parseFloat(circle.getAttribute("lng")) ==
              parseFloat(positions[indexMax].lng)
          ) {
            // svgdoc=evt.target.ownerDocument;
            var svgRacine = document.querySelector("#carte");
            var SVG_NS = "http://www.w3.org/2000/svg";
            var nouv = document.createElementNS(SVG_NS, "circle");
            nouv.setAttribute("cx", circle.getAttribute("cx"));
            nouv.setAttribute("cy", circle.getAttribute("cy"));
            nouv.setAttribute("r", r);
            nouv.setAttribute("fill", "red");
            nouv.setAttribute("opacity", "0.6");
            // nouv.setAttribute("fill-opacity", '0.6');
            nouv.setAttribute("stroke", "none");
            nouv.setAttribute(
              "onmouseover",
              "evt.target.setAttribute('stroke','tomato');"
            );
            nouv.setAttribute(
              "onmouseout",
              "evt.target.setAttribute('stroke', 'none');"
            );
            nouv.setAttribute("stroke-width", "0.8");
            nouv.setAttribute("class", "buffer_class");
            svgRacine.appendChild(nouv);
            document
              .querySelector("#remove_buffer")
              .classList.remove("btn-primary");
            document.querySelector("#remove_buffer").classList.add("btn-dark");
            document.querySelector("#r_buffer").value = r;
            document
              .querySelector("#info_reset")
              .classList.remove("btn-primary");
            document.querySelector("#info_reset").classList.add("btn-danger");
          }
        });
      }
    }
  }
}
document
  .querySelector("#calcul_buffer")
  .addEventListener("click", buffer_point);

/**
 * TODO effacer le buffer
 */
function effacer_buffer() {
  var svgRacine = document.querySelector("#carte");
  var buffer = document.querySelector(".buffer_class");
  svgRacine.removeChild(buffer);
  // alert(`buffer de rayon :${buffer.getAttribute('r')} effacé avec succès, Merci. !`);
  notyf.success(
    `buffer de rayon :${buffer.getAttribute("r")} effacé avec succès, Merci. !`
  );
  document.querySelector("#points").innerHTML = "";
  document.querySelector("#remove_buffer").classList.add("btn-primary");
  document.querySelector("#remove_buffer").classList.remove("btn-dark");
  document.querySelector("#r_buffer").value = "";
}
document
  .querySelector("#remove_buffer")
  .addEventListener("click", effacer_buffer);

/**
 * TODO afficher et desactiver
 * @param {*} g
 */
function gest_couche2(g, id_check, id_label, id_inp) {
  var bt_ckeckox = document.querySelector(id_check);
  var label = document.querySelector(id_label);
  var inp = document.querySelector(id_inp);
  var groupe = document.querySelector(g);
  if (bt_ckeckox.checked) {
    groupe.style.display = "block";
    label.classList.remove("on_btn");
    inp.classList.remove("on_btn");
  } else {
    groupe.style.display = "none";
    label.classList.add("on_btn");
    inp.classList.add("on_btn");
  }
}

/**
 * TODO afficher et desactiver / regions
 * @param {*} g
 */
function gest_couche_reg(g, id_check, id_label, id_inp) {
  var bt_ckeckox = document.querySelector(id_check);
  var label = document.querySelector(id_label);
  var inp = document.querySelector(id_inp);
  var groupe = document.querySelector(g);
  if (bt_ckeckox.checked) {
    groupe.style.display = "block";
    label.classList.remove("on_btn");
    inp.classList.remove("on_btn");
    document.querySelector("#dep").setAttribute("fill", "none");
  } else {
    groupe.style.display = "none";
    label.classList.add("on_btn");
    inp.classList.add("on_btn");
    document.querySelector("#dep").setAttribute("fill", "cyan");
  }
}

/**
 * TODO afficher et desactiver / dep
 * @param {*} g
 */
function gest_couche_dep(g, id_check, id_label, id_inp) {
  var bt_ckeckox = document.querySelector(id_check);
  var label = document.querySelector(id_label);
  var inp = document.querySelector(id_inp);
  var groupe = document.querySelector(g);
  if (bt_ckeckox.checked) {
    groupe.style.display = "block";
    label.classList.remove("on_btn");
    inp.classList.remove("on_btn");
    // document.querySelector('#region').setAttribute("stroke","white");
    // document.querySelector('#region').setAttribute("stroke-width","10%");
  } else {
    groupe.style.display = "none";
    label.classList.add("on_btn");
    inp.classList.add("on_btn");
    document.querySelector("#region").setAttribute("stroke", "red");
    document.querySelector("#region").setAttribute("stroke-width", "0.5%");
  }
}

/**
 * TODO afficher et desactiver
 * @param {*} g
 */
function gest_couche_centroid(g, id_check, id_label, id_inp) {
  var bt_ckeckox = document.querySelector(id_check);
  var label = document.querySelector(id_label);
  var inp = document.querySelector(id_inp);
  var groupe = document.querySelector(g);
  if (bt_ckeckox.checked) {
    groupe.style.display = "block";
    label.classList.remove("on_btn");
    inp.classList.remove("on_btn");
  } else {
    groupe.style.display = "none";
    label.classList.add("on_btn");
    inp.classList.add("on_btn");
    document.querySelector("#dep").setAttribute("fill", "cyan");
    document.querySelector("#dep").setAttribute("opacity", "0.6%");
  }
}

/**
 * TODO afficher le nom des regions
 * @param {To} evt
 */
function fct_region(evt) {
  var nom = evt.target.getAttribute("nom");
  var id = evt.target.getAttribute("id");
  id = id.replace("reg_", "");
  document.querySelector("#reg_result").value = `( ${id} ) -- ${nom}`;
}

/**
 * TODO vider le nom des régions
 * @param {To} evt
 */
function off_region(evt) {
  document.querySelector("#reg_result").value = "";
}

/**
 * TODO afficher le nom des départements
 * @param {To} evt
 */
function fct_dep(evt) {
  var nom = evt.target.getAttribute("nom");
  var id = evt.target.getAttribute("id");
  id = id.replace("dep_", "");
  document.querySelector("#dep_result").value = `( ${id} ) -- ${nom}`;

  // nom region
  var gid = evt.target.getAttribute("gid");
  var target_reg = document.getElementById("reg_" + gid);
  var id_reg = target_reg.getAttribute("id");
  id_reg = id_reg.replace("reg_", "");
  document.querySelector(
    "#reg_result"
  ).value = `( ${id_reg} ) -- ${target_reg.getAttribute("nom")}`;
}

/**
 * TODO vider le nom des départements
 * @param {To} evt
 */
function off_dep(evt) {
  document.querySelector("#dep_result").value = "";
  // document.querySelector('#dep_centroid_result').value='';
  document.querySelector("#reg_result").value = "";
}

/**
 * TODO afficher le nom des départements / centroids
 * @param {To} evt
 */
function fct_centroid(evt) {
  var nom = evt.target.getAttribute("nom");
  var id = evt.target.getAttribute("id");
  document.querySelector("#dep_result").value = `( ${id} ) -- ${nom}`;

  // nom region
  var gid = evt.target.getAttribute("gid");
  var target_reg = document.getElementById("reg_" + gid);
  var id_reg = target_reg.getAttribute("id");
  id_reg = id_reg.replace("reg_", "");
  document.querySelector(
    "#reg_result"
  ).value = `( ${id_reg} ) -- ${target_reg.getAttribute("nom")}`;
}

/**
 * TODO vider le nom des départements / centroids
 * @param {To} evt
 */
function off_centroid(evt) {
  document.querySelector("#dep_result").value = "";
  document.querySelector("#dep_centroid_result").value = "";
  document.querySelector("#reg_result").value = "";
}

/**
 * TODO recharge toute la page
 */
function reset() {
  positions = [];
  document.querySelector("#points").innerHTML = "";
  document.querySelector("#geolib").value = "";
  document.querySelector("#turf").value = "";
  document.querySelector("#lat_centre_geolib").value = "";
  document.querySelector("#lng_centre_geolib").value = "";
  document.querySelector("#lat_result").value = "";
  document.querySelector("#lng_result").value = "";
  document.querySelector("#lat_geolib").value = "";
  document.querySelector("#lng_geolib").value = "";
  document.querySelector("#lat_centre_geolib").value = "";
  document.querySelector("#lng_centre_geolib").value = "";
  document.querySelector("#r_buffer").value = "";
  document.querySelector("#afficher_locate").classList.add("btn-primary");
  document.querySelector("#afficher_locate").classList.remove("btn-success");
  document.querySelector("#info_reset").classList.add("btn-primary");
  document.querySelector("#info_reset").classList.remove("btn-danger");
  document.querySelector("#afficher_positions").classList.add("btn-primary");
  document
    .querySelector("#afficher_positions")
    .classList.remove("btn-outline-success");
  document.querySelector("#reg_check").checked;
  document.querySelector("#dep_check").checked;
  document.querySelector("#map_check").checked;
  notyf.dismissAll();
  // document.querySelector('.loader').classList.remove('hidden');
  // effacer_buffer();
  window.location.reload(true);
}
document.querySelector("#info_reset").addEventListener("click", reset);

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
      // console.log(item.className);
    });
    notyf.success("Vous pouvez réorganiser les boites de fonctionnalités");
  } else {
    var dropzone = document.querySelector(".dropzone");
    var item = dropzone.querySelectorAll(".item");
    document.querySelector("#reog").classList.remove("reog");
    item.forEach(function (item) {
      item.classList.remove("item");
      item.className += " item_off";
      // console.log(item.className);
    });

    notyf.error("Fonctionnalité désactivée !");
  }
});

/**
 * TODO rechercher
 */
var rech = function () {
  if (
    document.querySelector("#label_rech").value != "" ||
    document.querySelector("#insee_rech").value != ""
  ) {
    var param_1 = document.querySelector("#choice_param_1");
    var param_2 = document.querySelector("#choice_param_2");
    var label = document.querySelector("#label_rech").value;
    var insee = document.querySelector("#insee_rech").value;

    if (param_1.checked == true && param_2.checked == true) {
      notyf.error("Décocher une des deux cases!");
      notyf.open({
        type: "warning",
        message: "Recommencer, Merci!",
        duration: 4000,
      });
    } else if (param_1.checked) {
      var gr_region = document.querySelector("#region");
      var paths_reg = gr_region.querySelectorAll("path");
      paths_reg.forEach(function (path) {
        var id = path.getAttribute("id");
        id = id.replace("reg_", "");

        if (path.getAttribute("nom").toLowerCase() == label.toLowerCase()) {
          var target = document.getElementById(path.getAttribute("id"));
          target.setAttribute("fill", "#6600CC");
          target.setAttribute("stroke", "tomato");
          document.querySelector("#insee_rech").value = id;
          document.querySelector("#label_rech").value =
            path.getAttribute("nom");
          document
            .querySelector("#submit_rech")
            .classList.remove("btn-primary");
          document.querySelector("#submit_rech").classList.add("btn-success");
          document
            .querySelector("#remove_rech")
            .classList.remove("btn-primary");
          document.querySelector("#remove_rech").classList.add("btn-dark");
        }

        if (parseFloat(id) == parseFloat(insee)) {
          var target = document.getElementById(path.getAttribute("id"));
          target.setAttribute("fill", "#6600CC");
          target.setAttribute("stroke", "tomato");
          document.querySelector("#insee_rech").value = id;
          document.querySelector("#label_rech").value =
            path.getAttribute("nom");
          document
            .querySelector("#submit_rech")
            .classList.remove("btn-primary");
          document.querySelector("#submit_rech").classList.add("btn-success");
          document
            .querySelector("#remove_rech")
            .classList.remove("btn-primary");
          document.querySelector("#remove_rech").classList.add("btn-dark");
        }
      });

      notyf.success("Double-clique : Zoomer / DéZoomer");
    } else if (param_2.checked) {
      var gr_dep = document.querySelector("#dep");
      var paths = gr_dep.querySelectorAll("path");
      paths.forEach(function (path) {
        var id = path.getAttribute("id");
        id = id.replace("dep_", "");
        if (path.getAttribute("nom").toLowerCase() == label.toLowerCase()) {
          var target = document.getElementById(path.getAttribute("id"));
          target.setAttribute("fill", "#e00e6a");
          // target.setAttribute('stroke', '#e00e6a');
          document.querySelector("#insee_rech").value = id;
          document.querySelector("#label_rech").value =
            path.getAttribute("nom");
          document
            .querySelector("#submit_rech")
            .classList.remove("btn-primary");
          document.querySelector("#submit_rech").classList.add("btn-success");
          document
            .querySelector("#remove_rech")
            .classList.remove("btn-primary");
          document.querySelector("#remove_rech").classList.add("btn-dark");
        }

        if (parseFloat(id) == parseFloat(insee)) {
          var target = document.getElementById(path.getAttribute("id"));
          target.setAttribute("fill", "#e00e6a");
          // target.setAttribute('stroke', '#e00e6a');
          document.querySelector("#insee_rech").value = id;
          document.querySelector("#label_rech").value =
            path.getAttribute("nom");
          document
            .querySelector("#submit_rech")
            .classList.remove("btn-primary");
          document.querySelector("#submit_rech").classList.add("btn-success");
          document
            .querySelector("#remove_rech")
            .classList.remove("btn-primary");
          document.querySelector("#remove_rech").classList.add("btn-dark");
        }
      });

      notyf.success("Double-clique : Zoomer / DéZoomer");
    } else {
      notyf.error("Cocher une case, au plus!");
      notyf.open({
        type: "warning",
        message: "Recommencer, Merci!",
        duration: 4000,
      });
    }
  } else {
    notyf.error("Les champs sont vides");
    notyf.open({
      type: "warning",
      message: "Recommencer, Merci!",
      duration: 4000,
    });
  }
};
document.querySelector("#submit_rech").addEventListener("click", rech);

/**
 * TODO effacer rechercher
 */
document.querySelector("#remove_rech").addEventListener("click", () => {
  var label = document.querySelector("#label_rech").value;
  var insee = document.querySelector("#insee_rech").value;

  // effacer couleur niveau region (groupe)
  var gr_region = document.querySelector("#region");
  var paths_reg = gr_region.querySelectorAll("path");
  paths_reg.forEach(function (path) {
    if (path.getAttribute("nom").toLowerCase() == label.toLowerCase()) {
      var target = document.getElementById(path.getAttribute("id"));
      target.removeAttribute("fill");
      target.removeAttribute("stroke");
    } else {
      path.removeAttribute("fill");
      path.removeAttribute("stroke");
    }

    if (parseFloat(path.getAttribute("id")) == parseFloat(insee)) {
      var target = document.getElementById(path.getAttribute("id"));
      target.removeAttribute("fill");
      target.removeAttribute("stroke");
    } else {
      path.removeAttribute("fill");
      path.removeAttribute("stroke");
    }
  });

  //effacer couleur niveau departement (groupe)
  var gr_dep = document.querySelector("#dep");
  var paths = gr_dep.querySelectorAll("path");
  paths.forEach(function (path) {
    if (path.getAttribute("nom").toLowerCase() == label.toLowerCase()) {
      var target = document.getElementById(path.getAttribute("id"));
      target.removeAttribute("fill");
    } else {
      path.removeAttribute("fill");
    }

    if (parseFloat(path.getAttribute("id")) == parseFloat(insee)) {
      var target = document.getElementById(path.getAttribute("id"));
      target.removeAttribute("fill");
    } else {
      path.removeAttribute("fill");
    }
  });

  document.querySelector("#choice_param_1").checked = false;
  document.querySelector("#choice_param_2").checked = false;
  document.querySelector("#label_rech").value = "";
  document.querySelector("#insee_rech").value = "";
  document.querySelector("#submit_rech").classList.add("btn-primary");
  document.querySelector("#submit_rech").classList.remove("btn-success");
  document.querySelector("#remove_rech").classList.add("btn-primary");
  document.querySelector("#remove_rech").classList.remove("btn-dark");
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
      notyf.success("Fonctionnalité activée !");
    } else {
      document.querySelector(btn_ctrl).classList.remove("btn-success");
      document.querySelector(btn_ctrl).classList.add("btn-outline-success");
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
ctrl_btn("#btn_proximite", "#active_proximite");
ctrl_btn("#btn_rech", "#active_rech");

/**
   * Todo volet Horizontal && volet Vertical
   */
(function(){
  let btn_ctrl=document.querySelector("#btn_lateral_hz");
  btn_ctrl.addEventListener("click", (e) =>{
      if (btn_ctrl.className != "btn btn-success") {
        btn_ctrl.classList.remove("btn-outline-success");
        btn_ctrl.classList.add("btn-success");
        document.querySelector("#barreHoz").style.transform= "translateX(" + (-620) + "px)";
        notyf.success("Fonctionnalité activée !");
      } else {
        btn_ctrl.classList.remove("btn-success");
        btn_ctrl.classList.add("btn-outline-success");
        document.querySelector("#barreHoz").style.transform= "translateX(" + (0) + "px)";
        notyf.error("Fonctionnalité désactivée !");
      }
    e.preventDefault();
  });

  let btn_ctrl_vz=document.querySelector("#btn_lateral_vz");
  btn_ctrl_vz.addEventListener("click", function (e) {
    if (btn_ctrl_vz.className != "btn btn-success") {
      btn_ctrl_vz.classList.remove("btn-outline-success");
      btn_ctrl_vz.classList.add("btn-success");
      document.querySelector("#barreVz").style.transform= "translateY(" + (-320) + "px)";
      notyf.success("Fonctionnalité activée !");
    } else {
      btn_ctrl_vz.classList.remove("btn-success");
      btn_ctrl_vz.classList.add("btn-outline-success");
      document.querySelector("#barreVz").style.transform= "translateY(" + (0) + "px)";
      notyf.error("Fonctionnalité désactivée !");
    }
  e.preventDefault();
  });
})();

/**
 * TODO autocomplete dans le champ recherche
 */
var name_reg = [
  "ILE-DE-FRANCE",
  "CENTRE-VAL DE LOIRE",
  "BOURGOGNE-FRANCHE-COMTE",
  "NORMANDIE",
  "HAUTS-DE-FRANCE",
  "GRAND EST",
  "PAYS DE LA LOIRE",
  "BRETAGNE",
  "NOUVELLE-AQUITAINE",
  "OCCITANIE",
  "AUVERGNE-RHONE-ALPES",
  "PROVENCE-ALPES-COTE D'AZUR",
  "CORSE",
];
var name_dep = [
  "AIN",
  "AISNE",
  "ALLIER",
  "ALPES-DE-HAUTE-PROVENCE",
  "HAUTES-ALPES",
  "ALPES-MARITIMES",
  "ARDECHE",
  "ARDENNES",
  "ARIEGE",
  "AUBE",
  "AUDE",
  "AVEYRON",
  "BOUCHES-DU-RHONE",
  "CALVADOS",
  "CANTAL",
  "CHARENTE",
  "CHARENTE-MARITIME",
  "CHER",
  "CORREZE",
  "COTE-D'OR",
  "COTES-D'ARMOR",
  "CREUSE",
  "DORDOGNE",
  "DOUBS",
  "DROME",
  "EURE",
  "EURE-ET-LOIR",
  "FINISTERE",
  "CORSE-DU-SUD",
  "HAUTE-CORSE",
  "GARD",
  "HAUTE-GARONNE",
  "GERS",
  "GIRONDE",
  "HERAULT",
  "ILLE-ET-VILAINE",
  "INDRE",
  "INDRE-ET-LOIRE",
  "ISERE",
  "JURA",
  "LANDES",
  "LOIR-ET-CHER",
  "LOIRE",
  "HAUTE-LOIRE",
  "LOIRE-ATLANTIQUE",
  "LOIRET",
  "LOT",
  "LOT-ET-GARONNE",
  "LOZERE",
  "MAINE-ET-LOIRE",
  "MANCHE",
  "MARNE",
  "HAUTE-MARNE",
  "MAYENNE",
  "MEURTHE-ET-MOSELLE",
  "MEUSE",
  "MORBIHAN",
  "MOSELLE",
  "NIEVRE",
  "NORD",
  "OISE",
  "ORNE",
  "PAS-DE-CALAIS",
  "PUY-DE-DOME",
  "PYRENEES-ATLANTIQUES",
  "HAUTES-PYRENEES",
  "PYRENEES-ORIENTALES",
  "BAS-RHIN",
  "HAUT-RHIN",
  "RHONE",
  "HAUTE-SAONE",
  "SAONE-ET-LOIRE",
  "SARTHE",
  "SAVOIE",
  "HAUTE-SAVOIE",
  "PARIS",
  "SEINE-MARITIME",
  "SEINE-ET-MARNE",
  "YVELINES",
  "DEUX-SEVRES",
  "SOMME",
  "TARN",
  "TARN-ET-GARONNE",
  "VAR",
  "VAUCLUSE",
  "VENDEE",
  "VIENNE",
  "HAUTE-VIENNE",
  "VOSGES",
  "YONNE",
  "TERRITOIRE DE BELFORT",
  "ESSONNE",
  "HAUTS-DE-SEINE",
  "SEINE-SAINT-DENIS",
  "VAL-DE-MARNE",
  "VAL-D'OISE",
];
var name_tablo = name_reg.concat(name_dep);
autocomplete(document.querySelector("#label_rech"), name_tablo);

var id_reg = [
  "11",
  "24",
  "27",
  "28",
  "32",
  "44",
  "52",
  "53",
  "75",
  "76",
  "84",
  "93",
  "94",
];
var id_dep = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "2A",
  "2B",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "60",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "67",
  "68",
  "69",
  "70",
  "71",
  "72",
  "73",
  "74",
  "75",
  "76",
  "77",
  "78",
  "79",
  "80",
  "81",
  "82",
  "83",
  "84",
  "85",
  "86",
  "87",
  "88",
  "89",
  "90",
  "91",
  "92",
  "93",
  "94",
  "95",
];
var id_tablo = id_reg.concat(id_dep);
autocomplete(document.querySelector("#insee_rech"), id_tablo);

/**
 * TODO cocher ou decocher automatique
 */
[
  "keyup",
  "keypress",
  "blur",
  "change",
  "keydown",
  "focus",
  "focusout",
  "mouseleave",
].forEach((eventName) => {
  document.querySelector("#label_rech").addEventListener(eventName, () => {
    const element = document.querySelector("#label_rech").value;
    if (name_reg.includes(element)) {
      document.querySelector("#choice_param_1").checked = true;
    } else {
      document.querySelector("#choice_param_1").checked = false;
    }

    if (name_dep.includes(element)) {
      document.querySelector("#choice_param_2").checked = true;
    } else {
      document.querySelector("#choice_param_2").checked = false;
    }
  });
});

/**
 * TODO Gestion des animations : effet de neige
 * @param {*} pos
 */
// Get temperature by api : api.openweathermap.org
function loadUrlTemperature(pos) {
  let lat = pos.coords.latitude;
  let long = pos.coords.longitude;
  let url = `${URL_MAIN}?lat=${lat}&lon=${long}&units=${UNITS}&APPID=${API_KEY}`;
  console.log(url);
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
