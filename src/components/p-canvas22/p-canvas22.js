require(['util','line','canvasBall',],function(_util, _line, _ball){
      var Line = _line;
      var Ball = _ball;
      var utils = _util;
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      var mouse = utils.captureCanvasMouse(canvas);
      var balls = new Ball();

      var xpos = 0;
      var ypos = 0;
      var zpos = 0;
      var fl = 250;      //距离屏幕的距离（焦点）
      var vpX = canvas.width / 2;
      var vpY = canvas.height / 2;

      //test
      // dev
      // 11 222



      balls.x = 100;
      balls.y = 100;



     window.addEventListener('keydown', function(e){
         if(e.keyCode === 38){
              zpos += 5;      
         }else if(e.keyCode === 40){
              zpos -= 5;
         }
     }, false)



     (function drawFrame(){
           window.requestAnimationFrame(drawFrame, canvas);
           context.clearRect(0, 0, canvas.width, canvas.height);


           if(zpos > -fl){
                var scale = fl / (fl+zpos);
                
                xpos = mouse.x - vpX;
                ypos = mouse.y - vpY;

                balls.scaleX = balls.scaleY = scale;
                balls.x = vpX + xpos*scale;
                balls.y = vpY + ypos*scale;
                balls.visible = true;
           }else{
                balls.visible = false;
           }

           if(balls.visible){
                balls.draw(context);
           }
     }())
      
})
