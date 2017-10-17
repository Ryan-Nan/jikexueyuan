/**
 * Created by Administrator on 2017/8/11 0011.
 */

var app=angular.module('ionicApp',['ionic']).run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});
app.controller('myCtrl',function ($scope,$ionicPopup) {

    $scope.goods=[
        {
            id:0,
            name:'纯甄',
            imgSrc:'https://img14.360buyimg.com/n7/jfs/t5491/66/891749162/97934/646347e1/5908a5d4Nf29aa00e.jpg',
            text:'【京东超市】【24盒装】蒙牛 纯甄 常温酸牛奶 200g*24 家庭装',
            heavy:'5.580kg/件',
            quantity:1,
            price:{whole:93,smallNum:'.00'}
        },
        {
            id:1,
            name:'三只松鼠',
            imgSrc:'https://img14.360buyimg.com/n7/jfs/t5632/35/1522518407/267776/3cfbd4e2/5927cd46N8fcdb71a.jpg',
            text:'三只松鼠_开口松子218gx2袋零食坚果特产炒货东北红松子原味',
            heavy:"500g/袋",
            quantity:1,
            price:{whole:49,smallNum:'.90'}
        },
        {
            id:2,
            name:'360随身wifi',
            imgSrc:'https://img14.360buyimg.com/n7/jfs/t478/153/886206867/83918/24d11d17/54b8ae03N63a25d6c.jpg',
            text:'360随身WiFi3 300M 无线网卡 迷你路由器 黑色',
            heafy:'55g/个',
            quantity:1,
            price:{whole:24,smallNum:'.80'}
        },
        {
            id:3,
            name:'三只松鼠',
            imgSrc:'https://img14.360buyimg.com/n7/jfs/t2986/319/1987392477/286042/849fc10a/57959f45N9bb8c2ef.jpg',
            text:'三只松鼠_坚果组合630g零食夏威夷果碧根果手剥巴旦木共3袋',
            quantity:1,
            price:{whole:65,smallNum:'.90'}
        },
        {
            id:4,
            name:'进口牛奶',
            imgSrc:'https://img14.360buyimg.com/n7/jfs/t2158/251/1732012761/195256/df943f18/56da7573Nd4a6b429.jpg',
            text:'德国 进口牛奶 欧德堡（Oldenburger）全脂 纯牛奶200ml×24盒/箱',
            quantity:1,
            price:{whole:88,smallNum:'.00'}
        },
        {
            id:5,
            name:'无线网卡',
            imgSrc:'https://img14.360buyimg.com/n7/jfs/t2041/5/1366463707/147931/c1bb7056/56581dd3N96715279.jpg',
            text:'华硕（ASUS）USB-AC55 1300M AC双频 低辐射 USB 3.0无线网卡 （带USB3.0延长线）',
            quantity:1,
            price:{whole:229,smallNum:'.00'}
        }

    ];

    $scope.goodsChecked=[];     //被被添加到购物车的商品
    $scope.footerHide=true; //隐藏底部导航
    $scope.toggleEdit="编辑";


    //添加商品到购物车
    $scope.Buy=function (item) {
        var index= $scope.goodsChecked.indexOf(item);

        if(index !=-1){
            item.quantity = ++$scope.goodsChecked[index].quantity;
            item.isDisabled=false;

        }else{
             item.isDisabled= true;
            if($scope.toggleEdit=== "编辑" ){
                item.checked = true;
            }else{
                item.checked = false;
                $scope.selectAll= false;
            }
            $scope.goodsChecked.push(item);
        }
        $scope.countTotal();

    };


    //计算总价
    $scope.countTotal=function () {
        $scope.totalValue = 0;
        $scope.totalquantity = 0;
        for (var i=0;i<$scope.goodsChecked.length;i++){
            $scope.goodsChecked[i].singleTal=0;
            if($scope.goodsChecked[i].checked){
                $scope.goodsChecked[i].singleTal = Number($scope.goodsChecked[i].price.whole + $scope.goodsChecked[i].price.smallNum)*$scope.goodsChecked[i].quantity;  //单个商品的总价
                $scope.totalquantity +=$scope.goodsChecked[i].quantity; //计算总数量
            }else if($scope.goodsChecked[i].checked == false){
                $scope.goodsChecked[i].singleTal=0;

            }
            $scope.totalValue +=$scope.goodsChecked[i].singleTal; //计算总价
        }
    };


//    商品总数
        /*$scope.totalquantity=function (item) {
            total += item.quantity;
            return total;
        };*/

//    减去或添加商品数量
    $scope.minus=function (item) {
        // if(index != -1){
        //     var item=$scope.goods[id];
        //     if(item.quantity>1){
        //         $scope.goods[index].quantity--;
        //         total--;
        //         $scope.totalquantity =total;
        //
        //
        //     }else{
        //         var returnKey = confirm('是否从购物车删除该商品?');
        //         if(returnKey)
        //             $scope.remove(id);
        //     }
        //
        //
        // }

        item.quantity--;

        if (item.quantity == 1) {
            item.isDisabled = true;
        }
        $scope.countTotal();
    };

    $scope.plus=function (item) {
        item.quantity++;
        if (item.quantity > 1) {
            item.isDisabled = false;
        }
        $scope.countTotal();
    };

//    编辑



    $scope.footerTwoBtn=true;
    $scope.calculates=true;
    $scope.Edit=function () {

        if ("编辑"===$scope.toggleEdit){
            $scope.selectbox=true;
            $scope.toggleEdit="完成";
            for (var i=0;i<$scope.goodsChecked.length;i++){
                if($scope.goodsChecked[i].checked==true){   //被选的
                    $scope.goodsChecked[i].checked=!$scope.goodsChecked[i].checked;
                }
            }
        }else{
            $scope.toggleEdit="编辑";
            $scope.selectbox = false;

        }

        $scope.calculates =! $scope.calculates;
        $scope.footerTwoBtn= !$scope.footerTwoBtn;
        $scope.checkedVar= ! $scope.checkedVar;
        $scope.selectAll = !$scope.selectAll;
    };

    //向左滑动点击删除单个商品
    $scope.singleDel=function (item) {
        var index= $scope.goodsChecked.indexOf(item);

        //弹出对话框
        var confirmPopup = $ionicPopup.confirm({
            title:  '警告',    /*这个没办法加入图标或者不知怎么加入图标，只能写入文字*/
            template: '<h4>是否确认将'+item.name+'商品删除?</h4>',
            cancelText:'取消',
            okText: '确认',
            okType: 'assertive'
        });
        confirmPopup.then(function(res) {
            if(res) {
                //确认删除
                $scope.goodsChecked.splice(index,1);
                $scope.countTotal();
                item.quantity=1;
            } else {
                //取消删除
                console.log('You are not sure');
            }
        });
    };

    //删除被选中的商品
    $scope.delShopcar=function () {
        var b=0;    //统计选中数量
        var bs=[];  //存储选中项目位置
        for(var i=0;i<$scope.goodsChecked.length;i++) {
            if ($scope.goodsChecked[i].checked) {
                b++;
                bs[b]=i;
            }
        }
            if(b>0){
                var confirmPopup = $ionicPopup.confirm({
                    title: '警告', /*没办法加入图标*/
                    template: '<h4>是否确认将已选的'+b+'件商品删除?</h4>',
                    cancelText: '取消',
                    okText: '确认',
                    okType: 'assertive'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        console.log('You are sure');
                        //确认删除
                        for(var index in bs){
                            $scope.goodsChecked.splice(bs[index], 1);
                            $scope.countTotal();
                            $scope.goodsChecked[bs[index]].quantity = 1;
                        }

                    } else {
                        console.log('You are not sure');
                    }
                });
            }else if(b==0){
                var alertPopup = $ionicPopup.alert({
                    title: '',
                    template: '<h4 style="color: #c5484b; text-align: center;">请选择要删除的商品</h4>'

                });
                alertPopup.then(function(res) {

                });
            }



    };

    //单选
    $scope.selectSingle=function (item) {
        var index=$scope.goodsChecked.indexOf(item);

        if(item.checked==false){
            $scope.goodsChecked[index].checked=item.checked;
            $scope.countTotal();
            $scope.selectAll=false;
        }else {
            $scope.goodsChecked[index].checked=true;
            $scope.countTotal();
            var a=0;    //统计选中数量
            for(var i=0;i<$scope.goodsChecked.length;i++){
                if($scope.goodsChecked[i].checked == true){
                    a++;
                }
            }
            if(a == $scope.goodsChecked.length){  //全部被选中则确定全选
                $scope.selectAll=true;
            }else{
                $scope.selectAll=false;
            }
        }
    };

    //全选
    $scope.allSelect=function () {
        $scope.selectAll = !$scope.selectAll;
        if ($scope.selectAll){
           for(var i=0;i<$scope.goodsChecked.length;i++){
               $scope.goodsChecked[i].checked= true;
           }
           $scope.countTotal();
        }else{  //取消全选
            for(var j=0;j<$scope.goodsChecked.length;j++){
                $scope.goodsChecked[j].checked= false;
            }
            $scope.countTotal();

        }

    }


});
