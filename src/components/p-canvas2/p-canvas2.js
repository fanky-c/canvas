require(['jQuery'],function(){
   
   var canvas = document.getElementById('canvas');
   var context = canvas.getContext('2d');
   var w,h;

   w = canvas.width = window.innerWidth;
   h = canvas.height = window.innerHeight;

   var clearColor = 'rgba(0, 0, 0, 0.1)';
   var wordColor = '#33ff33';
   var words = '0123456789qweRTYUIOP';
   var wordsArr = words.split('');
   var fontSize = 17;
   var clumns = w / fontSize;
   var drops = [];

   for(var i=0; i<clumns; i++){
        drops[i] = 1;
   }

   function draw(){
        context.save();
        context.fillStyle = wordColor;
        context.font = fontSize + 'px Arial';

        for(var i=0; i<drops.length; i++){
              var text = wordsArr[Math.floor(Math.random() * wordsArr.length)];
              context.fillText(text, i*fontSize, drops[i]*fontSize);

              if(drops[i]*fontSize > h && Math.random() > 0.98){
                   drops[i] = 0;
              }

              drops[i]++;
        }

        context.restore();
   }



   (function drawFrame(){
        window.requestAnimationFrame(drawFrame, canvas);
        //context.clearRect(0,0,w,h);
        context.fillStyle = clearColor;
        context.fillRect(0,0,w,h);
        draw();
   })();


   window.addEventListener('resize',function(){
         w = canvas.width = window.innerWidth;
         h = canvas.height = window.innerHeight;
   })


})