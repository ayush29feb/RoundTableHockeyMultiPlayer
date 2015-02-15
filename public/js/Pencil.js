var Pencil = function(){
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

	 //    var img = new Image();
		// img.onload = function() {
	 //    	context.drawImage(img, 0, 0);
	 //    };	    
  //     	img.src = '../images/table.png';
	};

	var drawPuck = function(x, y, r){
		context.beginPath();
	    context.arc(x, y, r, 0, 2 * Math.PI, false);
	    context.fillStyle = 'red';
	    context.fill();
	    context.lineWidth = 4;
	    context.strokeStyle = '#444040';
	    context.stroke();
	    context.closePath();
	};

	var drawPusher = function(x, y, r) {
		context.beginPath();
	    context.arc(x, y, r, 0, 2 * Math.PI, false);
	    context.fillStyle = 'blue';
	    context.fill();
	    context.lineWidth = 4;
	    context.strokeStyle = '#444040';
	    context.stroke();
	    context.closePath();
	};

	var clearCanvas = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

	return {
		drawTable: drawTable,
		drawPuck: drawPuck,
		drawPusher: drawPusher,
		clearCanvas: clearCanvas
	}
}