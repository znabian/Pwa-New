<?php
include_once './apps/Api/ApiController.php';
$function=new ApiController();
if($_POST['data'])
$data=$function->getMyRank($_POST['data']);
else if($_POST['aid'])
$data=$function->getMyRankinApps($_POST['uid'],$_POST['aid']);
echo $data;
?>
