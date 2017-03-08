/**
 * Created by Administrator on 2016/12/12 0012.
 */
//打开后台页面的时候，发送请求，刷新新闻列表
var ntitle=$("#newstitle"),
    ntype=$("#newstype"),
    nimg=$("#newsimg"),
    ntime=$("#newstime"),
    nsrc=$("#newssrc");

$(document).ready(function(){

    var $newst=$("#newstable tbody");


    refreshNews();

    //add ok
    $("#btnsubmit").click(function(e){
        e.preventDefault();
        //判断输入值是否为空
        if(ntitle.val()===""||nimg.val()===""||ntime.val()===""||nsrc.val()===""){
            if(ntitle.val()===""){
                ntitle.parent().addClass("has-error");
            }else{
                ntitle.parent().removeClass("has-error");
            }

            if(nimg.val()===""){
                nimg.parent().addClass("has-error");
            }else{
                nimg.parent().removeClass("has-error");
            }
            if(ntime.val()===""){
                ntime.parent().addClass("has-error");
            }else{
                ntime.parent().removeClass("has-error");
            }
            if(nsrc.val()===""){
                nsrc.parent().addClass("has-error");
            }else{
                nsrc.parent().removeClass("has-error");
            }
        }else{
            var json_news={
                newstitle:ntitle.val(),
                newstype:ntype.val(),
                newsimg:nimg.val(),
                newstime:ntime.val(),
                newssrc:nsrc.val()
            };
        //提交添加
            $.ajax({
                url:'../news/server/insert.php',
                type:'post',
                data:json_news,
                datatype:'json',
                success:function(data){
                    console.log(data+"ok!!!!!");
                    refreshNews();
                }
            })
        }

    });

    //绑定删除按钮事件
    var deleteid=null;
    $newst.on("click",".btn-danger",function(e){
        $("#deleteModal").modal("show");
       deleteid=$(this).parent().prevAll().eq(3).html();

    });

    $(function(){
        $("#deleteModal #confirmDelete").click(function(e){

            //可能是php或者数据库的问题，没有进success
            //数据那一部分没有问题，可能是PHP没有给返回值，success并没有执行
            if(deleteid){

                //debugger;

                $.ajax({
                    url:'../../news/server/delete.php',
                    type:'post',
                    dataType:"json",
                    data:{newsid:deleteid},
                    success:function(data){
                        console.log("删除成功");
                           $("#deleteModal").modal("hide");
                           refreshNews();

                    }

                });
            }
        });
    })

    //绑定修改按钮
    var updateid=null;
    $newst.on("click",".btn-primary",function(e){
        $("#updateModal").modal("show");
        updateid=$(this).parent().prevAll().eq(3).html();
        $.ajax({
            url:'../news/server/curnews.php',
            type:'get',
            datatype:'json',
            data:{newsid:updateid},
            success:function(data){
                console.log("update");
                $("#unewstitle").val(data[0].newstitle);
                $("#unewstype").val(data[0].newstype);
                $("#unewsimg").val(data[0].newsimg);
                $("#unewssrc").val(data[0].newssrc);
                var utime=data[0].newstime.split(' ')[0];
                $("#unewstime").val(utime);
            }
        });
    });

    $("#updateModal #confirmupdate").click(function(e){
        $.ajax({
            url:'../news/server/update.php',
            type:'post',

            data:{
                newstitle:$("#unewstitle").val(),
                newstype:$("#unewstype").val(),
                newsimg:$("#unewsimg").val(),
                newstime:$("#unewstime").val(),
                newssrc:$("#unewssrc").val(),
                id:updateid
            },
            success:function(data){
                //console.log(2333);
                $("#updateModal").modal("hide");
                refreshNews();
            }
        });
    });

    function refreshNews(){
        $newst.empty();
        $.ajax({
            type:'get',
            url:'../news/server/getnews.php',
            datatype:'json',
            success:function(data){
                console.log(data);
                data.forEach(function(item,index,array){
                    var $tdid=$("<td>").html(item.id);
                    var $tdtype=$("<td>").html(item.newstype);
                    var $tdtitle=$("<td>").html(item.newstitle);
                    var $tdimg=$("<td>").html(item.newsimg);
                    var $tdsrc=$("<td>").html(item.newssrc);
                    var $tdtime=$("<td>").html(item.newstime);
                    var $td=$("<td>");
                    var $btnsetdata=$("<button>").addClass("btn btn-primary btn-xs").html("编辑");
                    var $btndelete=$("<button>").addClass("btn btn-danger btn-xs").html("删除");
                    $td.append($btnsetdata,$btndelete);
                    var $tr=$("<tr>");
                    $tr.append($tdid,$tdtype,$tdtitle,$tdtime,$td);
                    $newst.append($tr);

                });
            }
        });
    }
})