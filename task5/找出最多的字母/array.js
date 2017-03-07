/**
 * Created by Administrator on 2016/10/24 0024.
 */
//统计字母，找出重复计数max的letter，并打印letter所在的顺序位置

var keys=["a","x","b","d","m","a","k","m","p","j","a"];
var counts={}, add={};

document.write("原先的数组："+keys+"<p></p>");

for(var i=0;i<keys.length;i++){//遍历数组
    if(counts[keys[i]]){
        counts[keys[i]]++;
        add[keys[i]]+=","+i;
    }else{
        counts[keys[i]]=1;
        add[keys[i]]=i;
    }
}
var max= 0,letter=[];
for( index in counts){//遍历对象，也可以遍历数组。
    if(counts[index]>max){
        max=counts[index];
        letter.push(index);
    }else if(counts[index]==max){
        letter.push(index);
    }
}

for(var n=0;n<letter.length;n++){
    document.write("重复次数最多的字母："+letter[n]+",一共"+max+"个<br>");
    document.write(letter[n]+"的位置顺序是："+add[letter[n]]+"<br><br>");
}

