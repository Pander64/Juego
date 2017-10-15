

// Se crea el objeto game con ancho, alto, confguración de Phaser y el id del elemento
var game  = new Phaser.Game(800,450,Phaser.AUTO,'');

// Se crea varios estados del juego
game.state.add('Boot',Game.Boot); //Mostrar la barra de cargando del juego
game.state.add('Preloader',Game.Preloader); //Se cargara los sonidos e imagenes del juego
game.state.add('MainMenu',Game.MainMenu);//Se muestra el menú inicial
game.state.add('Level1',Game.Level1);//El juego

//Se inicia el primer estado del juego
game.state.start('Boot');


//Nota:
//Los estados de juego son una manera mas facil de administrar el codigo y se puede crar tantos estados como yo quiera
