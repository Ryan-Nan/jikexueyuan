/**
 * Created by Administrator on 2016/10/31 0031.
 */
//为了减少代码量，$()代替document.get...();
function $(id){
    return document.getElementById(id);
}

var save=$("save"),
    take=$("take"),
    back=$("back"),
    clean=$("clean"),
    add_save=$("add_save"),
    mul_save=$("mul_save"),
    clean_save=$("clean_save"),
    c1=$("c1"),
    c2=$("c2"),
    c3=$("c3"),
    c4=$("c4"),
    c5=$("c5"),
    c6=$("c6"),
    c7=$("c7"),
    c8=$("c8"),
    c9=$("c9"),
    c0=$("c0"),
    dianhao=$("dianhao"),/*逗号*/
    fuhao=$("fuhao"),/*负号*/
    run=$("run"),/*运行结果*/
    chu=$("chu"),/*除*/
    multiply=$("multiply"),/*乘*/
    minus=$("minus"),/*减法*/
    plus=$("add"),/*加法*/
    screen=$("screen");

c1.onclick=numberPrint;
c2.onclick=numberPrint;
c3.onclick=numberPrint;
c4.onclick=numberPrint;
c5.onclick=numberPrint;
c6.onclick=numberPrint;
c7.onclick=numberPrint;
c8.onclick=numberPrint;
c9.onclick=numberPrint;
c0.onclick=numberPrint;

//绑定点号事件
dianhao.onclick=function(){

    if(number==0||number!=0){
        number=number+".";
    }else if(number==""){
        return false;
    }
    //清除重复点号，只限一个点号
    if(number.match(".")=="."){
        return false;
    }else if(number.match(".")==null){ /*失败了，怎么弄???*/
        number=number+".";
    }
    /*console.log(number);*/
    numberPrint;
};

plus.onclick=function(){
    operator="+";
    num1=parseFloat(screen.innerHTML);
    number=0;
};
minus.onclick=function(){
    operator="-";
    num1=parseFloat(screen.innerHTML);
    number=0;
}
chu.onclick=function(){
    operator="/";
    num1=parseFloat(screen.innerHTML);
    number=0;
}
multiply.onclick=function(){
    operator="*";
    num1=parseFloat(screen.innerHTML);
    number=0;
}
//负号绑定事件
fuhao.onclick=fuHao;

$("sin").onclick=function(){
    operator="sin";
    num1=parseFloat(screen.innerHTML);
    countNum(operator);
    number=0;
}
$("cos").onclick=function(){
    operator="sin";
    num1=parseFloat(screen.innerHTML);
    countNum(operator);
    number=0;
}
$("tan").onclick=function(){
    operator="sin";
    num1=parseFloat(screen.innerHTML);
    countNum(operator);
    number=0;
}
$("chu-x").onclick=function(){
    operator="chu_x";
    num1=parseFloat(screen.innerHTML);
    countNum(operator);
    number=0;
}
run.onclick=function(){
    countNum(operator);
    number=0;
};

save.onclick=screenSave;
add_save.onclick=addSave;
take.onclick=takeSave;
back.onclick=backspace;
mul_save.onclick=multiplySave;
clean_save.onclick=cleanSave;
clean.onclick=clean0;

/*清屏*/
function clean0(){
    Screen(0);
    number=0;
}

//退格
function backspace(){
    if(number!=0&&number!==""){
        var new_num=number.replace(number.charAt(number.length-1),"");
        number=new_num;
    }else if(result){
        return false;
    }
    Screen(number);

}
//存储
var savevalue=" ";/*存储值*/
function screenSave(){
    savevalue=screen.innerText;
    number=0;
}
//累存
function addSave(){
    number=parseFloat(screen.innerText);
    savevalue=number+number;
    /*console.log(typeof savevalue);*/
    number=0;
}
//积存
function multiplySave(){
    savevalue*=screen.innerText;
    number=0;
}

//取存
function takeSave(){
    Screen(savevalue);
    number=0;
}

//清存
function cleanSave(){
    savevalue="";
}

var number,   /*保存点击运算符之前和之后输入框中的数值*/
    operator,/*保存运算符*/
    result;/*运算结果*/


/*寄存器*/
function numberPrint(){
    var num=this.value+"";

     if(number){
         number+=num;
     }else{
         number=num;
     }
    if(number.length>14){
        alert("Sorry,您输入数字不能超过14位数");
        return false;
    }
    //数值开头不能为零
    if(number.charAt(0)=="0"&&number.charAt(1)!="0"){   /*单独一个数值为零正常输出，怎么做？？？*/
        number=number.substr(1);
    }

    /*console.log(number);*/
    Screen(number);
}

/*添加负号*/
function fuHao(){
    number=screen.innerHTML;
    if(number.charAt(0)!="-"){
        number="-"+number;
    }else if(number.charAt(0)=="-"){
        /*console.log(typeof number)*/
        number=number.replace('-','');
    }

    Screen(number);
}

/*计算模块*/
var num1,num2;
function countNum(operators){
    num2=parseFloat(number);
    //console.log("num1:"+num1);
    //console.log("num2:"+num2);
    switch(operators){
        case "+":
            result=num1+num2;
            break;
        case "-":
            result=num1-num2;
            break;
        case "*":               /*乘运算*/
            result=num1*num2;
            break;
        case "/":              /*除运算*/
            if(num2==0){
                alert("除数不能为零");
                return false;
            }
            result=num1/num2;
            console.log(result.length);
            if(result.toString().length>14){
                result=result.toFixed(12);
            }
            break;
        case "sin":
            result=Math.sin(num1).toFixed(12);
            if(result==0){
                result=0;
            }
            break;
        case "cos":
            result=Math.cos(num1).toFixed(12);
            break;
        case "tan":
            result=Math.tan(num1).toFixed(12);
            break;
        case "chu_x":
            if(num1==0){
                alert("超出函数定义范围");
                return false;
            }
            result=(1/num1);
            if(result.toString().length>14){
                result=result.toFixed(12);
            }
            break;
    }
    Screen(result);
}

/*屏幕输出模块*/
function Screen(value){
    screen.innerText=value;
}
