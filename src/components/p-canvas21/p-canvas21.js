require(['util','line','canvasBall',],function(_util, _line, _ball){
      var Line = _line;
      var Ball = _ball;
      var utils = _util;
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      var nums = 50;
      var particles = [];

      //创建粒子
      for(var particle, i=0; i<nums; ++i){
          particle = new Ball();
          particle.radius = 10;
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.mass = 1;
          particles.push(particle);
      }


      //绘制粒子
      function draw(particle){
          particle.draw(context);
      }

      //引力函数
      function gravitate(partA, partB){
          var dx = partB.x - partA.x;
          var dy = partB.y - partB.y;
          var distQ = dx*dx + dy*dy;
          var dist = Math.sqrt(distQ);
          var F = (partA.mass * partB.mass) / distQ;
          var ax = F * dx / dist;
          var ay = F * dy / dist;

          partA.vx += ax / partA.mass;
          partA.vy += ay / partA.mass; 
          partB.vx -= ax / partB.mass;
          partB.vy -= ay / partB.mass;            
      }

      //移动函数
      function move(partA, i){
           partA.x += partA.vx;
           partA.y += partA.vy;

           for(var partB, j=i+1; j<nums; j++){
                partB = particles[j];

                gravitate(partA, partB); //引力
           }
      }


      //动画循环
      (function drawFrame(){
             window.requestAnimationFrame(drawFrame, canvas);
             context.clearRect(0, 0, canvas.width, canvas.height);

             particles.forEach(move);
             particles.forEach(draw);
      }())

      
})
