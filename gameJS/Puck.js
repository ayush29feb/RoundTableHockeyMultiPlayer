/**************************************************
** GAME PUCK CLASS
**************************************************/
var Puck = function (startX, startY, radius, tableR) {
	var x = startX,
		y = startY,
		r = radius,
		R = tableR;
		
	var	velX = 1,
		velY = 2;

	var update = function(pusher1, pusher2) {
		checkBorderCollision();
		if(pusher1 != undefined) { checkCollisions(pusher1); }
		if(pusher2 != undefined) { checkCollisions(pusher2); }
		x += velX;
		y += velY;
	};

	var checkBorderCollision = function() {
		var a  = Math.sqrt((x - R) * (x - R) + (y - R) * (y - R));
		if(a + r * 2> R){
			var c = 2 * (velX * getLocalX(x) + velY * getLocalY(y)) / 
						(getLocalX(x) * getLocalX(x) + getLocalY(y) * getLocalY(y));
            velX = velX - c * getLocalX(x);
            velY = velY - c * getLocalY(y);
		}
	}

	var checkCollisions = function(pusher) {
		var X = x - pusher.x(); // x Component of the vector from puck to pusher
        var Y = y - pusher.y(); // y Component of the vector from puck to pusher
        var a  = Math.sqrt(X * X + Y * Y); // Magnitude of the vector from puck to pusher
        //dot product of unit distance vector
        //then the formula
        if(a <= r + pusher.r() + 1){
            var c = 2 * ((velX * X + velY * Y) / (X * X + Y * Y));
            velX = velX - c * X;
            velY = velY - c * Y;
        } else if(a < r + pusher.r()){
            x = ((r + pusher.r()) / a) * X + pusher.x() - R;
            y = ((r + pusher.r()) / a) * Y + pusher.y() - R;
            X = x - pusher.x();
            Y = y - pusher.y();
            var c = 2 * ((velX * X + velY * Y) / (X * X + Y * Y));
            velX = velX - c * X;
            velY = velY - c * Y;
        }
	};

	var getLocalX = function(pos){
		return pos - R;
	};

	var getLocalY = function(pos){
		return pos - R;
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

	var getAll = function(){
		return {
			x: x,
			y: y,
			r: r
		}
	}

	return {
		getX: getX,
		getY: getY,
		getR: getR,
		getAll: getAll,
		update: update
	}
};

module.exports = {
	Puck: Puck
}
