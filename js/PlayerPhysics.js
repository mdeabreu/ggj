(function() {
    // constants
    var gravity = 2000;
    var movementSpeed = 400;
    var jumpImpulse = -500;

    // module
    var PlayerPhysics = {}

    var respawnCounter = 110;

    PlayerPhysics.initialize = function(x, y) {
        this.initialX = x;
        this.initialY = y;
        this.dx = 0;
        this.dead = false;
        this.respawn();
    }

    PlayerPhysics.dying = function() {
        this.dead = true;

        this.dx = 0;
        //Controls.heldKeys = {};
        
        if (respawnCounter <= 0) {
            this.respawn();
            respawnCounter = 110;
        }
        respawnCounter--;
    }

    PlayerPhysics.respawn = function() {
        Server.signalDeath();
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
