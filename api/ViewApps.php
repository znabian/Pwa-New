<?php
include_once './apps/Api/ApiController.php';
$function=new ApiController();
$data=$function->getMyViews($_POST['data']);
echo $data;
?>
