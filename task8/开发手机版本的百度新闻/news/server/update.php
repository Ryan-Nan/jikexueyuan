<?php
    header("Content-type:application/json; charset=utf-8");

    require_once 'db.php';


    if($con){
        // 修改新闻
        $newstitle = $_POST['newstitle'];
        $newstype=$_POST['newstype'];
        $newsimg=$_POST['newsimg'];
        $newstime=$_POST['newstime'];
        $newssrc=$_POST['newssrc'];
        $newsid=$_POST['id'];


        $sql="UPDATE `news` SET `newstitle`= '$newstitle',`newstype`='$newstype',`newsimg`='$newsimg',`newstime`='$newstime',`newssrc`='$newssrc' WHERE `id`={$newsid}";

        mysqli_query($con,'SET NAMES utf8');

        $result=mysqli_query($con,$sql);

        echo json_encode($result);
    }
    mysqli_close($con);
?>
