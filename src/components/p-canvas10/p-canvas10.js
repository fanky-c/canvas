require(['util','canvasArror','canvasBall','canvasShip'],function(util, arror, ball, ship){
   var Ball = ball;
   var Ship = ship;
   var canvas = document.getElementById('canvas');
   var context = canvas.getContext('2d');
   var centerX = canvas.width / 2;
   var centerY = canvas.height / 2;
   var mouse = util.captureMouse(canvas);
   var isMouseDown = false;
   var ball = new Ball(),
       w = 0, h = 0;
       vx = 0, vy = 0, gravity = 0.2, bounce = -0.8;

    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;


  //事件监听
   canvas.addEventListener('mousedown',function(event){
         
         console.log('开始mouse.x',mouse.x)
         console.log('开始mouse.y',mouse.y)
         
         //判断鼠标是否在元素上
        if(util.containsPoint(ball.getBounds(), mouse.x, mouse.y)){
             w = mouse.x - ball.x;
             h = mouse.y - ball.y;

             isMouseDown = true;

             canvas.addEventListener('mouseup',onMouseUp,false);
             canvas.addEventListener('mousemove',onMouseMove,false);     
        }
   },false)

   //mouseup事件
   function onMouseUp(event){
       isMouseDown = false;
       canvas.removeEventListener('mouseup',onMouseUp,false);
       canvas.removeEventListener('mousemove',onMouseMove,false);
   }    

   //mousemove事件
   function onMouseMove(event){
        ball.x = mouse.x - w;
        ball.y = mouse.y - h;
   }

   //让小球运动
   function moveAndBoud(){
           ball.x += vx;
           vy += gravity;
           ball.y += vy;


           //边界检测
           if(ball.x + ball.radius > canvas.width){
                vx *= bounce;
                ball.x = canvas.width - ball.radius;
           }else if(ball.x - ball.radius < 0){
                vx *= bounce;
                ball.x = ball.radius;
           }

           if(ball.y + ball.radius > canvas.height){
                vy *= bounce;
                ball.y = canvas.height - ball.radius;
           }else if(ball.y - ball.radius < 0){
                vy *= bounce;
                ball.y = ball.radius;
           }           
   }
   
   //开启定时器
   (function drawFrame(){
        window.requestAnimationFrame(drawFrame, canvas);
        context.clearRect(0, 0, canvas.width, canvas.height);

        if(!isMouseDown){
            moveAndBoud();    
        }

        ball.draw(context);
   })()


})