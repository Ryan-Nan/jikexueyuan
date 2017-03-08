<?php
    header("Content-type:application/json; charset=utf-8");

    require_once('db.php');


    if($con){
        // 插入新闻
        $newstitle = $_POST['newstitle'];
        $newstype=$_POST['newstype'];
        $newsimg=$_POST['newsimg'];
        $newstime=$_POST['newstime'];
        $newssrc=$_POST['newssrc'];

        $sql="INSERT INTO `news`(`newstitle`,`newstype`,`newsimg`,`newstime`,`newssrc`) VALUES ('{$newstitle}','{$newstype}','{$newsimg}','{$newstime}','{$newssrc}')";

        mysqli_query($con,'SET NAMES utf8');
        $result=mysqli_query($con,$sql);

        echo json_encode($result);
    }
    mysqli_close($con);
?>
