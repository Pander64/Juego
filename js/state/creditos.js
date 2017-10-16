<<<<<<< HEAD
Game.creditos = function(game) {
=======
Game.MainMenu = function(game) {
>>>>>>> 3157c09fc0b9f595feb5a89b2d14bcca8c3b0d58

};


<<<<<<< HEAD
Game.creditos.prototype = {
=======
Game.MainMenu.prototype = {
>>>>>>> 3157c09fc0b9f595feb5a89b2d14bcca8c3b0d58

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
<<<<<<< HEAD
        this.add.sprite(0, 0, 'creditos');
        this.add.existing(this.titleText);

        this.addMenuOption('', function () {
            game.state.start("Level1");
        });

        this.addMenuOption('', function () {
            game.state.start("Level1");
        });
        this.addMenuOption('Aceptar', function () {
            game.state.start("MainMenu");
=======
        this.add.sprite(0, 0, 'menu');
        this.add.existing(this.titleText);

        this.addMenuOption('Comenzar', function () {
            game.state.start("Level1");
        });

        this.addMenuOption('Cómo jugar', function () {
            game.state.start("Level1");
        });
        this.addMenuOption('Creditos', function () {
            game.state.start("Level1");
>>>>>>> 3157c09fc0b9f595feb5a89b2d14bcca8c3b0d58
        });
    }
};

<<<<<<< HEAD
Phaser.Utils.mixinPrototype(Game.creditos.prototype, mixins);
=======
Phaser.Utils.mixinPrototype(Game.MainMenu.prototype, mixins);
>>>>>>> 3157c09fc0b9f595feb5a89b2d14bcca8c3b0d58
