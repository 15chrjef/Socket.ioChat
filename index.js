var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	console.log('user connection');
	socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
	socket.on('change', function() {
		console.log('someone is typing');
		socket.broadcast.emit('change');
	})
	socket.on('noChange', function() {
		console.log('nobody is typing')
		socket.broadcast.emit('noChange')
	})
	socket.on('disconnect', function(){
    console.log('user disconnected');
  });
})

http.listen(3000, function(){
  console.log('listening on *:3000');
});