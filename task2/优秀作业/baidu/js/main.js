// JavaScript Document
var baidu={
	init: function(){
		this.baidusetting();
	},
	
	baidusetting: function(){
		$('#navMore, #moreProduct').mouseover(function(){
			$("#moreProduct").show();
		}).mouseout(function(){
			$("#moreProduct").hide();
		})
	}
			
	}
	
$(function(){
	baidu.init();
})