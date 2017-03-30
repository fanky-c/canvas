require(['util','canvasArror','canvasBall',],function(util, arror, ball){
      var Ball = ball;
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      var W = canvas.width;
      var H = canvas.height;
      var scrollBall = new Ball();
      var vr = 0.05;  //每一帧转动弧度值
      var cos = Math.cos(vr); //得到的cos值
      var sin = Math.sin(vr); //得到的sin值
      var centerX = W / 2;
      var centerY = H / 2;

      scrollBall.x = Math.random() * W;
      scrollBall.y = Math.random() * H;

      (function drawFrame(){
            window.requestAnimationFrame(drawFrame, canvas);
            context.clearRect(0, 0, canvas.width, canvas.height);

            var x1 = scrollBall.x - centerX;  //相对中心点位置
            var y1 = scrollBall.y - centerY;

            var newX = x1*cos - x1*sin;   //旋转一定角度后的位置
            var newY = y1*cos - y1*sin;

            scrollBall.x = centerX + newX;   //更新位置
            scrollBall.y = centerY + newY;

            scrollBall.draw(context);
      }())
      
      
})
