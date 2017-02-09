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



   //速度合成与分解
   var ball2 = new Ball(canvas.width /  5, canvas.height / 5);
   var speed = 6;
   var angle = 30;

   (function drawFrame(){
        window.requestAnimationFrame(drawFrame, canvas);
        context.clearRect(0, 0, canvas.width, canvas.height);

        //分解力
        var vx = Math.cos(angle * Math.PI / 180) * speed;
        var vy = Math.sin(angle * Math.PI / 180) * speed;

        ball2.x += vx;
        ball2.y += vy;
        
        if(ball2.x > canvas.width) ball2.x =  canvas.width / 5;
        if(ball2.y > canvas.height) ball2.y =  canvas.height / 5;

        ball2.draw(context);
   })();



   //鼠标跟随
   var angle2 = 0, speed2 = 2;
   var mouse = util.captureMouse(canvas);
   var arror = new arror();
   arror.x = canvas.width / 2;
   arror.y = canvas.height / 2;


   (function drawFrame(){
       window.requestAnimationFrame(drawFrame, canvas);
       context.clearRect(0, 0, canvas.width, canvas.height);

       var dx = mouse.x - arror.x;
       var dy = mouse.y - arror.y;

       angle2 =  Math.atan2(dy, dx);

       arror.rotation = angle2;

       var vx = Math.cos(angle2) * speed2;
       var vy = Math.sin(angle2) * speed2;

       arror.x += vx;
       arror.y += vy;


       arror.draw(context);
   })();



   //第二种鼠标跟随
   // var vr = 30;
   // var speed3 = 2;
   // (function drawFrame(){
   //       window.requestAnimationFrame(drawFrame, canvas);
   //       context.clearRect(0, 0, canvas.width, canvas.height);

   //       //通过rotation改变角度
   //       arror.rotation = vr * Math.PI / 180;

   //       //分解
   //       arror.x += Math.cos(arror.rotation) * speed3;
   //       arror.y += Math.sin(arror.rotation) * speed3;

   //       arror.draw(context);
   // })()

   
   
})