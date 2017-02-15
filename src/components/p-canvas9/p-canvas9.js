require(['util','canvasArror','canvasBall','canvasShip'],function(util, arror, ball, ship){
   var Ball = ball;
   var Ship = ship;
   var canvas = document.getElementById('canvas');
   var context = canvas.getContext('2d');
   var centerX = canvas.width / 2;
   var centerY = canvas.height / 2;
   var ball = new Ball();
   var w = 0, h = 0;
    
       ball.x = canvas.width / 2;
       ball.y = canvas.height / 2;
       ball.draw(context);
  
  //事件监听
   canvas.addEventListener('mousedown',function(){

   },false)    

})