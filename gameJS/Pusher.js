/**************************************************
** GAME PUSHER CLASS
**************************************************/
var Pusher = function (startX, startY, radius, tableR, socketId) {
	var x = startX,
		y = startY,
		r = radius,
		R = tableR,
		id = socketId;

	var update = function(mouseX, mouseY) {
		if(mouseY > R && 
			(mouseX + radius - R) * (mouseX + radius  - R) + 
			(mouseY + radius - R) * (mouseY + radius  - R) < R * R / 4){
			x = mouseX;
			y = mouseY;
		} else if (mouseY < R) {
			x = mouseX;
		} else {
			var mouseR = Math.sqrt(Math.pow(mouseX - R, 2) + Math.pow(mouseY - R, 2));
			//x = canvas.width + 350 / mouseR * (mouseX - canvas.width);
			//y = canvas.height + 350 / mouseR * (mouseY - canvas.height);
			// LATER
		}
	};

	var getX = function(){
		return x;
	};

	var getY = function(){
		return y;
	};

	var getR = function(){
		return r;
	};

	var getID = function(){
		return id;
	};

	var getAll = function(){
		return {
			x: x,
			y: y,
			r: r
		}
	};

	return {
		x: getX,
		y: getY,
		r: getR,
		getID: getID,
		getAll: getAll,
		update: update
	}
};


module.exports = {
	Pusher: Pusher
}