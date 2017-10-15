//Estado para juegar nicel 1
Game.Level1 = function (game) {

};

//Todas mi variables
var map; //Para el tilemap

//Variables para las capas
var plataforma; //Para la capa que tiene las plataformas
var vertical; //Para la capa que tiene partes verticales
var puente; //Para la capa de los puentes
var agua; //Para la capa que tiene agua
var boton; //Para la capa que tiene botones
var puerta; //Para la capa de fuego
var cueva;//Para la zona de ciudad y cueva

//Variables para el juego
var player; //Variable de nuestro juegador
var playerSpeed;
var jumpTimer = 0; //Variable para poner en 0 al saltar nuestro personaje
var cursors = {};//Variable para el control de nuestro personaje




Game.Level1.prototype = {

    create:function () {
        //Fondo
          game.add.sprite(0, 0, 'fondo-01');

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
        map.addTilesetImage('6','puerta');
        map.addTilesetImage('7','cueva');

        //  Creates a layer from the World1 layer in the map data.
        //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
        vertical = map.createLayer('Fondo');
        agua = map.createLayer('Detalles');
        plataforma = map.createLayer('Plataforma');
        boton = map.createLayer('Puerta');
        puente = map.createLayer('Puente');
        puerta = map.createLayer('Puerta');
        cueva = map.createLayer('Cueva');

        //Hacer que haya colision entre el campo menos y mayor de la llave "data" del json
        //map.setCollisionBetween(1,1000,true,plataforma);
        map.setCollisionBetween(1,1000,true,plataforma);
        map.setCollisionBetween(1,1000,true,puerta);

        //  This resizes the game world to match the layer dimensions
        plataforma.resizeWorld();

        player = this.add.sprite(38, this.world.height - 3000, 'player');

        //  We need to enable physics on the player
        this.physics.arcade.enable(player);

        player.anchor.setTo(0.5, 0.5);


        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        // follow the player
        this.camera.follow(player);
        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 350;
        player.body.collideWorldBounds = true;
        player.checkWorldBounds = true;
        player.events.onOutOfBounds.add(this.death, this);

        cursors = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),
        };

    },

    update:function () {

        this.physics.arcade.collide(player,plataforma);

       this.physics.arcade.collide(player,puerta); //colision con puerta
        //this.physics.arcade.collide(stars,plataforma);

        player.body.velocity.x = 0;

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
        alert("Perdiste!");
        location.reload();
    },
}
