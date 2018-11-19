var express = require('express');
var router = express.Router();
var blue = [];
var red = [];
var rooms = [];

router.get('/', function(req, res, next){
	res.send('');
});

module.exports = function(io){
	io.on('connection', function(socket){
		console.log('Utente connesso');
		socket.on('messaggio', function(msg){
			console.log(msg);
			console.log('Messaggio ricevuto');
		});
		socket.on('disconnect', function(){
			console.log('Utente disconnesso');
		});
		socket.on('connect_error', function(data){
			console.log(data);
		});
		socket.on('unisciti', function(room){
			if(rooms.indexOf(room) == -1){
				socket.emit('room_inesistente');
				console.log('Tentativo di connessione a room inesistente');
			}
			else{
				if(blue.indexOf(room) == -1){
					blue.push(room);
					socket.join(room);
					console.log('Giocatore si è unito a: ' + room);
					socket.emit('conn_riuscita', {room: room, color: 'blue'});
				}
				else{
					if(red.indexOf(room) == -1){
						red.push(room);
						socket.join(room);
						console.log('Giocatore si è unito a: ' + room);
						socket.emit('conn_riuscita', {room: room, color: 'red'});
					}
					else{
						socket.emit('troppe_conn');
						console.log('Troppe connessioni a ' + room +': connessione rifiutata');
					}
				}
			}
		});
		socket.on('crea', function(msg){
			var timeStamp = Date.now();
			var room = msg + '-' + timeStamp;
			rooms.push(room);
			socket.join(room);
			socket.emit('room_creata', room);
			console.log('Room ' + room + ' creata');
		});
		socket.on('via', function(room){
			io.to(room).emit('via');
			console.log('Nella room ' + room + ' si può fare fuoco');
		});
		socket.on('fuoco', function(info){
			var room = info.room;
			var color = info.color;
			io.to(room).emit('fuoco', color);
			console.log('Fuoco emesso da ' + color + ' nella room ' + room);
		});
		socket.on('step', function(info){
			var room = info.room;
			var color = info.color;
			io.to(room).emit('step', color);
			console.log('Passo fatto da ' + color + ' nella room ' + room);
		});
	});

	return router;
}

