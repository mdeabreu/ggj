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
            }
        }
    };

    var spritesheet = new createjs.SpriteSheet(data);
    var shadowSprite = new createjs.Sprite(spritesheet, "idle");

    Shadow.initialize = function(stage) {
        stage.addChild(shadowSprite);
    }

    Shadow.update = function() {
        shadowSprite.x = Shadow.x - 64;
        shadowSprite.y = Shadow.y - 75;
    }

    window.Shadow = Shadow;
})();
