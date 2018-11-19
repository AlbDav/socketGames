var socket = io();
var room;
socket.on('connect', function(){
        console.log('connesso');
});
socket.on('disconnect', function(){
        console.log('disconnesso');
});
var crea = function(){
        socket.emit('crea', $('#m').val());
};
