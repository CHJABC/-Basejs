/*
兼容火狐谷歌等浏览器的window.requestAnimFrame（）方法。
ie8，ie9等不支持的浏览器通过setTiemout（）方式兼容。
本代码是重写window.requestAnimFrame()方法。所以在浏览器可以直接使用。Window.requestAnimFrame()[包括火狐谷歌ie8ie9等]

也支持window.cancelAnimationFrame（id）方法取消。

感觉这个方法还是不好用，感觉是cancelAnimationFrame（）清除不了。
可能是不会用，感觉卡的一比（在用的是setTimeout的时候）

*/


(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {            // 在不支持window.requestAnimationFrame的浏览器运行。如ie8，ie9
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();


            //为了使setTimteout的尽可能的接近每秒60帧的效果
            //本函数是一个匿名函数，声明了一个lastTime的变量，并且在该处又调用到。所以lastTime变量将一直驻留在内存中。
            //所以当第一次调用函数时lastTime是初始值，为零。timeToCall也就为零。
            //接下来lastTime = currTime + timeToCall;lastTime就记录下了本次执行完setTimeout（）后的时间。
            //当再次调用window.requestAnimationFrame（）方法时，lastTime不在是零，而timeToCall也就等于当前时间currTime-lastTime（上次执行完setTimeout的时间）
            //从而算出了setTimeout（）执行完毕需要的时间。
            //然后16.7（确保每秒60帧）减去setTime的耗时。从而算出了每个setTimeout（）的间隔时间已确保每秒60帧，返回给timeToCall。

            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
})();