$(window).on('load',function(){
	waterfall();
	//模拟数据
var dataInt={"data":[{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'},{"src":'5.jpg'},{"src":'6.jpg'},{"src":'7.jpg'},{"src":'8.jpg'},{"src":'9.jpg'},{"src":'10.jpg'},{"src":'11.jpg'},{"src":'12.jpg'},{"src":'13.jpg'},{"src":'14.jpg'},{"src":'15.jpg'}]}
	// 监测拖动滚动条
	$(window).on('scroll',function(){
		if(checkScrollSlide){
			//                            索引 值
			$.each(dataInt.data,function(key,value){
				// console.log(value);
				var oBox = $('<div>').addClass('box').appendTo($('#main'));
				var oPic = $('<div>').addClass('pic').appendTo($(oBox));
				var oImg = $('<img>').attr('src','image/'+$(value).attr('src')).appendTo($(oPic));
				// 网页面渲染

				// console.log($(value).attr('src'));

			})
			waterfall();


		}

	})
})


function waterfall(){
	var $boxs=$('#main>div');
	// 计算每一列  width 只是单独的获取宽度  outerwidth是加载全部的宽度

	var w=$boxs.eq(0).outerWidth();
	var cols=Math.floor($(window).width()/w);
	// 页面居中
	$('#main').width(w*cols).css('margin','0 auto');

	// 前六张数据放到数组内
	var hArr=[];
	// 遍历  each:接收一个参数匿名函数（遍历的索引，元素）
	$boxs.each(function(index,value ){
		// console.log(value);
		// console.log(index);
		// 前六个图片高 赛道数组内
		// 获取高
		var h = $boxs.eq(index).outerHeight();
		if(index<cols){
			hArr[index]=h;


		}else{
			// 高度最小值
			var minH=Math.min.apply(null,hArr);
			// 两个参数  判断谁、在那个数组中判断
			var minHIndex=$.inArray(minH,hArr);
			// console.log(value);
			// 转换jquery对象
			$(value).css({
				'position':'absolute',
				'top':minH+'px',
				'left':minHIndex*w+'px'
			})
			hArr[minHIndex]+=$boxs.eq(index).outerHeight();

		}

	})
	// console.log(hArr);

}




function checkScrollSlide(){
	var $lastBox=$('#main>div').last();
	var lastBoxDis=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
	// 页面滚走距离
	var scrollTop=$(window).scrllTop;
	var documentH = $(window).height();
	return (lastBoxDis<scrollTop+documentH)?true:false;
}