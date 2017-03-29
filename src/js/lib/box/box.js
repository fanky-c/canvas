function Box(context, x, y, color){
    this.context = context;
    this.x = x;
    this.y = y;
    this.color = color;
    //this.draw();
}

Box.prototype = {
	  constructor: Box,
	  draw:function(){
           this.context.save();
           this.context.beginPath();
           this.context.translate(this.x, this.y);
           this.context.fillStyle = this.color; 
           this.context.fillRect(0, 0, this.x, this.y);          
           this.context.closePath();
           this.context.stroke();
           this.context.fill();            
           this.context.restore();  
	  }
}