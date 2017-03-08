/**
 * Created by Administrator on 2016/11/26 0026.
 */

//左侧菜单切换效果
$(".ke-ul>li").each(function (index){
    $(this).mouseover(function(){
        $(".menu-show").eq(index).addClass("show");
    }).mouseout(function (){
        $(".menu-show").eq(index).removeClass("show");
    })
})

//课程库列表页面板浮动特效
$(document).ready(function(){
    $(".lesson-list li").each(/*大大的问题：1.鼠标移动到列表页面时候像活塞似得上下几次动。2.切换到横条列表，鼠标移动到页面板应停止浮动特效，但是相反，还在浮动。解决了，用stop（）阻止事件继续 and unbind（）解除原先的事件监听*/
        function(index){
            $(this).mouseover(function(){
                $(".lesson-info p").eq(index).stop().slideDown(200);
                $(".lesson-info .peoples .renshu").eq(index).stop().slideDown(250);
                $(".lesson-info .jibie").eq(index).stop().slideDown(350);
                //$(".lesson-info p,.lesson-info .jibie em,.lesson-info .peoples .renshu").eq(index).show().slideDown();
            }).mouseout(function(){
                $(".lesson-info p").eq(index).stop().slideUp();
                $(".lesson-info .peoples .renshu").eq(index).stop().slideUp();
                $(".lesson-info .jibie").eq(index).stop().slideUp();

                //$(".lesson-info p,.lesson-info .jibie em,.lesson-info .peoples .renshu").eq(index).hide().slideUp();
            })

        }
    );
})


//搜索框切换效果
$(".search-icon").click(function(){
    $(".search-box").fadeIn(560);
});
$(".search-box i.close-search").click(function(){
    $(".search-box").fadeOut(100);
});

//更换列表风格
var classname;

$("#main-image").click(function(){
    classname=$("#changeid").attr("class");
//console.log(classname);
    if(classname.indexOf("lesson-list2")>=0){
        $(".lesson-list li").unbind();
        $("#changeid").attr("class","lesson-list");
        $(".lesson-list li").each(
            function(index){
                $(this).mouseover(function(){
                    $(".lesson-info p").eq(index).stop().slideDown(180);
                    $(".lesson-info .peoples .renshu").eq(index).stop().slideDown(250);
                    $(".lesson-info .jibie").eq(index).stop().slideDown(350);
                    //$(".lesson-info p,.lesson-info .jibie em,.lesson-info .peoples .renshu").eq(index).show().slideDown();
                }).mouseout(function(){
                    $(".lesson-info p").eq(index).stop().slideUp();
                    $(".lesson-info .peoples .renshu").eq(index).stop().slideUp();
                    $(".lesson-info .jibie").eq(index).stop().slideUp();

                    //$(".lesson-info p,.lesson-info .jibie em,.lesson-info .peoples .renshu").eq(index).hide().slideUp();
                })

            }
        );
    }

});
$("#main-list").click(function(){
    classname=$("#changeid").attr("class");
    if(classname.indexOf("lesson-list")>=0){
        $(".lesson-list li").unbind();
        $("#changeid").attr("class","lesson-list2");
    }

})

//返回顶部
$(".fixed .gotop").click(function(){
    window.scrollTo(0,0);
}
);