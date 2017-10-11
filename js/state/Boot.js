var Game = {}; //Se cra un objeto llamado Game

Game.Boot = function (game) {

};

Game.Boot.prototype = {

    init:function () {
        //Se llama cuando se inicia el estado
    },


    preload:function () {
        //Se cargan Imagenes y archivos de recurso

        //Color de fondo, por defecto es negro
        //this.game.stage.backgroundColor = 'black';

        //Se carga la imagen que muestra la carga
        this.load.image('loading','assets/imagenes/Intro/loading.png');
        this.load.image('stars', 'assets/imagenes/Intro/stars.jpg');
        this.load.image('logo', 'assets/imagenes/Intro/logo.png');



    },

    create:function () {
        //Se crea el personaje, los enemigos, los sonidos, el fondo del juego, etc
        this.state.start('Preloader');
    },

    update: function () {
        //Logica del Juego como los movimientos, las colisiones, el movimiento del personaje, etc
    },

    render: function () {
        //Depurar lo que se renderiza
        //this.game.debug.body(this.player);
    },

    pause: function () {
        //Cuando el juego es pausado
    },

    shutdown: function () {
        //Cuando se sale del estado
    }
};