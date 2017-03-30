require(['util','canvasArror','canvasBall',],function(util, arror, ball){
      var Ball = ball;
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      var W = canvas.width;
      var H = canvas.height;
      var centerBall = new Ball();
      var balls = [];
      var numsBalls = 10;
      var spring = 0.03;
      var bounce = -1;
      
       //创建大球
       centerBall.x = W / 2;
       centerBall.y = H / 2;
       centerBall.radius = 60;         
       
       //创建随机小球
       for(var i=0; i<numsBalls; ++i){
            var ball =  new Ball();
            ball.x = Math.random() * 30 + 5;
            ball.y = Math.random() * 30 + 5;
            ball.radius = Math.random() * 30 + 5;
            ball.color = "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
            ball.vx = Math.random() * 6 - 3;
            ball.vy = Math.random() * 6 - 3;
            balls.push(ball);
       }


       //边界碰撞
       function move(ball){
             ball.x += ball.vx;
             ball.y += ball.vy;

             if(ball.x + ball.radius > canvas.width){
                     ball.x = canvas.width - ball.radius;
                     ball.vx *= bounce;
             }

             if(ball.x - ball.radius < 0){
                    ball.x = ball.radius;
                    ball.vx *= bounce;
             }

             if(ball.y + ball.radius > canvas.height){
                     ball.y = canvas.height - ball.radius;
                     ball.vy *= bounce;
             }

             if(ball.y - ball.radius < 0){
                    ball.y = ball.radius;
                    ball.vy *= bounce;
             }

             //ball.draw(context)               
       }


       //检测碰撞
       function draw(ball){
           var dx = ball.x - centerBall.x;
           var dy = ball.y - centerBall.y;
           var dist = Math.sqrt(dx*dx+dy*dy);
           var min_dist = centerBall.radius - ball.radius;
           
           if(dist < min_dist){
              var angle = Math.atan2(dy,dx);
              var targetx = centerBall.x + Math.cos(angle) * min_dist;
              var targetY = centerBall.y + Math.sin(angle) * min_dist;

              ball.vx += (targetx - ball.x) * spring;
              ball.vy += (targetY - ball.y) * spring;
           }

           ball.draw(context);

       } 
      

       (function drawFrame(){
               window.requestAnimationFrame(drawFrame, canvas);
               context.clearRect(0, 0, canvas.width, canvas.height);

               balls.forEach(move)
               balls.forEach(draw)
               centerBall.draw(context);
       }())
      
})
