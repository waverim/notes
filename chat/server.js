
var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(3000); 

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/public/index.html');
    });

app.use('/public', require('express').static(__dirname + '/public'));

io.sockets.on('connection', function(socket) {
	socket.on('join', function (name) {
		socket.nickname = name;
		socket.broadcast.emit('announcement', name + ' join the chat.');
	    });

	socket.on('text', function (msg, fn) {
		socket.broadcast.emit('text', socket.nickname, msg);
		fn(Date.now());
	    });
});
