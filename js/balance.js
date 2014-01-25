(function() {
    // Global objects that we'll need
    var stage;
    var canvas;
    var player;

    // Keycodes
    var KEYCODE_W = 87;
    var KEYCODE_A = 65;
    var KEYCODE_S = 83;
    var KEYCODE_D = 68;
    var KEYCODE_R = 82;
    var KEYCODE_SPACE = 32;

    function init() {
        // Grab our canvas, focus it and set it as our stage
        canvas = document.getElementById("balance-canvas");
        canvas.focus();
        stage = new createjs.Stage(canvas);

        // Load the image for our player
        player = new Player("assets/regularSprites/shadowIdle_right.png", canvas, 100, 100);
        stage.addChild(player);
        player.reset();

        stage.addChild(loadTiles());

        // Set the parameters for our Ticker including the function we call every tick
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", tick);
    }

    // The tick function, every time the Ticker ticks, this method is called
    function tick(e) {
        handleTileCollisions(player);
        player.tick();
        stage.update();
    }

    // Handle key events
    var heldKeys = {};

    $("#balance-canvas").keydown(function(e) {
        if(heldKeys[e.keyCode])
            return;

        heldKeys[e.keyCode] = true;
        if (e.keyCode == KEYCODE_R) {
            player.reset();
        } else if (e.keyCode == KEYCODE_A) {
            player.move(-1);
        } else if (e.keyCode == KEYCODE_D) {
            player.move(1);
        }  else if (e.keyCode == KEYCODE_SPACE) {
            player.jump();
        }
    });

    $("#balance-canvas").keyup(function(e) {
        heldKeys[e.keyCode] = false;

        if (e.keyCode == KEYCODE_A) {
            player.unmove(-1);
        } else if (e.keyCode == KEYCODE_D) {
            player.unmove(1);
        } 
    });

    init();
})();
