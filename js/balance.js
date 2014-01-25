// Start by capturing all event inputs
document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;

// Global objects that we'll need
var stage;
var canvas;
var player;
var img = new Image();

// Keycodes
var KEYCODE_W = 87;
var KEYCODE_A = 65;
var KEYCODE_S = 83;
var KEYCODE_D = 68;
var KEYCODE_R = 82;

function init() {
    // Grab our canvas and set it as our stage
    canvas = document.getElementById("balance-canvas");
    stage = new createjs.Stage(canvas);

    // Load the image for our player
    img.onload = onImageLoaded;
    img.src = "assets/player.png";
}

function onImageLoaded(e) {
    // Create a new player object and place it on the stage
    player = new Player(img);
    stage.addChild(player);
    player.reset();

    // Set the parameters for our Ticker including the function we call every tick
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", tick);
}

// The tick function, every time the Ticker ticks, this method is called
function tick(e) {
    // Check if the ticker has been paused, if not continue running
    if (!e.paused) {
        player.tick();
        stage.update();
    }
}

// Handle any key down events
function handleKeyDown(e) {
    // Pass any important key down events to the player object
    if (e.keyCode == KEYCODE_R) {
        player.handleKeyDown(e);
    } else if (e.keyCode == KEYCODE_W) {
        player.handleKeyDown(e);
    } else if (e.keyCode == KEYCODE_A) {
        player.handleKeyDown(e);
    } else if (e.keyCode == KEYCODE_S) {
        player.handleKeyDown(e);
    } else if (e.keyCode == KEYCODE_D) {
        player.handleKeyDown(e);
    } 
}

// Handle any key up events
function handleKeyUp(e) {
    if (e.keyCode == KEYCODE_W) {
        player.handleKeyUp(e);
    } else if (e.keyCode == KEYCODE_A) {
        player.handleKeyUp(e);
    } else if (e.keyCode == KEYCODE_S) {
        player.handleKeyUp(e);
    } else if (e.keyCode == KEYCODE_D) {
        player.handleKeyUp(e);
    } 
}

// If the user clicks the "Play" button, unpause the Ticker
$("#play").click(function() {
    createjs.Ticker.setPaused(false);
});

// If the user clicks the "Pause" button, pause the Ticker
$("#pause").click(function() {
    createjs.Ticker.setPaused(true);
});

init();