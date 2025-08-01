<!-- <?php include './logs/tracage.inc.php' ?> -->
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="jerosweb.com / Jeros VIGAN" />
    <meta name="keywords"
        content="HTML, CSS, JavaScript, Leaflet, routing, geolib.js, turf.js, buffer,SIG , SVG, Postgis">
    <meta name="description" content="Application WebMapping sur un fond carte Leaflet avec possibilité de rounting">
    <title>SIG WEBMAPPING : LEAFLET </title>
    <!--Bootstrap-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="./commun/js/libs/leaflet/leaflet.css" />

    <!-- plugin plein ecran -->
    <link rel="stylesheet" type="text/css" href="./commun/js/libs/plugin_leaflet/fullscreen/Control.FullScreen.css" />
    <!-- plugin betterscale -->
    <link rel="stylesheet" type="text/css" href="./commun/js/libs/plugin_leaflet/better_scale/L.Control.BetterScale.css" />
    <!-- plugin leaflet-control-geocoder -->
    <link rel="stylesheet" type="text/css" href="./commun/js/libs/plugin_leaflet/control_geocoder/dist/Control.Geocoder.css" />
    <!-- plugin home -->
    <link rel="stylesheet" type="text/css" href="./commun/js/libs/plugin_leaflet/home/leaflet.defaultextent.css" />
    <!-- plugin Locate Me -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" type="text/css" href="./commun/js/libs/plugin_leaflet/locale_Me/dist/L.Control.Locate.min.css" />
    <!-- plugin Machine routine -->
    <link rel="stylesheet" type="text/css" href="./commun/js/libs/plugin_leaflet/routing_machine/leaflet-routing-machine.css" />
    <!-- plugin panel -->
    <link rel="stylesheet" type="text/css" href="./commun/js/libs/plugin_leaflet/panel/leaflet-panel-layers.min.css" />
    <!-- plugin MiniMap -->
    <link rel="stylesheet" href="./commun/js/libs/plugin_leaflet/MiniMap/Control.MiniMap.min.css" />
    <!-- plugin notify -->
    <link rel="stylesheet" href="./commun/js/libs/notify/notyf.min.css">
    <!--Perso-->
    <link rel="stylesheet" href="./commun/css/grid.css">
    <link rel="stylesheet" href="./02_page_leaflet/css/style.css">

    <!-- Google tag (gtag.js) 21/12/2023-->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-7V3VDCF3PS"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-7V3VDCF3PS');
    </script>

</head>

<body>
    <?php require './commun/php/menu_accessibilite_leaflet.php';?>
    <!-- positions -->
    <aside class="sidebarHoz" id="barreHoz">
        <?php require './commun/php/position_leaflet.php';?>
    </aside>

    <div id="contenu_principal">
        <header class="header">
            <!-- header -->
            <div class="row">
                <div class="col-12">
                    <?php require './02_page_leaflet/menu_leaflet.php'?>
                </div>
            </div>
            <!-- nav d'ergonomie -->
            <div class="row">
                <?php require './commun/php/menu_call_function_leaflet.php';?>
            </div>

        </header>

        <div class="body">
            <!-- section -->
            <div class="row section_map">
                <!-- sidebar -->
                <div class="col-4 w-30">
                    <?php require './commun/php/sidebar_function_leaflet.php';?>
                </div>
                <!-- Loading map -->
                <div class="col-8 map">
                    <div id="map">
                        <div class="leaflet-control coordinate"></div>
                    </div>
                </div>
            </div>
        </div>
    
        <footer class="footer">
            <!-- footer -->
            <?php require './commun/php/footer.php';?>
        </footer>
        <!-- bootstrap && jquery.js-->
        <script src="https://code.jquery.com/jquery-3.6.0.slim.js"
            integrity="sha256-HwWONEZrpuoh951cQD1ov2HUK5zA5DwJ1DNUXaM6FsY=" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous">
        </script>

        <!-- Leaflet.js-->
        <script type="text/javascript" src="./commun/js/libs/leaflet/leaflet.js"></script>
        <!-- plugin fullscreen -->
        <script type="text/javascript" src="./commun/js/libs/plugin_leaflet/fullscreen/Control.FullScreen.js"></script>
        <!-- plugin betterscale -->
        <script type="text/javascript" src="./commun/js/libs/plugin_leaflet/better_scale/L.Control.BetterScale.js"></script>
        <!-- plugin leaflet-control-geocoder -->
        <script type="text/javascript" src="./commun/js/libs/plugin_leaflet/control_geocoder/dist/Control.Geocoder.js"></script>
        <!-- plugin leaflet-home -->
        <script type="text/javascript" src="./commun/js/libs/plugin_leaflet/home/leaflet.defaultextent.js"></script>
        <!-- plugin locate me -->
        <script type="text/javascript" src="./commun/js/libs/plugin_leaflet/locale_Me/dist/L.Control.Locate.min.js"></script>
        <!-- plugin Machine routine && GraphHopper  -->
        <script type="text/javascript" src="./commun/js/libs/plugin_leaflet/routing_machine/leaflet-routing-machine.min.js">
        </script>
        <script type="text/javascript" src="./commun/js/libs/plugin_leaflet/routing_machine/lrm-graphhopper-1.2.0.min.js">
        </script>
        <!-- plugin leaflet_panel -->
        <script type="text/javascript" src="./commun/js/libs/plugin_leaflet/panel/leaflet-panel-layers.min.js"></script>
        <!-- plugin MiniMap -->
        <script type="text/javascript" src="./commun/js/libs/plugin_leaflet/MiniMap/Control.MiniMap.min.js"></script>
        <!-- plugin easyPrint -->
        <script type="text/javascript" src="./commun/js/libs/plugin_leaflet/easyPrint/bundle.js"></script>
        <script src="./commun/js/libs/geolib/geolib.min.js"></script>
        <script src="./commun/js/libs/turf/turf.min.js"></script>
        <script src="./commun/js/libs/terraformer/leaflet-omnivore.min.js"></script>
        <script src="./commun/js/libs/notify/notyf.min.js"></script>
        <script src="./commun/js/libs/drag/interact.min.js"></script>
        <script src="./commun/js/libs/velocity/velocity.min.js"></script>
        <script src="./commun/js/libs/velocity/velocity.ui.min.js"></script>
        <script src="./commun/js/libs/snowflakes/snowflakes.min.js"></script>

        <!--fichiers javascripts Perso-->
        <script src="./02_page_leaflet/js/color.min.js"></script>
        <script defer type="module" src="./02_page_leaflet/js/app.min.js"> </script>
        <script defer type="module" src="./02_page_leaflet/js/map.min.js"> </script>
        <script defer type="module" src="./02_page_leaflet/js/layer.min.js"> </script>
        <script defer type="module" src="./02_page_leaflet/js/interaction_fetch.min.js"> </script>
        <script defer type="module" src="./02_page_leaflet/js/main.min.js"> </script>
</body>

</html>