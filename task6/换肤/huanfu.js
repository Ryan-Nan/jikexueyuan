/**
 * Created by Administrator on 2016/11/7 0007.
 */

var mylinks=document.getElementById("fu_img").getElementsByTagName("a");
var mainbody=document.getElementById("mainbody");

//显示换肤界面
document.getElementById("huanfu").onclick=function(){
    document.getElementById("down").style.display="block";
}
//隐藏换肤界面
document.getElementById("hiddle").onclick=function(){
    document.getElementById("down").style.display="none";
    addClass(mainbody,getLocalstorage());
}
//加载页面调取localstorage
document.getElementById("mainbody").className=getLocalstorage();


//给皮肤管理各个选择图绑定事件
mylinks[0].onclick=function(){
    addClass(mainbody,"zuihao");
}
mylinks[1].onclick=function(){
    addClass(mainbody,"nianshou");
}
mylinks[2].onclick=function(){
    addClass(mainbody,"die");
}
mylinks[3].onclick=function(){
    addClass(mainbody,"niuhonghong");
}
mylinks[4].onclick=function(){
    addClass(mainbody,"xing");
}
mylinks[5].onclick=function(){
    addClass(mainbody,"ali");
}
//选皮肤图作为背景图
function addClass(element,classname){
    //console.log(element.className);
    if(!element.className){
        element.className=classname;

    }else{

        element.className="wrapper"+" "+classname;
    }

}

////设置cookie
//function setCookie(name, value, seconds) {
//    seconds = seconds || 0;   //seconds有值就直接赋值，没有为0
//    var expires = "";
//    if (seconds != 0 ) {      //设置cookie生存时间
//        var date = new Date();
//        date.setTime(date.getTime()+(seconds*1000));
//        expires = "; expires="+date.toGMTString();
//    }
//    document.cookie = name+"="+value+expires+"; path=/";   //转码并赋值
//}
//
////取得cookie
//function getCookie(name) {
//    var nameEQ = name + "=";
//    var ca = document.cookie.split(';');    //把cookie分割成组
//    for(var i=0;i < ca.length;i++) {
//        var c = ca[i];                      //取得字符串
//        while (c.charAt(0)==' ') {          //判断一下字符串有没有前导空格
//            c = c.substring(1,c.length);      //有的话，从第二位开始取
//        }
//        if (c.indexOf(nameEQ) == 0) {       //如果含有我们要的name
//            return unescape(c.substring(nameEQ.length,c.length));    //解码并截取我们要值
//        }
//    }
//    return false;
//}
////清除cookie
//function cleanCookie(name) {
//    setCookie(name, "", -1);
//}

//保存storage函数
function setLocalstorage(){
    if(window.localStorage){
        localStorage.classname=mainbody.className;
    }else{
        window.LS.set("classname",mainbody.className);/*不支持localStorage的*/
    }
}
//读取storage函数
function getLocalstorage(){
    if(window.localStorage){
        return localStorage.classname;
    }else{
       return window.LS.get("classname");
    }
}
//清除storage函数
function clear(){
    if(window.localStorage){
        localStorage.removeItem("classname");
    }else{
        window.LS.remove("classname");
    }
}

//保存新皮肤变量
var save=document.getElementById("save");
//清除保存变量
var nosave=document.getElementById("nosave");

//绑定“保存”事件
save.onclick=function(){
    /*setCookie("classname",mainbody.className,6000);*/
    setLocalstorage();
    document.getElementById("down").style.display="none";
}

//console.log("cookie:"+getCookie("classname"));


/*清除cookie*/
nosave.onclick=function(){
    //cleanCookie("classname");
    clear();
    addClass(mainbody,"");
}


