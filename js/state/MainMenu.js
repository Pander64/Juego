Game.MainMenu = function(game) {

};


Game.MainMenu.prototype = {

    menuConfig: {
        startY: 150,
        startX: 30
    },

    init: function (game) {
        
        this.titleText = this.make.text(this.world.centerX, 100, "", {
            font: 'bold 60pt TheMinion',
            fill: '#4D9FCD',
            align: 'center'
        });
        //Presentar la imagen dentro del juego
        this.titleText.setShadow(3, 3, 'rgb(109, 62, 32)', 5);
        this.titleText.anchor.set(0.5);
        this.optionCount = 1;
        
    },

    create: function (game) {
        //Musica 
      game.sound.stopAll();
            music = game.add.audio('menu');
            music.stop();
            music.loop = true;
            music.play();
           
        this.stage.disableVisibilityChange = true;
        this.add.sprite(0, 0, 'menu');
        this.add.existing(this.titleText);
        
        //Menu del juego  
        this.addMenuOption('Comenzar', function () {
            game.state.start("historia");
        });

        this.addMenuOption('Cómo jugar', function () {
            game.state.start("tutorial");
        });
        this.addMenuOption('Créditos', function () {
            game.state.start("creditos");
        });
    }
};

Phaser.Utils.mixinPrototype(Game.MainMenu.prototype, mixins);
