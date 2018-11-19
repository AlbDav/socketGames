var color;
socket.on('conn_riuscita', function(msg){
        room = msg.room;
        color = msg.color;
        $('#login').hide();
	$('#game').html('<button onClick="javascript:fuoco()" disabled>Fire!</button>');
        $('#game').show();
        $('#game > button').css('background-color', msg.color);
});
socket.on('via', function(){
        $('#game > button').prop('disabled', false);
});
var fuoco = function(){
        $('#game > button').prop('disabled', true);
        socket.emit('fuoco', {room: room, color: color});
}

