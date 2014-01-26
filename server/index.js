var io = require("socket.io").listen(80);

var peers = {};
var waiting = null;

io.sockets.on("connection", function(socket) {
    // join - matchmaking
    socket.on("join", function() {
        if(waiting !== null) {
            peers[socket] = waiting;
            peers[waiting] = socket;
            socket.emit("ready");
            waiting.emit("ready");
            waiting = null;
        }

        else {
            socket.emit("searching");
            waiting = socket;
        }
    });

    // disconnect - exit game instance
    socket.on("disconnect", function() {
        var peer = peers[socket];
        peer.emit("quit");

        peers[socket] = null;
        delete peers[socket];
        peers[peer] = null;
        delete peers[peer];
    });
});
