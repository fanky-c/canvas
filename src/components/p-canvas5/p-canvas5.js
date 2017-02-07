require(['util','canvasArror','canvasBall'],function(util, arror, ball){
   var Ball = ball;
   var canvas = document.getElementById('canvas');
   var context = canvas.getContext('2d');
   var centerX = canvas.width / 2;
   var centerY = canvas.height / 2;
  
   //正常的X轴运动
   var ball = new Ball(canvas.width / 4, canvas.height / 4);
   var vx = 1;

   (function drawFrame(){
       window.requestAnimationFrame(drawFrame, canvas);
       context.clearRect(0, 0, canvas.width, canvas.height);

       ball.x += vx;
       if(ball.x >= 400){
          ball.x = canvas.width / 4;
       }
       ball.draw(context);
   })();



   //
})