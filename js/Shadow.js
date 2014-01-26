(function() {
    var Shadow = {};

    Shadow.x = 0;
    Shadow.y = 0;

    var data = {
        images: ["assets/regularSprites/otherPlayerLight-spritesheet.png"],
        frames: {width:128, height:160},
        animations: {
            idle: {
                frames: [0, 1, 2, 3],
                speed: 0.15
            },
            ping: {
                frames: [4, 5, 6, 5, 4],
                next: "idle",
                speed: 0.15
            }
        }
    };

    var spritesheet = new createjs.SpriteSheet(data);
    var shadowSprite = new createjs.Sprite(spritesheet, "idle");

    Shadow.initialize = function(stage) {
        stage.addChild(shadowSprite);
    }

    Shadow.receivePing = function() {
        shadowSprite.gotoAndPlay("ping");
        createjs.Sound.play("assets/Ping.mp3");
    }

    Shadow.selectAspect = function(aspect) {
        if (!aspect) {
            data.images = ["assets/regularSprites/otherPlayerLight-spritesheet.png"];
        } else {
            data.images = ["assets/regularSprites/otherPlayerShadow-spritesheet.png"];
        }

        spritesheet = new createjs.SpriteSheet(data);
        shadowSprite.spriteSheet = spritesheet;
    }

    Shadow.update = function() {
        shadowSprite.x = Shadow.x - 64;
        shadowSprite.y = Shadow.y - 75;
    }

    window.Shadow = Shadow;
})();
