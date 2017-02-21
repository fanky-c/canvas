require(['shape'],function(Shape){
      var Shape = Shape;
      var btn = document.getElementById("btn");
      var control = document.getElementById("control");
      
      btn.addEventListener('click',function(){
            control.classList.toggle('slide');
      },false);

      console.log(Shape);
})