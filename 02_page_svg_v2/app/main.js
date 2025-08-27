//calcul annee_experience
const d = new Date();
let year = d.getFullYear();
// document.querySelector(".annee_experience").textContent = year - 2019;
document.querySelector(".year").textContent = year;

// instance de Notyf
let notyf = new Notyf({
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
let btns = () => {
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

  document.querySelector("#zoom-in-button").onclick = () => zoom("in");
  document.querySelector("#zoom-out-button").onclick = () => zoom("out");

  document.querySelector("#left-button").addEventListener("click", () => {
    pan("left");
  });

  /**
   * Todo zoom svg souris
   */
  let point = svg.createSVGPoint();
  let viewBox = svg.viewBox.baseVal;

  let cachedViewBox = {
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

    //   let normalized;
    //   let delta = event.wheelDelta;

    //   if (delta) {
    //     normalized = (delta % 120) == 0 ? delta / 120 : delta / 12;
    //   } else {
    //     delta = event.deltaY || event.detail || 0;
    //     normalized = -(delta % 3 ? delta * 10 : delta / 3);
    //   }

    // let scaleFactor = 1.6;
    let scaleFactor = 3;
    //   let scaleDelta = normalized > 0 ? 1 / scaleFactor : scaleFactor;
    let scaleDelta = 1 / scaleFactor;

    point.x = event.clientX;
    point.y = event.clientY;

    let startPoint = point.matrixTransform(svg.getScreenCTM().inverse());

    let fromlets = {
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

    TweenLite.from(viewBox, 0.5, fromlets);
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
 */
async function chargerDonnees(url) {
  let resp = await fetch(url);
  let response = await resp.text();
  return response;
}

window.addEventListener("load", () => {
  chargerDonnees("../data/map_france.svg").then(function (response) {
    document.querySelectorAll(".loader").className += " hidden";
    document.querySelector("#chargeCarte").innerHTML = response;
    btns();
  });
});

document.querySelector("#choixCarte").addEventListener("change", () => {
  let choixCarte = document.querySelector("#choixCarte");
  let option = choixCarte.selectedOptions[0].value;
  chargerDonnees(option).then(function (response) {
    document.querySelector("#chargeCarte").innerHTML = response;
    btns();

    //activation chekbox
    document.querySelector("#reg_check").checked = true;
    document.querySelector("#dep_check").checked = true;
    document.querySelector("#map_check").checked = true;

    //label et input
    document.querySelector("#reg_label").classList.remove("on_btn");
    document.querySelector("#dep_label").classList.remove("on_btn");
    document.querySelector("#dep_centroid_label").classList.remove("on_btn");
    document.querySelector("#reg_result").classList.remove("on_btn");
    document.querySelector("#dep_result").classList.remove("on_btn");
    document.querySelector("#dep_centroid_result").classList.remove("on_btn");
  });
});

/**
 *
 * @param {*} evt
 */

let positions = [];
let tablo = [];
let tablo_dico = [];

/**
 * todo Arrondir à N chiffres
 * @param {*} nombre
 * @param {*} precision
 * @returns
 */
function roundDecimal(nombre, precision) {
  precision = precision || 2;
  let tmp = Math.pow(10, precision);
  return Math.round(nombre * tmp) / tmp;
}

/**
 * TODO style sur le point de proximité
 * @param {*} lat
 * @param {*} lng
 */
function style_point(lat, lng, couleur = "green") {
  let map = document.querySelector("#map");
  let circles = map.querySelectorAll("circle");
  circles.forEach((circle) => {
    if (
      parseFloat(circle.getAttribute("lat")) == parseFloat(lat) &&
      parseFloat(circle.getAttribute("lng")) == parseFloat(lng)
    ) {
      circle.setAttribute("r", "1.5%");
      circle.setAttribute("fill", couleur);
      circle.setAttribute("class", "innerCircle");
      // circle.setAttribute("transform", "scale(2)");
      // circle.setAttribute("stroke", "tomato");
      // circle.setAttribute("stroke-width", "2px");
    }
  });
}

/**
 * TODO Style des centroïds
 */
function product_style() {
  let indexMax = positions.length - 1;
  // style
  style_point(positions[0].lat, positions[0].lng, (couleur = "yellow"));
  style_point(
    positions[indexMax].lat,
    positions[indexMax].lng,
    (couleur = "RebeccaPurple")
  );

  if (positions.length > 2) {
    for (let i = 1; i < indexMax; i++) {
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
    cX: evt.clientX,
    sX: evt.screenX,
    cY: evt.clientY,
    sY: evt.screenY,
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
  let p = 0;
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
      let tepoints = ` Points n° ${p}:  Lng : ${position.lng.toFixed(
        4
      )}  et  Lat : ${position.lat.toFixed(4)} : ✹ ${position.nom} ✹`;
      let tpoin = document.createTextNode(tepoints);
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
 * TODO Materialiser la distance
 */
function line_svg(p1, p2) {
  let svgRacine = document.querySelector("#carte");
  let SVG_NS = "http://www.w3.org/2000/svg";
  let nou = document.createElementNS(SVG_NS, "path");

  // let bound = svgRacine.getBoundingClientRect();
  // let style = getComputedStyle(svgRacine);
  // let paddingLeft = parseFloat(style['padding-left'].replace('px', ''));
  // let paddingTop = parseFloat(style['padding-top'].replace('px', ''));
  // let x1 =p1.cX - bound.left - svgRacine.clientLeft - paddingLeft;
  // let y1 =p1.cY - bound.top - svgRacine.clientTop - paddingTop;

  let p1x = parseFloat(p1.cX);
  let p1y = parseFloat(p1.cY);
  let p2x = parseFloat(p2.cX);
  let p2y = parseFloat(p2.cY);
  let mpx = (p2x + p1x) * 0.5;
  let mpy = (p2y + p1y) * 0.5;
  let theta = Math.atan2(p2y - p1y, p2x - p1x) - Math.PI / 2;
  let offset = 30;
  let c1x = mpx + offset * Math.cos(theta);
  let c1y = mpy + offset * Math.sin(theta);
  nou.setAttribute("fill", "transparent");
  nou.setAttribute("stroke-linecap", "round");
  nou.setAttribute("stroke", "#a0a");
  nou.setAttribute("stroke-width", "4");
  nou.setAttribute("class", "line_class");
  let curve =
    "M" +
    p1x +
    " " +
    p1y +
    " Q " +
    c1x.toFixed(4) +
    " " +
    c1y.toFixed(4) +
    " " +
    p2x +
    " " +
    p2y;
  nou.setAttribute("d", curve);

  console.log(nou);
  svgRacine.appendChild(nou);
}

/**
 * TODO calcul des distances
 * @param {*} positions
 */
function distance_routing() {
  affichage_points();

  if (positions.length > 0) {
    let indexMax = positions.length - 1;

    if (positions.length == 0) {
      notyf.error("Aucune position prise en compte");
      notyf.open({
        type: "warning",
        message: "Recommencer, Merci!",
        duration: 4000,
      });
      document.querySelector("#info_reset").classList.add("btn-primary");
      document.querySelector("#info_reset").classList.remove("btn-danger");
      document
        .querySelector("#afficher_positions")
        .classList.add("btn-primary");
      document
        .querySelector("#afficher_positions")
        .classList.remove("btn-outline-success");
    } else if (positions.length > 1 && positions.length < 3) {
      product_style();
      /**
       * todo calcul de la distance cote client avec turf.js
       */
      let from = turf.point([
        parseFloat(positions[0].lng),
        parseFloat(positions[0].lat),
      ]);
      let to = turf.point([positions[indexMax].lng, positions[indexMax].lat]);
      let options = {
        units: "kilometers",
      };

      let distance_rhumb = turf.rhumbDistance(from, to, options);
      document.querySelector("#turf").value = `${roundDecimal(
        distance_rhumb
      )} KM`;

      /**
       * todo calcul de la distance cote client avec geolib.js
       */
      let start = {
        longitude: positions[0].lng,
        latitude: positions[0].lat,
      };
      let end = {
        longitude: positions[indexMax].lng,
        latitude: positions[indexMax].lat,
      };

      let distance_geolib = window.geolib.getDistance(start, end) / 1000;
      document.querySelector("#geolib").value = `${distance_geolib} KM`;

      //call pour matérialiser la distance
      line_svg(positions[0], positions[indexMax]);

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
    let indexMax = positions.length - 1;
    if (positions.length == 0) {
      notyf.error("Aucune position prise en compte");
      notyf.open({
        type: "warning",
        message: "Recommencer, Merci!",
        duration: 4000,
      });
      document.querySelector("#info_reset").classList.add("btn-primary");
      document.querySelector("#info_reset").classList.remove("btn-danger");
      document
        .querySelector("#afficher_positions")
        .classList.add("btn-primary");
      document
        .querySelector("#afficher_positions")
        .classList.remove("btn-outline-success");
    } else if (positions.length > 1 && positions.length < 3) {
      product_style();

      /**
       * todo calcul le centre des points cote client avec geolib.js
       */
      let start = {
        longitude: positions[0].lng,
        latitude: positions[0].lat,
      };
      let end = {
        longitude: positions[indexMax].lng,
        latitude: positions[indexMax].lat,
      };

      let distance_center = window.geolib.getCenter([start, end]);
      // console.log(distance_center);
      document.querySelector(
        "#lat_centre_geolib"
      ).value = `Lat : ${distance_center.latitude}`;
      document.querySelector(
        "#lng_centre_geolib"
      ).value = `Lng:  ${distance_center.longitude}`;

      //positon sur la carte
      let point = {
        latitude: parseFloat(distance_center.latitude),
        longitude: parseFloat(distance_center.longitude),
      };
      recup_tablo_routing();
      let distance_proche = window.geolib.findNearest(point, tablo_dico);
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
  let map = document.querySelector("#map");
  let circles = map.querySelectorAll("circle");

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
    let r = window.confirm(
      `Votre position est : latitude ${position.coords.latitude} et longitude ${position.coords.longitude}, Calculer votre proximité !`
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
  let lat = document.querySelector("#lat_geolib").value;
  let lng = document.querySelector("#lng_geolib").value;

  if (lat != "" && lng != "") {
    if (
      !lat.match(/[+-]?([0-9]*[.])?[0-9]+/) &&
      !lng.match(/[+-]?([0-9]*[.])?[0-9]+/)
    ) {
      // alert(" Type numérique ou decimal ! Merci...😊");
      notyf.error(" Type numérique ou decimal ! Merci...🧐 !");
      document.querySelector("#lat_geolib").value = "";
      document.querySelector("#lng_geolib").value = "";
    } else {
      let point = {
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
      };
      recup_tablo_routing();
      let distance_proche = window.geolib.findNearest(point, tablo_dico);
      // console.log(distance_proche.latitude, distance_proche.longitude);
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
    // alert('Erreur, veuillez les champs latitude et longitude , Merci !');
    notyf.error("Erreur, veuillez les champs latitude et longitude , Merci !");
    notyf.open({
      type: "warning",
      message: "Champs latitude et longitude,svp !",
      duration: 2000,
    });
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
    let map = document.querySelector("#map");
    let circles = map.querySelectorAll("circle");
    let r = document.querySelector("#r_buffer").value;
    message_positions();
    let indexMax = positions.length - 1;
    if (r == "") {
      r = "10%";
      circles.forEach((circle) => {
        if (
          parseFloat(circle.getAttribute("lat")) ==
            parseFloat(positions[indexMax].lat) &&
          parseFloat(circle.getAttribute("lng")) ==
            parseFloat(positions[indexMax].lng)
        ) {
          let svgRacine = document.querySelector("#carte");
          let SVG_NS = "http://www.w3.org/2000/svg";
          let nouv = document.createElementNS(SVG_NS, "circle");
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
            let svgRacine = document.querySelector("#carte");
            let SVG_NS = "http://www.w3.org/2000/svg";
            let nouv = document.createElementNS(SVG_NS, "circle");
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
  let svgRacine = document.querySelector("#carte");
  let buffer = document.querySelector(".buffer_class");
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
 * TODO afficher et desactiver (css diplay none)
 * @param {*} g
 */
function gest_couche2(g, id_check, id_label, id_inp) {
  let bt_ckeckox = document.querySelector(id_check);
  let label = document.querySelector(id_label);
  let inp = document.querySelector(id_inp);
  let groupe = document.querySelector(g);
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
  let bt_ckeckox = document.querySelector(id_check);
  let label = document.querySelector(id_label);
  let inp = document.querySelector(id_inp);
  let groupe = document.querySelector(g);
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
  let bt_ckeckox = document.querySelector(id_check);
  let label = document.querySelector(id_label);
  let inp = document.querySelector(id_inp);
  let groupe = document.querySelector(g);
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
  let bt_ckeckox = document.querySelector(id_check);
  let label = document.querySelector(id_label);
  let inp = document.querySelector(id_inp);
  let groupe = document.querySelector(g);
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
  let nom = evt.target.getAttribute("nom");
  let id = evt.target.getAttribute("id");
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
  let nom = evt.target.getAttribute("nom");
  let id = evt.target.getAttribute("id");
  id = id.replace("dep_", "");
  document.querySelector("#dep_result").value = `( ${id} ) -- ${nom}`;

  // nom region
  let gid = evt.target.getAttribute("gid");
  let target_reg = document.getElementById("reg_" + gid);
  let id_reg = target_reg.getAttribute("id");
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
  let nom = evt.target.getAttribute("nom");
  let id = evt.target.getAttribute("id");
  document.querySelector("#dep_result").value = `( ${id} ) -- ${nom}`;

  // nom region
  let gid = evt.target.getAttribute("gid");
  let target_reg = document.getElementById("reg_" + gid);
  let id_reg = target_reg.getAttribute("id");
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
 * TODO reset
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
  let test_class = document.querySelector("#reog").className;
  test_class = test_class.replace("btn btn-primary mb-3 mt-3 ", "");

  if (test_class != "reog") {
    let dropzone = document.querySelector(".dropzone");
    let item = dropzone.querySelectorAll(".item_off");
    document.querySelector("#reog").className += " reog";
    item.forEach(function (item) {
      item.classList.remove("item_off");
      item.className += " item";
    });
    notyf.success("Vous pouvez réorganiser les boites de fonctionnalités");
  } else {
    let dropzone = document.querySelector(".dropzone");
    let item = dropzone.querySelectorAll(".item");
    document.querySelector("#reog").classList.remove("reog");
    item.forEach(function (item) {
      item.classList.remove("item");
      item.className += " item_off";
    });
    notyf.error("Fonctionnalité désactivée !");
  }
});

/**
 * TODO rechercher
 */
let rech = function () {
  if (
    document.querySelector("#label_rech").value != "" ||
    document.querySelector("#insee_rech").value != ""
  ) {
    let param_1 = document.querySelector("#choice_param_1");
    let param_2 = document.querySelector("#choice_param_2");
    let label = document.querySelector("#label_rech").value;
    let insee = document.querySelector("#insee_rech").value;

    if (param_1.checked == true && param_2.checked == true) {
      notyf.error("Décocher une des deux cases!");
      notyf.open({
        type: "warning",
        message: "Recommencer, Merci!",
        duration: 4000,
      });
    } else if (param_1.checked) {
      let gr_region = document.querySelector("#region");
      let paths_reg = gr_region.querySelectorAll("path");
      paths_reg.forEach(function (path) {
        let id = path.getAttribute("id");
        id = id.replace("reg_", "");

        if (path.getAttribute("nom").toLowerCase() == label.toLowerCase()) {
          let target = document.getElementById(path.getAttribute("id"));
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
          let target = document.getElementById(path.getAttribute("id"));
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
      let gr_dep = document.querySelector("#dep");
      let paths = gr_dep.querySelectorAll("path");
      paths.forEach(function (path) {
        let id = path.getAttribute("id");
        id = id.replace("dep_", "");
        if (path.getAttribute("nom").toLowerCase() == label.toLowerCase()) {
          let target = document.getElementById(path.getAttribute("id"));
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
          let target = document.getElementById(path.getAttribute("id"));
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
  let label = document.querySelector("#label_rech").value;
  let insee = document.querySelector("#insee_rech").value;

  // effacer couleur niveau region (groupe)
  let gr_region = document.querySelector("#region");
  let paths_reg = gr_region.querySelectorAll("path");
  paths_reg.forEach(function (path) {
    if (path.getAttribute("nom").toLowerCase() == label.toLowerCase()) {
      let target = document.getElementById(path.getAttribute("id"));
      target.removeAttribute("fill");
      target.removeAttribute("stroke");
    } else {
      path.removeAttribute("fill");
      path.removeAttribute("stroke");
    }

    if (parseFloat(path.getAttribute("id")) == parseFloat(insee)) {
      let target = document.getElementById(path.getAttribute("id"));
      target.removeAttribute("fill");
      target.removeAttribute("stroke");
    } else {
      path.removeAttribute("fill");
      path.removeAttribute("stroke");
    }
  });

  //effacer couleur niveau departement (groupe)
  let gr_dep = document.querySelector("#dep");
  let paths = gr_dep.querySelectorAll("path");
  paths.forEach(function (path) {
    if (path.getAttribute("nom").toLowerCase() == label.toLowerCase()) {
      let target = document.getElementById(path.getAttribute("id"));
      target.removeAttribute("fill");
    } else {
      path.removeAttribute("fill");
    }

    if (parseFloat(path.getAttribute("id")) == parseFloat(insee)) {
      let target = document.getElementById(path.getAttribute("id"));
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

    let active = document
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
   * Todo volet Horizontal && volet vertical
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
let name_reg = [
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
let name_dep = [
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
  "let",
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
let name_tablo = name_reg.concat(name_dep);
autocomplete(document.getElementById("label_rech"), name_tablo);

let id_reg = [
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
let id_dep = [
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
let id_tablo = id_reg.concat(id_dep);
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
  let count_let = 50;
  let speed_let = 1;
  let stop_let = true;

  // condictionnalité avec les neiges
  if (get_temperature < 0) {
    count_let = 100;
    speed_let = 2;
  } else if (get_temperature < -5) {
    count_let = 150;
    speed_let = 3;
  } else if (get_temperature > 2) {
    {
      stop_let = true;
    }
  } else {
    count_let;
    speed_let;
    stop_let;
  }

  // Tomber la neige
  let snowflakes = new Snowflakes({
    color: "#5ECDEF",
    container: document.body,
    count: count_let,
    speed: speed_let,
    stop: stop_let,
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
  