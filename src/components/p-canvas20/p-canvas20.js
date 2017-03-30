require(['util','line','canvasBall',],function(_util, _line, _ball){
      var Line = _line;
      var Ball = _ball;
      var utils = _util;
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      var W = canvas.width;
      var H = canvas.height;
      // var scrollBall = new Ball();
      // var vr = 0.05;  //每一帧转动弧度值
      // var cos = Math.cos(vr); //得到的cos值
      // var sin = Math.sin(vr); //得到的sin值
      // var centerX = W / 2;
      // var centerY = H / 2;

      // scrollBall.x = Math.random() * W;
      // scrollBall.y = Math.random() * H;


      // (function drawFrame(){
      //       window.requestAnimationFrame(drawFrame, canvas);
      //       context.clearRect(0, 0, canvas.width, canvas.height);

      //       var x1 = scrollBall.x - centerX;  //相对中心点位置
      //       var y1 = scrollBall.y - centerY;

      //       var newX = x1*cos - x1*sin;   //旋转一定角度后的位置
      //       var newY = y1*cos - y1*sin;

      //       scrollBall.x = centerX + newX;   //更新位置
      //       scrollBall.y = centerY + newY;

      //       scrollBall.draw(context);
      // }())


    //A 简单的角度旋转
    // var ball1 = new Ball(),
    //     vr = 0.05,
    //     angle = 0,
    //     radius = 150,
    //     centerX = canvas.width / 2,
    //     centerY = canvas.height / 2;

    //   (function drawFrame() {
    //     window.requestAnimationFrame(drawFrame, canvas);
    //     context.clearRect(0, 0, canvas.width, canvas.height);

    //     ball1.x = centerX + Math.cos(angle) * radius;
    //     ball1.y = centerY + Math.sin(angle) * radius;
    //     angle += vr;

    //     ball1.draw(context);
    //   }());
    

    //B  高级角度旋转
    
    var ball = new Ball(),
        line = new Line(0, 0, 300, 0),
        mouse = utils.captureMouse(canvas),
        gravity = 0.2,
        bounce = -0.6;

        ball.x = 100;
        ball.y = 100;

        line.x = 50;
        line.y = 300;


      (function drawFrame() {
        window.requestAnimationFrame(drawFrame, canvas);
        context.clearRect(0, 0, canvas.width, canvas.height);

        line.rotation = (mouse.x - canvas.width / 2) * 0.1 * Math.PI / 180;

        ball.vy += gravity;
        ball.x += ball.vx;
        ball.y += ball.vy;

        //ball与line碰撞检测
        if (utils.isIntersects(ball.getBounds(), line.getBounds())) {
          var cos = Math.cos(line.rotation),
            sin = Math.sin(line.rotation);

          var x1 = ball.x - line.x,
            y1 = ball.y - line.y;

          var y2 = y1 * cos - x1 * sin;

          if (y2 > -ball.radius) {
            var x2 = x1 * cos + y1 * sin;

            //旋转速度

            var vx1 = ball.vx * cos + ball.vy * sin,
              vy1 = ball.vy * cos - ball.vx * sin;

            y2 = -ball.radius;
            vy1 *= bounce;

            //旋转回去

            x1 = x2 * cos - y2 * sin;
            y1 = y2 * cos + x2 * sin;

            ball.vx = vx1 * cos - vy1 * sin;
            ball.vy = vy1 * cos - vx1 * sin;

            ball.x = x1 + line.x;
            ball.y = y1 + line.y
          }
        }


        ball.draw(context);
        line.draw(context);

      }())
      
})
