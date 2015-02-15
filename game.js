var io = require('socket.io'),
	connect = require('connect');

var app = connect().use(connect.static('public')).listen(3000);
var gameRoom = io.listen(app);

gameRoom.sockets.on('connection', function(socket) {

	socket.on('mouseMove', function(data){
		console.log("Location From: " + socket.id + "(" + data.x + ", " + data.y + ")");
	});

    socket.on("disconnect", function () {
        clearInterval(interval);
    });
});