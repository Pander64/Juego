//
// Copyright 2017, Alexander Barroso <alexander.barroso@utp.ac.pa> (www.github.com/pander64)
//
// This file is part of the port to HTML5 of "Abbaye des morts", an original
// game created by gamig wizard (www.github.com/pander64).
// (c) 2017 - gamig wizard
//
// This program is free software; you can redistribute it and/or modify it
// under the terms of the GNU General Public License as published by the Free
// Software Foundation; either version 2 of the License, or (at your option)
// any later version.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
// more details.
//
// You should have received a copy of the GNU General Public License along with
// this program. If not, see <http://www.gnu.org/licenses/>.

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
var puerta2; //Para la capa de fuego 2
var cueva;//Para la zona de ciudad y cueva
var pipe;//Para la  tuberia
var lava;//Para  lava
var o = 0;
var i;
var m;
var r;

//Variables para el juego
var player; //Variable de nuestro juegador
var playerAttack;
var enemigo;
var enemy;
var player2; //Variable de nuestro juegador cuando salta
var playerSpeed;
var jumpTimer = 0; //Variable para poner en 0 al saltar nuestro personaje
var cursors = {};//Variable para el control de nuestro personaje

//Mas variables
var scoreText;
var score;


var enemySpeed = 70;
var playerJump = 400;


var x;

var FotoDialogo =['dialogo1', 'dialogo2','dialogo3','dialogo4'];
var FotoPersona =['persona1', 'persona2','persona3','persona4','persona1'];

Game.Level1.prototype = {

    create:function () {
        //Fondo
        score=0;
        m=0;
        r=0;
        game.sound.stopAll();
        music = game.add.audio('game');
        salto = game.add.audio('salto');
        golpe1 = game.add.audio('golpe1');
        golpe2 = game.add.audio('golpe2');
        carrot = game.add.audio('carrot');
        reci = game.add.audio('r');
        death = game.add.audio('death');
        robotdeath = game.add.audio('robotdeath');
        music.stop();
        music.loop = true;
        music.play();
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
        this.map.addTilesetImage('10','pipe');
        this.map.addTilesetImage('11','lava');


        //  Creates a layer from the World1 layer in the map data.
        //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
        this.vertical = this.map.createLayer('Fondo');
        this.agua = this.map.createLayer('Detalles');
        this.plataforma = this.map.createLayer('Plataforma');
        this.puente = this.map.createLayer('Puente');
        this.puerta = this.map.createLayer('Puerta');
        this.puerta2 = this.map.createLayer('Puerta2');
        this.invisible = this.map.createLayer('Invisible');

        this.invisible.visible = false;
        //Hacer que haya colision entre el campo menos y mayor de la llave "data" del json


        this.map.setCollisionBetween(1,1000,true,this.plataforma);
        this.map.setCollisionBetween(1,1000,true,this.invisible);
       this.map.setCollisionBetween(1,1000,true,this.puerta);
        this.map.setCollisionBetween(1,1000,true,this.puerta2);

        //  This resizes the game world to match the layer dimensions
        this.plataforma.resizeWorld();
        this.invisible.resizeWorld();

        //this.createEnemy();
        this.createItems();
        this.createDoors();
        this.createR();
        //this.createE();
        //this.createEnemy();
        this.enemigo = game.add.group();
        var result1 = this.findObjectsByType('enemy', this.map, 'ObjectLayer1');
        for (i=0;i<13;i++){
          var enemigos = this.enemigo.create(result1[i].x, result1[i].y, 'enemigo');
            enemigos.animations.add('flying', [0, 1, 2, 3, 4, 5], 7, true);
            enemigos.animations.play('flying');

            // setting enemy anchor point
            enemigos.anchor.set(0.5);

            // enabling ARCADE physics for the enemy
            this.game.physics.enable(enemigos, Phaser.Physics.ARCADE);

            // setting enemy horizontal speed
            enemigos.body.velocity.x = enemySpeed;

            enemigos.body.collideWorldBounds = true;
            enemigos.checkWorldBounds = true;
        }

        //this.enemigo = this.game.add.group();

        //this.enemy = this.enemigo.create(result1[0].x, result1[0].y, 'enemigo')


        //Crear la persona en el mapa
        /*for (var i = 0; i < 2; i++){
            var resultadoP = this.findObjectsByType('persona', this.map, 'ObjectLayer2')
            //eval(" var persona" + i);
            // noinspection JSAnnotator
            eval("var persona" + i = this.game.add.sprite(resultadoP[i].x, resultadoP[i].y, FotoPersona[i]));
        }*/
        var resultadoP = this.findObjectsByType('persona', this.map, 'ObjectLayer2')
        //eval(" var persona" + i);
        // noinspection JSAnnotator
        var i = "1";
        eval("var persona" + i);
        persona1 = this.game.add.sprite(resultadoP[0].x, resultadoP[0].y, "persona1");
        //this.persona.input.up = true;
        //this.persona.scale.setTo(-1, 1);
        //this.persona.events.onInputDown.add(this.CrearDialogo,this.persona);
        //this.persona.events.onInputDown.add(this.CrearDialogo,this.persona);

        //Crear el dialogo en el mapa

        for (var i = 0; i < 4; i++){
            var resultadoD = this.findObjectsByType('dialogo', this.map, 'ObjectLayer1')

            this.dialogo = this.game.add.sprite(resultadoD[i].x, resultadoD[i].y, FotoDialogo[i]);
            this.dialogo.anchor.setTo(0.5, 0.5);

        }


       // this.dialogo.anchor.setTo(0.5, 0.5);



        //if (x == 0){this.dialogo.visible = false;}else{this.dialogo.visible = true;}
        //if (this.x == 1){this.dialogo.visible = false;}


        //Crear al player

        var result = this.findObjectsByType('playerStart', this.map, 'ObjectLayer1')

        this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');

        //this.enemigo = this.game.add.sprite(result1[0].x, result1[0].y, 'enemigo');

        //Funcionamiento de poner las cosas invisible
        //this.invisible.visible = false;

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

        //this.player.visible = false;

        // Areglo para manejar las teclas para juegar
        cursors = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            up: this.input.keyboard.addKey(Phaser.Keyboard.UP),
            spacebar: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        };


        //this.fixedToCamera = true;

        scoreText = this.game.add.text(this.camera.x, this.camera.y, 'Zanahorias: 0', { fontSize: '32px', fill: '#b60023', align: "center"});

    },

    CrearDialogo: function () {
        x = 1;
        console.log(x);
        //this.dialogo.visible = true;

    },

    CerrarDialogo: function () {
        x = 0;
        console.log(x);
        //this.dialogo.visible = true;
        //return false;
    },

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

    createR: function() {
        //create items
        this.rec = this.game.add.group();
        this.rec.enableBody = true;
        //var item;
        result = this.findObjectsByType('premio', this.map, 'ObjectLayer1');
        result.forEach(function(element){
            this.createFromTiledObject(element, this.rec);
            this.rec.visible = false;
        }, this);
    },


/*
    createE: function() {
        //create items
        this.enemigo = this.game.add.group();
        this.enemigo.enableBody = true;
        //var item;
        result = this.findObjectsByType('enemy', this.map, 'ObjectLayer1');
        result.forEach(function(element){
            this.createFromTiledObject(element, this.enemigo);
        }, this);
    },
*/


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
        //this.physics.arcade.collide(this.player,this.invisible);
        //Borrar
        //this.enemigo.body.velocity.x = this.enemySpeed;
        if(r == 1){
          this.puerta.kill();
          this.puerta.visible = false;
          this.physics.arcade.collide(this.player,this.puerta2);
        }
        else if(r == 2){
          this.puerta2.kill();
          this.puerta2.visible = false;
        }
        else{
          this.physics.arcade.collide(this.player,this.puerta);
        }

        //revisar el 'overlap' o la sobrepocicion de las estrellas con el jugador
        this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);

        this.game.physics.arcade.overlap(this.player, this.rec, this.collectR, null, this);

        this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);

        if(m == 3){
        this.rec.visible = true;
        this.game.physics.arcade.overlap(this.player, this.rec, this.collect2, null, this);
      }

        this.player.body.velocity.x = 0;

        // handling collision between the enemy and the tiles
        this.game.physics.arcade.collide(this.enemigo, this.invisible, function(enemigo, plataforma){

            // enemy touching a wall on the right
            if(enemigo.body.blocked.right){

                // horizontal flipping enemy sprite
              enemigo.scale.x = -1;
            }

            // same concept applies to the left
            if(enemigo.body.blocked.left){
                enemigo.scale.x = 1;
            }

            // adjusting enemy speed according to the direction it's moving
            enemigo.body.velocity.x = enemySpeed * enemigo.scale.x;
        }, null, this);

        if(o == 0){

        // handling collision between enemy and hero
        this.game.physics.arcade.collide(this.player, this.enemigo, function(player, enemigos){

            // hero is stomping the enemy if:
            // hero is touching DOWN
            // enemy is touching UP

            if(enemigos.body.touching.up && this.player.body.touching.down){

                // in this case just jump again
                this.player.body.velocity.y =  -playerJump;
                robotdeath.play();
                enemigos.kill();
                m = m +1;
            }
            else{

                // any other way to collide on an enemy will restart the game
                death.play();
                this.game.state.start("Level1");
            }
          }, null, this);
          }
          else{
            this.game.physics.arcade.collide(this.player, this.enemigo, function(player, enemigos){

                if(enemigos.body.touching.right || enemigos.body.touching.left && this.player.body.touching.right || this.player.body.touching.left){

                    // in this case just jump again
                    robotdeath.play();
                    enemigos.kill();
                    m = m +1;
                }
                else{

                    // any other way to collide on an enemy will restart the game
                    death.play();
                    this.game.state.start("Level1");
                }
              }, null, this);
              }


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
          o = o-o;
            this.ChangePlayer();
            //  Stand still
            this.player.animations.stop();

            this.player.frame = 4;
        }

        if (cursors.up.isDown && this.player.body.onFloor())
        {
          salto.play();
            this.ChangePlayer();
            this.player.body.velocity.y = -350;
        }

        if (cursors.spacebar.isDown && cursors.right.isDown)
        {
            this.playerAttack();
            golpe1.play();

            this.player.animations.play();
            this.player.scale.setTo(-1, 1);
         o= o +1;
        }

        if (cursors.spacebar.isDown && cursors.left.isDown)
        {
            this.playerAttack();
            golpe2.play();

            this.player.animations.play();
            this.player.scale.setTo(1, 1);
         o= o +1;
        }



    },

    death:function(){
        death.play();
        this.killplayer();
        this.game.state.start("Level1");
    },

/*
    moveEnemy:function (enemigo,plataforma){
    if(enemigo.enemySpeed>0 && enemigo.x>plataforma.x+plataforma.width/2 || enemigo.enemySpeed<0 && enemigo.x<plataforma.x-plataforma.width/2){
        enemigo.enemySpeed*=-70;
    }
    },
    */

    playerAttack: function () {
        //Change image and update the body size for the physics engine
        this.player.loadTexture('playerAttack');
        this.player.animations.add('left', [0, 1, 2], 10, true);
        this.player.animations.add('right', [4,5,6], 10, true);
    },

    ChangePlayer: function () {
        this.player.loadTexture("player");
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
    },

    collect: function(player, collectable) {
        console.log('yummy!');
        score += 1;
        scoreText.text = 'Zanahorias: ' + score;
       carrot.play();
        //remove sprite
        collectable.destroy();
    },
    collect2: function(player, collectable) {
        r = r + 1;
        reci.play();
        if(r==1){
          alert("Haz conseguido la 1era R! RECICLA: “Reciclar es más que una acción, es el valor de la responsabilidad por preservar los recursos naturales");
        }
        else if(r==2){
          alert("Haz conseguido la 2da R! REUTILIZA: “Las aguas procedentes de los desagües de lavadoras, bañeras o fregaderos, serían, tras la aplicación de un simple tratamiento, perfectas para el riego de zonas verdes o el uso en cisternas, así como para limpieza de exteriores.");
        }
        else{
          alert("Haz conseguido la 3era R! REDUCE: “Sustituye las bolsas de plástico de la compra por bolsas de materiales reutilizables”");
        }
        collectable.destroy();
    },


    enterDoor: function(player, door) {
        game.state.start("final");
    },

}
