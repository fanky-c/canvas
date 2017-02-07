function Arror(x,y,rotation,color){
	  this.x = x || 0;
	  this.y = y || 0;
	  this.rotation = rotation || 0;
	  this.color = color || '#ffff00';
}

Arror.prototype = {
	  constructor: Arror,
	  draw: function(context){
          context.save();
          context.translate(this.x, this.y);
          context.rotate(this.rotation);
          context.lineWidth = 5;
          context.fillStyle = this.color;
          context.beginPath();
          context.moveTo(-50, -25);
          context.lineTo(0, -25);
          context.lineTo(0, -50);
          context.lineTo(50, 0);
          context.lineTo(0, 50);
          context.lineTo(0, 25);
          context.lineTo(-50, 25);
          context.closePath();
          context.stroke();
          context.fill();
          context.restore();
	  }
}