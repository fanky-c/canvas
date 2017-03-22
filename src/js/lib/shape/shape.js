define(['particle'],function(Particle){
	function Shape(x, y, text, W, H){
	    this.x = x;
	    this.y = y;
	    this.text = text;
	    this.W = W;
	    this.H = H;	    	    
	    this.placement = [];
	}

	Shape.prototype = {
		   constructor: Shape,
		   getValue: function(context){
		   	   var W = this.W;
		   	   var H = this.H;
		   	   var gridX = 7;
		   	   var gridY = 7;

		   	   context.textAlign = 'center';
		   	   context.font = this.size + 'px arial';
		   	   context.fillText(this.text, this.x, this.y);
		   	   var idata = context.getImageData(0, 0, W, H);
		   	   var buffer32 = new Uint32Array(idata.data.buffer);

		   	   for(var j=0; j<H; j += gridY ){
	               for(var i=0; i<W; i += gridX){
	                      if(buffer32[j * W + i]){
	                           var particle = new Particle(i, j, type, context);
	                           this.placement.push(particle);
	                      }
	               }
		   	   }

		   	   context.clearRect(0, 0, W, H);
		   }
	}

	return Shape;
})