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
        this.movement = 0;
        this.velocity = new createjs.Point(0, 0);
    }

    // Every tick this method will be called
    Player.prototype.tick = function () {
        // Handle falling
        if (this.y >= canvas.height - this.image.height) {
            this.y = canvas.height - this.image.height;
        } else {
            this.y += 15;
        }

        // Handle walking
        if (this.movement > 0) {
            // Start moving to the right, and collide with the edge of the canvas
            // We will need to fix this so that the camera stays focused on the
            // player and the platforms move behind
            if (this.x >= canvas.width - this.image.height) {
                this.x = canvas.width - this.image.width;
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

    Player.prototype.handleKeyDown = function(e) {
        if (e.keyCode == KEYCODE_R) {
            // Reset the location of the player
            this.reset();
        } else if (e.keyCode == KEYCODE_A) {
            // Flag that we want to move to the left
            if (this.movement < 0) {
                this.movement = -1;
            } else {
                this.movement -= 1;
            }
        } else if (e.keyCode == KEYCODE_D) {
            // Flag that we want to move to the right
            if (this.movement > 0) {
                this.movement = 1;
            } else {
                this.movement += 1;
            }
        }
    }

    Player.prototype.handleKeyUp = function(e) {
        if (e.keyCode == KEYCODE_A) {
            this.movement += 1;
        } else if (e.keyCode == KEYCODE_D) {
            this.movement -= 1;
        }
    }

    // Reset the player
    Player.prototype.reset = function() {
        this.y = 0;
    }

    window.Player = Player;
} (window));