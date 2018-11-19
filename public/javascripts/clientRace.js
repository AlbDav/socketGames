var color;
socket.on('conn_riuscita', function(msg){
        room = msg.room;
        color = msg.color;
        $('#login').hide();
	$('#game').html('<button onClick="javascript:step(\'left\')" disabled>Sinistra</button><button onClick="javascript:step(\'right\')" disabled>Destra</button>');
        $('#game').show();
        $('#game > button').css('background-color', msg.color);
});
socket.on('via', function(){
        $('#game > button:first-child').prop('disabled', false);
});
var step = function(side){
	if(side == 'left'){
        	$('#game > button:first-child').prop('disabled', true);
        	$('#game > button:last-child').prop('disabled', false);
	}
	else{
        	$('#game > button:last-child').prop('disabled', true);
        	$('#game > button:first-child').prop('disabled', false);
	}
        socket.emit('step', {room: room, color: color});
	console.log('step fatto')
}

