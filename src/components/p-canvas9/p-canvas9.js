require(['util','canvasArror','canvasBall','canvasShip'],function(util, arror, ball, ship){
   var Ball = ball;
   var Ship = ship;
   var canvas = document.getElementById('canvas');
   var context = canvas.getContext('2d');
   var centerX = canvas.width / 2;
   var centerY = canvas.height / 2;
   var mouse = util.captureMouse(canvas);
   var ball = new Ball();
   var w = 0, h = 0;
    
       ball.x = canvas.width / 2;
       ball.y = canvas.height / 2;
       ball.draw(context);
  
  //事件监听
   canvas.addEventListener('mousedown',function(event){
         
         console.log('开始mouse.x',mouse.x)
         console.log('开始mouse.y',mouse.y)
         
         //判断鼠标是否在元素上
        if(util.containsPoint(ball.getBounds(), mouse.x, mouse.y)){
             w = mouse.x - ball.x;
             h = mouse.y - ball.y;

             canvas.addEventListener('mouseup',onMouseUp,false);
             canvas.addEventListener('mousemove',onMouseMove,false);     
        }
   },false)

   //mouseup事件
   function onMouseUp(event){
       canvas.removeEventListener('mouseup',onMouseUp,false);
       canvas.removeEventListener('mousemove',onMouseMove,false);
   }    

   //mousemove事件
   function onMouseMove(event){
        ball.x = mouse.x - w;
        ball.y = mouse.y - h;
   }

   (function drawFrame(){
       window.requestAnimationFrame(drawFrame, canvas);
       context.clearRect(0, 0, canvas.width, canvas.height);

       ball.draw(context);
   })()


})