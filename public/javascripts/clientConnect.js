var socket = io();
var room;
socket.on('connect', function(){
        console.log('connesso');
});
socket.on('disconnect', function(){
        console.log('disconnesso');
});
socket.on('troppe_conn', function(){
        console.log('troppe connessioni');
});
var unisciti = function(){
        socket.emit('unisciti', $('#m').val());
};
