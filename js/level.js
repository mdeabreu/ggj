(function() {
    var tileImage = new Image();

    var Level = {};

    var blockTypes = {
        '1': "assets/regularSprites/block.png",
        '2': "assets/regularSprites/columnBase_wide.png",
        '3': "assets/chroma/balanced.png"
    };

    var tileSize = 64;

    Level.tileSize = tileSize;

    var tileMap = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
        [0, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    var passabilityMap = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    Level.passabilityMap = passabilityMap;

    Level.loadTiles = function() {
        var tiles = new createjs.Container();
        tiles.name = "tiles";   

        for(var i = 0; i < tileMap.length; ++i) {
            var row = tileMap[i];
            for(var j = 0; j < row.length; ++j) {
                var cell = row[j];

                if(cell == 0)
                    continue;

                var bitmap;

                if(cell != 0) {
                    src = blockTypes[String(cell)];
                    bitmap = new createjs.Bitmap(src);
                }

                if (cell == 3) {
                    bitmap.name = "chroma";
                    bitmap.regX = -16;
                    bitmap.regY = -16;
                }

                bitmap.x = j * tileSize;
                bitmap.y = i * tileSize;
                tiles.addChild(bitmap);
            }
        }

        return tiles;
    };

    Level.changeChroma = function(stage, bal) {
        var chromaLight = "assets/chroma/light";
        var chromaShadow = "assets/chroma/shadow";
        var chromaBalanced = "assets/chroma/balanced";

        var newSrc = "";
        if (bal > 0 && bal <= 5) {
            newSrc = chromaLight + bal;
        } else if (bal < 0 && bal >= -5) {
            newSrc = chromaShadow + Math.abs(bal);
        } else {
            newSrc = chromaBalanced;
        }
        newSrc += ".png";

        var tiles = stage.getChildByName("tiles");
        for (var i = 0; i < tiles.getNumChildren(); i++) {
            var child = tiles.getChildAt(i);
            if (child.name == "chroma"){
                child.image.src = newSrc;
            }
        };
    };

    window.Level = Level;
})();
