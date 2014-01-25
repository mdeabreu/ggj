(function (window) {
    function Player(image) {
        this.initialize(image);
    }
    Player.prototype = new createjs.Bitmap();

    // Save the original initialize method
    Player.prototype.Bitmap_initialize = Player.prototype.initialize;

    // Initialize the player object
    Player.prototype.initialize = function (image) {
        this.Bitmap_initialize(image);
        this.name = 'Player';
        this.snapToPixel = true;
    }

    // Every tick this method will be called
    Player.prototype.tick = function () {
        this.y += 1;
    }

    // Reset the player
    Player.prototype.reset = function() {
        this.y = 0;
    }

    window.Player = Player;
} (window));