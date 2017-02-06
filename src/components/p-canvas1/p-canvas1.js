require(['jQuery'],function(){
   
   var canvas = document.getElementById('canvas');
   var context = canvas.getContext('2d');
   var centerX = canvas.width / 2;
   var centerY = canvas.height / 2;
   var rad = Math.PI * 2 / 100; //将360度分成100份，那么每一份就是rad度


   //动态的圈
   function blueCircle(n){
   	  context.save();
   	  context.strokeStyle = '#49f';
   	  context.lineWidth = 5;
   	  context.beginPath();

   	  //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针) 
   	  context.arc(centerX, centerY, 100,  -Math.PI / 2, -Math.PI / 2 + (n * rad), false);  
   	  
   	  context.stroke();
   	  context.closePath();
   	  context.restore();
   }

   //默认的白色圈圈
   function whiteCircle(){
   	   context.save();
   	   context.beginPath();
   	   context.strokeStyle = 'white';
   	   context.arc(centerX, centerY, 100, 0, Math.PI * 2, false);
   	   context.stroke();
   	   context.closePath();
   	   context.restore();
   }

   //百分比文字显示
   function showText(n){
   	   context.save();
   	   context.strokeStyle = '#49f';
   	   context.font = '40px Arial';
   	   context.strokeText(n.toFixed(0) + '%', centerX-25, centerY+10);
   	   context.stroke();
   	   context.restore();  //save和restore可以保证样式属性只运用于该段canvas元素 
   }


   //显示
   (function drawFrame(speed){
   	   context.clearRect(0, 0, canvas.with, canvas.height);
   	   whiteCircle();
   	   showText(speed);
   	   blueCircle(speed);
   })(12);

})