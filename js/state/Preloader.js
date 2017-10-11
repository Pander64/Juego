Game.Preloader = function (game) {

    this.preloadBar = null;

};

Game.Preloader.prototype = {

    init: function () {
        this.loadingBar = game.make.sprite(game.world.centerX-(387/2), 400, "loading");
        this.logo       = game.make.sprite(game.world.centerX, 200, 'logo');
        this.status     = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
        utils.centerGameObjects([this.logo, this.status]);
    },

    preload:function () {

        //Barra de progreso
        game.add.sprite(0, 0, 'stars');
        game.add.existing(this.logo).scale.setTo(0.5);
        game.add.existing(this.loadingBar);
        game.add.existing(this.status);
        this.load.setPreloadSprite(this.loadingBar);


        //Menu
        this.load.image('menu','assets/imagenes/Menu/menu.jpg');
        this.load.image('opciones','assets/imagenes/Menu/options.jpg');
        this.load.image('gameover','assets/imagenes/Menu/gameover.jpg');
        this.load.image('fondo-01','assets/imagenes/World/fondo-01.png');

        //Nivel1
        //Cargar el tilemap.json
        this.load.tilemap('tilemap','assets/imagenes/World/tilemap.json',null, Phaser.Tilemap.TILED_JSON);

        //  Se cargan las imagenes del nivel 1
        this.load.image('plataformas', 'assets/imagenes/World/1.png');
        this.load.image('vertical', 'assets/imagenes/World/2.png');
        this.load.image('puente', 'assets/imagenes/World/3.png');
        this.load.image('agua', 'assets/imagenes/World/4.png');
        this.load.image('boton', 'assets/imagenes/World/5.png');
        this.load.image('puerta', 'assets/imagenes/World/6.png');

        //Se carga el spritesheet del personaje
        this.load.spritesheet('player','assets/imagenes/Character/conejo1.png', 38, 68);

    },

    create:function () {
        this.status.setText('Ready!');


        setTimeout(function () {
            //Se inicia el tercer estado del juego
            game.state.start('MainMenu');
        }, 2000);

    }
};
