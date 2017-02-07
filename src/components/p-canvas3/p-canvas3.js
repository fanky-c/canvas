require(['util','canvasArror'],function(util, arror){
   
   var canvas = document.getElementById('canvas');
   var context = canvas.getContext('2d');
   var centerX = canvas.width / 2;
   var centerY = canvas.height / 2;
   var mouse = util.captureMouse(canvas);
   var arror = new arror(centerX,centerY); 


   (function drawFrame(){
      window.requestAnimationFrame(drawFrame, canvas);
      context.clearRect(0, 0, canvas.width, canvas.height);

      var dx = mouse.x;
      var dy = mouse.y;
      //arror.x = dx;
      //arror.y = dy;
      arror.rotation =  Math.atan2(dx, dy);

      arror.draw(context);
   })();

})