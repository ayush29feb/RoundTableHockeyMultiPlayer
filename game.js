var io = require('socket.io'),
	connect = require('connect');

var Puck = require('./gameJS/Puck.js').Puck;
var Pusher = require('./gameJS/Pusher.js').Pusher;

var puck,
	player1,
	player2,
	timer;


var app = connect().use(connect.static('public')).listen(process.env.PORT || 3000);
var gameRoom = io.listen(app);

puck = new Puck(350, 350, 20, 350);

gameRoom.sockets.on('connection', function(socket) {
	
	if(timer != undefined){
		clearInterval(timer); 
	}
	timer = setInterval(function(){
		puck.update(player1, player2);
		gameRoom.sockets.emit('paintPlayer', {
			puck: [puck.getX(), puck.getY(), puck.getR()],
			player1: null,
			player2: null
		});
	}, 25);

	socket.on('entrance', function(data) {
		if(player1 == undefined) {
			player1 = new Pusher(data.x, data.y, data.r, 350, socket.id, false);
		} else if(player2 == undefined) {
			player2 = new Pusher(data.x, data.y, data.r, 350, socket.id, true);
		}
	});
	
	socket.on('mouseMove', function(data){
		var result = {
			puck: [puck.getX(), puck.getY(), puck.getR()],
			player1: null,
			player2: null
		};
		if(player1 != undefined && player1.getID() == socket.id){
			player1.update(data.x, data.y);
			result.player1 = [player1.x(), player1.y(), player1.r()];
		}
		if(player2 != undefined && player2.getID() == socket.id){
			player2.update(data.x, data.y);
			result.player2 = [player2.x(), player2.y(), player2.r()];
		}
		gameRoom.sockets.emit('paintPlayer', result);
	});
	

	socket.on("disconnect", function () {
		if(player1 != undefined && player1.getID() == socket.id){
			player1 = undefined;
		}
		if(player2 != undefined && player2.getID() == socket.id){
			player2 = undefined;
		}
    });
});