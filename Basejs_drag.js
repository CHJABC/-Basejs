//点击拖动一个元素。接受一个参数，为目标元素对象，作为点击拖动的地方。该元素对象包含在拖动的元素内。
//移动的元素要是相对于根目录的绝对位移。
//拖动的区域限制在了浏览器可视区范围内（滚动条拉到对上和最左时的可视区。），
//注意不要给移动的元素设置外边距，因为这样点击后移动第一下有个漂移的情况。原因是我们通过offset等属性算的鼠标点击点与边框外缘的距离（也就是吧边框外缘交汇点作为原定）。
//而绝对定位的原定是外边距的左上角为原点，当两个原点不同时会漂移。（也就是有外边距时）


$().extend("drag",function(targetNode){
	var node = null;
	var that = this.elements[0];
	if (targetNode != undefined) {
		node = targetNode;
	} else {
		node = this.elements[0];
	}
	node.style.cursor = "move";


	chj.tools.addEvent(node,"mousedown",function(e){
		e.preventDefault();  //组织默认行为   （不然有时候拖动鼠标显示禁止符号，不能拖动。尤其是在把鼠标拖到了浏览器可视区外，放开鼠标。这时再
		                     // 回来拖动元素就会出现）

		var X = e.clientX - that.offsetLeft; 
		var Y = e.clientY - that.offsetTop;

		if(typeof that.setCapture!="undefined"){ //ie特有的方法
			that.setCapture();
		};

		chj.tools.addEvent(document,"mousemove",dragposition);
		chj.tools.addEvent(document,"mouseup",removeDup);
		
		function dragposition(e){
			
			var left =e.clientX - X;
			var top = e.clientY - Y;

			if (left<0) {
				left=0;
			};
			if(top<0){
				top=0;
			};
			if (left>document.documentElement.clientWidth - that.offsetWidth) {
				left=document.documentElement.clientWidth - that.offsetWidth
			};
			if (top>document.documentElement.clientHeight - that.offsetHeight) {
				top=document.documentElement.clientHeight - that.offsetHeight
			};
			that.style.left = left + "px";
			that.style.top = top + "px";
		}

		function removeDup(){
			chj.tools.removeEvent(document,"mousemove",dragposition);
			if(typeof that.releaseCapture!="undefined"){  //ie特有的方法
				that.releaseCapture();
			};
		}

	});		
});

