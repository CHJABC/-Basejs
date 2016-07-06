
function Basejs(args){
	//把返回的节点对象保存到一个Base 对象的属性数组里
	this.elements=[];
	 if (typeof args == 'object') {
		if (args != undefined) {    //_this是一个对象，undefined也是一个对象，区别与typeof返回的带单引号的'undefined'
			this.elements[0] = args;
		}
	}
}


// ---------------------添加共享原形函数-----------------------



//获取id 节点
	Basejs.prototype.getId = function (id) {
		this.elements.push(document.getElementById(id));
		return this;
	};

	//获取name 节点数组，接受两个参数，第二个为空则默认document
	Basejs.prototype.getName = function (name,parentNode) {
		var node = null;
		if (parentNode != undefined) {
			node = parentNode;
		} else {
			node = document;
		}
		var names = node.getElementsByName(name);
		for (var i = 0; i < names.length; i ++) {
			this.elements.push(names[i]);
		}
		return this;
	};

	//通过标签名获取元素节点数组，接受两个参数，第二个为空则默认document
	Basejs.prototype.getTagName = function (tag,parentNode) {
		var node = null;
		if (parentNode != undefined) {
			node = parentNode;
		} else {
			node = document;
		}
		var tags = node.getElementsByTagName(tag);
		for (var i = 0; i < tags.length; i ++) {
			this.elements.push(tags[i]);
		}
		return this;
	};

//通过类名获取元素集合，接受两个参数，一个为classname字符串，一个为元素节点对象。
Basejs.prototype.getClass = function (className,parentNode) {
	var node = null;
	if (parentNode != undefined) {
		node = parentNode;
	} else {
		node = document;
	}
	var all = node.getElementsByTagName('*');
	for (var i = 0; i < all.length; i ++) {
		// if (all[i].className == className) {
		if((new RegExp('(\\s|^)' + className + '(\\s|$)')).test(all[i].className)){
			this.elements.push(all[i]);
		}
	}
	return this;
};

//获取元素集合中的某个元素，num从0开始算起
Basejs.prototype.getElement = function (num) {
	if(num = "last"){ 
		var element = this.elements[this.elements.length - 1];
		this.elements = [];
		this.elements[0] = element;
		return this;
	}else{
		var element = this.elements[num];
		this.elements = [];
		this.elements[0] = element;
		return this;
	}
	
};



//给元素添加类名,接受一个字符串参数
Basejs.prototype.addClass = function (className) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (!this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)')))
		{
			this.elements[i].className += ' ' + className;
		}
	}
	return this;
};

//移除元素某个类名,接受一个字符串参数
Basejs.prototype.removeClass = function (className) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)')))
		{
			this.elements[i].className = this.elements[i].className.
			replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ');
		}
	}
	return this;
};

//获取某一个元素计算后样式，接受一个参数，为某个样式名的字符串。返回样式值的字符串
Basejs.prototype.getStyle = function(attr){  

	if (typeof window.getComputedStyle != 'undefined') {
		return window.getComputedStyle(this.elements[0], null)[attr];
	}else{
		return this.elements[0].currentStyle[attr];
	}
	
};

//添加点击事件，参数为一个函数
Basejs.prototype.click = function (fn) {
	for (var i = 0; i < this.elements.length; i ++) {
		chj.tools.addEvent(this.elements[i],"click",fn);
	}
	return this;
};

//添加或修改行内样式，参数为两个字符串，第一个为样式名，第二个为样式值。
Basejs.prototype.css = function (attr, value) {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].style[attr] = value;
	}
	return this;
};

//innerHTML方法,参数为一个字符串
Basejs.prototype.html = function (str) {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].innerHTML = str;
	}
	return this;
};


//类似css 类选择器：hover的效果，（原理鼠标移入移出事件）,接受两个参数，都为函数。
Basejs.prototype.hover = function (over, out) {
	for (var i = 0; i < this.elements.length; i ++) {
		chj.tools.addEvent(this.elements[i],"mouseover",over);
		chj.tools.addEvent(this.elements[i],"mouseout",out);
	}
		return this;
};

//隐藏方法，不需要参数
Basejs.prototype.hide = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].style.display = 'none';
	}
		return this;
};

//显示方法，需要参数，需要根据原先display的值设置参数，参数为字符串。
Basejs.prototype.show = function (str) {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].style.display = str;
	}
	return this;
};


//给元素设置为屏幕居中。需要给元素提前设置为绝对定位(并且是相对根目录绝对定位)。兼容性好ie8也支持。
Basejs.prototype.center = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].style.top = (document.documentElement.clientHeight - this.elements[i].offsetHeight) / 2 + 'px';
		this.elements[i].style.left = (document.documentElement.clientWidth - this.elements[i].offsetWidth) / 2 + 'px';
	}
	return this;
};

//该锁屏功能只是设置锁屏元素（一个元素）的宽高使之与整个页面同等宽高。需要自行添加锁屏元素，和样式。（需要设置绝对定位，隐藏，）
Basejs.prototype.lock = function () {
	
		this.elements[0].style.width = document.documentElement.scrollWidth + 'px';
		this.elements[0].style.height =document.documentElement.scrollHeight + 'px';
		this.elements[0].style.display = 'block';
		return this;
	
};

//浏览器窗口改变事件，接受一个参数，为函数。
Basejs.prototype.resize = function (fn) {
	window.onresize = fn;
	return this;
};

//动画
//【这个动画还是要等Window.onload事件触发后才执行比较好。不然谷歌浏览器显示动画异常】。
//感觉这个动画效果不能打断？？
//动画是同步进行的。
//动画是用setTimeout写的，用不了for循环？？setTimeout是运行是才获取for循环的值，每次都只能获取的for的最后一个值。
//若用setInterval是可以用for循环。因为setInterval是先赋值给定时器再根据定时器运行。
//是对单个元素的某个css属性进行匀速，或缓冲变化。接受一个对象参数。
//虽然低版本ie不支持opacity属性，但是他有独有的属性设置透明度。并且我们把他们的值设置得一样，
//我们也就可以从opacity属性值，得到ie特有的filter：alpha(opacity=num )属性值;
//obj对象
/*
	obj={
		attr:       //必填。一个css属性字符串。必填。支持透明度opacity属性。
		t:          //可选，默认50.一个事件数值，（毫秒）表示多长时间增加一个步长 
		step:       //可选，默认5.缓冲时没必要填。一个步长数值，
		alter:      //改变量和目标量只需填一个。两个同时存在，执行目标量。设置css属性值要改变的量。
		target:     //设置css属性值的目标量。（透明度opacity属性的目标量取值范围是0到一百）
		speed：     //可选默认10.一个数值，缓冲变化的速度。
		type:      //一个字符串，设置类型匀速或缓冲类型，默认为缓冲，不设置或随便设置为匀速。
		company：  //一个字符串，css属性值接受的单位。默认为“px”
		fn：       //可选，接受一个参数。用于动画运行后执行。
	}

*/
Basejs.prototype.animate_setTimeout = function (obj) {
		var element= this.elements[0];
		var attr = obj["attr"];
		var step = obj['step'] != undefined ? obj['step'] : 5;
		var start = attr == "opacity" ? parseFloat( chj.tools.getStyle(element, attr))*100 : parseInt( chj.tools.getStyle(element, attr));
		var alter = obj["alter"];
		var target = obj["target"] != undefined ? obj["target"] : (start+ alter);
		var t = obj['t'] != undefined ? obj['t'] : 50;
		var speed = obj['speed'] != undefined ? obj['speed'] : 10;
		var type = obj['type'] != undefined ? obj['type'] : "buffer" ;
		var company = obj['company'] != undefined ? obj['company'] : "px" ; 
		//用于动画后执行的函数。也就可以链式执行动画。
		var fn = obj['fn'];




		if(start > target) step=-step;

		if ( attr == "opacity") {
			(function(){	
		
						var nstyle = parseFloat( chj.tools.getStyle(element, attr))*100;
						
						
						if (type == "buffer") {
							var temp = (target - nstyle) / speed;
							 step = temp > 0 ? Math.ceil(temp) : Math.floor(temp);  
							 // document.getElementById("p").innerHTML += step+"if"+"<br/>";

						};
						


			          	if ( step>0 && target - nstyle  > step){

			          		chj.tools.setOpacity(element,nstyle + step);
			          		// document.getElementById("p").innerHTML += parseFloat( chj.tools.getStyle(element, attr))*100+"t"+"<br/>";
			            	setTimeout( arguments.callee, t ); 
			            	 
			            } else if (step<0 && nstyle - target  > -step ) {
			            	chj.tools.setOpacity(element,nstyle + step);
			            	// document.getElementById("p").innerHTML +=parseFloat( chj.tools.getStyle(element, attr))*100+"<br/>";
			            	setTimeout( arguments.callee, t );
			            	
			            } else {
			            	setTimeout( function(){
			            		chj.tools.setOpacity(element,target);
			            		if(typeof fn == "function"){fn();}
			            		// document.getElementById("p").innerHTML += parseFloat( chj.tools.getStyle(element, attr))*100+"m"+"<br/>";

			            	}, t );
			            }; 	            
			            
			})();



		}else{
			
			(function(){	
		
						var nstyle = parseInt(chj.tools.getStyle(element, attr));
						
						if (type == "buffer") {
							var temp = (target - nstyle) / speed;
							 step = temp > 0 ? Math.ceil(temp) : Math.floor(temp);   
						};
						


			          	if ( step>0 && target - nstyle  > step){
			          		element.style[attr] =nstyle + step + company;
			            	setTimeout( arguments.callee, t ); 
			            	 // document.getElementById("p").innerHTML += parseInt(chj.tools.getStyle(element, attr))+"t"+"<br/>";
			            } else if (step<0 && nstyle - target  > -step ) {
			            	element.style[attr] =nstyle + step + company;
			            	setTimeout( arguments.callee, t );
			            	// document.getElementById("p").innerHTML += parseInt(chj.tools.getStyle(element, attr))+"<br/>";
			            } else {
			            	setTimeout( function(){
			            		
			            		element.style[attr] = target + company;
			            		if(typeof fn == "function"){fn();}
			            		// document.getElementById("p").innerHTML += parseInt(chj.tools.getStyle(element, attr))+"m"+"<br/>";

			            	}, t );
			            }; 	            
			            
			})();
		};
		
	return this;
};

//动画
//animate_setInterval与animate_setTimeout的区别在于，animate_setInterval动画可以停止，而animate_setTimeout一旦执行，不能停止，直到达到了target。
//animate_setInterval动画一样接受一个对象。
/*
	obj={
		attr:       //必填。一个css属性字符串。必填。支持透明度opacity属性。
		t:          //可选，默认50.一个事件数值，（毫秒）表示多长时间增加一个步长 
		step:       //可选，默认5.缓冲时没必要填。一个步长数值，
		alter:      //改变量和目标量只需填一个。两个同时存在，执行目标量。设置css属性值要改变的量。
		target:     //设置css属性值的目标量。（透明度opacity属性的目标量取值范围是0到一百）
		speed：     //可选默认10.一个数值，缓冲变化的速度。
		type:      //一个字符串，设置类型匀速或缓冲类型，默认为缓冲，不设置或随便设置为匀速。
		company：  //一个字符串，css属性值接受的单位。默认为“px”
		fn：       //可选，接受一个参数。用于动画运行后执行。

		mul:{}    // //接受一个对象，用于同步动画，键名为css属性，键值为目标量。如果该对象有定义这attr，alter，target无效。未定义则有效。
	}
*/


Basejs.prototype.animate_setInterval = function (obj) {


		var element = this.elements[0];

		var attr,start,alter,target;  //先定义后赋值。
		
		var mul = obj['mul'];  //接受一个对象，用于同步动画，键名为css属性，键值为目标量。如果该对象有定义这attr，alter，target无效。未定义则有效。
		var step = obj['step'] != undefined ? obj['step'] : 5;
		var t = obj['t'] != undefined ? obj['t'] : 50;
		var speed = obj['speed'] != undefined ? obj['speed'] : 10;
		var type = obj['type'] != undefined ? obj['type'] : "buffer" ;
		var company = obj['company'] != undefined ? obj['company'] : "px" ; 
		//用于动画后执行的函数。也就可以链式执行动画。
		var fn = obj['fn'];

		

		if (mul == undefined) {
		 	attr = obj["attr"];
			start = attr == "opacity" ? parseFloat( chj.tools.getStyle(element, attr))*100 : parseInt( chj.tools.getStyle(element, attr));
			alter = obj["alter"];
			target = obj["target"] != undefined ? obj["target"] : (start+ alter);

			if(start > target) step=-step;

			mul = {};
			mul[attr] = target;
		}
		clearInterval(element.timer);
		element.timer= setInterval(function(){

			var flag = true;

			for (var i in mul) {
				attr = i;
				target = mul[i];
				start = attr == "opacity" ? parseFloat( chj.tools.getStyle(element, attr))*100 : parseInt( chj.tools.getStyle(element, attr));
				if(start > target) step=-step;
				
				
				 if ( attr == "opacity") {
				 	var nstyle = parseFloat( chj.tools.getStyle(element, attr))*100;

				 	if (type == "buffer") {
						var temp = (target - nstyle) / speed;
						 step = temp > 0 ? Math.ceil(temp) : Math.floor(temp);  
						 // document.getElementById("p").innerHTML += step+"if"+"<br/>";

					};

					if ( step>0 && target - nstyle  > step){

		          		chj.tools.setOpacity(element,nstyle + step);
		          		// document.getElementById("p").innerHTML += parseFloat( chj.tools.getStyle(element, attr))*100+"t"+"<br/>";
		            	
		            	 
		            } else if (step<0 && nstyle - target  > -step ) {
		            	chj.tools.setOpacity(element,nstyle + step);
		            	// document.getElementById("p").innerHTML +=parseFloat( chj.tools.getStyle(element, attr))*100+"<br/>";
		            	
		            	
		            } else {
		            	//这里之所以不用setTimeout是为了下面的判断语句能马上给flag做出准确赋值，不然有t的延时而flag
		            	// setTimeout( function(){
		            	// 	chj.tools.setOpacity(element,target);
		            	
		            	// }, t );
						chj.tools.setOpacity(element,target);
						
		            };

		            if (target != parseFloat( chj.tools.getStyle(element, attr))*100) {

		            	flag = false;
		            }

		       
				}else{

				 	var nstyle = parseInt(chj.tools.getStyle(element, attr));

					if (type == "buffer") {
						var temp = (target - nstyle) / speed;
						 step = temp > 0 ? Math.ceil(temp) : Math.floor(temp);   
					};
					if ( step>0 && target - nstyle  > step){
		          		element.style[attr] =nstyle + step + company;
		            	
		        	} else if (step<0 && nstyle - target  > -step ) {
		            	element.style[attr] =nstyle + step + company;
		            	
		            } else {

		            	//  setTimeout( function(){
		            	// 	element.style[attr] = target + company;
		            	
		            	// }, t );
		            	
						element.style[attr] = target + company;
					 };

					if (target != parseInt(chj.tools.getStyle(element, attr))) {
					 	flag = false;
		        	} 

		        	
				}

				  
			}

			if (flag) {
				clearInterval(element.timer);
				if (obj.fn != undefined) obj.fn();
			}

		},t);
		

	return this;
};

//点击元素对象，来回执行参数里的函数。参数里的函数this代表被点的元素对象。
Basejs.prototype.toggle = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		
		(function (element, args) {                  //使用闭包，使count不共享。
			var count = 0;
			chj.tools.addEvent(element, 'click', function () {
				args[count++ % args.length].call(this);
			});
		})(this.elements[i], arguments);
		
	}
	return this;
};

//获取某一个元素是其父元素的第几个元素。从0开始。
Basejs.prototype.index = function () {
	var children = this.elements[0].parentNode.children;
	for (var i = 0; i < children.length; i ++) {
		if (this.elements[0] == children[i]) return i;
	}
};





//只允许一个元素节点对象获取下一个兄弟元素节点对象。
Basejs.prototype.next = function () {
	
		this.elements[0] = this.elements[0].nextSibling;
		if (this.elements[0] == null) throw new Error('找不到下一个同级元素节点！');
		if (this.elements[0].nodeType == 3) this.next();

	return this;
}

Basejs.prototype.prev = function () {
	
	this.elements[0] = this.elements[0].previousSibling;
	if (this.elements[0] == null) throw new Error('找不到上一个同级元素节点！');
	if (this.elements[0].nodeType == 3) this.prev();
	
	return this;
}




//图片延迟加载（在可视区时加载）
//问题1：将xsrc地址替换到src中去
//当图片进入到可见区域的时候，将图片的xsrc的地址替换到src即可
//alert($('.wait_load').eq(0).attr('xsrc'));
//$('.wait_load').eq(0).attr('src', $('.wait_load').eq(0).attr('xsrc'));


//问题2：获取图片元素到最外层顶点元素的距离
//alert(offsetTop($('.wait_load').first()));

//问题3：获取页面可视区域的最低点的位置
//alert(getInner().height + getScroll().top);

//一个参数时获取某一个节点的属性
//两个参数时设置某个属性值
//用于自定义属性。（自定义属性使用obj.自定义属性名在获取值在非ie和ie9及以上不可行。）
Basejs.prototype.attr = function (attr, value) {
	var length =this.elements.length;
	for (var i = 0; i < length; i ++) {
		if (arguments.length == 1) {
			return this.elements[i].getAttribute(attr);
		} else if (arguments.length == 2) {
			this.elements[i].setAttribute(attr, value);
		}
	}
	return this;
};


//--------------------设置一个接受插件的方法-----------------
//其实也就是一个添加原形函数的方法。
//接受两个参数一个是函数的名字，字符串，一个是函数。
Basejs.prototype.extend = function (name, fn) {
	Basejs.prototype[name] = fn;
};
// ---------------------------------分界线-------------------------
//可以传递一个元素对象。
var $ =function(args){
	return new Basejs(args);
};

//--------------------兼容方法---------------------------
var chj={};
chj.tools = {};

//最好就把css，js等需要加载先的东西放在addDomLoaded之前，免得不必要的麻烦。
//如<link rel="stylesheet" type="text/css" href="...css">
// 如<script src="js/Basejs.js"></script>
chj.tools.addDomLoaded=function (fn) {
	if (document.addEventListener) { //W3C
		chj.tools.addEvent(document, 'DOMContentLoaded', function () {
			fn();
			chj.tools.removeEvent(document, 'DOMContentLoaded', arguments.callee);
		});
	}
	else { //IE
		// var timer = null;
		// timer = setInterval(function () {
		// 	try {
		// 		document.documentElement.doScroll('left');
		// 		fn();
		// 	} catch (e) {};
		// });
		(function(){
			try {   
            	document.documentElement.doScroll("left");
            	fn();  
         	} catch( error ) {  
            	setTimeout( arguments.callee, 0 );    
         }
		})();
	}
}

//模拟兼容现代事件添加函数
//测试ie8及以上版本，和非ie浏览器
//支持this传递
//支持添加多个事件处理函数，（没有做ie8兼容屏蔽相同函数的添加）
//支持参数传递事件对象
//支持W3C阻止默认行为和取消冒泡的方法。event.preventDefault（）和event.stopPropagation（）
chj.tools.addEvent = function (obj, type, fn) {
	if (typeof obj.addEventListener != 'undefined') {
		obj.addEventListener(type, fn, false);
	} else {
		//创建一个可以保存不同类型的事件的对象
		
		if (!obj.events) obj.events = {};
		if (!obj.events[type]) {
			//创建一个可以保存事件处理函数的数组
			obj.events[type] = {};
			obj.events[type].num =0; //这个计数器用于删除事件函数时计数，计数已经有几个undefined，如果undefined的个数等于ID数（也就是functions数组的长度）。表示事件函数全部清空。
			obj.events[type].ID=0;  //这个计数器用于添加事件函数时计数，每增加一个事件函数，ID增加一。
			obj.events[type].functions=[];
		}

		obj.events[type].functions[(obj.events[type].ID) ++] = fn;
		// 执行所有事件处理函数
		obj['on' + type] = function (event) {
			//ie8不支持（ie9及以上支持）W3c标准的取消冒泡和阻止默认行为的方法。（alert时间对象的preventDefault和stopPropagation方法显示“undefined”未定义）
			//所以我们给ie8及以下浏览器的事件对象添加上着两个方法，从而也就做到了兼容。
			var e = event || function(event){
				event.preventDefault = function () {
					this.returnValue = false;   //阻止默认行为
				};
				event.stopPropagation = function () {
					this.cancelBubble = true; //取消冒泡
				};
				return event;
			}(window.event);
			for (var i in obj.events[type].functions) {
			 obj.events[type].functions[i].call(this,e);   //这里处理了事件对象和this的传递
			}
			
		};
		
		
	}
};


//移除事件处理函数
chj.tools.removeEvent = function (obj, type, fn) {
	if (typeof obj.removeEventListener != 'undefined') { //w3c标准移除
		obj.removeEventListener(type, fn, false);
	} else {
			var es = obj.events[type].functions;
			for (var i in es) {
				if (es[i] == fn) {
					delete obj.events[type].functions[i];
				}
				if (es[i] == undefined){
					obj.events[type].num++;  //undefined计数器（在添加事件处理函数时创建）
				}
			}
			if(obj.events[type].num == obj.events[type].functions.length){
				delete obj.events[type];  //如果全部函数清楚完毕，就删除添加事件处理函数时创建的全部对象。（包括 functions events ID num）

			}
		}
};


//获取某一个元素计算后样式，接受两个参数，一个为元素对象，一个是要获取的属性字符串，返回一个属性值。
//parsInt()方法可以吧字符串转换成数值，但是字符串必须是以数值开头。
//因为用了parseInt（）方法，可能有些属性返回不准确。
chj.tools.getStyle = function(element, attr){  

	var value;
	if (typeof window.getComputedStyle != 'undefined') {//W3C
		value = window.getComputedStyle(element, null)[attr];
	} else if (typeof element.currentStyle != 'undeinfed') {//IE
		value = element.currentStyle[attr];
	}
	return value;
	
};

//元素设置透明度， 接受两个参数，一个元素对象，一个透明度。透明度是从零到一百。
chj.tools.setOpacity = function(obj,num) {
	obj.style.filter = 'alpha(opacity='+ num +')';
	obj.style.opacity = num / 100;
}


//获取滚动条隐藏了的像素数值。返回一个数组，一个top是上下滚动条隐藏了的数值，left是左右滚动条隐藏的数值
chj.tools.getScroll = function(){
	return{
		top : document.documentElement.scrollTop || document.body.scrollTop,
		left : document.documentElement.scrollLeft || document.body.scrollLeft
	}
}

//删除字符串前后的空格。

chj.tools.trim = function (str) {
	return str.replace(/(^\s*)|(\s*$)/g, '');
}


//检测某个数组是否含有value值。
chj.tools.inArray = function (array, value) {
	for (var i in array) {
		if (array[i] === value) return true;
	}
	return false;
}

//封装ajax

/*
ajax调用
ajax({
	method : 'post',
	url : 'demo.php',
	data : {               //请求头传递的键值对数据。
		'name' : 'Lee',
		'age' : 100
	},
	success : function (text) {
		alert(text);       //弹窗显示相应主体。
	},
	async : true   //是否异步
});
*/
chj.tools.ajax = function(obj) {
	var xhr = (function () {
		if (typeof XMLHttpRequest != 'undefined') {
			return new XMLHttpRequest();
		} else if (typeof ActiveXObject != 'undefined') {
			var version = [
										'MSXML2.XMLHttp.6.0',
										'MSXML2.XMLHttp.3.0',
										'MSXML2.XMLHttp'
			];
			for (var i = 0; version.length; i ++) {
				try {
					return new ActiveXObject(version[i]);
				} catch (e) {
					//跳过
				}	
			}
		} else {
			throw new Error('您的系统或浏览器不支持XHR对象！');
		}
	})();
	obj.url = obj.url + '?rand=' + Math.random();
	obj.data = (function (data) {
		var arr = [];
		for (var i in data) {
			arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
		}
		return arr.join('&');
	})(obj.data);
	if (obj.method === 'get') obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&' + obj.data;
	if (obj.async === true) {
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				callback();
			}
		};
	}
	xhr.open(obj.method, obj.url, obj.async);
	if (obj.method === 'post') {
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(obj.data);	
	} else {
		xhr.send(null);
	}
	if (obj.async === false) {
		callback();
	}
	function callback() {
		if (xhr.status == 200) {
			obj.success(xhr.responseText);			//回调传递参数
		} else {
			alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
		}	
	}
}


//获取某一个元素到最外层顶点的位置(距离body顶部的边框距离)
chj.tools.offsetTop = function (element) {

	var top = element.offsetTop;
	var parent = element.offsetParent;
	while (parent != null) {
		top += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return top;
}


//获取某一个节点的上一个节点的索引
//接受两个参数，current接受当前节点索引数值，parent接受当前节点的父元素对象。
chj.tools.prevIndex = function(current, parent) {
	var length = parent.children.length;
	if (current == 0) return length - 1;
	return current - 1;
}

//获取某一个节点的下一个节点的索引
//接受两个参数，current接受当前节点索引数值，parent接受当前节点的父元素对象。
chj.tools.nextIndex = function(current, parent) {
	var length = parent.children.length;
	if (current == length - 1) return 0;
	return current + 1;
}


//通过创建一个新元素，计算元素的offsetwidth和clientwidth属性的差值算出滚动条的宽度。
//函数直接返回滚动条的宽度。
//元素的表框大小会算到滚动条的宽度上。所以在styles里重置了border属性
chj.tools.getScrollbarWidth = function() {
    var oP = document.createElement('p'),
        styles = {
            width: '100px',
            height: '100px',
            overflowY: 'scroll',
            border: '0px',
        }, i, scrollbarWidth;
    for (i in styles) oP.style[i] = styles[i];
    document.body.appendChild(oP);
    scrollbarWidth = oP.offsetWidth - oP.clientWidth;
    // oP.remove();//ie不支持该删除节点方法
    oP.parentNode.removeChild(oP);
    return scrollbarWidth;
}