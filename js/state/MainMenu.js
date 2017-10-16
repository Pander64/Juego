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
<<<<<<< HEAD
            game.state.start("historia");
=======
            game.state.start("Level1");
>>>>>>> 3157c09fc0b9f595feb5a89b2d14bcca8c3b0d58
        });

        this.addMenuOption('Cómo jugar', function () {
            game.state.start("tutorial");
        });
<<<<<<< HEAD
        this.addMenuOption('Créditos', function () {
=======
        this.addMenuOption('Creditos', function () {
>>>>>>> 3157c09fc0b9f595feb5a89b2d14bcca8c3b0d58
            game.state.start("creditos");
        });
    }
};

Phaser.Utils.mixinPrototype(Game.MainMenu.prototype, mixins);
