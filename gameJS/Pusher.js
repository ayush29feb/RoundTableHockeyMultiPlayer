/**************************************************
** GAME PUSHER CLASS
**************************************************/
var Pusher = function (startX, startY, radius, tableR, socketId, isTop) {
	var x = startX,
		y = startY,
		r = radius,
		R = tableR,
		id = socketId,
		top = isTop;

	var update = function(mouseX, mouseY) {
		if(top){
			if(mouseY < R && R * R > (mouseX - R) * (mouseX - R) + (mouseY - R) * (mouseY - R)){
				x = mouseX;
				y = mouseY;
			} else if (mouseY > R) {
				x = mouseX;
			}
		} else if(mouseY >= R && R * R > (mouseX - R) * (mouseX - R) + (mouseY - R) * (mouseY - R)){
			if(mouseY > R){
				x = mouseX;
				y = mouseY;
			} else if (mouseY < R) {
				x = mouseX;
			} 
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