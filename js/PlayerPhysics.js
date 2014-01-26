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
        this.onGround = false;
        if (respawnCounter <= 0) {
            this.respawn();
            respawnCounter = 110;
        }
        respawnCounter--;
    }

    PlayerPhysics.respawn = function() {
        this.x = this.initialX;
        this.y = this.initialY;
        this.dy = 0;
        this.onGround = false;
        this.dead = false; // issue because dead is always true
    }

    PlayerPhysics.run = function(direction) {
        this.dx += direction * movementSpeed;
    }

    PlayerPhysics.jump = function() {
        if(!this.onGround)
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
