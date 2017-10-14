Game.MainMenu = function(game) {

};


Game.MainMenu.prototype = {

    menuConfig: {
        startY: 150,
        startX: 30
    },

    init: function (game) {
        this.titleText = this.make.text(this.world.centerX, 100, "Piensa", {
            font: 'bold 60pt TheMinion',
            fill: '#FDFFB5',
            align: 'center'
        });
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
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

        this.addMenuOption('Start', function () {
            game.state.start("Level1");
        });

        this.addMenuOption('Options', function () {
            game.state.start("Level1");
        });
        this.addMenuOption('Credits', function () {
            game.state.start("Level1");
        });
    }
};

Phaser.Utils.mixinPrototype(Game.MainMenu.prototype, mixins);
