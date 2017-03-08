<?php
    header("Content-type:application/json; charset=utf-8");

    $con=mysqli_connect("localhost","root","","baidunews");

    require_once("db.php");

    if(!$con){
        echo JSON(array('连接信息' => '连接失败'));
    }else{
        // echo JSON(array('连接信息' => '连接成功'));
        if(@$_GET["newstype"]){
            $newstype=$_GET["newstype"];

            $sql="SELECT * FROM `news` WHERE `newstype`='{$newstype}'";
            mysqli_query($con,'SET NAMES utf8');
            $result=mysqli_query($con,$sql);
            $senddata=array();
            while($row = mysqli_fetch_assoc($result)){
                array_push($senddata, array(
                    'id'=>$row['id'],
                    'newstype'=>$row['newstype'],
                    'newstitle'=>$row['newstitle'],
                    'newsimg'=>$row['newsimg'],
                    'newstime'=>$row['newstime'],
                    'newssrc'=>$row['newssrc']

                    ));
            }
            echo JSON($senddata);
        }else{
            $sql='SELECT * FROM news';
            mysqli_query($con,'SET NAMES utf8');
            $result=mysqli_query($con,$sql);
            $senddata=array();
            while($row = mysqli_fetch_assoc($result)){
                array_push($senddata, array(
                    'id'=>$row['id'],
                    'newstype'=>$row['newstype'],
                    'newstitle'=>$row['newstitle'],
                    'newsimg'=>$row['newsimg'],
                    'newstime'=>$row['newstime'],
                    'newssrc'=>$row['newssrc']

                    ));
            }
            echo JSON($senddata);
        }


    }


    mysqli_close($con);
   /* $arr=array(

            'newstype' => '百家',
            'newsimg' => 'img/news-3.jpg',
            'newstime' => '2016-12-10',
            'newssrc' => '极客学院',
            'newstitle' => '测试动态获取的新闻标题'
        );*/


    function arrayRecursive(&$array, $function, $apply_to_keys_also = false)
    {
        static $recursive_counter = 0;
        if (++$recursive_counter > 1000) {
            die('possible deep recursion attack');
       }
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                arrayRecursive($array[$key], $function, $apply_to_keys_also);
            } else {
                $array[$key] = $function($value);
            }
            if ($apply_to_keys_also && is_string($key)) {
                $new_key = $function($key);
                if ($new_key != $key) {
                    $array[$new_key] = $array[$key];
                    unset($array[$key]);
                }
            }
        }
        $recursive_counter--;
    }


    function JSON($array) {
        arrayRecursive($array, 'urlencode', true);
        $json = json_encode($array);
        return urldecode($json);
    }


    // echo JSON($arr);

?>
