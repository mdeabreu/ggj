(function() {
    function Player(image, canvas, x, y) {
        this.initialize(image, canvas, x, y);
    }

    Player.prototype = new createjs.Sprite();

    // Backup the original initialize method
    Player.prototype.Sprite_initialize = Player.prototype.initialize;

    // Initialize the player object
    Player.prototype.initialize = function (image, canvas, x, y) {
        data = {
            images: [image],
            frames: {width:128, height:160},
            animations: {
                run: {
                    frames: [0, 1, 2, 3, 4, 5, 6, 7],
                    speed: 0.3
                },
                idle: {
                    frames: [15]
                },
                jump: {
                    frames: [8, 9, 10, 11, 12, 13, 14],
                    speed: 0.15
                },
                death: {
                    frames: [16, 17, 18, 19, 20, 21, 22, 23],
                    speed: 0.1
                }
            }
        };
        this.Sprite_initialize(new createjs.SpriteSheet(data), "idle");
        this.name = "Player";
        this.snapToPixel = true;
        this.initX = x;
        this.initY = y;
        this.width = 128;
        this.height = 160;
        this.x = x;
        this.y = y;

        PlayerPhysics.initialize(x, y);
        
        this.canvas = canvas;
    }

    Player.prototype.update = function() {
        this.x = PlayerPhysics.x - this.width / 2;
        this.y = PlayerPhysics.y - this.height / 2;
        this.applyAnimation();
    }

    Player.prototype.applyAnimation = function() {
        // Deal with any transformation that may need to occur
        if (PlayerPhysics.onGround) {
            if (PlayerPhysics.dx > 0){
                if (this.currentAnimation != "run") {
                    this.gotoAndPlay("run");
                }
                this.setTransform(this.x, this.y, 1);
            } else if (PlayerPhysics.dx < 0) {
                if (this.currentAnimation != "run") {
                    this.gotoAndPlay("run");
                }
                this.setTransform(this.x, this.y, -1, 1, 0, 0, 0, this.width, 0);
            }

            if (PlayerPhysics.dx == 0) {
                this.gotoAndPlay("idle");
            }
        } else {
            if (this.currentAnimation != "jump") {
                this.gotoAndPlay("jump");
            }
        }
    };

    window.Player = Player;
})();
