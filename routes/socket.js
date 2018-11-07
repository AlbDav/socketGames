var express = require('express');
var router = express.Router();
var blue = [];
var red = [];

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
			if(blue.indexOf(room) == -1){
				blue.push(room);
				socket.emit('color', 'blue');
				console.log('Giocatore blu connesso');
				socket.join(room);
				console.log('Giocatore si è unito a: ' + room);
			}
			else{
				if(red.indexOf(room) == -1){
					red.push(room);
					socket.emit('color', 'red');
					console.log('Giocatore rosso connesso');
					socket.join(room);
					console.log('Giocatore si è unito a: ' + room);
				}
				else{
					socket.emit('troppe_conn');
					console.log('Troppe connessioni a ' + room +': connessione rifiutata');
				}
			}
		});
	});

	return router;
}

