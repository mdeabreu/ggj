(function() {
    var tileImage = new Image();
    tileImage.src = "assets/tile.png";

    var tileSize = 64;

    var tileMap = [
        [0, 0, 0],
        [0, 0, 0],
        [1, 1, 1]
    ];

    var passabilityMap = [
        [0, 0, 0],
        [0, 0, 0],
        [1, 1, 1]
    ];

    function loadTiles() {
        var tiles = new createjs.Container();

        for(var i = 0; i < tileMap.length; ++i) {
            var row = tileMap[i];
            for(var j = 0; j < row.length; ++j) {
                var cell = row[j];

                if(cell == 0)
                    continue;

                var bitmap;

                if(cell == 1)
                    bitmap = new createjs.Bitmap(tileImage);

                bitmap.x = j * tileSize;
                bitmap.y = i * tileSize;
                tiles.addChild(bitmap);
            }
        }

        return tiles;
    }

    function handleTileCollisions(player) {
        for(var i = 0; i < passabilityMap.length; ++i) {
            var row = passabilityMap[i];
            for(var j = 0; j < row.length; ++j) {
                var dx = player.x - j * tileSize;
                var dy = player.y - i * tileSize;
            }
        }
    }

    window.loadTiles = loadTiles;
    window.handleTileCollisions = handleTileCollisions;
})();
