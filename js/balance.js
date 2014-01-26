(function() {
    // Global objects that we'll need
    var stage;
    var canvas;
    var player;

    // set up controls
    $("#balance-canvas").keydown(Controls.keydown);
    $("#balance-canvas").keyup(Controls.keyup);

    // Grab our canvas, focus it and set it as our stage
    canvas = document.getElementById("balance-canvas");
    canvas.focus();

    stage = new createjs.Stage(canvas);

    // set up the shadow
    Shadow.initialize(stage);

    // load the tile map
    stage.addChild(Level.loadTiles());

    // Load the image for our player
    player = new Player("assets/lightRun/spritesheet-jump.png", canvas, 100, 100);
    stage.addChild(player);

    // Set the parameters for our Ticker including the function we call every tick
    createjs.Ticker.setFPS(60);

    // initialize the network connection and wait for a peer
    var socket = io.connect("http://54.184.95.238");

    socket.on("ready", function() {
        // The tick function, every time the Ticker ticks, this method is called
        createjs.Ticker.addEventListener("tick", function(tick) {
            // run simulations
            PlayerPhysics.simulate(tick.delta / 1000);
            PlayerCollisions.resolve();

            // update player and shadow position
            player.update();
            Shadow.update();

            // update camera
            stage.x = -player.x + canvas.width / 2;
            stage.y = -player.y + canvas.height / 2;

            // draw everything
            stage.update();

            // send new state to peer
            socket.emit("movement", PlayerPhysics.x, PlayerPhysics.y);
        });
    });

    // handle network messages
    socket.on("resources", function(resources) {
        console.log("resources changed: " + resources);
    });

    socket.on("balance", function(balance) {
        console.log("balance changed: " + balance);
    });

    socket.on("lives", function(lives) {
        console.log("lives changed: " + lives);
    });

    socket.on("game over", function() {
        console.log("game over!");
    });

    socket.on("peer movement", function(x, y) {
        Shadow.x = x;
        Shadow.y = y;
    });
})();
