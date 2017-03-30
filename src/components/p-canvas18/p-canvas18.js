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
      
       //创建打球
       centerBall.x = W / 2;
       centerBall.y = H / 2;
       centerBall.radius = 60;  
       centerBall.draw(context);
       
       //创建随机小球
       for(var i=0; i<numsBalls; ++i){
            var ball =  new Ball();
            ball.x = Math.random() * 30 + 5;
            ball.y = Math.random() * 30 + 5;
            ball.color = "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
            ball.vx = Math.random() * 6 - 3;
            ball.vy = Math.random() * 6 - 3;
            balls.push(ball);
            //ball.draw(context);
       }


       //
      
})
