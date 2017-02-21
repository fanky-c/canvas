require(['util','canvasArror','canvasBall','canvasShip'],function(util, arror, ball, ship){
   var Ball = ball;
   var Ship = ship;
   var canvas = document.getElementById('canvas');
   var context = canvas.getContext('2d');
   var centerX = canvas.width / 2;
   var centerY = canvas.height / 2;
   var mouse = util.captureMouse(canvas);
   


   var ball = new Ball();
   var spring = 0.03; //弹力参数
   var friction = 0.95; //摩擦力
   var vx = 0, vy = 0;
   ball.x = canvas.width / 2;
   ball.y = canvas.height / 2;
   
   (function drawFrame(){
      window.requestAnimationFrame(drawFrame, canvas);
      context.clearRect(0, 0, canvas.width, canvas.height);

      var dx = mouse.x - ball.x;
      var dy = mouse.y - ball.y;
      var ax = dx * spring;
      var ay = dy * spring;

         vx += ax;
         vy += ay;
         vx *= friction;
         vy *= friction;

         ball.x += vx;
         ball.y += vy;

         ball.draw(context);
   })()   

})