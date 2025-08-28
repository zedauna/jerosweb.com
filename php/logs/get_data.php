<?php 
    // fonctions
    function getIpAddress(){
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

    $ip = getUserIP();
    $arr = array();

    $ip_info = @json_decode(file_get_contents("http://www.geoplugin.net/json.gp?ip=".$ip));  
    if($ip_info && $ip_info->geoplugin_countryName != null){
        $arr["ip"] = $ip;
        $arr["ville"] = $ip_info->geoplugin_city;
        $arr["region"] = $ip_info->geoplugin_region;
        $arr["pays"] = $ip_info->geoplugin_countryName;
        $arr["latitude"] = $ip_info->geoplugin_latitude;
        $arr["longitude"] = $ip_info->geoplugin_longitude;
        $arr["continent"] = $ip_info->geoplugin_continentName;
        $arr["timezone"] = $ip_info->geoplugin_timezone;
    }

    $details = json_decode(file_get_contents("http://ipinfo.io/{$ip}/json"));
    if($details && $details->postal !=null){
        $arr["postal"] = $details->postal;
    }

    $ch = curl_init('http://ipwho.is/'.$ip);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, false);
    $ipwhois = json_decode(curl_exec($ch), true);
    curl_close($ch);
    if($ipwhois){
        $arr["flag_emoji"] =$ipwhois['flag']['emoji'];
        $arr["current_time"] = $ipwhois['timezone'] ['current_time'];
        $arr["utc"] = $ipwhois['timezone']['utc'];
        $arr["capital"] = $ipwhois['capital'];
        $arr["domain"] = $ipwhois['connection']['domain'];
        $arr["org"] = $ipwhois['connection']['org'];
    }
    // print_r($arr);
    // echo '</br></br>'.$ipwhois['country'] . ' ' . $ipwhois['flag']['emoji'].'</br></br>';
    // print_r($ipwhois);
    ?>