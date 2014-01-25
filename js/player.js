(function() {
    function Player(image, canvas, x, y) {
        this.initialize(image, canvas, x, y);
    }

    Player.prototype = new createjs.Bitmap();

    // Save the original initialize method
    Player.prototype.Bitmap_initialize = Player.prototype.initialize;

    // Initialize the player object
    Player.prototype.initialize = function (image, canvas, x, y) {
        this.Bitmap_initialize(image);
        this.name = 'Player';
        this.snapToPixel = true;
        this.x = x;
        this.y = y;
        
        this.canvas = canvas;
    }

    Player.prototype.update = function() {
        this.x = PlayerPhysics.x - this.image.width / 2;
        this.y = PlayerPhysics.y - this.image.height / 2;
    }

    window.Player = Player;
})();
