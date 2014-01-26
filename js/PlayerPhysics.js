(function() {
    // constants
    var gravity = 2000;
    var movementSpeed = 400;
    var jumpImpulse = -500;

    // module
    var PlayerPhysics = {}

    var respawnCounter = 70;

    PlayerPhysics.initialize = function(x, y) {
        this.initialX = x;
        this.initialY = y;
        this.dx = 0;
        this.dead = false;

        this.hittingMirror = false;
        this.hasSentWin = false;

        this.respawn();
    }

    PlayerPhysics.dying = function() {
        this.dead = true;

        this.dx = 0;
        this.dy = 0;
        //Controls.heldKeys = {};
        
        if (respawnCounter <= 0) {
            Server.signalDeath();
            Level.resetTileMap();

            var tiles = stage.getChildByName("tiles");
            var tilesIndex = stage.getChildIndex(tiles);
            stage.removeChild(tiles);

            stage.addChildAt(Level.loadTiles(), tilesIndex);

            this.respawn();
            respawnCounter = 70;
        }
        respawnCounter--;
    }

    PlayerPhysics.respawn = function() {
        this.x = this.initialX;
        this.y = this.initialY;
        this.dy = 0;
        this.onGround = false;
        this.dead = false; 

        if (Controls.isAHeld()) {
            this.run(-1);
        }

        if (Controls.isDHeld()) {
            this.run(1);
        }
        
    }

    PlayerPhysics.handleMirror = function() {
        if (this.hittingMirror && !this.hasSentWin) {
            Server.signalOnMirror();
            this.hasSentWin = true;
        } else if (!this.hittingMirror && this.hasSentWin) {
            Server.signalOffMirror();
            this.hasSentWin = false;
        }
    }

    PlayerPhysics.run = function(direction) {
       if(this.dead) {
        this.dx = 0;
        return;
       }

        this.dx += direction * movementSpeed;
        
    }

    PlayerPhysics.jump = function() {
        if(!this.onGround || this.dead)
            return;
        
        this.dy = jumpImpulse;
        this.onGround = false;
    }

    PlayerPhysics.simulate = function(dt) {
        // do player motion
        this.x += this.dx * dt;
        this.y += this.dy * dt;

        // do gravity
        if(!this.onGround)
            this.dy += gravity * dt;

        else
            this.dy = 0;
    }

    window.PlayerPhysics = PlayerPhysics;
})();
