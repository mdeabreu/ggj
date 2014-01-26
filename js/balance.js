(function() {
    // Global objects that we'll need
    var stage;
    var canvas;
    var player;

    // small module so other modules can signal the server
    var Server = {}

    Server.signalPing = function() {
        socket.emit("ping");
    }

    Server.signalDeath = function() {
        socket.emit("death");
    }

    window.Server = Server

    // set up controls
    $("#balance-canvas").keydown(Controls.keydown);
    $("#balance-canvas").keyup(Controls.keyup);

    // Grab our canvas, focus it and set it as our stage
    canvas = document.getElementById("balance-canvas");
    canvas.focus();

    stage = new createjs.Stage(canvas);

    // generate a skymap
    var sky = Level.generateSky();
    for (var i = 0; i < sky.length; i++) {
        stage.addChild(sky[i]);
    }

    // set up the shadow
    Shadow.initialize(stage);

    // load the tile map
    stage.addChild(Level.loadTiles());

    // Set the parameters for our Ticker including the function we call every tick
    createjs.Ticker.setFPS(60);

    // initialize the network connection and wait for a peer
    var socket = io.connect("http://54.184.95.238");

    // initialize loading screen
    StartScreen.draw(stage);

    socket.on("waiting", function() {
        stage.update();
    });

    socket.on("ready", function(aspect) {
        // remove loading screen
        StartScreen.hide(stage);

        // bgm loop
        createjs.Sound.play("assets/Lightless Dawn.mp3", {"loop": -1})

        // Load the image for our player
        if(aspect)
            player = new Player("assets/lightRun/spritesheet-jump-death.png", canvas, 100, 100);

        else
            player = new Player("assets/shadowRun/spritesheet-jump-death.png", canvas, 100, 100);

        stage.addChild(player);

        // Load the opposite image for our shadow
        Shadow.selectAspect(aspect);

        // Render the user interface
        UserInterface.initialize(stage);

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

            UserInterface.x = player.x - canvas.width / 2;
            UserInterface.y = player.y - canvas.height / 2;
            UserInterface.update();

            // draw everything
            stage.update();

            // send new state to peer
            socket.emit("movement", PlayerPhysics.x, PlayerPhysics.y);
        });

    });

    // handle network messages
    socket.on("resources", function(resources) {
        console.log("resources changed: " + resources);
        UserInterface.changeResources(resources);
    });

    socket.on("balance", function(balance) {
        Level.changeChroma(stage, balance);
        UserInterface.changeBalance(balance);
    });

    socket.on("lives", function(lives) {
        console.log("lives changed: " + lives);
        UserInterface.changeLives(lives);
    });

    socket.on("death", function() {
        PlayerPhysics.respawn();
    });

    socket.on("game over", function() {
        console.log("game over!");
    });

    socket.on("peer movement", function(x, y) {
        Shadow.x = x;
        Shadow.y = y;
    });

    socket.on("ping", function() {
        Shadow.receivePing();
    });
})();
