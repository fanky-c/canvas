var util = {};

//鼠标相对当前元素的坐标
util.captureMouse = function(element) {
	  var mouse = {x:0, y:0};
      
      element.addEventListener('mousemove',function(event){
      	   var x, y;

      	   if(event.pageX || event.pageY){
                x = event.pageX;
                y = event.pageY;
      	   }else{
      	   	    x = event.clientX + document.body.srcollLeft + document.documentElement.srcollLeft;
      	   	    y = event.clientY + document.body.srcollTop + document.documentElement.srcollTop;
      	   }

      	   x -= element.offsetLeft;
      	   y -= element.offsetTop;

      	   mouse.x = x;
      	   mouse.y = y;

      },false);

      return mouse;
};


//鼠标相对当前元素的坐标(只适合canvas元素) getBoundingClientRect();
util.captureCanvasMouse = function(canvasElement){
    var can = {x:0, y:0};

    canvasElement.addEventListener('mousemove',function(event){
    	   var event = event || window.event;
    	   var winx = event.clientX + document.body.srcollLeft + document.documentElement.srcollLeft || event.pageX;
    	   var winY = event.clientY + document.body.srcollTop + document.documentElement.srcollTop || event.pageY;
    

           var canBox =  canvas.getBoundingClientRect();

           can.x = (winx - canBox.left) * (canvas.width / canBox.width);
           can.y = (winY - canBox.top) * (canvas.height / canBox.height);

    },false)

    return can;
}

//手指相对当前元素坐标()
util.captureTouch = function(element){
   var touch = {x:null, y:null, isPressed:false, event:null};
   var bodyScrollLeft = document.body.srcollLeft;
   var bodyScrollTop = document.body.bodyScrollTop;
   var elementScrollLeft = document.documentElement.srcollLeft;
   var elementScrollTop = document.documentElement.srcollTop;
   var offsetLeft = element.offsetLeft;
   var offsetTop = element.offsetTop;


   element.addEventListener('touchstart',function(event){
   	   touch.isPressed = true;
   	   touch.event = event;
   },false)


   element.addEventListener('touchend',function(event){
       touch.isPressed = false;
       touch.x = null;
       touch.y = null;
       touch.event = event;
   },false)


   element.addEventListener('touchmove',function(event){
   	    var x, y, 
   	        touchEvent = event.touches[0]; //first touch


   	    if(touchEvent.pageX || touchEvent.pageY){
              x = touchEvent.pageX;
              y = touchEvent.pageY;
   	    }else{
   	    	  x = touchEvent.clientX + bodyScrollLeft + elementScrollLeft;
   	    	  y = touchEvent.clientY + bodyScrollTop + elementScrollTop;
   	    }

   	    x -= offsetLeft;
   	    y -= offsetTop;

   	    touch.x = x;
   	    touch.y = y;
   },false)

   return touch;
}


//判断元素是否在 x\y均为鼠标位置
util.containsPoint = function(rect, x, y){
     return !(
           x < rect.x 
           || x > rect.x + rect.width
           || y < rect.y 
           || y > rect.y + rect.height 
      )
}

//兼容requestAnimationFrame
if(!window.requestAnimationFrame){
    window.requestAnimationFrame = 
	(window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		function(callback) {
			return window.setTimeout(callback, 17 /*~ 1000/60*/ );
		})
}

if (!window.cancelAnimationFrame) { 
	window.cancelAnimationFrame =
		(window.cancelRequestAnimationFrame ||
			window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
			window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
			window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
			window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
			window.clearTimeout);
}

