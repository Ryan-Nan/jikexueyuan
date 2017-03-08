/**
 * Created by Administrator on 2016/11/14 0014.
 */
//给右侧下来设置满屏高度
var side=document.getElementById("side");
side.style.height=$(window).height()-32+"px";

//用Jquery完成百度右侧下拉
$(".bri,.bri-side").hover(
    function(){
        $(".bri-side").show();
    },
    function(){
        $(".bri-side").hide();
    }
);

//主页下面的切换Tab
//addAction函数用来判断有没有类名action-tab
function addAction(classname){
    var nowclassname=$(classname).attr("class");
    var attrs=document.getElementById("b_header").getElementsByTagName("span");
    if(nowclassname.match("action-tab")!=null){
        return false;
    }else{

        for(var i=0;i<attrs.length-1;i++){
            //console.log(attrs[i].className);
            if(attrs[i].className.match("action-tab")=="action-tab"){
                attrs[i].className=attrs[i].className.replace(" action-tab","");
            }
        }
        $(classname).attr("class",nowclassname+" action-tab");
    }
}

$("#tuijian").click(

    function (){
        addAction("#tuijian");
        $("div.tuijian").css("display","block");
        $("div.guanzhu").css("display","none");
        $("div.navigation").css("display","none");
        $("div.video").css("display","none");
    }

);

$("#navigation").click(

    function (){
        addAction("#navigation");
        $("div.tuijian").css("display","none");
        $("div.guanzhu").css("display","none");
        $("div.navigation").css("display","block");
        $("div.video").css("display","none");
    }

);
$("#video").click(

    function (){
        addAction("#video");
        $("div.tuijian").css("display","none");
        $("div.guanzhu").css("display","none");
        $("div.navigation").css("display","none");
        $("div.video").css("display","block");
    }

);
$("#guanzhu").click(

    function (){
        addAction("#guanzhu");
        $("div.tuijian").css("display","none");
        $("div.guanzhu").css("display","block");
        $("div.navigation").css("display","none");
        $("div.video").css("display","none");
    }

);

//换肤管理
//conner定义一个状态
var conner;
$(".head-huanfu").on("mouseover",function(){
    conner=1;
});
$(".head-huanfu").on("mouseout",function(){
    conner=0;
});


$("#huanfu").click(function(){
    conner=1;
    $(".head-huanfu").slideDown("slow");

})
$(".pull").click(function(){
    $(".head-huanfu").slideUp("fast");
})
$("body").click(function(){
    if(conner==0){
        $(".head-huanfu").slideUp("fast");
    }
})

//消息框
$("#info").click(function(){
    $(".info").toggle();
})
