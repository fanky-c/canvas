require(['util','canvasArror','canvasBall','canvasShip'],function(util, arror, ball, ship){
   var Ball = ball;
   var Ship = ship;
   var canvas = document.getElementById('canvas');
   var context = canvas.getContext('2d');
   var centerX = canvas.width / 2;
   var centerY = canvas.height / 2;
   var mouse = util.captureMouse(canvas);
   var isMouseDown = false;
   var ball = new Ball(),
       w = 0, h = 0,
       vx =0, 
       vy = 0, 
       gravity = 0.8, 
       bounce = -0.8,
       easing = 0.05,
       targetX = canvas.width - 50,
       oldX,oldY,speed;

    //ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;


    
    (function drawFrame(){
         var id = window.requestAnimationFrame(drawFrame, canvas);
         var dx = targetX - ball.x;
         context.clearRect(0, 0, canvas.width, canvas.height);

         if(Math.abs(dx) < 1){
            window.cancelAnimationFrame(id);
         }else{
            var vx = dx * easing;
            ball.x += vx;
         }

         ball.draw(context);

    })()

})