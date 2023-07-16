<?php
include_once './apps/Api/ApiController.php';
$function=new ApiController();
$data=$function->getMyRank($_POST['data']);
echo $data;
?>
