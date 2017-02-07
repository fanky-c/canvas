require(['util','canvasArror','canvasBall'],function(util, arror, ball){
   var Ball = ball;
   var canvas = document.getElementById('canvas');
   var context = canvas.getContext('2d');
   var centerX = canvas.width / 2;
   var centerY = canvas.height / 2;

   //平滑运动
   //value = center + Math.sin(angle)*range;
   //angle += speed  
   var angle = 0;
   var range = 50;
   var ball = new Ball(centerX, 50);    
   (function drawFrame(){
        window.requestAnimationFrame(drawFrame, canvas);
        context.clearRect(0, 0, canvas.width, canvas.height);

        ball.x = canvas.width / 2 + Math.sin(angle) * range;
        angle += 0.1;

        ball.draw(context);
   })();


   //正圆运动
   // positionX = centerX + Math.sin(angle) * radius;
   // positionY = centerY + Math.cos(angle) * radius;
   // angle += speed;
   var ball2 = new Ball(centerX,100);
   var angle2 = 0;
   var radius = 80;
   var speed = 0.06;

   (function drawFrame(){
        window.requestAnimationFrame(drawFrame, canvas);
        context.clearRect(0, 0, canvas.width, canvas.height);

        ball2.x = centerX + Math.sin(angle2) * radius;
        ball2.y = centerY + Math.cos(angle2) * radius;

        angle2 += speed;
        ball2.draw(context)        
   })();

   //两点之间运动
   //var log = document.getElementById('log');
   var mouse = util.captureMouse(canvas);
   var rect = {
        x: canvas.width / 2,
        y: canvas.height / 2
   };

   // (function drawFrame(){
   //      window.requestAnimationFrame(drawFrame, canvas);
   //      context.clearRect(0, 0, canvas.width, canvas.height);
   //      var dx = mouse.x - rect.x;
   //      var dy = mouse.y - rect.y;
   //      var dis = Math.sqrt(dx*dx, dy*dy);

   //      context.fillStyle = '#fff';
   //      context.fillRect(rect.x - 2, rect.y - 2, 4, 4);


   //      context.save();
   //      context.strokeStyle = '#fff';
   //      context.beginPath();
   //      context.moveTo(rect.x, rect.y);
   //      context.lineTo(mouse.x, mouse.y);
   //      context.closePath();
   //      context.stroke();
   //      context.restore();

   // })();
   

})