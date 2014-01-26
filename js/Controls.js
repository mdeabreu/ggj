(function() {
    // Keycodes
    var KEYCODE_W = 87;
    var KEYCODE_A = 65;
    var KEYCODE_S = 83;
    var KEYCODE_D = 68;
    var KEYCODE_R = 82;
    var KEYCODE_P = 80;
    var KEYCODE_SPACE = 32;
    var KEYCODE_C = 67;

    var heldKeys = {};

    var Controls = {};

    Controls.keydown = function(e) {
        if(heldKeys[e.keyCode])
            return;
        heldKeys[e.keyCode] = true;

        if(PlayerPhysics.dead) {
            return;
        }

        if (e.keyCode == KEYCODE_A) {
            PlayerPhysics.run(-1);
        } else if (e.keyCode == KEYCODE_D) {
            PlayerPhysics.run(1);
        } else if (e.keyCode == KEYCODE_SPACE) {
            PlayerPhysics.jump();
        } else if(e.keyCode == KEYCODE_P) {
            Server.signalPing();
        } else if(e.keyCode == KEYCODE_C) {
            Server.signalChromaRequest();
        } else {
            return;
        }

        e.preventDefault();
        e.stopPropagation();
    };
    
    Controls.keyup = function(e) {
        heldKeys[e.keyCode] = false;

        if (e.keyCode == KEYCODE_A) {
            PlayerPhysics.run(1);
        } else if (e.keyCode == KEYCODE_D) {
            PlayerPhysics.run(-1);
        } 
    };

    Controls.isAHeld = function() {
        if (heldKeys[KEYCODE_A]) {
            return true;
        } else { 
            return false;
        }
    }

    Controls.isDHeld = function() {
        if (heldKeys[KEYCODE_D]) {
            return true;
        } else {
            return false;
        }
    }

    window.Controls = Controls;
})();
