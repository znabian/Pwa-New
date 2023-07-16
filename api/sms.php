<?php
include_once './apps/Api/ApiController.php';
$function=new ApiController();
$data=$function->sendSms((object)$_POST);
return $data;
?>
