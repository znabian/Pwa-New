<?php
include_once './apps/Api/ApiController.php';
$function=new ApiController();
$data=$function->getData((object)$_POST);
echo $data;
?>
