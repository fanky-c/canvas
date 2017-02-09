require(['util','canvasArror','canvasBall'],function(util, arror, ball){
   var Ball = ball;
   var canvas = document.getElementById('canvas');
   var context = canvas.getContext('2d');
   var centerX = canvas.width / 2;
   var centerY = canvas.height / 2;

  
   var ball1 = new Ball();
       ball1.x = canvas.width / 2,
       ball1.y = canvas.height /2 - 200;

   var vy = 0, //初始速度
       gravity = 0.2, //重力加速度
       bounce = -0.8; //反弹系数

  //检测碰撞
   function checkGround(ball){
         if(ball.y + ball.radius >= canvas.height){
              ball.y = canvas.height - ball.radius;
              vy *= bounce;
         }
   }

   (function drawFrame(){
       window.requestAnimationFrame(drawFrame, canvas);
       context.clearRect(0, 0, canvas.width, canvas.height);

       vy += gravity;
       ball1.y += vy;

       checkGround(ball1);
       ball1.draw(context);
   })()        
})