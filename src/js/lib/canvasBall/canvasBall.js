function Ball(x, y, vx, vy, radius, rotation, mass, scaleX, scaleY,color){
    this.x = x || 0;
    this.y = y || 0;
    this.vx = vx || 0;
    this.vy = vy || 0;
    this.radius = radius || 30;
    this.rotation = rotation || 0;
    this.mass = mass || 1;
    this.scaleX = scaleX || 1;
    this.scaleY = scaleY || 1;
    this.color = color || 'red';
    this.lineWidth = 1;
}

Ball.prototype = {
	   constructor: Ball,
	   draw: function(context){
           context.save();
           context.translate(this.x, this.y);
           context.rotate(this.rotation);
           context.scale(this.scaleX, this.scaleY);
           context.lineWidth = this.lineWidth;
           context.fillStyle = this.color;
           context.strokeStyle = this.color;
           context.beginPath();
           context.arc(0, 0, this.radius, 0, Math.PI*2, false);
           context.closePath();
           context.fill();
           context.stroke();
           context.restore();
	   },
     getBounds: function(){
         var she = this;
         return {
              x: she.x - she.radius,
              y: she.y - she.radius,
              width: she.radius * 2,
              height: she.radius * 2
         }
     }
}