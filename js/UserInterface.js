(function() {
    var UserInterface = {};
    var x = 100;
    var y = 400;

    var livesBaseText = "Lives: ";
    var livesText = new createjs.Text(livesBaseText, "20px Arial", "#ff7700");
    livesText.x = x;
    livesText.y = y;
    livesText.textBaseline = "alphabetic";

    var resourcesBaseText = "Resources: ";
    var resourcesText = new createjs.Text(resourcesBaseText, "20px Arial", "#ff7700");
    resourcesText.x = x;
    resourcesText.y = y;
    resourcesText.textBaseline = "alphabetic";

    var balanceBaseText = "Balance: "
    var balanceText = new createjs.Text(balanceBaseText, "20px Arial", "#ff7700");
    balanceText.x = x;
    balanceText.y = y;
    balanceText.textBaseline = "alphabetic";

    UserInterface.initialize = function(stage) {
        stage.addChild(livesText);
        stage.addChild(resourcesText);
        stage.addChild(balanceText);
    }

    UserInterface.changeLives = function(lives) {
        livesText.text = livesBaseText + lives;
    }

    UserInterface.changeBalance = function(balance) {
        balanceText.text = balanceBaseText + balance;
    }

    UserInterface.changeResources = function(resources) {
        resourcesText.text = resourcesBaseText + resources;
    }

    UserInterface.update = function() {
        livesText.x = UserInterface.x;
        livesText.y = UserInterface.y + 16;

        resourcesText.x = UserInterface.x;
        resourcesText.y = UserInterface.y + 32;

        balanceText.x = UserInterface.x;
        balanceText.y = UserInterface.y + 48;
    }

    window.UserInterface = UserInterface;
})();
