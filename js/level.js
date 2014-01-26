(function() {
    var tileImage = new Image();

    var Level = {};

    var blockTypes = {
        '#': "assets/regularSprites/block.png",
        'c': "assets/chroma/balanced.png",
        'b': "assets/regularSprites/columnBase_broken.png",
        'B': "assets/regularSprites/columnBase_wide.png",
        'P': "assets/regularSprites/columnPillar.png",
        'p': "assets/regularSprites/columnPillar_broken.png",
        'T': "assets/regularSprites/columnTop.png",
        'g': "assets/regularSprites/block_grass1.png",
        'G': "assets/regularSprites/block_grass2.png",
        'l': "assets/regularSprites/block_long.png",
        'L': "assets/regularSprites/block_long_grass.png"
    };

    var skyTypes = {
        "bottom": "assets/regularSprites/sky_bottom.png",
        "default": "assets/regularSprites/sky_default.png",
        "clouds1": "assets/regularSprites/sky_clouds1.png",
        "clouds2": "assets/regularSprites/sky_clouds2.png",
        "mountains": "assets/regularSprites/mountains.png"
    }

    var tileSize = 64;

    Level.tileSize = tileSize;

    var tileMap = [
        ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'c', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'c', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'T', ' ', ' ', 'T', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', '#', 'T', ' ', 'c', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'c', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'P', ' ', ' ', 'P', ' ', ' ', 'p', ' ', ' ', ' ', ' ', '#', 'p', ' ', ' ', 'P', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'c', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['#', ' ', ' ', ' ', ' ', ' ', 'c', ' ', ' ', 'B', ' ', 'c', 'B', ' ', 'c', 'B', ' ', ' ', '#', 'b', ' ', 'B', ' ', ' ', 'B', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#']
    ];

    var passabilityMap = [
        ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#']
    ];

    Level.passabilityMap = passabilityMap;

    Level.loadTiles = function() {
        var tiles = new createjs.Container();
        tiles.name = "tiles";   

        for(var i = 0; i < tileMap.length; ++i) {
            var row = tileMap[i];
            for(var j = 0; j < row.length; ++j) {
                var cell = row[j];

                if(cell == ' ')
                    continue;

                var bitmap;

                if(cell != ' ') {
                    src = blockTypes[String(cell)];
                    bitmap = new createjs.Bitmap(src);
                }

                if (cell == 'c') {
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

    Level.generateSky = function() {
        var res = [];
        var skyBottom = new createjs.Container();
        skyBottom.name = "skyBottom";
        var skyDefault = new createjs.Container();
        skyDefault.name = "skyDefault";
        var clouds = new createjs.Container();
        clouds.name = "clouds";

        var mapWidth = tileMap[0].length;
        var mapWidthPixels = mapWidth * tileSize;
        var mapHeight = tileMap.length;
        var mapHeightPixels = mapHeight * tileSize;

        // Add sky bottom images
        for (var i = 0; i < mapWidth; i++) {
            var image = new createjs.Bitmap(skyTypes["bottom"]);
            image.y = mapHeightPixels;
            image.x = i * tileSize;
            skyBottom.addChild(image);
        }
        res.push(skyBottom);

        // Add default sky
        var y1 = mapHeightPixels - tileSize * 2;
        var y2 = mapHeightPixels - tileSize * 3;
        var y3 = mapHeightPixels - tileSize * 4;
        for (var i = 0; i < mapWidth; i++) {
            var image1 = new createjs.Bitmap(skyTypes["default"]);
            var image2 = new createjs.Bitmap(skyTypes["default"]);
            var image3 = new createjs.Bitmap(skyTypes["default"]);
            image1.y = y1;
            image2.y = y2;
            image3.y = y3;
            x = i * tileSize;
            image1.x = x;
            image2.x = x;
            image3.x = x;
            skyDefault.addChild(image1);
            skyDefault.addChild(image2);
            skyDefault.addChild(image3);
        }
        res.push(skyDefault)

        // Add some clouds
        for (var i = 0; i < mapWidth; i++) {
            var image;

            var rand = Math.random();
            var y = mapHeightPixels - tileSize * 5;
            var x = i * tileSize;
            if (rand < 0.25) {
                image = new createjs.Bitmap(skyTypes["clouds1"]);
                image.x = x;
                image.y = y;
                clouds.addChild(image);
            } else if (rand > 0.75) {
                image = new createjs.Bitmap(skyTypes["clouds2"]);
                image.x = x;
                image.y = y;
                clouds.addChild(image);
            } else {
                image = new createjs.Bitmap(skyTypes["default"]);
                var image2 = new createjs.Bitmap(skyTypes["default"]);
                image.x = x;
                image.y = y;
                image2.x = x;
                image2.y = y + tileSize;
                clouds.addChild(image);
            }
        }
        res.push(clouds);

        return res;
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
