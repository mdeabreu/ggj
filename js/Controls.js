(function() {
    // Keycodes
    var KEYCODE_W = 87;
    var KEYCODE_A = 65;
    var KEYCODE_S = 83;
    var KEYCODE_D = 68;
    var KEYCODE_R = 82;
    var KEYCODE_P = 80;
    var KEYCODE_SPACE = 32;

    var heldKeys = {};

    var Controls = {};

    Controls.keydown = function(e) {
        if(heldKeys[e.keyCode])
            return;
        heldKeys[e.keyCode] = true;

        if (e.keyCode == KEYCODE_A) {
            PlayerPhysics.run(-1);
        } else if (e.keyCode == KEYCODE_D) {
            PlayerPhysics.run(1);
        } else if (e.keyCode == KEYCODE_SPACE) {
            PlayerPhysics.jump();
        } else if(e.keyCode == KEYCODE_P) {
            if (createjs.Ticker.getPaused()) {
                createjs.Ticker.setPaused(false);
            } else {
                createjs.Ticker.setPaused(true);
            }
        }
    };
    
    Controls.keyup = function(e) {
        heldKeys[e.keyCode] = false;

        if (e.keyCode == KEYCODE_A) {
            PlayerPhysics.run(1);
        } else if (e.keyCode == KEYCODE_D) {
            PlayerPhysics.run(-1);
        } 
    };

    window.Controls = Controls;
})();
