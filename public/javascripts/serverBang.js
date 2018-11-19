var messages = ['Bum', 'Boom', 'Bang', 'Bambu', 'Bram', 'Gang', 'Puff'];
var interval;
socket.on('room_creata', function(roomName){
        room = roomName;
        $('#login').hide();
        $('#game').html('<p>Nome room: ' + room + '</p><div id="text"></div><button onClick="javascript:via()">Via</button>');
        $('#game').show();
});
socket.on('via', function(){
        interval = setInterval(changeText, 1500);
});
socket.on('fuoco', function(color){
        clearInterval(interval);
        if(messages.indexOf($('#text').text()) != -1){
                if($('#text').text() == 'Bang'){
                        $('#text').text(color + ' vince');
                }
                else{
                        $('#text').text(color + ' perde');
                }
        }
});
var via = function(){
        socket.emit('via', room);
};
var changeText = function(){
        $('#text').text(messages[Math.floor(Math.random() * messages.length)]);
};
