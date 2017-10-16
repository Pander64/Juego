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
        this.titleText.setShadow(3, 3, 'rgb(109, 62, 32)', 5);
        this.titleText.anchor.set(0.5);
        this.optionCount = 1;
    },

    create: function (game) {
        /*
        if (music.name !== "dangerous" && playMusic) {
            music.stop();
            music = game.add.audio('dangerous');
            music.loop = true;
            music.play();
        }
        */
        this.stage.disableVisibilityChange = true;
        this.add.sprite(0, 0, 'menu');
        this.add.existing(this.titleText);

        this.addMenuOption('Comenzar', function () {
            game.state.start("Level1");
        });

        this.addMenuOption('Cómo jugar', function () {
            game.state.start("tutorial");
        });
<<<<<<< HEAD
        this.addMenuOption('Creditos', function () {
=======
        this.addMenuOption('Créditos', function () {
>>>>>>> e2c8a866ca1de578ef0fc0162b29ed640e9d626d
            game.state.start("creditos");
        });
    }
};

Phaser.Utils.mixinPrototype(Game.MainMenu.prototype, mixins);
