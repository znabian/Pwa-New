<?php
include_once './apps/Api/ApiController.php';
$function=new ApiController();
$data=$function->getApps((object)$_POST);
echo $data;
?>
