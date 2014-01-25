(function() {
    // Global objects that we'll need
    var stage;
    var canvas;
    var player;

    function init() {
        // Grab our canvas, focus it and set it as our stage
        canvas = document.getElementById("balance-canvas");
        canvas.focus();
        stage = new createjs.Stage(canvas);

        // Load the image for our player
        player = new Player("assets/lightRun/spritesheet.png", canvas, 100, 100);
        stage.addChild(player);

        // load the tile map
        stage.addChild(loadTiles());

        PlayerPhysics.initialize(400, 0);

        // Set the parameters for our Ticker including the function we call every tick
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", tick);
    }

    // The tick function, every time the Ticker ticks, this method is called
    function tick(e) {
        PlayerPhysics.simulate(e.delta / 1000);
        PlayerCollisions.resolve();

        player.update();
        stage.update();
    }

    // set up controls
    $("#balance-canvas").keydown(Controls.keydown);
    $("#balance-canvas").keyup(Controls.keyup);

    init();
})();
