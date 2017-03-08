/**
 * Created by Administrator on 2016/11/29 0029.
 */
$(document).ready(function(){
    $(window).on("load",function(){
        imgLocation();
        var dataImg = {"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"}]};
        window.onscroll=function(){
            if(scrollside()){
                $.each(dataImg.data,function(index,value){
                    var box=$("<div>").addClass("box").appendTo($(".contain"));
                    var content=$("<div>").addClass("content").appendTo(box);
                    $("<img>").attr("src","images/"+$(value).attr("src")).appendTo(content);/*./images和去掉前面"./"有什么区别，它作用是什么？？？*/
                });
                imgLocation();
            }
        }
    })
});


function imgLocation(){
    var box=$(".box"),
        boxwidth=box.eq(0).width(),
        num=Math.floor($(window).width()/boxwidth),
        boxarr=[];
    box.each(function(index,value){
        var boxheight=box.eq(index).height();
        //console.log(index+"--"+boxheight);

        if(index<num){

            boxarr[index]=boxheight;

        }else{
            /*保存box高度最小值*/
            var minboxheight=Math.min.apply(null,boxarr);
            /*minboxindex保存box最小高度的索引*/
            var minboxindex= $.inArray(minboxheight,boxarr);
            console.log(value);
            $(value).css({
                "position":"absolute",
                "top":minboxheight,
                "left":box.eq(minboxindex).position().left
            });
            /*用新数据（当前box高度加上高度最小值）覆盖最小值*/
            boxarr[minboxindex]+=box.eq(index).height();
            //console.log(index+"--"+boxarr[minboxindex]+"_"+box.eq(index).height());

        }
    });
}

function scrollside(){
    var box = $(".box");
    var lastboxHeight = box.last().get(0).offsetTop+Math.floor(box.last().height()/2);
    var documentHeight = $(document).width();/*把文档宽度赋值给文档高度值，什么意思？？？*/
    var scrollHeight = $(window).scrollTop();
    return (lastboxHeight<scrollHeight+documentHeight)?true:false;
}