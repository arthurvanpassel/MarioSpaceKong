bootcamp.Mario = function (game) {};
bootcamp.Mario.prototype = {
    create: function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.world.enableBody = true;
        this.game.world.setBounds(0, 0, 800, bootcamp._HEIGHT);

        this.bg = this.add.sprite(-2, bootcamp._HEIGHT, 'bgM');
        this.bg.anchor.set(0, 1);

        // Create 3 groups that will contain our objects
        this.ground = this.game.add.group();
        this.enemies = this.game.add.group();
        this.coins = this.game.add.group();
        this.ship = null;
        var inShip = false;

        var level1 = [
            '                                                  ',
            '                                                  ',
            '                !                                 ',
            '              bbb                                 ',
            '                                                  ',
            '            ccc ccc                        s      ',
            '            bbb bbb                       LGR     ',
            '                                         LxxxR    ',
            '              !   !                    !LxxxxxR   ',
            'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGxxxxxxxGGG',
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        ];

        for (var i = 0; i < level1.length; i++) {
            for (var j = 0; j < level1[i].length; j++) {

                // Create ground
                if (level1[i][j] == 'x') {
                    var ground = this.game.add.sprite(16 * j, bootcamp._HEIGHT - 176 + 16 * i, 'tilesM');
                    ground.frame = 4;
                    ground.body.immovable = true;
                    this.ground.add(ground);
                }

                // Create ground top
                else if (level1[i][j] == 'G') {
                    var ground = this.game.add.sprite(16 * j, bootcamp._HEIGHT - 176 + 16 * i, 'tilesM');
                    ground.frame = 1;
                    ground.body.immovable = true;
                    this.ground.add(ground);
                }

                // Create ground left top border
                else if (level1[i][j] == 'L') {
                    var ground = this.game.add.sprite(16 * j, bootcamp._HEIGHT - 176 + 16 * i, 'tilesM');
                    ground.frame = 0;
                    ground.body.immovable = true;
                    this.ground.add(ground);
                }

                // Create ground right top border
                else if (level1[i][j] == 'R') {
                    var ground = this.game.add.sprite(16 * j, bootcamp._HEIGHT - 176 + 16 * i, 'tilesM');
                    ground.frame = 2;
                    ground.body.immovable = true;
                    this.ground.add(ground);
                }

                // Create ground right top border
                else if (level1[i][j] == 'b') {
                    var ground = this.game.add.sprite(16 * j, bootcamp._HEIGHT - 176 + 16 * i, 'tilesM');
                    ground.frame = 9;
                    ground.body.immovable = true;
                    this.ground.add(ground);
                }

                // Create coins
                else if (level1[i][j] == 'c') {
                    var coin = this.game.add.sprite(16 * j, bootcamp._HEIGHT - 176 + 16 * i, 'tilesM');
                    coin.animations.add('coin', [17, 18, 19, 18], 10, true);
                    coin.animations.play('coin');
                    coin.body.immovable = true;
                    coin.name = "coin" + i + j;
                    this.coins.add(coin);
                }

                // Create enemy
                else if (level1[i][j] == '!') {
                    var enemy = new Enemy(this.game, 16 * j, bootcamp._HEIGHT - 176 + 16 * i);
                    enemy.name = "enemy" + i + j;
                    this.enemies.add(enemy);
                }

                // Create ship
                else if (level1[i][j] == 's') {
                    this.ship = this.game.add.sprite(16 * j + 8, bootcamp._HEIGHT - 176 + 16 * i + 16, 'shipM');
                    this.ship.frame = 0;
                    this.ship.body.immovable = true;
                    this.ship.name = "ship";
                    this.ship.anchor.set(0.5, 1);
                }
            }
        }
        
        this.playerDead = false;
        this.player = this.add.sprite(40, this.game.world.centerY, 'playerM');
        this.player.name = "player";
        this.player.anchor.set(0.5, 0.5);
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.gravity.y = 600;
        this.player.body.collideWorldBounds = true;
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

        this.player.animations.add('idle', [0], 1, true);
        this.player.animations.add('walk', [0, 1, 2, 3], 10, true);
        this.player.animations.add('jump', [6], 1, true);
        this.player.animations.add('dead', [4], 1, true);

        this.keys = this.game.input.keyboard.createCursorKeys();

        bootcamp._player = this.player;
        window.addEventListener("deviceorientation", this.handleOrientation, true);

    },
    update: function () {
        this.physics.arcade.collide(this.enemies, this.ground, null, function (enemy) {
                if (enemy.dead) {
                    return false;
                }
                return true;
            }, this);
        this.physics.arcade.collide(this.enemies);
        
        if (this.playerDead == false) {
            this.physics.arcade.collide(this.player, this.ground, null, function () {
                if (this.playerDead) {
                    return false;
                }
                return true;
            }, this);
            
            this.physics.arcade.collide(this.player, this.enemies, this.collisionHandlerEnemy, null, this);
            this.physics.arcade.overlap(this.player, this.ship, this.collisionHandlerShip, null, this);
            this.physics.arcade.overlap(this.player, this.coins, this.collisionHandlerCoin, null, this);
            

            if (this.keys.left.isDown) {
                this.player.body.velocity.x = -200;
            } else if (this.keys.right.isDown) {
                this.player.body.velocity.x = 200;
            } else {
                this.player.body.velocity.x = 0;
            }
            // Make the player jump if he is touching the ground
            if (this.keys.up.isDown && this.player.body.touching.down) {
                this.player.body.velocity.y = -250;
            }

            if (this.game.input.pointer1.isDown && this.player.body.touching.down) {
                this.player.body.velocity.y = -250;
            }

            if (this.player.body.velocity.x == 0) {
                this.player.animations.play('idle');
            } else if (this.player.body.velocity.x > 0) {
                this.player.animations.play('walk');
                this.player.scale.x = 1;
            } else {
                this.player.animations.play('walk');
                this.player.scale.x = -1;
            }
            if (this.player.body.velocity.y < 0) {
                this.player.animations.play('jump');
            }

            //END LEVEL
            if (this.inShip) {
                this.ship.body.velocity.y -= 5;
            }if (this.ship.body.position.y < 0) {
                this.game.state.start('Space');
            }

            if (this.player.body.position.y > 227) {
                this.player.kill;
            }

            this.bg.body.position.x = this.game.camera.x / 600 * 288 - 2;
        }else {
            this.player.animations.play("dead");
            this.player.body.velocity.x = 0;
        }
        
        //MAX SPEED
        if(this.player.body.velocity.x < -200) {
            this.player.body.velocity.x = -200;
        }else if(this.player.body.velocity.x > 200) {
            this.player.body.velocity.x = 200;
        }
    },
    collisionHandlerEnemy: function (player, enemy) {
        if (enemy.body.touching.up) {
            enemy.animations.play("dead");
            enemy.dead = true;
            enemy.body.velocity.y = -100;
            player.body.velocity.y = -250;
        } else {
            this.playerDead = true;
            this.player.body.velocity.y = -300;
            this.player.body.collideWorldBounds = false;
        }
    },
    collisionHandlerShip: function (player, ship) {
        this.player.kill();
        ship.frame = 1;
        this.game.camera.x = 600;
        this.inShip = true;
    },
    collisionHandlerCoin: function (player, coin) {
        coin.kill();
    },
    handleOrientation: function (e) {
        // Device Orientation API
		var x = e.gamma; // range [-90,90], left-right
		var y = e.beta;  // range [-180,180], top-bottom
		var z = e.alpha; // range [0,360], up-down
		bootcamp._player.body.velocity.x += 10*x;
        
        // PLAYER MOVEMENT
        var maxVelocity = 200;
        
        if (x<0 && this.player.body.velocity.x > -maxVelocity && !this.playerDead) {
            // Move to the left
            this.player.body.velocity.x -= 10;
            this.player.animations.play('walk');
            this.player.scale.x = -1;
        }
        else if (x>=0 && this.player.body.velocity.x && !this.playerDead) {
            // Move to the right
            this.player.body.velocity.x += 10;
            this.player.animations.play('walk');
            this.player.scale.x = 1;
        }
        else {
            // Stop
            this.player.body.velocity.x = 0 ;
            this.player.animations.play('idle');
        }
    },
    render: function () {
        //this.game.debug.cameraInfo(this.game.camera, 0, 32);
    }
};