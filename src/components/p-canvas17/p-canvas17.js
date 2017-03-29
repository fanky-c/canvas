require(['util','canvasArror','box',],function(util, arror, box){
      var Box = box;
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      var W = canvas.width;
      var H = canvas.height;
      var boxes = [];
      var activeBox = createBox();
      var gravity = 0.02;

      //创建box
      function createBox(){
          var color = '#' + Math.random() * (0xffffff);
          //var color = "hsb(" +[ Math.random() ,Math.random(),1] +")";
          var box = new Box(context, Math.random()*40+10, Math.random()*40+10, color);
          box.x = Math.random() * W; 
          boxes.push(box);
          return box;
      }
       

        createBox()

      //画boxes
      function drawBox(box){
          //判断box是否activeBox,如果不是做碰撞检测，碰上了就创建新的box
          if(activeBox !== box && util.isIntersects(activeBox, box)){
                  activeBox.y = box.y - activeBox.height;
                  activeBox = createBox();
          }

          

          box.draw();
      }

      //监听keydown
      window.addEventListener('keydown',function(event){
            switch(event.keyCode){
                case 37:
                   activeBox.x -= 5;
                   break;
                case 39:
                   createBox.x += 5;
                   break;
                case 40:
                   gravity = 2;
                   break;      
            }
      },false)

      //监听keyup
      window.addEventListener('keyup',function(event){
            gravity = 0.02;
      },false);


      //动画循环
      (function drawFrame(){
            window.requestAnimationFrame(drawFrame, canvas);
            context.clearRect(0, 0, canvas.width, canvas.height);

            activeBox.vy += gravity;
            activeBox.y += activeBox.vy;

            //判断
            if(activeBox.y + activeBox.height > canvas.height){
                     activeBox.y = canvas.height - activeBox.height;
                     activeBox = createBox();
            }

            //绘制
            boxes.forEach(drawBox);
      }())

})
