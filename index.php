<?php
error_reporting(0);
$request = $_SERVER['REQUEST_URI'];
try {
    $request=parse_url(strtolower(str_replace('/PWA-new','',$request)))['path'];
    //require __DIR__ . '/sorry.php';
    switch ($request) {
        case '/' :
            require __DIR__ . '/pages/Login.php';
            break;
        case '/login' :
            require __DIR__ . '/pages/Login.php';
            break;
        case '/home' :
            require __DIR__ . '/pages/home.php';
            break;
        case '/castle' :
            require __DIR__ . '/pages/list.php';
            break;
        case '/archive' :
            require __DIR__ . '/pages/Archive.php';
            break;
        case '/report-card' :
            require __DIR__ . '/pages/Report.php';
            break;
        case '/archiveb' :
            require __DIR__ . '/pages/Archive blade.php';
            break;
        case '/archiveb2' :
            require __DIR__ . '/pages/Archive blade copy.php';
            break;
        case '/realityshow' :
            require __DIR__ . '/pages/RealityShow.php';
            break;
        case '/live' :
            require __DIR__ . '/pages/Live.php';
            break;
        case '/from-old-pwa' :
            require __DIR__ . '/pages/oldPWA.php';
            break;
        case '/api/data' :
            require __DIR__ . '/api/data.php';
            break;
        case '/api/sms' :
            require __DIR__ . '/api/sms.php';
            break;
        case '/api/getapps' :
            require __DIR__ . '/api/apps.php';
            break;
        case '/api/viewapps' :
            require __DIR__ . '/api/ViewApps.php';
            break;
        case '/api/myrank' :
            require __DIR__ . '/api/MyRank.php';
            break;
        default:
            http_response_code(404);
            include('404.php');
            break;
    }
} catch (\Throwable $th) {
    http_response_code(404);
    include('404.php');
    //throw $th;
}
