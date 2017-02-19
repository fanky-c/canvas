require(['util','canvasArror','canvasBall','canvasShip'],function(util, arror, ball, ship){
   var Ball = ball;
   var Ship = ship;
   var canvas = document.getElementById('canvas');
   var context = canvas.getContext('2d');
   var centerX = canvas.width / 2;
   var centerY = canvas.height / 2;
   var mouse = util.captureMouse(canvas);
   var isMouseDown = false;
   var ball1 = new Ball();
   var ball = new Ball(),
       w = 0, h = 0,
       vx =0, 
       vy = 0,
       vx1 =0, 
       vy1 = 0,        
       gravity = 0.8, 
       bounce = -0.8,
       easing = 0.05,
       easing1 = 0.03;

      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;

      ball1.x = canvas.width / 5 +30;
      ball1.y = canvas.height / 5 + 30;
      ball1.radius = 20;
      ball1.color = 'blue';


      (function drawFrame(){
           window.requestAnimationFrame(drawFrame, canvas);
           context.clearRect(0, 0, canvas.width, canvas.height);

           vx = (mouse.x - ball.x) * easing;
           vy = (mouse.y - ball.y) * easing;

           vx1 = (mouse.x - ball1.x) * easing1;
           vy1 = (mouse.y - ball1.y) * easing1;           

           ball.x += vx;
           ball.y += vy;
           ball1.x += vx1;
           ball1.y += vy1;

           ball.draw(context);
           ball1.draw(context);

      })()
      



})