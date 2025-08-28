<?php
require_once("get_data.php");

// enregistrement du traçage de l'activité sur le site web
$fichierCible = dirname(__FILE__) . '\tracage_'.date('Ymd').'.log';
$myFile=fopen($fichierCible,'a+');

$referer = null;
if (isset($_SERVER['HTTP_REFERER'])) {
    $referer = $_SERVER['HTTP_REFERER'];
}

$httpUserAgent = null;
if (isset($_SERVER['HTTP_USER_AGENT'])) {
    $httpUserAgent = $_SERVER['HTTP_USER_AGENT'];
}

$txt_log=getIpAddress() .';'
        .getUserIP() .';'
        . getHostByName(php_uname('n')).';'
        . getHostByName(getHostName()).';'
        . gethostbyname(trim(exec("hostname"))).';'
        . gethostbyaddr($_SERVER['REMOTE_ADDR']).';'
        . date('d/m/Y H:i:s').';'
        . $_SERVER['REQUEST_URI'] .';'
        . '"'.$referer .'"' .';'
        . '"'.$httpUserAgent.'";'
        . $arr["ville"].";"
        . $arr["region"].";"
        . $arr["pays"].";"
        . $arr["capital"].";"
        . $arr["latitude"].";"
        . $arr["longitude"].";"
        . $arr["postal"].";"
        . $arr["continent"].";"
        . $arr["timezone"].";"
        . $arr["current_time"].";"
        . $arr["utc"].";"
        . $arr["domain"].";"
        . $arr["org"].";"
        . $arr["flag_emoji"].";"
        . ""
        ."\n" ;

fputs($myFile,$txt_log);
fclose($myFile);
