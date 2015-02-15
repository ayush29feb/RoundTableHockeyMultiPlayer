/**************************************************
** GAME VARIABLES
**************************************************/
var canvas,			// Canvas DOM element
	context,		// Canvas context
	mouse,  		// Mouse
	localPlayer,	// Local player
	puck;			// Puck

/**************************************************
** GAME INITIALISATION
**************************************************/
var Game = function() {
	canvas = document.getElementById("gameCanvas"),
	context = canvas.getContext("2d");

	canvas.width = 700;
	canvas.height = 700;

	var drawTable = function() {
		var centerX = canvas.width / 2;
		var centerY = canvas.height / 2;
		var border = 5;
		var radius = canvas.width / 2 - border;

		context.beginPath();
	    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	    context.fillStyle = '#D8D8D8';
	    context.fill();
	    context.lineWidth = border;
	    context.strokeStyle = '#444040';
	    context.stroke();
	    context.closePath();

	    context.beginPath();
	      context.moveTo(centerX - radius, centerY);
	      context.lineTo(centerX + radius, centerY);
	      context.stroke();
	};

	var update = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		drawTable();
		puck.update(localPlayer);
		localPlayer.draw();
	}

	drawTable();

	puck = new Puck(350, 350, 20, canvas, context);
	puck.draw();

	localPlayer = new Pusher(350, 600, 25, canvas, context);
	localPlayer.draw();

	$('#gameCanvas').on( "mousemove", function( event ) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		drawTable();
		localPlayer.update(event.pageX, event.pageY);
		puck.draw();
	});

	setInterval(update, 1);
};