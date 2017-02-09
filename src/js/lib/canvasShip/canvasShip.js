function Ship(){
	  this.x = 0;
	  this.y = 0;
	  this.width = 25;
	  this.height = 25;
	  this.rotation = 0;
	  this.color = '#fff';
	  this.showFrame = false;
}


Ship.prototype = {
	  constructor: Ship,
	  draw: function(context){
          context.save();
          context.beginPath();
          context.translate(this.x, this.y);
          context.rotate(this.rotation);
          context.strokeStyle = this.color;
          context.moveTo(10, 0);
          context.lineTo(-10, 10);
          context.lineTo(-5, 0);
          context.lineTo(-10, -10);
          context.lineTo(10, 0);
          context.closePath();
          context.stroke();
          context.restore();

          if(this.showFrame == true){
             context.save();
             context.beginPath();
             context.strokeStyle = '#f69';
             context.moveTo(-7.5, -5);
             context.lineTo(-15, 0);
             context.lineTo(-7.5, 5);
             context.stroke();
             context.restore();
          }
	  }
}