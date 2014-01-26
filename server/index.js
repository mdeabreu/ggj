var io = require("socket.io").listen(80);

var waiting = null;

io.sockets.on("connection", function(socket) {
    // matchmaking
    if(waiting !== null) {
        var coin = Math.floor(Math.random() * 2) == 0;

        var sharedState = {};
        sharedState.resources = 0;
        sharedState.balance = 0;
        sharedState.lives = 3;

        socket.set("state", {"peer": waiting, "aspect": coin, "shared": sharedState}, function() {
            socket.emit("ready", coin);
            socket.emit("resources", sharedState.resources);
            socket.emit("balance", sharedState.balance);
            socket.emit("lives", sharedState.lives);
        });

        waiting.set("state", {"peer": socket, "aspect": !coin, "shared": sharedState}, function() {
            waiting.emit("ready", !coin);
            waiting.emit("resources", sharedState.resources);
            waiting.emit("balance", sharedState.balance);
            waiting.emit("lives", sharedState.lives);
        });

        waiting = null;
    }

    else {
        socket.emit("waiting");
        waiting = socket;
    }

    socket.on("resources?", function() {
        socket.get("state", function(err, state) {
            socket.emit("resources", state.shared.resources);
        });
    });

    socket.on("balance?", function() {
        socket.get("state", function(err, state) {
            socket.emit("balance", state.shared.balance);
        });
    });

    socket.on("lives?", function() {
        socket.get("state", function(err, state) {
            socket.emit("lives", state.shared.lives);
        });
    });

    socket.on("acquire resources", function(amount) {
        if(amount > 0)
            socket.get("state", function(err, state) {
                state.shared.resources += amount;

                socket.emit("resources", state.shared.resources);
                state.peer.emit("resources", state.shared.resources);
            });
    });

    socket.on("spend resources", function(amount, alignment) {
        console.log("spend " + amount + " from " + alignment);
        if(amount > 0) {
            socket.get("state", function(err, state) {
                if(state.shared.resources > 0 && Math.abs(state.shared.balance) < 5) {
                    // 1. change resources available
                    var subtracted = Math.min(amount, state.shared.resources);
                    state.shared.resources -= subtracted;

                    socket.emit("resources", state.shared.resources);
                    state.peer.emit("resources", state.shared.resources);

                    // 2. change balance
                    var added = Math.min(amount, 5 - Math.abs(state.shared.balance));
                    state.shared.balance += added * alignment

                    socket.emit("balance", state.shared.balance);
                    state.peer.emit("balance", state.shared.balance);
                }
            });
        }
    });

    socket.on("death", function(amount) {
        socket.get("state", function(err, state) {
            state.peer.emit("death");

            state.shared.lives -= 1;
            socket.emit("lives", state.shared.lives);
            state.peer.emit("lives", state.shared.lives);

            if(state.shared.lives == 0) {
                socket.emit("game over");
                state.peer.emit("game over");

                state.shared.lives = 3;
            }
            
            state.shared.resources = 0;
            state.shared.balance = 0;
        });
    });

    socket.on("movement", function(x, y) {
        socket.get("state", function(err, state) {
            state.peer.emit("peer movement", x, y);
        });
    });

    socket.on("ping", function() {
        socket.get("state", function(err, state) {
            state.peer.emit("ping");
        });
    });
});
