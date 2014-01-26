(function() {
    var PlayerCollisions = {};

    var halfWidth = 20;
    var halfHeight = 76;

    PlayerCollisions.resolve = function() {
        resolveTileCollisions();
    };

    function resolveTileCollisions() {
        PlayerPhysics.onGround = false;

        for(var i = 0; i < Level.passabilityMap.length; ++i) {
            var row = Level.passabilityMap[i];
            for(var j = 0; j < row.length; ++j) {
                var cell = row[j];

                if(cell == ' ')
                    continue;

                // part 1: check if player intersects tile
                var tileX = j * Level.tileSize + Level.tileSize / 2;
                var tileY = i * Level.tileSize + Level.tileSize / 2;

                if(Math.abs(PlayerPhysics.x - tileX) > halfWidth + Level.tileSize / 2)
                    continue;
                
                if(Math.abs(PlayerPhysics.y - tileY) > halfHeight + Level.tileSize / 2)
                    continue;

                // part 2: collision detected, resolve it
                if(cell == "^") {
                    PlayerPhysics.respawn();
                    Server.signalDeath();
                }

                var rl = (PlayerPhysics.x + halfWidth) - (tileX - Level.tileSize / 2);
                var lr = (PlayerPhysics.x - halfWidth) - (tileX + Level.tileSize / 2);

                var mtvX;
                if(Math.abs(rl) < Math.abs(lr))
                    mtvX = rl;

                else
                    mtvX = lr;

                var bt = (PlayerPhysics.y + halfHeight) - (tileY - Level.tileSize / 2);
                var tb = (PlayerPhysics.y - halfHeight) - (tileY + Level.tileSize / 2);

                var mtvY;
                if(Math.abs(bt) < Math.abs(tb))
                    mtvY = bt;

                else
                    mtvY = tb;

                if(Math.abs(mtvX) < Math.abs(mtvY) && Math.abs(mtvX) > 5)
                    PlayerPhysics.x -= mtvX;

                else if(Math.abs(mtvY) < Math.abs(mtvX)) {
                    PlayerPhysics.y -= mtvY;

                    if(mtvY == bt)
                        PlayerPhysics.onGround = true;
                }
            }
        }
    }

    window.PlayerCollisions = PlayerCollisions;
})();
