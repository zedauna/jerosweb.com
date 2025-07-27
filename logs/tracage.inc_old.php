<?php
// Fonctions
function getIpAddress()
{
    $ipAddress = '';
    if (! empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ipAddress = $_SERVER['HTTP_CLIENT_IP'];
    } else if (! empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ipAddressList = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        foreach ($ipAddressList as $ip) {
            if (! empty($ip)) {
                $ipAddress = $ip;
                break;
            }
        }
    } else if (! empty($_SERVER['HTTP_X_FORWARDED'])) {
        $ipAddress = $_SERVER['HTTP_X_FORWARDED'];
    } else if (! empty($_SERVER['HTTP_X_CLUSTER_CLIENT_IP'])) {
        $ipAddress = $_SERVER['HTTP_X_CLUSTER_CLIENT_IP'];
    } else if (! empty($_SERVER['HTTP_FORWARDED_FOR'])) {
        $ipAddress = $_SERVER['HTTP_FORWARDED_FOR'];
    } else if (! empty($_SERVER['HTTP_FORWARDED'])) {
        $ipAddress = $_SERVER['HTTP_FORWARDED'];
    } else if (! empty($_SERVER['REMOTE_ADDR'])) {
        $ipAddress = $_SERVER['REMOTE_ADDR'];
    }
    return $ipAddress;
}

function getUserIP(){
    if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
            $_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
            $_SERVER['HTTP_CLIENT_IP'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
    }
    $client  = @$_SERVER['HTTP_CLIENT_IP'];
    $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    $remote  = $_SERVER['REMOTE_ADDR'];

    if(filter_var($client, FILTER_VALIDATE_IP))
    {
        $ip = $client;
    }
    elseif(filter_var($forward, FILTER_VALIDATE_IP))
    {
        $ip = $forward;
    }
    else
    {
        $ip = $remote;
    }
    return $ip;
}

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
        . '"'.$httpUserAgent.'"'
        . ""
        ."\n" ;

fputs($myFile,$txt_log);
fclose($myFile);
