(function() {
    var gravAccel = 0.1;
    var moveAccel = 8;
    var groundDrag = 0.5;
    var maxFallSpeed = 15;
    var maxMoveSpeed = 15;

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
        this.initX = x;
        this.initY = y;
        this.x = x;
        this.y = y;
        
        this.movement = 0;
        this.velocity = new createjs.Point(0, 0);
        this.canvas = canvas;
        this.jumping = false;
        this.onGround = false;
    }

    // Every tick this method will be called
    Player.prototype.tick = function () {
        // Handle walking
        if (this.movement != 0) {
            this.velocity.x += this.movement * moveAccel;
            if (this.movement * this.velocity.x >= maxMoveSpeed) {
                this.velocity.x = this.movement * maxMoveSpeed;
            }
        }

        // Handle gravity
        if (this.velocity.y >= maxFallSpeed) {
            this.velocity.y = maxFallSpeed;
        } else {
            this.velocity.y = gravAccel * maxFallSpeed + (1 - gravAccel) * this.velocity.y;
        }
        
        // Handle jumping
        if (this.jumping == true && this.onGround == true) {
            this.velocity.y = -20;
            this.jumping = false;
            this.onGround = false;
        }

        // Deal with player movement based on a velocity vector
        this.y += this.velocity.y;

        if (this.y >= this.canvas.height - this.image.height) {
            this.y = this.canvas.height - this.image.height;
            this.onGround = true;
        }

        this.x += this.velocity.x;
        //this.velocity.x += -1 * this.movement * groundDrag;
        this.velocity.x *= groundDrag;
        if (Math.abs(this.velocity.x) < 0.1) {
            this.velocity.x = 0;
        }

        if (this.x >= this.canvas.width - this.image.width) {
            this.x = this.canvas.width - this.image.width;
            this.velocity.x = 0;
        }
        if (this.x <= 0) {
            this.x = 0;
            this.velocity.x = 0;
        }
    }

    Player.prototype.move = function(amount) {
        this.movement += amount;
    };

    Player.prototype.unmove = function(amount) {
        this.movement -= amount;
    };

    Player.prototype.jump = function() {
        this.jumping = true;
    }

    // Reset the player
    Player.prototype.reset = function() {
        this.x = this.initX;
        this.y = this.initY;
    }

    window.Player = Player;
})();
