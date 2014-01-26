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

    // Load the image for our player
    player = new Player("assets/lightRun/spritesheet.png", canvas, 100, 100);
    stage.addChild(player);

    // load the tile map
    stage.addChild(Level.loadTiles());

    // Set the parameters for our Ticker including the function we call every tick
    createjs.Ticker.setFPS(60);

    // initialize the network connection and wait for a peer
    var socket = io.connect("http://54.184.95.238");

    socket.on("ready", function() {
        // The tick function, every time the Ticker ticks, this method is called
        createjs.Ticker.addEventListener("tick", function(tick) {
            PlayerPhysics.simulate(tick.delta / 1000);
            PlayerCollisions.resolve();

            player.update();
            stage.x = -player.x + canvas.width / 2;
            stage.y = -player.y + canvas.height / 2;
            stage.update();
        });
    });
})();
