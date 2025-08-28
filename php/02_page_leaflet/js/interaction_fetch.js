/**
 *fichier d'interactions du projet
 */

// importation des modules
import { addOjectOnMap, createGeoJsonLayer } from "./map.js";

import {
  map,
  icoRed,
  icoGreen,
  icoBlue,
  icoOrange,
  icoPurple,
  icoYellow,
  fct_route,
} from "./app.js";

document.addEventListener("DOMContentLoaded", function () {
  /**
     * TODO panel des données
     */
  document.querySelector("#ChargerData").addEventListener("click", function () {
    document.querySelector("#info_reset").classList.remove("btn-primary");
    document.querySelector("#info_reset").classList.add("btn-danger");
    document.querySelector("#ChargerData").classList.remove("btn-primary");
    document.querySelector("#ChargerData").classList.add("btn-success");
    var panel = L.control.panelLayers();

    // var json_options={
    //     body:json_data,
    //     headers:{
    //         "Accpet":"application/json",
    //         "Content-Type":"application/json"
    //     },
    //     method:"POST"
    // };

    /**
         * TODO technique fetch, async et await (JSON.parse() ou JSON.stringify() pour convertir les datas en json)
         * @param {*} url 
         * @returns 
         */

    async function chargerDonnees(url) {
      var resp = await fetch(url);
      var response = await resp.json();
      return response;
    }

    //departement centroid

    chargerDonnees("./02_page_leaflet/json/departement_centroid.json")
      .then(function (response) {
        // console.log(response);
        panel.addOverlay({
          name: `<span style="padding-right:20px;color:orange;">Centroïds</span>`,
          icon: '<i class="icon icon-orange"></i>',
          layer: L.geoJSON(response, {
            pointToLayer: function (feature, coordinates) {
              return L.marker(coordinates, {
                icon: icoOrange,
              });
            },
            onEachFeature: function (feature, layer) {
              var popupContent =
                '<center><p><span class="marker_perso">Latitude</span>: ' +
                feature.properties.latitude;
              popupContent +=
                '</p><p><span class="marker_perso">Longitude</span>: ' +
                feature.properties.longitude;
              popupContent +=
                '</p><p><span class="marker_perso">Insee </span>: ' +
                feature.properties.insee_dep;
              popupContent +=
                '</p><p><span class="marker_perso">Nom </span>: ' +
                feature.properties.nom_departement;
              popupContent += "</p></center>";
              layer.bindPopup(popupContent);
            },
          }),
        });
        //personnel
        return chargerDonnees("./02_page_leaflet/json/departement.json");
      })
      .then(function (response) {
        // console.log(response);
        panel.addOverlay({
          name: `<span style="padding-right:auto;color:tomato;">Departement</span>`,
          layer: L.geoJSON(response, {
            style: function (feature) {
              return {
                fillColor: "green",
                weight: 2,
                opacity: 1,
                color: "white",
                dashArray: "3",
                fillOpacity: 0.7,
              };
            },

            onEachFeature: function (feature, layer) {
              layer.bindPopup(
                "<center><h3>" +
                  feature.properties.insee_dep +
                  "</h3><p>nom: " +
                  feature.properties.nom_departement +
                  "</p></center>"
              );

              layer.on({
                mouseover: function (e) {
                  var layer = e.target;

                  this.setStyle({
                    weight: 5,
                    color: "#666",
                    dashArray: "",
                    fillOpacity: 0.7,
                    fillColor: "tomato",
                  });

                  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                    layer.bringToFront();
                  } // Permet de garantir que le pays est au-dessus des autres couches de données

                  // info.update(layer.feature.properties);
                },

                mouseout: function () {
                  this.setStyle({
                    weight: 2,
                    color: "white",
                    opacity: 1,
                    dashArray: "3",
                    fillOpacity: 0.7,
                    fillColor: "green",
                  });
                },

                click: function (e) {
                  map.fitBounds(e.target.getBounds());
                },
              });
            },
          }),
        });

        // chargement des regions
        return chargerDonnees("./02_page_leaflet/json/region.json");
      })
      .then(function (response) {
        // console.log(response);
        panel.addOverlay({
          name: "Region",
          layer: L.geoJSON(response, {
            style: function (feature) {
              return {
                fillColor: "white",
                weight: 2,
                opacity: 1,
                color: "green",
                dashArray: "3",
                fillOpacity: 0.7,
              };
            },

            onEachFeature: function (feature, layer) {
              layer.bindPopup(
                "<center><h3>" +
                  feature.properties.insee_reg +
                  "</h3><p>nom: " +
                  feature.properties.nom_region +
                  "</p></center>"
              );

              layer.on({
                mouseover: function (e) {
                  var layer = e.target;
                  layer.setStyle({
                    weight: 5,
                    color: "#666",
                    dashArray: "",
                    fillOpacity: 0.7,
                    fillColor: "tomato",
                  });

                  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                    layer.bringToFront(); // Permet de garantir que le pays est au-dessus des autres couches de données
                  }

                  // info.update(layer.feature.properties);
                },
                mouseout: function () {
                  this.setStyle({
                    weight: 2,
                    color: "green",
                    opacity: 1,
                    dashArray: "3",
                    fillOpacity: 0.7,
                    fillColor: "white",
                  });
                },
                click: function (e) {
                  map.fitBounds(e.target.getBounds());
                },
              });
            },
          }),
        });
      });
    addOjectOnMap(panel, map);
  });
});
