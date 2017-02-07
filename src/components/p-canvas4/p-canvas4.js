require(['util','canvasArror','canvasBall'],function(util, arror, ball){
   
   var canvas = document.getElementById('canvas');
   var context = canvas.getContext('2d');
   var centerX = canvas.width / 2;
   var centerY = canvas.height / 2;
   var angle = 0;
   var range = 50;
   var ball = new ball(centerX, centerY);

   //平滑运动
   (function drawFrame(){
        window.requestAnimationFrame(drawFrame, canvas);
        context.clearRect(0, 0, canvas.width, canvas.height);

        ball.x = canvas.width / 2 + Math.sin(angle) * range;
        angle += 0.1;

        ball.draw(context);
   })();

})