(function() {
    var tileImage = new Image();
    tileImage.src = "assets/tile.png";

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

                bitmap.x = j * 64;
                bitmap.y = i * 64;
                tiles.addChild(bitmap);
            }
        }

        return tiles;
    }

    function loadPassability() {
        return passabilityMap;
    }

    window.loadTiles = loadTiles;
})();
