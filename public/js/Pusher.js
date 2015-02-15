/**************************************************
** GAME PUSHER CLASS
**************************************************/
var Pusher = function (startX, startY, radius, canvasObject, canvasContext) {
	var x = startX,
		y = startY,
		r = radius,
		canvas = canvasObject,
		context = canvasContext;

	var draw = function() {
		context.beginPath();
	    context.arc(x, y, r, 0, 2 * Math.PI, false);
	    context.fillStyle = 'blue';
	    context.fill();
	    context.lineWidth = 4;
	    context.strokeStyle = '#444040';
	    context.stroke();
	    context.closePath();

	};

	var update = function(mouseX, mouseY) {
		if(mouseY > canvas.height / 2 && 
			(mouseX + radius - canvas.width / 2) * (mouseX + radius  - canvas.width / 2) + 
			(mouseY + radius - canvas.height / 2) * (mouseY + radius  - canvas.height / 2) < canvas.width * canvas.width / 4){
			x = mouseX;
			y = mouseY;
		} else if (mouseY < canvas.height / 2) {
			x = mouseX;
		} else {
			var mouseR = Math.sqrt(Math.pow(mouseX - canvas.width / 2, 2) + Math.pow(mouseY - canvas.height / 2, 2));
			//x = canvas.width + 350 / mouseR * (mouseX - canvas.width);
			//y = canvas.height + 350 / mouseR * (mouseY - canvas.height);
			// LATER
		}
		draw();
	};

	var getX = function(){
		return x;
	};

	var getY = function(){
		return y;
	};

	var getR = function(){
		return r;
	}

	return {
		x: getX,
		y: getY,
		r: getR,
		draw: draw,
		update: update
	}
};