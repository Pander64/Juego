Game.final = function(game) {

};


Game.final.prototype = {

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

              game.sound.stopAll();
                    music = game.add.audio('credits');
                    music.stop();
                    music.loop = true;
                    music.play();
        this.stage.disableVisibilityChange = true;
        this.add.sprite(0, 0, 'final');
        this.add.existing(this.titleText);

        this.addMenuOption('', function () {
            game.state.start("Level1");
        });

        this.addMenuOption('', function () {
            game.state.start("Level1");
        });
        this.addMenuOption('Entendido', function () {
            game.state.start("MainMenu");
        });
    }
};

Phaser.Utils.mixinPrototype(Game.final.prototype, mixins);
