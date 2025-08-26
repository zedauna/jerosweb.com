// Dictionnaire des differentes couches de fond de carte
let coucheOSM = {
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  options: {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  variants: {
    Mapnik: {},
    DE: {
      url: "https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png",
      options: {
        maxZoom: 18,
      },
    },
    CH: {
      url: "https://tile.osm.ch/switzerland/{z}/{x}/{y}.png",
      options: {
        maxZoom: 18,
        bounds: [
          [45, 5],
          [48, 11],
        ],
      },
    },
    France: {
      url: "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
      options: {
        maxZoom: 20,
        attribution:
          "&copy; OpenStreetMap France | {attribution.OpenStreetMap}",
      },
    },
    HOT: {
      url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
      options: {
        attribution:
          "{attribution.OpenStreetMap}, " +
          'Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> ' +
          'hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
      },
    },
    BZH: {
      url: "https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png",
      options: {
        attribution:
          '{attribution.OpenStreetMap}, Tiles courtesy of <a href="http://www.openstreetmap.bzh/" target="_blank">Breton OpenStreetMap Team</a>',
        bounds: [
          [46.2, -5.5],
          [50, 0.7],
        ],
      },
    },
  },
};

let coucheOSM_France = {
  url: "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",

  maxZoom: 20,

  attribution:
    '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

let coucheOpenTopoMap = {
  url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",

  maxZoom: 17,

  attribution:
    'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
};

let coucheCyclOSM = {
  url: "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",

  maxZoom: 20,

  attribution:
    '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

let layerOSM = {
  url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",

  attribution:
    '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
};

let layerOSMNB = {
  url: "http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png",

  attribution:
    '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
};

let layerSatellite = {
  url: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",

  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
};

let Stamen = {
  url: "https://stamen-tiles-{s}.a.ssl.fastly.net/{variant}/{z}/{x}/{y}{r}.{ext}",
  options: {
    attribution:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
      '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' +
      "Map data {attribution.OpenStreetMap}",
    subdomains: "abcd",
    minZoom: 0,
    maxZoom: 20,
    variant: "toner",
    ext: "png",
  },
  variants: {
    Toner: "toner",
    TonerBackground: "toner-background",
    TonerHybrid: "toner-hybrid",
    TonerLines: "toner-lines",
    TonerLabels: "toner-labels",
    TonerLite: "toner-lite",
    Watercolor: {
      url: "https://stamen-tiles-{s}.a.ssl.fastly.net/{variant}/{z}/{x}/{y}.{ext}",
      options: {
        variant: "watercolor",
        ext: "jpg",
        minZoom: 1,
        maxZoom: 16,
      },
    },
    Terrain: {
      options: {
        variant: "terrain",
        minZoom: 0,
        maxZoom: 18,
      },
    },
    TerrainBackground: {
      options: {
        variant: "terrain-background",
        minZoom: 0,
        maxZoom: 18,
      },
    },
    TerrainLabels: {
      options: {
        variant: "terrain-labels",
        minZoom: 0,
        maxZoom: 18,
      },
    },
    TopOSMRelief: {
      url: "https://stamen-tiles-{s}.a.ssl.fastly.net/{variant}/{z}/{x}/{y}.{ext}",
      options: {
        variant: "toposm-color-relief",
        ext: "jpg",
        bounds: [
          [22, -132],
          [51, -56],
        ],
      },
    },
    TopOSMFeatures: {
      options: {
        variant: "toposm-features",
        bounds: [
          [22, -132],
          [51, -56],
        ],
        opacity: 0.9,
      },
    },
  },
};

let Esri = {
  url: "https://server.arcgisonline.com/ArcGIS/rest/services/{variant}/MapServer/tile/{z}/{y}/{x}",
  options: {
    variant: "World_Street_Map",
    attribution: "Tiles &copy; Esri",
  },
  variants: {
    WorldStreetMap: {
      options: {
        attribution:
          "{attribution.Esri} &mdash; " +
          "Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012",
      },
    },
    DeLorme: {
      options: {
        variant: "Specialty/DeLorme_World_Base_Map",
        minZoom: 1,
        maxZoom: 11,
        attribution: "{attribution.Esri} &mdash; Copyright: &copy;2012 DeLorme",
      },
    },
    WorldTopoMap: {
      options: {
        variant: "World_Topo_Map",
        attribution:
          "{attribution.Esri} &mdash; " +
          "Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community",
      },
    },
    WorldImagery: {
      options: {
        variant: "World_Imagery",
        attribution:
          "{attribution.Esri} &mdash; " +
          "Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
      },
    },
    WorldTerrain: {
      options: {
        variant: "World_Terrain_Base",
        maxZoom: 13,
        attribution:
          "{attribution.Esri} &mdash; " +
          "Source: USGS, Esri, TANA, DeLorme, and NPS",
      },
    },
    WorldShadedRelief: {
      options: {
        variant: "World_Shaded_Relief",
        maxZoom: 13,
        attribution: "{attribution.Esri} &mdash; Source: Esri",
      },
    },
    WorldPhysical: {
      options: {
        variant: "World_Physical_Map",
        maxZoom: 8,
        attribution:
          "{attribution.Esri} &mdash; Source: US National Park Service",
      },
    },
    OceanBasemap: {
      options: {
        variant: "Ocean_Basemap",
        maxZoom: 13,
        attribution:
          "{attribution.Esri} &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri",
      },
    },
    NatGeoWorldMap: {
      options: {
        variant: "NatGeo_World_Map",
        maxZoom: 16,
        attribution:
          "{attribution.Esri} &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC",
      },
    },
    WorldGrayCanvas: {
      options: {
        variant: "Canvas/World_Light_Gray_Base",
        maxZoom: 16,
        attribution: "{attribution.Esri} &mdash; Esri, DeLorme, NAVTEQ",
      },
    },
  },
};

let Esri_WorldStreetMap = {
  url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",

  attribution:
    "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012",
};

let Esri_WorldImagery = {
  url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",

  attribution:
    "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
};

let MapBox = {
  url: "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
  options: {
    attribution:
      '&copy; <a href="https://www.mapbox.com/about/maps/" target="_blank">Mapbox</a> ' +
      "{attribution.OpenStreetMap} " +
      '<a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a>',
    tileSize: 512,
    // maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
  },
};

let MapTiler = {
  url: "https://api.maptiler.com/maps/{variant}/{z}/{x}/{y}{r}.{ext}?key={key}",
  options: {
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    variant: "streets",
    ext: "png",
    key: "<insert your MapTiler Cloud API key here>",
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 0,
    maxZoom: 21,
  },
  variants: {
    Streets: "streets",
    Basic: "basic",
    Bright: "bright",
    Pastel: "pastel",
    Positron: "positron",
    Hybrid: {
      options: {
        variant: "hybrid",
        ext: "jpg",
      },
    },
    Toner: "toner",
    Topo: "topo",
    Voyager: "voyager",
  },
};

let GeoportailFrance = {
  url: "https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER={variant}&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
  options: {
    attribution:
      '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
    bounds: [
      [-75, -180],
      [81, 180],
    ],
    minZoom: 2,
    maxZoom: 18,
    // Get your own geoportail apikey here : http://professionnels.ign.fr/ign/contrats/
    // NB : 'choisirgeoportail' is a demonstration key that comes with no guarantee
    apikey: "choisirgeoportail",
    format: "image/png",
    style: "normal",
    variant: "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2",
  },
  variants: {
    plan: "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2",
    parcels: {
      options: {
        variant: "CADASTRALPARCELS.PARCELLAIRE_EXPRESS",
        style: "PCI vecteur",
        maxZoom: 20,
      },
    },
    orthos: {
      options: {
        maxZoom: 19,
        format: "image/jpeg",
        variant: "ORTHOIMAGERY.ORTHOPHOTOS",
      },
    },
  },
};

let cycle = {
  url: "https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}{r}.png?apikey=7c352c8ff1244dd8b732e349e0b0fe8d",
  options: {
    attribution:
      'Maps &copy; <a href="https://www.thunderforest.com">Thunderforest</a>, Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',

    maxZoom: 22,
  },
};

let transport = {
  url: "https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}{r}.png?apikey=7c352c8ff1244dd8b732e349e0b0fe8d",
  options: {
    attribution:
      'Maps &copy; <a href="https://www.thunderforest.com">Thunderforest</a>, Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',

    maxZoom: 22,
  },
};

let transport_dark = {
  url: "https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}{r}.png?apikey=7c352c8ff1244dd8b732e349e0b0fe8d",
  options: {
    attribution:
      'Maps &copy; <a href="https://www.thunderforest.com">Thunderforest</a>, Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',

    maxZoom: 22,
  },
};

let OneMapSG = {
  url: "https://maps-{s}.onemap.sg/v3/{variant}/{z}/{x}/{y}.png",
  options: {
    variant: "Default",
    minZoom: 11,
    maxZoom: 18,
    bounds: [
      [1.56073, 104.11475],
      [1.16, 103.502],
    ],
    attribution:
      '<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> New OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>',
  },
  variants: {
    Default: "Default",
    Night: "Night",
    Original: "Original",
    Grey: "Grey",
    LandLot: "LandLot",
  },
};

let USGS = {
  url: "https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}",
  options: {
    maxZoom: 20,
    attribution:
      'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
  },
  variants: {
    USTopo: {},
    USImagery: {
      url: "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}",
    },
    USImageryTopo: {
      url: "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}",
    },
  },
};

let WaymarkedTrails = {
  url: "https://tile.waymarkedtrails.org/{variant}/{z}/{x}/{y}.png",
  options: {
    maxZoom: 18,
    attribution:
      'Map data: {attribution.OpenStreetMap} | Map style: &copy; <a href="https://waymarkedtrails.org">waymarkedtrails.org</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  },
  variants: {
    hiking: "hiking",
    cycling: "cycling",
    mtb: "mtb",
    slopes: "slopes",
    riding: "riding",
    skating: "skating",
  },
};

let AzureMaps = {
  url:
    "https://atlas.microsoft.com/map/tile?api-version={apiVersion}" +
    "&tilesetId={variant}&x={x}&y={y}&zoom={z}&language={language}" +
    "&subscription-key={subscriptionKey}",
  options: {
    attribution:
      "See https://docs.microsoft.com/en-US/rest/api/maps/renderv2/getmaptilepreview for details.",
    apiVersion: "2.0",
    variant: "microsoft.imagery",
    subscriptionKey: "<insert your subscription key here>",
    language: "en-US",
  },
  variants: {
    MicrosoftImagery: "microsoft.imagery",
    MicrosoftBaseDarkGrey: "microsoft.base.darkgrey",
    MicrosoftBaseRoad: "microsoft.base.road",
    MicrosoftBaseHybridRoad: "microsoft.base.hybrid.road",
    MicrosoftTerraMain: "microsoft.terra.main",
    MicrosoftWeatherInfraredMain: {
      url:
        "https://atlas.microsoft.com/map/tile?api-version={apiVersion}" +
        "&tilesetId={variant}&x={x}&y={y}&zoom={z}" +
        "&timeStamp={timeStamp}&language={language}" +
        "&subscription-key={subscriptionKey}",
      options: {
        timeStamp: "2021-05-08T09:03:00Z",
        attribution:
          "See https://docs.microsoft.com/en-US/rest/api/maps/renderv2/getmaptilepreview#uri-parameters for details.",
        variant: "microsoft.weather.infrared.main",
      },
    },
    MicrosoftWeatherRadarMain: {
      url:
        "https://atlas.microsoft.com/map/tile?api-version={apiVersion}" +
        "&tilesetId={variant}&x={x}&y={y}&zoom={z}" +
        "&timeStamp={timeStamp}&language={language}" +
        "&subscription-key={subscriptionKey}",
      options: {
        timeStamp: "2021-05-08T09:03:00Z",
        attribution:
          "See https://docs.microsoft.com/en-US/rest/api/maps/renderv2/getmaptilepreview#uri-parameters for details.",
        variant: "microsoft.weather.radar.main",
      },
    },
  },
};

let Thunderforest = {
  url: "https://{s}.tile.thunderforest.com/{variant}/{z}/{x}/{y}.png?apikey={apikey}",
  options: {
    attribution:
      '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, {attribution.OpenStreetMap}',
    variant: "cycle",
    apikey: "<insert your api key here>",
    maxZoom: 22,
  },
  variants: {
    OpenCycleMap: "cycle",
    Transport: {
      options: {
        variant: "transport",
      },
    },
    TransportDark: {
      options: {
        variant: "transport-dark",
      },
    },
    SpinalMap: {
      options: {
        variant: "spinal-map",
      },
    },
    Landscape: "landscape",
    Outdoors: "outdoors",
    Pioneer: "pioneer",
    MobileAtlas: "mobile-atlas",
    Neighbourhood: "neighbourhood",
  },
};

let HERE = {
  /*
   * HERE maps, formerly Nokia maps.
   * These basemaps are free, but you need an api id and app key. Please sign up at
   * https://developer.here.com/plans
   */
  url:
    "https://{s}.{base}.maps.api.here.com/maptile/2.1/" +
    "{type}/{mapID}/{variant}/{z}/{x}/{y}/{size}/{format}?" +
    "app_id={app_id}&app_code={app_code}&lg={language}",
  options: {
    attribution:
      "Map &copy; 1987-" +
      new Date().getFullYear() +
      ' <a href="http://developer.here.com">HERE</a>',
    subdomains: "1234",
    mapID: "newest",
    app_id: "<insert your app_id here>",
    app_code: "<insert your app_code here>",
    base: "base",
    variant: "normal.day",
    maxZoom: 20,
    type: "maptile",
    language: "eng",
    format: "png8",
    size: "256",
  },
  variants: {
    normalDay: "normal.day",
    normalDayCustom: "normal.day.custom",
    normalDayGrey: "normal.day.grey",
    normalDayMobile: "normal.day.mobile",
    normalDayGreyMobile: "normal.day.grey.mobile",
    normalDayTransit: "normal.day.transit",
    normalDayTransitMobile: "normal.day.transit.mobile",
    normalDayTraffic: {
      options: {
        variant: "normal.traffic.day",
        base: "traffic",
        type: "traffictile",
      },
    },
    normalNight: "normal.night",
    normalNightMobile: "normal.night.mobile",
    normalNightGrey: "normal.night.grey",
    normalNightGreyMobile: "normal.night.grey.mobile",
    normalNightTransit: "normal.night.transit",
    normalNightTransitMobile: "normal.night.transit.mobile",
    reducedDay: "reduced.day",
    reducedNight: "reduced.night",
    basicMap: {
      options: {
        type: "basetile",
      },
    },
    mapLabels: {
      options: {
        type: "labeltile",
        format: "png",
      },
    },
    trafficFlow: {
      options: {
        base: "traffic",
        type: "flowtile",
      },
    },
    carnavDayGrey: "carnav.day.grey",
    hybridDay: {
      options: {
        base: "aerial",
        variant: "hybrid.day",
      },
    },
    hybridDayMobile: {
      options: {
        base: "aerial",
        variant: "hybrid.day.mobile",
      },
    },
    hybridDayTransit: {
      options: {
        base: "aerial",
        variant: "hybrid.day.transit",
      },
    },
    hybridDayGrey: {
      options: {
        base: "aerial",
        variant: "hybrid.grey.day",
      },
    },
    hybridDayTraffic: {
      options: {
        variant: "hybrid.traffic.day",
        base: "traffic",
        type: "traffictile",
      },
    },
    pedestrianDay: "pedestrian.day",
    pedestrianNight: "pedestrian.night",
    satelliteDay: {
      options: {
        base: "aerial",
        variant: "satellite.day",
      },
    },
    terrainDay: {
      options: {
        base: "aerial",
        variant: "terrain.day",
      },
    },
    terrainDayMobile: {
      options: {
        base: "aerial",
        variant: "terrain.day.mobile",
      },
    },
  },
};

let HEREv3 = {
  /*
   * HERE maps API Version 3.
   * These basemaps are free, but you need an API key. Please sign up at
   * https://developer.here.com/plans
   * Version 3 deprecates the app_id and app_code access in favor of apiKey
   *
   * Supported access methods as of 2019/12/21:
   * @see https://developer.here.com/faqs#access-control-1--how-do-you-control-access-to-here-location-services
   */
  url:
    "https://{s}.{base}.maps.ls.hereapi.com/maptile/2.1/" +
    "{type}/{mapID}/{variant}/{z}/{x}/{y}/{size}/{format}?" +
    "apiKey={apiKey}&lg={language}",
  options: {
    attribution:
      "Map &copy; 1987-" +
      new Date().getFullYear() +
      ' <a href="http://developer.here.com">HERE</a>',
    subdomains: "1234",
    mapID: "newest",
    apiKey: "<insert your apiKey here>",
    base: "base",
    variant: "normal.day",
    maxZoom: 20,
    type: "maptile",
    language: "eng",
    format: "png8",
    size: "256",
  },
  variants: {
    normalDay: "normal.day",
    normalDayCustom: "normal.day.custom",
    normalDayGrey: "normal.day.grey",
    normalDayMobile: "normal.day.mobile",
    normalDayGreyMobile: "normal.day.grey.mobile",
    normalDayTransit: "normal.day.transit",
    normalDayTransitMobile: "normal.day.transit.mobile",
    normalNight: "normal.night",
    normalNightMobile: "normal.night.mobile",
    normalNightGrey: "normal.night.grey",
    normalNightGreyMobile: "normal.night.grey.mobile",
    normalNightTransit: "normal.night.transit",
    normalNightTransitMobile: "normal.night.transit.mobile",
    reducedDay: "reduced.day",
    reducedNight: "reduced.night",
    basicMap: {
      options: {
        type: "basetile",
      },
    },
    mapLabels: {
      options: {
        type: "labeltile",
        format: "png",
      },
    },
    trafficFlow: {
      options: {
        base: "traffic",
        type: "flowtile",
      },
    },
    carnavDayGrey: "carnav.day.grey",
    hybridDay: {
      options: {
        base: "aerial",
        variant: "hybrid.day",
      },
    },
    hybridDayMobile: {
      options: {
        base: "aerial",
        variant: "hybrid.day.mobile",
      },
    },
    hybridDayTransit: {
      options: {
        base: "aerial",
        variant: "hybrid.day.transit",
      },
    },
    hybridDayGrey: {
      options: {
        base: "aerial",
        variant: "hybrid.grey.day",
      },
    },
    pedestrianDay: "pedestrian.day",
    pedestrianNight: "pedestrian.night",
    satelliteDay: {
      options: {
        base: "aerial",
        variant: "satellite.day",
      },
    },
    terrainDay: {
      options: {
        base: "aerial",
        variant: "terrain.day",
      },
    },
    terrainDayMobile: {
      options: {
        base: "aerial",
        variant: "terrain.day.mobile",
      },
    },
  },
};

let CartoDB = {
  url: "https://{s}.basemaps.cartocdn.com/{variant}/{z}/{x}/{y}{r}.png",
  options: {
    attribution:
      '{attribution.OpenStreetMap} &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 19,
    variant: "light_all",
  },
  variants: {
    Positron: "light_all",
    PositronNoLabels: "light_nolabels",
    PositronOnlyLabels: "light_only_labels",
    DarkMatter: "dark_all",
    DarkMatterNoLabels: "dark_nolabels",
    DarkMatterOnlyLabels: "dark_only_labels",
    Voyager: "rastertiles/voyager",
    VoyagerNoLabels: "rastertiles/voyager_nolabels",
    VoyagerOnlyLabels: "rastertiles/voyager_only_labels",
    VoyagerLabelsUnder: "rastertiles/voyager_labels_under",
  },
};

let NASAGIBS = {
  url: "https://map1.vis.earthdata.nasa.gov/wmts-webmerc/{variant}/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}",
  options: {
    attribution:
      "Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System " +
      '(<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
    bounds: [
      [-85.0511287776, -179.999999975],
      [85.0511287776, 179.999999975],
    ],
    minZoom: 1,
    maxZoom: 9,
    format: "jpg",
    time: "",
    tilematrixset: "GoogleMapsCompatible_Level",
  },
  variants: {
    ModisTerraTrueColorCR: "MODIS_Terra_CorrectedReflectance_TrueColor",
    ModisTerraBands367CR: "MODIS_Terra_CorrectedReflectance_Bands367",
    ViirsEarthAtNight2012: {
      options: {
        variant: "VIIRS_CityLights_2012",
        maxZoom: 8,
      },
    },
    ModisTerraLSTDay: {
      options: {
        variant: "MODIS_Terra_Land_Surface_Temp_Day",
        format: "png",
        maxZoom: 7,
        opacity: 0.75,
      },
    },
    ModisTerraSnowCover: {
      options: {
        variant: "MODIS_Terra_NDSI_Snow_Cover",
        format: "png",
        maxZoom: 8,
        opacity: 0.75,
      },
    },
    ModisTerraAOD: {
      options: {
        variant: "MODIS_Terra_Aerosol",
        format: "png",
        maxZoom: 6,
        opacity: 0.75,
      },
    },
    ModisTerraChlorophyll: {
      options: {
        variant: "MODIS_Terra_Chlorophyll_A",
        format: "png",
        maxZoom: 7,
        opacity: 0.75,
      },
    },
  },
};

let OpenWeatherMap = {
  url: "http://{s}.tile.openweathermap.org/map/{variant}/{z}/{x}/{y}.png?appid={apiKey}",
  options: {
    maxZoom: 19,
    attribution:
      'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
    apiKey: "<insert your api key here>",
    opacity: 0.5,
  },
  variants: {
    Clouds: "clouds",
    CloudsClassic: "clouds_cls",
    Precipitation: "precipitation",
    PrecipitationClassic: "precipitation_cls",
    Rain: "rain",
    RainClassic: "rain_cls",
    Pressure: "pressure",
    PressureContour: "pressure_cntr",
    Wind: "wind",
    Temperature: "temp",
    Snow: "snow",
  },
};

// definition des fonds des cartes (à partir des couches de app.js)
// Gérer les controles (filtres)
export let controlerCarte = {
  OpenStreetMap: L.tileLayer(coucheOSM.url, coucheOSM.options),
  "OpenStreetMap France": L.tileLayer(
    coucheOSM_France.url,
    coucheOSM_France.options
  ),
  OpenTopoMap: L.tileLayer(coucheOpenTopoMap.url, coucheOpenTopoMap.options),
  Satellite: L.tileLayer(layerSatellite.url, layerSatellite.options),
  Cycle: L.tileLayer(cycle.url, cycle.options),
  transport: L.tileLayer(transport.url, transport.options),
  transport_dark: L.tileLayer(transport_dark.url, transport_dark.options),
  // "MapTiler": L.tileLayer(MapTiler.url, MapTiler.options),
  MapBox: L.tileLayer(MapBox.url, MapBox.options),
  GeoportailFrance: L.tileLayer(GeoportailFrance.url, GeoportailFrance.options),
  OneMapSG: L.tileLayer(OneMapSG.url, OneMapSG.options),
  USGS: L.tileLayer(USGS.url, USGS.options),
  WaymarkedTrails: L.tileLayer(WaymarkedTrails.url, WaymarkedTrails.options),
  AzureMaps: L.tileLayer(AzureMaps.url, AzureMaps.options),
  Thunderforest: L.tileLayer(Thunderforest.url, Thunderforest.options),
  HERE: L.tileLayer(HERE.url, HERE.options),
  HEREv3: L.tileLayer(HEREv3.url, HEREv3.options),
  CartoDB: L.tileLayer(CartoDB.url, CartoDB.options),
  NASAGIBS: L.tileLayer(NASAGIBS.url, NASAGIBS.options),
  Esri: L.tileLayer(Esri.url, Esri.options),
  Stamen: L.tileLayer(Stamen.url, Stamen.options),
  OpenWeatherMap: L.tileLayer(OpenWeatherMap.url, OpenWeatherMap.options),
};

export let controlerCarteCopy = {
  OpenStreetMap: L.tileLayer(coucheOSM.url, coucheOSM.options),
  "OpenStreetMap France": L.tileLayer(
    coucheOSM_France.url,
    coucheOSM_France.options
  ),
  OpenTopoMap: L.tileLayer(coucheOpenTopoMap.url, coucheOpenTopoMap.options),
  Satellite: L.tileLayer(layerSatellite.url, layerSatellite.options),
  Esri_WorldStreetMap: L.tileLayer(
    Esri_WorldStreetMap.url,
    Esri_WorldStreetMap.options
  ),
  Esri_WorldImagery: L.tileLayer(
    Esri_WorldImagery.url,
    Esri_WorldImagery.options
  ),
  Cycle: L.tileLayer(cycle.url, cycle.options),
  transport: L.tileLayer(transport.url, transport.options),
  transport_dark: L.tileLayer(transport_dark.url, transport_dark.options),
  // "MapTiler": L.tileLayer(MapTiler.url, MapTiler.options),
  MapBox: L.tileLayer(MapBox.url, MapBox.options),
  GeoportailFrance: L.tileLayer(GeoportailFrance.url, GeoportailFrance.options),
  OneMapSG: L.tileLayer(OneMapSG.url, OneMapSG.options),
  USGS: L.tileLayer(USGS.url, USGS.options),
  WaymarkedTrails: L.tileLayer(WaymarkedTrails.url, WaymarkedTrails.options),
  AzureMaps: L.tileLayer(AzureMaps.url, AzureMaps.options),
  Thunderforest: L.tileLayer(Thunderforest.url, Thunderforest.options),
  HERE: L.tileLayer(HERE.url, HERE.options),
  HEREv3: L.tileLayer(HEREv3.url, HEREv3.options),
  CartoDB: L.tileLayer(CartoDB.url, CartoDB.options),
  NASAGIBS: L.tileLayer(NASAGIBS.url, NASAGIBS.options),
  Esri: L.tileLayer(Esri.url, Esri.options),
  Stamen: L.tileLayer(Stamen.url, Stamen.options),
  OpenWeatherMap: L.tileLayer(OpenWeatherMap.url, OpenWeatherMap.options),
};
