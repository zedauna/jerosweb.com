<?php
$page = isset($_GET['page']) ? $_GET['page'] : 'home';
// var_dump($page);
// die();
switch ($page) {
    case 'home':
        require_once 'cv/index.php';
        break;
    case 'svg':
        require_once '01_page_svg/index.php';
        break;
// page_svg_v2
    case 'svg_v2':
        require_once '02_page_svg_v2/index.php';
        break;
// page leaflet
    case 'leaflet':
        require_once '02_page_leaflet/index.php';
        break;
// cv
    case 'cv':
        require_once 'cv/index.php';
        break;
// data analys
    case 'projet_r':
        require_once 'data_analyst/analyse_modelisation.html';
        break;
    case 'projet_py':
        require_once 'data_analyst/Projet-DataScience-Machine Learning.html';
        break;
//Logs
    case 'logs':
        require_once 'logs/tracage.inc.php';
        break;
    default:
        http_response_code(404);
        echo "Page non trouvée.";
        break;
}
