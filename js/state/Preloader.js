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

        this.game.load.audio('menu', ['assets/musica/intro.mp3']);
        this.game.load.audio('game', ['assets/musica/game.mp3']);
        this.game.load.audio('salto', ['assets/musica/salto.mp3']);
        this.game.load.audio('golpe1', ['assets/musica/golpe1.wav']);
        this.game.load.audio('golpe2', ['assets/musica/golpe2.wav']);
        this.game.load.audio('carrot', ['assets/musica/carrot.wav']);
        this.game.load.audio('r', ['assets/musica/r.wav']);
        this.game.load.audio('death', ['assets/musica/death.wav']);
        this.game.load.audio('robotdeath', ['assets/musica/robotdeath.wav']);
        this.game.load.audio('credits', ['assets/musica/credits.mp3']);
        //Menu
        this.load.image('menu','assets/imagenes/Menu/menu.jpg');
        this.load.image('historia','assets/imagenes/Menu/historia.jpg');
        this.load.image('tutorial','assets/imagenes/Menu/tutorial.jpg');
        this.load.image('creditos','assets/imagenes/Menu/creditos.jpg');
        this.load.image('final','assets/imagenes/Menu/final.jpg');
        //this.load.image('opciones','assets/imagenes/Menu/options.jpg');
        //this.load.image('gameover','assets/imagenes/Menu/gameover.jpg');
        this.load.image('fondo-01','assets/imagenes/World/fondo-01.png');

        //Nivel1
        //Cargar el tilemap.json
        this.load.tilemap('level1','assets/imagenes/World/tilemap.json',null, Phaser.Tilemap.TILED_JSON);

        //  Se cargan las imagenes del nivel 1
        this.load.image('plataformas', 'assets/imagenes/World/1.png');
        this.load.image('vertical', 'assets/imagenes/World/2.png');
        this.load.image('puente', 'assets/imagenes/World/3.png');
        this.load.image('agua', 'assets/imagenes/World/4.png');
        this.load.image('boton', 'assets/imagenes/World/5.png');
        this.load.image('puerta', 'assets/imagenes/World/6.png');
        this.load.image('cueva', 'assets/imagenes/World/7.gif');   //Animación con gif
        //Objetos con tiled
        this.load.image('carrot', 'assets/imagenes/World/8.png'); //Xanahoria
        this.load.image('check', 'assets/imagenes/World/check.png');
        this.load.image('pipe', 'assets/imagenes/World/10.png');
        this.load.image('lava', 'assets/imagenes/World/11.png');
        this.load.image('browndoor', 'assets/imagenes/World/browndoor.png');

        //Dialogo
        this.load.image('dialogo1', 'assets/imagenes/Dialogo/dialogo-01.png');//Dialogo1
        this.load.image('dialogo2', 'assets/imagenes/Dialogo/dialogo-02.png');//Dialogo1
        this.load.image('dialogo3', 'assets/imagenes/Dialogo/dialogo-03.png');//Dialogo1
        this.load.image('dialogo4', 'assets/imagenes/Dialogo/dialogo-04.png');//Dialogo1
        this.load.image('dialogo5', 'assets/imagenes/Dialogo/dialogo-05.png');//Dialogo1
        this.load.image('dialogo6', 'assets/imagenes/Dialogo/dialogo-06.png');//Dialogo1
        this.load.image('dialogo7', 'assets/imagenes/Dialogo/dialogo-07.png');//R1
        this.load.image('dialogo8', 'assets/imagenes/Dialogo/dialogo-08.png');//R2
        this.load.image('dialogo9', 'assets/imagenes/Dialogo/dialogo-09.png');//R3
        //Personas
        this.load.image('persona1', 'assets/imagenes/Pueblo/1.gif');//Viejo
        this.load.image('persona2', 'assets/imagenes/Pueblo/2.gif');//Viejo
        this.load.image('persona3', 'assets/imagenes/Pueblo/3.gif');//Viejo
        this.load.image('persona4', 'assets/imagenes/Pueblo/4.gif');//Viejo
        //Cerrar
        this.load.image('cerrar1', 'assets/imagenes/World/x.png');



        //Se carga el spritesheet del personaje
        this.load.spritesheet('player','assets/imagenes/Character/conejo1.png', 38, 68);
        this.load.spritesheet('playerAttack','assets/imagenes/Character/conejo2.png', 92, 69);

        //Se carga los enemigos
        this.load.spritesheet('enemigo','assets/imagenes/Enemy/enemigo1-01.png', 60, 69);
        //this.load.spritesheet('enemigo2','assets/imagenes/Enemy/enemigo2-01.png', 48, 69);
        //Prueba
        this.load.image("wall","assets/imagenes/World/wall.png");

    },

    create:function () {
         this.status.setText('Listos!');



        setTimeout(function () {
            //Se inicia el tercer estado del juego
            game.state.start('Level1');
        }, 1000);


    }
};
