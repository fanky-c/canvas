require(['util','line','canvasBall',],function(_util, _line, _ball){
      var Line = _line;
      var Ball = _ball;
      var utils = _util;
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      var W = canvas.width;
      var H = canvas.height;


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
     var vr = 0.005,
         ball = new Ball();
         cos = Math.cos(vr),
         sin = Math.sin(vr),
         centerX = canvas.width/2,
         centerY = canvas.height/2,
         canvasWidth = canvas.width,
         canvasHeight = canvas.height;
     
         
     ball.x = Math.random()*canvasWidth;
     ball.y = Math.random()*canvasHeight;
     
     function circle(angle, radius){
         context.save();
         context.strokeStyle = "white";
         context.beginPath();
         context.arc(centerX, centerX, 50, 0, angle, false);
         context.arc(centerX, centerX, radius, 0, Math.PI*2, false); 
         context.stroke();
         context.restore();
     }
      function text(angle){
          context.save();
          context.beginPath();
          context.strokeStyle = "#49f";
          context.font = "20px Arial";
          context.strokeText(-(angle*360/Math.PI).toFixed(0), centerX-55, centerY+50);
          context.closePath();
          context.stroke();
          context.restore();
     }
     function coordinate(){
         context.save();
         context.strokeStyle = "white";
         context.beginPath();
         context.moveTo(0, canvasHeight/2);
         context.lineTo(canvasWidth, canvasHeight/2);
         context.moveTo(canvasWidth/2, 0);
         context.lineTo(canvasWidth/2, canvasHeight);
         context.closePath();
         context.stroke();
         context.restore();
     }
     
     (function drawFrame(){
         window.requestAnimationFrame(drawFrame, canvas);
         context.clearRect(0, 0, canvas.width, canvas.height);
         
         coordinate(context);
         
         var x1 = ball.x - centerX;
         var y1 = ball.y - centerY;
         
         var x2 = x1*cos - y1*sin;
         var y2 = y1*cos + x1*sin;
         
         ball.x = centerX + x2;
         ball.y = centerY + y2;
         
         var dx = ball.x - centerX;
         var dy = ball.y - centerY;
         var radius = Math.sqrt(dx*dx + dy*dy);
         var angle = Math.atan2(dy, dx);
         circle(angle, radius);
         text(angle);
         
         context.save();
         context.strokeStyle = "white";
         context.moveTo(centerX, centerY);
         context.lineTo(ball.x, ball.y);
         context.stroke();
         context.restore();
         
         ball.draw(context);
         
     }());
      
})
