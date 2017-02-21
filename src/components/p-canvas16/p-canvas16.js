require(['shape'],function(Shape){
      var Shape = Shape;
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      var W = canvas.width = window.innerWidth;
      var H = canvas.height = window.innnerHeight;
      var gridX = 7, gridY = 7;

      type = 'ball';
      colors = [
         '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
         '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
         '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
         '#FF5722'
      ];
   

     slidebar();

    var message = document.getElementById('message'),
      gravity = document.getElementById('gra'),
      duration = document.getElementById('dur'),
      speed = document.getElementById('speed'),
      radius = document.getElementById('rad'),
      resolution = document.getElementById('res');

      graVal = parseFloat(gravity.value);
      durVal = parseFloat(duration.value);
      spdVal = parseFloat(speed.value);
      radVal = parseFloat(radius.value);
      resVal = parseFloat(resolution.value);    

      var word = new Shape(W / 2, H / 2, message.value, W, H);
      
      word.getValue(context);

      function change() {
         context.clearRect(0, 0, W, H);
         gridX = parseFloat(resolution.value);
         gridY = parseFloat(resolution.value);
         word.placement = [];
         word.text = message.value;
         word.getValue();
      }

      function changeV() {
         graVal = parseFloat(gravity.value);
         durVal = parseFloat(duration.value);
         spdVal = parseFloat(speed.value);
         radVal = parseFloat(radius.value);
      }


      (function drawFrame() {
         window.requestAnimationFrame(drawFrame, canvas);
         context.clearRect(0, 0, W, H);

         for (var i = 0; i < word.placement.length; i++) {
            word.placement[i].update();
         }
      }())


   //resize
   function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
   }

   window.addEventListener('resize', resize, false);

})


/**
 * 操作侧边栏
 * @return {[type]} [description]
 */
function slidebar(){
      var btn = document.getElementById("btn");
      var control = document.getElementById("control");
      

      //打开操作栏板
      btn.addEventListener('click',function(){
            control.classList.toggle('slide');
      },false);


      var ball = document.getElementById('ball');
      var rect = document.getElementById('rect');
      function chose(particleName){
          particleName.addEventListener('click',function(){
                this.style.backgroundColor = 'orange';
                (particleName == ball ? rect : ball).style.backgroundColor = 'rgba(0, 0, 0, 0)';
                type = (type == 'ball' ? 'rect' : 'ball');
                change();  
          },false)
      }

      chose(ball);
      chose(rect);
} 