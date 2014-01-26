(function() {
    function Player(image, canvas) {
        this.initialize(image, canvas);
    }

    Player.prototype = new createjs.Bitmap();

    // Save the original initialize method
    Player.prototype.Bitmap_initialize = Player.prototype.initialize;

    // Initialize the player object
    Player.prototype.initialize = function (image, canvas) {
        this.Bitmap_initialize(image);
        this.name = 'Player';
        this.snapToPixel = true;
        this.movement = 0;
        this.velocity = new createjs.Point(0, 0);
        this.canvas = canvas;
    }

    // Every tick this method will be called
    Player.prototype.tick = function () {
        // Handle falling
        if (this.y >= this.canvas.height - this.image.height) {
            this.y = this.canvas.height - this.image.height;
        } else {
            this.y += 15;
        }

        // Handle walking
        if (this.movement > 0) {
            // Start moving to the right, and collide with the edge of the canvas
            // We will need to fix this so that the camera stays focused on the
            // player and the platforms move behind
            if (this.x >= this.canvas.width - this.image.height) {
                this.x = this.canvas.width - this.image.width;
            } else {
                this.x += 10;
            }
        } else if (this.movement < 0) {
            // Start moving to the left, and collide with the edge of the canvas
            // Same with moving to the right, we will need to make some changes
            // in the future
            if (this.x <= 0) {
                this.x = 0;
            } else {
                this.x -= 10;
            }
        }
    }

    Player.prototype.move = function(amount) {
        this.movement += amount;
    };

    Player.prototype.unmove = function(amount) {
        this.movement -= amount;
    };

    // Reset the player
    Player.prototype.reset = function() {
        this.y = 0;
    }

    window.Player = Player;
})();
