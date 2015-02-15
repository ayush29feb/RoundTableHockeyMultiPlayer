var io = require('socket.io'),
	connect = require('connect');

var Puck = require('./gameJS/Puck.js').Puck;
var Pusher = require('./gameJS/Pusher.js').Pusher;

var puck,
	player1,
	player2;


var app = connect().use(connect.static('public')).listen(3000);
var gameRoom = io.listen(app);

puck = new Puck(350, 350, 20, 350);	
var timer = setInterval(function(){
		puck.update(player1, player2);
		gameRoom.sockets.emit('printPuck', {puck: puck, player1: player1, player2: player2});
	}, 10);

gameRoom.sockets.on('connection', function(socket) {
	
	socket.on('entrance', function(data) {
		if(player1 == undefined){
			player1 = new Pusher(data.x, data.y, data.r, 350, socket.id);
		} else if (player2 == undefined) {
			player2 = new Pusher(data.x, data.y, data.r, 350, socket.id);
		}
	});
	
	socket.on('mouseMove', function(data){
		if(player1 != undefined && player1.getID() == socket.id){
			player1.update(data.x, data.y);
		}
		if(player2 != undefined && player2.getID() == socket.id){
			player2.update(data.x, data.y);
		}
		gameRoom.sockets.emit('printPlayer', {puck: puck, player1: player1, player2: player2});
	});
	

	socket.on("disconnect", function () {

    });
});