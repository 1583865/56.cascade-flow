// 1.页面加载
window.onload = function(){
	// 2..封装函数 调用对谁操作 main-->box
	waterfall('main','box');


// 15.模拟数据
var dataInt={"data":[{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'},{"src":'5.jpg'},{"src":'6.jpg'},{"src":'7.jpg'},{"src":'8.jpg'},{"src":'9.jpg'},{"src":'10.jpg'},{"src":'11.jpg'},{"src":'12.jpg'},{"src":'13.jpg'},{"src":'14.jpg'},{"src":'15.jpg'}]}
	
	// 13.监测滚动条事件
	window.onscroll=function(){
		// 是否具备加载数据块
		if(checkScrollSlide){
			var oParent=document.getElementById('main');
			// 将数据块渲染到页面底部
			// 16.遍历json
			for(var i=0;i<dataInt.data.length;i++){
				// @1添加box盒子
				var oBox = document.createElement('div');
				// 创建的box
				oBox.className='box';
				// 填加载到尾部
				oParent.appendChild(oBox);
				// @2添加pic盒子
				var oPic=document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);
				// @3添加图片
				var oImg = document.createElement('img');
				oImg.src= "image/"+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box');
		}
		
	}
}


// 传递两个值：
function waterfall(parent,box){
	// 3..将main下的box元素取出
	var oParent = document.getElementById(parent);


	// 7.变量接收
	var oBoxs = getByClass(oParent,box);
	console.log(oBoxs.length);//40个
	// 8.计算页面 列数  （页面宽度/box宽）
	// 获取元素宽
	var oBoxW = oBoxs[0].offsetWidth;
	console.log(oBoxW);//202 怎么来的？？宽度202= 图片宽度165 + 内边距10X2 + 边框宽度1x2 + 15
	// 这样设置有缺点：当屏幕浏览器缩小或放大影响显示的列数
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
	console.log(cols);
	// 设置main宽  字符串设置进来  固定父盒子宽度 屏幕缩小放大时出现滚动条
	oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto';
	// 9.存放每一列高度的数组 计算那张图片高度值最小
	var hArr = [];
	for (var i=0;i<oBoxs.length;i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else {
			//Math.min不能指向数组  用apply改变this指向
			var minH = Math.min.apply(null,hArr);
			// console.log(minH);
			// 获取索引 封装函数  传递参数
			// 12.接收
			var index=getMinhIndex(hArr,minH);
			oBoxs[i].style.position='absolute';
			oBoxs[i].style.top=minH+'px';
			// oBoxs[i].style.left=oBoxW*index+'px';
			oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
			// 图片重叠 改变数组
			// harr值等于原来harr的值加这张图片的高
			hArr[index]+=oBoxs[i].offsetHeight;
		}
	}
	// 判断最小高度图片计算 top：149px left：两张图片大小
	console.log(hArr);
}




// 4.*封装函数 更具class获取元素
function getByClass(parent,className){
	// 保存将来取到的值  []
	var boxArr = new Array(),
	// 获取父元素下所有子元素
	oEelments = parent.getElementsByTagName('*');
	// 5.遍历
	// for循环i<oelements下的个数时,i++
	for (var i=0;i<oEelments.length;i++){
		// 判断 oelement中i，取出的元素下的className 等于 传过来的classname时
		if(oEelments[i].className == className){
			// 放到数组最后
			boxArr.push(oEelments[i]);
		}
	}
	// 6.
	return boxArr;
}



// 10  封装函数 最小高度值
function getMinhIndex(arr,val) {
	for(var i in arr){
		if(arr[i]==val){
			// 11.使用return就得接收
			return i;
		}
	}
}


// 14.封装 监测是否具备滚动条加载数据块的条件
function checkScrollSlide(){
	// 获取元素
	var oParent=document.getElementById('main');
	// 找到所有盒子
	var oBoxs=getByClass(oParent,'box');
	// 最后一个盒子高度 数组中最后一个     顶部      计算盒子高度的一般
	var lastBoxH = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	// 滚动条动了多少   兼容性： 混杂模式下      标准下          
	var scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
	// console.log(scrollTop);
	// 可视窗口高度
	var height = document.body.clientHeight || document.documentElement.clientHeight;
	// console.log(height);
	return (lastBoxH<screenTop+height)?true:false;

}