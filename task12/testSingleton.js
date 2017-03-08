/**
 *
 * Created by Administrator on 2017/2/28 0028.
 */

var top={
    init:function(){
        this.render();
        this.bind();
    },
    a:4,
    render:function(){
        var me=this;
        me.btna=$("#a");
    },
    bind:function(){
        var me=this;
        me.btna.click(function(){
            me.test();
        });

    },
    test:function(){
        a=2;
    }
}
top.init();