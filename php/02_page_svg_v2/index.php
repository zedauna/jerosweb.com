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
    <meta name="description" content="Application WebMapping avancé sur un fond carte SVG France">
    <title>SIG WEBMAPPING : SVG AVANCÉ</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
    <link rel="stylesheet" href="./commun/js/libs/notify/notyf.min.css">
    <link rel="stylesheet" href="./commun/css/grid.css">
    <link rel="stylesheet" href="./02_page_svg_v2/css/style.css">

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
    <?php require './commun/php/menu_accessibilite.php';?>
    <!-- barre latérale horizontale-->
    <aside class="sidebarHoz" id="barreHoz">
        <!-- Menu positions -->
        <?php require './commun/php/positions.php';?>
    </aside>
    <!-- barre latérale verticale -->
    <aside class="sidebarVz" id="barreVz">
        <!-- legende -->
        <?php require './commun/php/legende.php';?>
    </aside>
    <!-- contenu principal -->
    <div class="contenu_principal">
        <header class="header">
            <!-- header -->
            <div class="row">
                <div class="col-12">
                    <?php require './02_page_svg_v2/menu_svg_avanc.php';?>
                </div>
            </div>
            <!-- nav d'ergonomie -->
            <div class="row">
                <?php require './commun/php/menu_call_function_svg_avance.php';?>
            </div>
        </header>
        <div class="body">
            <!-- section -->
            <div class="row align-center justify-content-between ">
                <div class="col-md-8">
                    <div class="row align-center">
						<!-- Carte -->
                        <div class="col-12 position-relative perso_div" style="width:90%;">
                            <div class="row align-center">
                                <select class="form-select w-25" aria-label="Default select example" id="choixCarte">
                                    <option value="./02_page_svg_v2/php/map_france.php" selected>FRANCE</option>
                                    <option value="./02_page_svg_v2/php/region_11.php">ILE-DE-FRANCE</option>
                                    <option value="./02_page_svg_v2/php/region_24.php">CENTRE-VAL DE LOIRE</option>
                                    <option value="./02_page_svg_v2/php/region_27.php">BOURGOGNE-FRANCHE-COMTE</option>
                                    <option value="./02_page_svg_v2/php/region_28.php">NORMANDIE</option>
                                    <option value="./02_page_svg_v2/php/region_32.php">HAUTS-DE-FRANCE</option>
                                    <option value="./02_page_svg_v2/php/region_44.php">GRAND EST</option>
                                    <option value="./02_page_svg_v2/php/region_52.php">PAYS DE LA LOIRE</option>
                                    <option value="./02_page_svg_v2/php/region_53.php">BRETAGNE</option>
                                    <option value="./02_page_svg_v2/php/region_75.php">NOUVELLE-AQUITAINE</option>
                                    <option value="./02_page_svg_v2/php/region_76.php">OCCITANIE</option>
                                    <option value="./02_page_svg_v2/php/region_84.php">AUVERGNE-RHONE-ALPES</option>
                                    <option value="./02_page_svg_v2/php/region_93.php">PROVENCE-ALPES-COTE D'AZUR</option>
                                    <option value="./02_page_svg_v2/php/region_94.php">CORSE</option>
                                </select>
                                <!-- chargement Map -->
                                <div class="col-12 svg_container">
                                    <div class="loader_content" id="chargeCarte">
                                        <center><img src="./svg/Spinner-2.gif" alt="loader" class="loader"></center>
                                    </div>
                                </div>
								<!-- controller -->
                                <div class="col-12 position-absolute top-0 end-0 zoom_pan" id="navigation_button">
                                    <?php require './svg/controller.svg'?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- sidebar -->
                <div class="col-md-4 dropzone">
                    <?php require './commun/php/sidebar_function.php';?>
                </div>
            </div>
        </div>
        <footer class="footer">
            <!-- footer -->
            <?php require './commun/php/footer.php';?>
        </footer>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.slim.js"
            integrity="sha256-HwWONEZrpuoh951cQD1ov2HUK5zA5DwJ1DNUXaM6FsY=" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous">
        </script>
        <script src="./commun/js/libs/autocomplete/autocomplete.min.js"></script>
        <script src="./commun/js/libs/geolib/geolib.min.js"></script>
        <script src="./commun/js/libs/turf/turf.min.js"></script>
        <script src="./commun/js/libs/notify/notyf.min.js"></script>
        <script src="./commun/js/libs/drag/interact.min.js"></script>
        <script src="./commun/js/libs/velocity/velocity.min.js"></script>
        <script src="./commun/js/libs/velocity/velocity.ui.min.js"></script>
        <script src="./commun/js/libs/gsap/gsap.min.js"></script>
        <script src="./commun/js/libs/gsap/TweenMax.min.js"></script>
        <script src="./commun/js/libs/gsap/Draggable.min.js"></script>
        <script src="./commun/js/libs/snowflakes/snowflakes.min.js"></script>
        <script src="./02_page_svg_v2/app/color.min.js"></script>
        <script src="./02_page_svg_v2/app/main.min.js"></script>
</body>
</html>