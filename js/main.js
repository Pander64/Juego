var Juego = Juego  ||  {};

Juego.game = new Phaser.Game(800,450,Phaser.AUTO,'');

Juego.game.state.add('Preloader',Game.Preloader);
Juego.game.state.add('MainMenu',Game.MainMenu);
Juego.game.state.add('Level1',Game.Level1);
Juego.game.state.add('Boot',Game.Boot);

Juego.game.state.start('Boot');
