<?php
    header("Content-type:application/json; charset=utf-8");

    require_once('db.php');

    if($con){
        $newsid=$_POST['newsid'];

        mysqli_query($con,"SET NAMES utf8");
        $sql= "DELETE FROM `news` WHERE `news`.`id` = {$newsid}";

        mysqli_query($con,$sql);
        echo json_encode(array('删除状态' => 'delete success'));
    }

    mysqli_close($con);
?>
