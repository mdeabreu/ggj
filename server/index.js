var io = require("socket.io").listen(80);

var peers = {};
var waiting = null;

io.sockets.on("connection", function(socket) {
    // matchmaking
    if(waiting !== null) {
        peers[waiting] = socket;
        peers[socket] = waiting;
        socket.emit("ready");
        waiting.emit("ready");
        waiting = null;
    }

    else
        waiting = socket;
});
