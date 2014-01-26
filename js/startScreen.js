(function() {
    // initialize loading screen
    var StartScreen = {};

    var loadBG;
    var loadBlock;
    var intro;
    var txt;

    StartScreen.draw = function(stage) {
        loadBG = new createjs.Bitmap("assets/regularSprites/loadBG.png");
        loadBG.x = 0;
        loadBG.y = 0;
        stage.addChild(loadBG);


        loadBlock = new createjs.Bitmap("assets/regularSprites/loading_block.png");
        loadBlock.x = 800/2 - 456/2;
        loadBlock.y = 350;
        stage.addChild(loadBlock);

        intro = new createjs.Text("The world has been torn apart. \n\nReunite shadow with light \nto salvage it.", "18px Courier", "#FFF");
        intro.x = 170;
        intro.y = 100;
        stage.addChild(intro);

        txt = new createjs.Text("Reaching out for your other half...", "15px Courier", "#FFF");
        txt.x = 230;
        txt.y = 390;
        stage.addChild(txt);
    };

    StartScreen.hide = function(stage) {
        stage.removeChild(loadBG);
        stage.removeChild(loadBlock);
        stage.removeChild(txt);
        stage.removeChild(intro);
    };

    window.StartScreen = StartScreen;
})();   