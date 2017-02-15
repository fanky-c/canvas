require(['util','canvasArror','canvasBall','canvasShip'],function(util, arror, ball, ship){
   var Ball = ball;
   var Ship = ship;
   var canvas = document.getElementById('canvas');
   var context = canvas.getContext('2d');
   var centerX = canvas.width / 2;
   var centerY = canvas.height / 2;
  
   var balls = [],
       nums = 10,
       canWidth = canvas.width,
       canHeight = canvas.height;


    //定义小球
    for(var i=0; i<nums; i++){
       var size = Math.random() * 20 + 5;
       //hex颜色值是从#000000到#ffffff(parseInt("0xffffff",16).toString(10) == 16777215)
       var color = '#' +Math.floor(Math.random() * 16777215).toString(16);
       var ball = new Ball(size);
       
       //balls.x = size;
       ball.color = color;
       ball.id = 'ball' + i;
       ball.radius = Math.random()* 30 + 10;
       ball.x = Math.random() * canWidth;
       ball.y = Math.random() * canHeight;
       ball.vx = Math.random() * 2 - 1;
       ball.vy = Math.random() * 2 - 1;


       balls.push(ball);
    }  
    
    //判断是否超过边界
    function draw(ball, pos){
        ball.x += ball.vx;
        ball.y += ball.vy;

        if(ball.x - ball.radius > canvas.width 
           || ball.radius + ball.x < 0
           || ball.y - ball.radius > canvas.height
           || ball.radius + ball.y < 0
           ){
                balls.splice(pos, 1);                
                if(balls.length > 0){
                   console.log('移除：',ball.id);
                }else{
                   console.log('全部移除');
                }

        }

        ball.draw(context);
    }

    //动画
    (function drawFrame(){
         window.requestAnimationFrame(drawFrame, canvas);
         context.clearRect(0, 0, canvas.width, canvas.height);

         var i = balls.length;
         while(i--){
             draw(balls[i], i);
             //console.log(i);
         }
    })()
})