(function() {
    // initialize end game winning screen
    var LoseScreen = {};

    var loadBG;
    var loadBlock;
    var txt;

    LoseScreen.draw = function(stage) {
        loadBG = new createjs.Bitmap("assets/regularSprites/loadBG.png");
        loadBG.x = 0;
        loadBG.y = 0;
        stage.addChild(loadBG);


        loadBlock = new createjs.Bitmap("assets/regularSprites/loading_block.png");
        loadBlock.x = 800/2 - 456/2;
        loadBlock.y = 350;
        stage.addChild(loadBlock);

        txt = new createjs.Text("You are lost forever...", "15px Courier", "#FFF");
        txt.x = 230;
        txt.y = 390;
        stage.addChild(txt);
    };

    LoseScreen.hide = function(stage) {
        stage.removeChild(loadBG);
        stage.removeChild(loadBlock);
        stage.removeChild(txt);
    };

    window.LoseScreen = LoseScreen;
})();   