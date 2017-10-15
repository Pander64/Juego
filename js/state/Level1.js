//Estado para juegar nivel 1
Game.Level1 = function (game) {

};
console.log("Star level1");
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
var player2; //Variable de nuestro juegador cuando salta
var playerSpeed;
var jumpTimer = 0; //Variable para poner en 0 al saltar nuestro personaje
var cursors = {};//Variable para el control de nuestro personaje

//Mas variables
var scoreText;
var score = 0;




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
        this.map = this.game.add.tilemap('level1');

        //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
        //  The second parameter maps this name to the Phaser.Cache key 'tiles'
        this.map.addTilesetImage('1','plataformas');
        this.map.addTilesetImage('2','vertical');
        this.map.addTilesetImage('3','puente');
        this.map.addTilesetImage('4','agua');
        this.map.addTilesetImage('5','boton');
        this.map.addTilesetImage('6','puerta');
        this.map.addTilesetImage('7','cueva');


        //  Creates a layer from the World1 layer in the map data.
        //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
        this.vertical = this.map.createLayer('Fondo');
        this.agua = this.map.createLayer('Detalles');
        this.plataforma = this.map.createLayer('Plataforma');
        this.boton = this.map.createLayer('Puerta');
        this.puente = this.map.createLayer('Puente');
        this.puerta = this.map.createLayer('Puerta');
        this.cueva = this.map.createLayer('Cueva');


        //Hacer que haya colision entre el campo menos y mayor de la llave "data" del json

        this.map.setCollisionBetween(1,1000,true,this.plataforma);
        //map.setCollisionBetween(1,1000,true,puerta);

        //  This resizes the game world to match the layer dimensions
        this.plataforma.resizeWorld();

        this.createItems();
        this.createDoors();

        var result = this.findObjectsByType('playerStart', this.map, 'ObjectLayer1')

        this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');

        var result1 = this.findObjectsByType('enemy', this.map, 'ObjectLayer1')

        this.enemigo = this.game.add.sprite(result1[0].x, result1[0].y, 'enemigo');


        this.enemigo.animations.add("flying", [0, 1, 2, 3, 4, 5], 7, true);
        this.enemigo.animations.play("flying");

        //  We need to enable physics on the player
        //this.physics.arcade.enable(player);
        this.game.physics.arcade.enable(this.player);

        //properties when the player is ducked and standing, so we can use in update()
        //var playerAttackImg = this.game.cache.getImage('playerAttack');

        this.player.anchor.setTo(0.5, 0.5);


        //  Our two animations, walking left and right.
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);

        //Camara segir al personaje
        this.camera.follow(this.player);

        //  Player physics properties. Give the little guy a slight bounce.
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 350;
        this.player.body.collideWorldBounds = true;
        this.player.checkWorldBounds = true;
        this.player.events.onOutOfBounds.add(this.death, this);

        // Areglo para manejar las teclas para juegar
        cursors = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            up: this.input.keyboard.addKey(Phaser.Keyboard.UP),
            spacebar: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        };


        //this.fixedToCamera = true;

        scoreText = this.game.add.text(this.camera.x, this.camera.y, 'score: 0', { fontSize: '32px', fill: '#b60023', align: "center"});

    },

    /*ChangePlayer: function () {
      this.player.loadTexture("playerAttack");
    },*/

    createDoors: function() {
        //create doors
        this.doors = this.game.add.group();
        this.doors.enableBody = true;
        //var item;
        result = this.findObjectsByType('door', this.map, 'ObjectLayer1');
        result.forEach(function(element){
            this.createFromTiledObject(element, this.doors);
        }, this);
    },

    createItems: function() {
        //create items
        this.items = this.game.add.group();
        this.items.enableBody = true;
        //var item;
        result = this.findObjectsByType('item', this.map, 'ObjectLayer1');
        result.forEach(function(element){
            this.createFromTiledObject(element, this.items);
        }, this);
    },





    //find objects in a Tiled layer that containt a property called "type" equal to a certain value
    findObjectsByType: function(type, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function(element){
            if(element.properties.type === type) {
                //Phaser uses top left, Tiled bottom left so we have to adjust
                //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
                //so they might not be placed in the exact position as in Tiled
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    },

    //create a sprite from an object
    createFromTiledObject: function(element, group) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);

        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function(key){
            sprite[key] = element.properties[key];
        });
    },


    update:function () {

        scoreText.x = this.game.camera.x;
        scoreText.y = this.game.camera.y;

        this.physics.arcade.collide(this.player,this.plataforma);
        //Borrar
        this.physics.arcade.collide(this.player,this.enemigo);

       //this.physics.arcade.collide(player,puerta); //colision con puerta
        //this.physics.arcade.collide(stars,plataforma);

        //revisar el 'overlap' o la sobrepocicion de las estrellas con el jugador
        this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);

        this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);



        this.player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {

            //Mover el personaje a la izquierda
            this.player.body.velocity.x = -150;

            this.player.animations.play('left');
            this.player.scale.setTo(1, 1);


        }
        else if (cursors.right.isDown)
        {

            //Mover el personaje a la derecha
            this.player.body.velocity.x = 150;

            this.player.animations.play('right');
            this.player.scale.setTo(1, 1);

        }

        else
        {
            this.ChangePlayer();
            //  Stand still
            this.player.animations.stop();

            this.player.frame = 4;
        }

        if (cursors.up.isDown && this.player.body.onFloor())
        {
            this.ChangePlayer();
            this.player.body.velocity.y = -350;
        }

        if (cursors.spacebar.isDown && cursors.right.isDown)
        {
            this.playerAttack();

            this.player.animations.play('right');
            this.player.scale.setTo(-1, 1);

        }

        if (cursors.spacebar.isDown && cursors.left.isDown)
        {
            this.playerAttack();

            this.player.animations.play('left');
            this.player.scale.setTo(1, 1);

        }



    },

    death:function(){
        this.player.kill();
        alert("Perdiste!");
        location.reload();
    },

    playerAttack: function () {
        //Change image and update the body size for the physics engine
        this.player.loadTexture('playerAttack');
    },

    ChangePlayer: function () {
        this.player.loadTexture("player");
    },

    collect: function(player, collectable) {
        console.log('yummy!');
        score += 50;
        scoreText.text = 'Score: ' + score;

        //remove sprite
        collectable.destroy();
    },

    enterDoor: function(player, door) {
        console.log('entering door that will take you to '+door.targetTilemap+' on x:'+door.targetX+' and y:'+door.targetY);
    },

}
