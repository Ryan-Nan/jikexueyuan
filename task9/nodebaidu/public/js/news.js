/**
 * Created by Administrator on 2016/12/10 0010.
 */
//新闻导航
$(document).ready(function(){
    var deviceWidth=$("body").width();
    $("nav li").each(function(index,item){
        if($(this).find("a").html().split("").length>2){
            $(this).width(deviceWidth/3);
        }else{
            $(this).width(deviceWidth/6);
        }
    });
    var types;
    $("nav a").click(function(e){
        e.preventDefault();
        $(".action").removeClass("action");
        $(this).addClass("action");

        types=$(this).html();
        addNews(types);
        setLocalstorage(types);
    });
    
    //获取选好的新闻类型
    addNews(getLocalstorage());

    //存储被选的菜单
    var saveaction=getLocalstorage();
    $("nav a").each(function(){
        if($(this).text()==saveaction){
            $(this).addClass("action");
        }
    })
});

//保存storage函数
function setLocalstorage(typesave){
    if(window.localStorage){
        localStorage.typename=typesave;
    }
}
//读取storage函数
function getLocalstorage(){
    if(window.localStorage){
        return localStorage.typename;
    }else{
        alert("Sorry,你的浏览器不支持存储storage");
    }
}

//更新新闻列表
function addNews(type){
    var lists=$("article ul.news-lists");
    lists.empty();
    $.ajax({
        url: '/news',
        type: 'get',
        datatype: 'json',
        data:{newstype:type},
        success: function(data){
            data.forEach(function(item,index,array){

                var list=$("<li></li>").addClass("news-list").prependTo(lists);
                var newsimg=$("<div></div>").addClass("newsimg").appendTo(list);
                var Img=$("<img>").attr("src",item.newsimg).appendTo(newsimg);
                var newscontent=$("<div></div>").addClass("news-content").appendTo(list);
                var h1=$("<h1></h1>").html(item.newstitle).appendTo(newscontent);
                var $p=$("<p></p>").appendTo(newscontent);
                var newstime=$("<span></span>").addClass("newstime").html(item.newstime).appendTo($p);
                var newssrc=$("<span></span>").addClass("newssrc").html(item.newssrc).appendTo($p);
            });

            console.log(data);
        }
    });


}

