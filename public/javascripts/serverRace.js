var listening = false;
var pos = {red: 0, blue: 0};
socket.on('room_creata', function(roomName){
        room = roomName;
        $('#login').hide();
        $('#game').html('<p>Nome room: ' + room + '</p><div id="text"></div><button onClick="javascript:via()">Via</button><div id="step"><div id=\'end\'></div><div id=\'blue\'></div><div id=\'red\'></div></div>');
        $('#game').show();
});
socket.on('via', function(){
	listening = true;
	console.log('via ricevuto');
});
socket.on('step', function(color){
	if(listening == true){
		if(pos[color] == 400){
			listening = false;
			$('#text').text(color + ' vince');
		}
		else{
			pos[color] = pos[color] + 20;
			$('#' + color).css('bottom', pos[color] + 'px');
		}
	}
});
var via = function(){
	$('#red').css('bottom', '0');
	$('#blue').css('bottom', '0');
	$('#text').text('');
        socket.emit('via', room);
};
