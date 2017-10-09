Game.Preloader = function (game) {

    this.preloadBar = null;

};

Game.Preloader.prototype = {
    preload:function () {

        //load a 'loading ...' label on the screen
        this.preloadBar = this.add.sprite(this.world.centerX,this.world.centerY,'preloaderBar');

        //Display the progress bar
        this.preloadBar.anchor.setTo(0.2,0.2);

        this.time.advancedTiming = true;

        this.load.setPreloadSprite(this.preloadBar);

        //LOAD ALL ASSETS


        //  Tilemaps are split into two parts: The actual map data (usually stored in a CSV or JSON file)
        //  and the tileset/s used to render the map.

        //  Here we'll load the tilemap data. The first parameter is a unique key for the map data.

        //  The second is a URL to the JSON file the map data is stored in. This is actually optional, you can pass the JSON object as the 3rd
        //  parameter if you already have it loaded (maybe via a 3rd party source or pre-generated). In which case pass 'null' as the URL and
        //  the JSON object as the 3rd parameter.

        //  The final one tells Phaser the foramt of the map data, in this case it's a JSON file exported from the Tiled map editor.
        //  This could be Phaser.Tilemap.CSV too.
        //  This could be Phaser.Tilemap.TILED_JSON too.
        this.load.tilemap('tilemap','assets/World/tilemap.json',null, Phaser.Tilemap.TILED_JSON);

        //  Next we load the tileset. This is just an image, loaded in via the normal way we load images:
        this.load.image('plataformas', 'assets/World/1.png');
        this.load.image('vertical', 'assets/World/2.png');
        this.load.image('puente', 'assets/World/3.png');
        this.load.image('agua', 'assets/World/4.png');
        this.load.image('boton', 'assets/World/5.png');


        this.load.spritesheet('player','assets/Character/conejo1.png', 38, 68);

    },
    
    create:function () {

        this.state.start('Level1');

    }
};