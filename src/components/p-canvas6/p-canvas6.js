require(['util','canvasArror','canvasBall','canvasShip'],function(util, arror, ball, ship){
   var Ball = ball;
   var Ship = ship;
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

   //飞船
   // var ship1 = new Ship();
   //     ship1.x = canvas.width / 2;
   //     ship1.y = canvas.height / 2;

   // var vr = 0,
   //     vx = 0,
   //     vy = 0,
   //     ax = 0,
   //     ay = 0,
   //     angele = 0,
   //     thrust = 0;

   //     //控制方向
   //     window.addEventListener('keydown', function(event){
   //         console.log(event.keyCode);
   //         switch(event.keyCode){
   //              case 37:
   //                  vr = -3;
   //                  vx = 0;
   //                  vy = 0;
   //                  break;
   //              case 39:
   //                  vr = 3;
   //                  vx = 0;
   //                  vy = 0;
   //                  break;
   //              case 38:
   //                  ship1.showFrame = true;
   //                  thrust = 0.05;
   //                  break;
   //              case 40:
   //                   ax = 0;
   //                   ay = 0;
   //                   vx = 0;
   //                   vy = 0;
   //                   break;            
   //         }
   //     },false);


   //     window.addEventListener('keyup',function(event){
   //          vr = 0;
   //          thrust = 0;
   //          ship1.showFrame = false;
   //     },false);


   //     (function drawFrame(){
   //         window.requestAnimationFrame(drawFrame, canvas);
   //         context.clearRect(0, 0, canvas.width, canvas.height);

   //         ship1.rotation += vr * Math.PI / 180;

   //         angele = ship1.rotation;
   //         ax = Math.cos(angele) * thrust;
   //         ay = Math.sin(angele) * thrust;

   //         vx += ax;
   //         vy += ay;


   //         ship1.x += vx;
   //         ship1.y += vy;

   //         ship1.draw(context);

   //     })()

})