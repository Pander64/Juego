Game.Level1 = function (game) {

};


var map;
//Variables para la lavay las plataformas
var plataforma;
var vertical;
var puente;
var agua;
var boton;

var player;
var controls = {};
var playerSpeed;
var jumpTimer = 0;
var cursors = {};

     


Game.Level1.prototype = {

    create:function () {

        this.stage.backgroundColor = '#3A5963';

        //this.physics.arcade.gravity.y = 140;

        //Habilitar la fisica del videjuego ARCADE
        this.physics.startSystem(Phaser.Physics.ARCADE);
        
        //Collision del mundo  --Agregado--
        this.physics.arcade.checkCollision.down = false;

        //  The 'map' key here is the Loader key given in game.load.tilemap
        map = this.add.tilemap('tilemap');

        //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
        //  The second parameter maps this name to the Phaser.Cache key 'tiles'
        map.addTilesetImage('1','plataformas');
        map.addTilesetImage('2','vertical');
        map.addTilesetImage('3','puente');
        map.addTilesetImage('4','agua');
        map.addTilesetImage('5','boton');

        //  Creates a layer from the World1 layer in the map data.
        //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
        vertical = map.createLayer('Fondo');
        agua = map.createLayer('Detalles');
        plataforma = map.createLayer('Plataforma');
        boton = map.createLayer('Puerta');
        puente = map.createLayer('Puente');

        //Hacer que haya colision entre el campo menos y mayor de la llave "data" del json
        //map.setCollisionBetween(1,1000,true,plataforma);
        map.setCollisionBetween(1,1000,true,plataforma);

        //  This resizes the game world to match the layer dimensions
        plataforma.resizeWorld();

        player = this.add.sprite(38, this.world.height - 3000, 'player');

        //  We need to enable physics on the player
        this.physics.arcade.enable(player);

        player.anchor.setTo(0.5, 0.5);

        /*
        player.animations.add('idle'[0,1], 1, true);
        player.animations.add('jump'[2],1, true);
        player.animations.add('run'[3, 4, 5, 6, 7, 8], 7, true);
        */
        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        // follow the player
        this.camera.follow(player);
        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 400;
        player.body.collideWorldBounds = true;
        player.checkWorldBounds = true;
        player.events.onOutOfBounds.add(this.death, this);


        /*
        controls = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),

        };
        */

        cursors = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),
        };

    },

    update:function () {

        this.physics.arcade.collide(player,plataforma);
        //this.physics.arcade.collide(stars,plataforma);

        player.body.velocity.x = 0;

        /*
        if (controls.up.isDown){
            player.animation.play('jump');
        }

        if (controls.right.isDown){
            player.animation.play('run');
            player.scale.setTo(1,1);
            player.body.velocity.x -= playerSpeed;
        }

        if (controls.left.isDown){
            player.animation.play('run');
            player.scale.setTo(-1,1);
            player.body.velocity.x -= playerSpeed;
        }

        if (controls.up.isDown  && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer){
            player.body.velocity.y = -600;
            jumpTimer = this.time.now * 750;
        }
        */
        //  Reset the players velocity (movement)


        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -150;

            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 150;

            player.animations.play('right');
        }

        else
        {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
        }

        if (cursors.up.isDown && player.body.onFloor())
        {
            player.body.velocity.y = -350;
        }


    },

    death:function(){
        player.kill();
        //alert("Perdiste!");
        location.reload();
    },
}