/**
 *fichier
 */

// Fonction de création de la carte
/**
 *@function createMap
 *@param string Container
 *@param float lat
 *@param float lng
 *@param number zoom
 *@return leaflet map
 */

export function createMap(container, lat, lng, zoom) {
  let map = L.map(container).setView([lat, lng], zoom);
  return map;
}

//Fonction d'ajout des object
/**
 *@function addOjectOnMap
 *@param leaflet object
 *@param leaflet map
 */

export function addOjectOnMap(object, map) {
  object.addTo(map);
}

//Fonction d'ajout des object
/**
 *@function removeOjectOnMap
 *@param leaflet object
 *@param leaflet map
 */
export function removeOjectOnMap(object, map) {
  object.remove(map);
}

// Fonction d'ajout des fonds de cartes
/**
 *@function createTilesLayer
 *@param string layerurl
 *@return leaflet layer
 */

export function createTilesLayer(layerUrl, layerOptions) {
  let layer = L.tileLayer(layerUrl, {
    maxZoom: layerOptions.maxZoom,
    attribution: layerOptions.attribution,
    id: layerOptions.id,
    tileSize: layerOptions.tileSize,
    zoomOffset: layerOptions.zoomOffset,
  });
  return layer;
}

//Fonction d'ajout des marqueurs
/**
 *@function createMarker
 *@param string text
 *@param float lat
 *@param float lng
 *@return leaflet marker
 */

export function createMarker([lat, lng], text, options = {}) {
  let markerOptions = {};
  let icon = "";
  if (options.draggable === true) {
    markerOptions.draggable = true;
  }

  let marker = L.marker([lat, lng], markerOptions).bindPopup(text).openPopup();
  return marker;
}

//Fonction d'ajout des cercles
/**
 *@function createCircle
 *@param string text
 *@param float lat
 *@param float lng
 *@return leaflet cicrle
 */

export function createCircle(lat, lng, text, options) {
  let layerCircle = L.circleMarker([lat, lng], {
    radius: options.radius,
    color: options.color,
    fillColor: options.fillColor,
    fillOpacity: options.fiilOpacity,
    weight: options.weight,
  }).bindPopup(text);

  return layerCircle;
}

//Fonction d'ajout des icons
/**
 *@function createIcon
 *@param json options
 *@return leaflet icon
 */

export function createIcon(options) {
  let layerIcon = L.icon({
    iconUrl: options.iconUrl,
    iconSize: options.iconSize,
    iconAnchor: options.iconAnchor,
    popupAnchor: options.popupAnchor,
    shadowAnchor: options.shadowAnchor,
    shadowSize: options.shadowSize,
  });
  return layerIcon;
}

//Fonction d'ajout des icons+
/**
 *@function markColor
 *@param string url
 *@return leaflet icon
 */
export function markColor(url) {
  return L.icon({
    iconUrl: url,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });
}

// Fonction d'ajout des JSON
/**
 *@function createGeoJsonLayer
 *@param json geoJsonData
 *@param json layerOptions
 *@return leaflet layer
 */

export function createGeoJsonLayer(geoJsonData, layerOptions = {}) {
  let layer = L.geoJSON(geoJsonData, {
    onEachFeature: function (feature, layer) {
      //console.log(feature);
      //console.log(layer);
      if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
      }
    },
  });
  return layer;
}

// Fonction centre la carte
/**
 *@function CentreMap
 *@param float lat
 *@param float lng
 *@param number zoom
 *@return object leaflet map
 */

export function CentreMap(lat, lng, zoom, map) {
  map.setView([lat, lng], zoom);
}

// Fonction animation flyTo
/**
 *@function MapAnimation
 *@param float lat
 *@param float lng
 *@param number zoom
 *@return object leaflet map
 */

export function MapAnimation(lat, lng, zoom, map) {
  map.flyTo([lat, lng], zoom);
}

// Fonction obtention des coordonnées
/**
 *@function mapInteractionClick
 *@return leaflet event
 */
export function mapInteractionClick(e) {
  // point cliqué
  let latLng = e.latlng;
  //console.log(latLng);
  // les autres points
  let cities = getCities();
  //console.log(cities);
  // Calcul distance

  for (let i = 0; i < cities.length; i++) {
    let from = turf.point([latLng.lat, latLng.lng]);
    let to = turf.point([cities[i].lat, cities[i].lng]);
    let distance = turf.distance(from, to);
    //console.log(distance);
    setCityDistance(cities[i].id, distance);
  }
}
