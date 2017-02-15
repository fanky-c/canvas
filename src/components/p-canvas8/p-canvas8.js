require(['util','canvasArror','canvasBall','canvasShip'],function(util, arror, ball, ship){
   var Ball = ball;
   var Ship = ship;
   var canvas = document.getElementById('canvas');
   var context = canvas.getContext('2d');
   var centerX = canvas.width / 2;
   var centerY = canvas.height / 2;

  

  //检测Y轴碰撞
   // var ball1 = new Ball();
   //     ball1.x = canvas.width / 2,
   //     ball1.y = canvas.height /2 - 200;
   // var vy = 0, //初始速度
   //     gravity = 0.2, //重力加速度
   //     bounce = -0.8; //反弹系数
   // function checkGround(ball){
   //       if(ball.y + ball.radius >= canvas.height){
   //            ball.y = canvas.height - ball.radius;
   //            vy *= bounce;
   //       }
   // }

   // (function drawFrame(){
   //     window.requestAnimationFrame(drawFrame, canvas);
   //     context.clearRect(0, 0, canvas.width, canvas.height);

   //     vy += gravity;
   //     ball1.y += vy;

   //     checkGround(ball1);
   //     ball1.draw(context);
   // })()

   
   //检测X、Y轴碰撞
   // var vx = Math.random() * 30 - 5;
   // var vy = Math.random() * 30 - 4;
   // var ball2 = new Ball();

   //     ball2.x = canvas.width / 2;
   //     ball2.y = canvas.height/ 2;

   //     ball2.draw(context);


   //  (function drawFrame(){
   //      window.requestAnimationFrame(drawFrame, canvas);
   //      context.clearRect(0, 0, canvas.width, canvas.height);

   //      ball2.x += vx;
   //      ball2.y += vy;

   //      //检测
   //      if(ball2.x + ball2.radius > canvas.width){
   //         ball2.x = canvas.width - ball2.radius;
   //         vx *= -1;
   //      }else if(ball2.x - ball2.radius < 0){
   //         ball2.x = ball2.radius;
   //         vx *= -1;
   //      }

   //      if(ball2.y + ball2.radius > canvas.height){
   //          ball2.y = canvas.height - ball2.radius;
   //          vy *= -1;
   //      }else if(ball2.y - ball2.radius < 0){
   //          ball2.y = ball2.radius;
   //          vy *= -1;
   //      }

   //      ball2.draw(context);
   //  })()



   //飞船
   var ship1 = new Ship();
       ship1.x = canvas.width / 2;
       ship1.y = canvas.height / 2;

   var vr = 0,
       vx = 0,
       vy = 0,
       ax = 0,
       ay = 0,
       f = 0.97, //摩擦力
       angele = 0,
       thrust = 0;

       //控制方向
       window.addEventListener('keydown', function(event){
           console.log(event.keyCode);
           switch(event.keyCode){
                case 37:
                    vr = -3;
                    vx = 0;
                    vy = 0;
                    break;
                case 39:
                    vr = 3;
                    vx = 0;
                    vy = 0;
                    break;
                case 38:
                    ship1.showFrame = true;
                    thrust = 0.05;
                    break;
                case 40:
                     ax = 0;
                     ay = 0;
                     vx = 0;
                     vy = 0;
                     break;            
           }
       },false);


       window.addEventListener('keyup',function(event){
            vr = 0;
            thrust = 0;
            ship1.showFrame = false;
       },false);


       (function drawFrame(){
           window.requestAnimationFrame(drawFrame, canvas);
           context.clearRect(0, 0, canvas.width, canvas.height);

           ship1.rotation += vr * Math.PI / 180;

           angele = ship1.rotation;
           ax = Math.cos(angele) * thrust;
           ay = Math.sin(angele) * thrust;

           vx += ax;
           vy += ay;
           
           //摩擦力
           vx *= f;
           vy *= f;


           ship1.x += vx;
           ship1.y += vy;


           //检测边界
           if(ship1.x + ship1.width / 2 > canvas.width){
               ship1.x = canvas.width - ship1.width
               vx *= -1;
               vr = 3;
           }else if(ship1.x < ship1.width / 2){
               ship1.x = ship1.width / 2;
               vx *= -1;
               vr = 3;
           }

           if(ship1.y + ship1.height / 2 > canvas.height){
               ship1.y = canvas.height - ship1.height;
               vy *= -1;
               vr = -3;
           }else if(ship1.y < ship1.height / 2){
               ship1.y = ship1.height / 2;
               vy += -1;
               vr = -3;
           }

           ship1.draw(context);

       })()

})