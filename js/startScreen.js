(function() {
    // initialize loading screen
    var StartScreen = {};

    var loadBG;
    var loadBlock;
    var txt;

    StartScreen.draw = function(stage) {
        loadBG = new createjs.Bitmap("assets/regularSprites/loadBG.png");
        loadBG.x = 0;
        loadBG.y = 0;
        stage.addChild(loadBG);

        loadBlock = new createjs.Bitmap("assets/regularSprites/loading_block.png");
        loadBlock.x = 800/2 - 456/2;
        loadBlock.y = 128;
        stage.addChild(loadBlock);

        txt = new createjs.Text("Matching you with your other...", "18px Courier", "#FFF");
        txt.x = 230;
        txt.y = 165;
        stage.addChild(txt);
    };

    StartScreen.hide = function(stage) {
        stage.removeChild(loadBG);
        stage.removeChild(loadBlock);
        stage.removeChild(txt);
    };

    window.StartScreen = StartScreen;
})();   