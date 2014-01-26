(function() {
    var Shadow = {};

    Shadow.x = 0;
    Shadow.y = 0;

    var fakeSprite = new createjs.Shape();
    fakeSprite.graphics.beginFill("black").drawCircle(0, 0, 32);

    Shadow.initialize = function(stage) {
        stage.addChild(fakeSprite);
    }

    Shadow.update = function() {
        fakeSprite.x = Shadow.x;
        fakeSprite.y = Shadow.y;
    }

    window.Shadow = Shadow;
})();
