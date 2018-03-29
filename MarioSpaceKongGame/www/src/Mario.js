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
        this.ships = this.game.add.group();

        var inShip = false;
        var onTube = false;
        var started = false;
        var endAnim = 0;

        this.coinsCollected = 0;

        var level1 = [
            '                                                  ',
            '                                                  ',
            '                                                  ',
            '              bbb                                 ',
            '                                                  ',
            '            ccc ccc                        s      ',
            '            bbb bbb                       LGR     ',
            '                                         LxxxR    ',
            '              !                         LxxxxxR   ',
            'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGxxxxxxxGGG',
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        ];

        var level2 = [
            '          ccc                                     ',
            '          bbb      bbbbb                          ',
            '                c                                 ',
            '                !         !                       ',
            '               !b        !LR                      ',
            '              !bbb      !LxxR              s      ',
            '              bbbbb     LxxxxR            LGR     ',
            '                       LxxxxxxR          LxxxR    ',
            '               ccc   !LxxxxxxxxR    c   LxxxxxR   ',
            'GGGGGGGGGGGGGGGGGGGGGGxxxxxxxxxxGGGGGGGGxxxxxxxGGG',
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        ];

        var level3 = [
            '            c                                     ',
            '           bbb                                    ',
            '                                                  ',
            '     bbb                                          ',
            '                    !                           cc',
            '               cc bbb    !       !         s    cc',
            'bbb                     bb    bbbb   bb  bbbbb  cc',
            '                                                cb',
            '                                                cc',
            'bbbbbbbbbbb                                     cc',
            'bbbbbbbbbbb                             b    b  bb',
        ];
        var currentLevel = null;

        if (bootcamp._MARIOLEVELS == 0) {
            currentLevel = level1;
        } else if (bootcamp._MARIOLEVELS == 1) {
            currentLevel = level2;
        } else if (bootcamp._MARIOLEVELS == 2) {
            currentLevel = level3;
        } else if (bootcamp._MARIOLEVELS > 2) {
            bootcamp._MARIOLEVELS = 0;
            currentLevel = level1;
        }

        for (var i = 0; i < currentLevel.length; i++) {
            for (var j = 0; j < currentLevel[i].length; j++) {

                // Create ground
                if (currentLevel[i][j] == 'x') {
                    var ground = this.game.add.sprite(16 * j, bootcamp._HEIGHT - 176 + 16 * i, 'tilesM');
                    ground.frame = 4;
                    ground.body.immovable = true;
                    this.ground.add(ground);
                }

                // Create ground top
                else if (currentLevel[i][j] == 'G') {
                    var ground = this.game.add.sprite(16 * j, bootcamp._HEIGHT - 176 + 16 * i, 'tilesM');
                    ground.frame = 1;
                    ground.body.immovable = true;
                    this.ground.add(ground);
                }

                // Create ground left top border
                else if (currentLevel[i][j] == 'L') {
                    var ground = this.game.add.sprite(16 * j, bootcamp._HEIGHT - 176 + 16 * i, 'tilesM');
                    ground.frame = 0;
                    ground.body.immovable = true;
                    this.ground.add(ground);
                }

                // Create ground right top border
                else if (currentLevel[i][j] == 'R') {
                    var ground = this.game.add.sprite(16 * j, bootcamp._HEIGHT - 176 + 16 * i, 'tilesM');
                    ground.frame = 2;
                    ground.body.immovable = true;
                    this.ground.add(ground);
                }

                // Create ground right top border
                else if (currentLevel[i][j] == 'b') {
                    var ground = this.game.add.sprite(16 * j, bootcamp._HEIGHT - 176 + 16 * i, 'tilesM');
                    ground.frame = 9;
                    ground.body.immovable = true;
                    this.ground.add(ground);
                }

                // Create coins
                else if (currentLevel[i][j] == 'c') {
                    var coin = this.game.add.sprite(16 * j, bootcamp._HEIGHT - 176 + 16 * i, 'tilesM');
                    coin.animations.add('coin', [17, 18, 19, 18], 10, true);
                    coin.animations.play('coin');
                    coin.body.immovable = true;
                    coin.name = "coin" + i + j;
                    this.coins.add(coin);
                }

                // Create enemy
                else if (currentLevel[i][j] == '!') {
                    var enemy = new Enemy(this.game, 16 * j, bootcamp._HEIGHT - 176 + 16 * i);
                    enemy.name = "enemy" + i + j;
                    this.enemies.add(enemy);
                }

                /*// Create ship
                else if (currentLevel[i][j] == 's') {
                    var rand = this.rnd.integerInRange(0, 1);
                    if (rand = 0) {
                        this.ship = this.game.add.sprite(16 * j + 8, bootcamp._HEIGHT - 176 + 16 * i + 16, 'shipM');
                        this.ship.frame = 0;
                        this.ship.body.immovable = true;
                        this.ship.name = "ship";
                        this.ship.anchor.set(0.5, 1);
                        this.endAnim = 0;
                    } else {
                        this.endTube = this.game.add.sprite(16 * j + 8, bootcamp._HEIGHT - 176 + 16 * i + 16, 'greenTube');
                        this.endTube.anchor.set(0.5, 1);
                        this.endTube.body.immovable = true;
                        this.endTube.name = "tube";
                        this.endAnim = 1;
                    }
                }*/
            }
        }

        this.playerDead = false;
        this.player = this.add.sprite(40, 1000, 'playerM');
        this.player.name = "player";
        this.player.anchor.set(0.5, 0.5);
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.gravity.y = 600;
        this.player.body.collideWorldBounds = false;
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

        this.player.animations.add('idle', [0], 1, true);
        this.player.animations.add('walk', [0, 1, 2, 3], 10, true);
        this.player.animations.add('jump', [6], 1, true);
        this.player.animations.add('dead', [4], 1, true);

        var rand = this.rnd.integerInRange(0, 1);
        if (rand == 0) {
            this.ship = this.game.add.sprite(16 * 43 + 8, bootcamp._HEIGHT - 176 + 16 * 6, 'shipM');
            this.ship.frame = 0;
            this.ship.body.immovable = true;
            this.ship.name = "ship";
            this.ship.anchor.set(0.5, 1);
            this.endAnim = 0;


        } else {
            this.endTube = this.game.add.sprite(16 * 43 + 8, bootcamp._HEIGHT - 176 + 16 * 6, 'greenTube');
            this.endTube.anchor.set(0.5, 1);
            this.endTube.body.immovable = true;
            this.endTube.name = "tube";
            this.endAnim = 1;


        }
        var startAnim = 0;
        if (bootcamp._LASTSTATE == "Space") {
            this.startAnim = 0;
            
            this.startShip = this.game.add.sprite(100, bootcamp._HEIGHT + 60, 'shipM');
            this.startShip.frame = 1;
            this.startShip.body.immovable = true;
            this.startShip.name = "startShip";
            this.startShip.anchor.set(0.5, 1);
            this.startShip.body.velocity.y = -400;
        } else if(bootcamp._LASTSTATE == "Kong"){
            this.startAnim = 1;

            this.startTube = this.game.add.sprite(100, -32, 'greenTube');
            this.startTube.anchor.set(0.5, 0.5);
            this.startTube.body.immovable = true;
            this.startTube.name = "tube";
            this.startTube.body.velocity.y = 50;
            this.startTube.angle = 180;
        }else if(bootcamp._LASTSTATE == null){
            console.log("call");
            this.startAnim = 0;
            
            this.startShip = this.game.add.sprite(100, bootcamp._HEIGHT + 60, 'shipM');
            this.startShip.frame = 1;
            this.startShip.body.immovable = true;
            this.startShip.name = "startShip";
            this.startShip.anchor.set(0.5, 1);
            this.startShip.body.velocity.y = -400;
        }

        //SOUNDS
        // Initialize sounds
        this.coinSound = this.add.audio('coin', 1, false);
        this.lostLifeSound = this.add.audio('lostlife', 3, false);
        this.enemyHitSound = this.add.audio('enemyhit', 1, false);

        this.keys = this.game.input.keyboard.createCursorKeys();

        this.score = this.add.sprite(1, 1, 'stats');
        this.score.frame = 1;
        this.score.fixedToCamera = true;
        this.lives = this.add.sprite(165, 1, 'stats');
        this.lives.frame = 0;
        this.lives.fixedToCamera = true;

        this.style = {
            font: "9px silkscreen",
            fill: "#fff ",
            align: "left"
        };

        this.scoreText = this.add.text(30, -1, bootcamp._SCORE, this.style);
        this.scoreText.anchor.set(0.5, 0);
        this.scoreText.stroke = '#000000';
        this.scoreText.strokeThickness = 3;
        this.scoreText.fixedToCamera = true;

        this.livesText = this.add.text(195, -1, bootcamp._LIVES, this.style);
        this.livesText.anchor.set(0.5, 0);
        this.livesText.stroke = '#000000';
        this.livesText.strokeThickness = 3;
        this.livesText.fixedToCamera = true;

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

        if (this.playerDead == false && this.started) {
            if (this.startAnim == 0) {
                if (this.startShip.body.position.y < -100) {
                    this.startShip.kill();
                }
            }

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

            //KILL WHEN ON THE GROUND
            if (this.player.body.blocked.down) {
                this.lostLifeSound.play();
                this.playerDead = true;
                this.player.body.velocity.y = -300;
                this.player.body.collideWorldBounds = false;
            }

            //END LEVEL
            if (this.endAnim == 0) {
                if (this.inShip) {
                    this.ship.body.velocity.y -= 5;
                }
                if (this.ship.body.position.y < 0) {
                    this.inShip = false;
                    this.started = false;
                    bootcamp._MARIOLEVELS++;
                    bootcamp._LASTSTATE = "Mario";
                    this.game.state.start('Space');
                }
            } else {
                this.physics.arcade.collide(this.player, this.endTube, this.collisionHandlerTube, function () {
                    if (this.onTube) {
                        return false;
                    }
                    return true;
                }, this);

                if (this.onTube) {
                    this.player.body.position.x = this.endTube.body.position.x;
                    if (this.player.body.position.y >= this.endTube.body.position.y) {
                        this.game.state.start('Kong');
                        bootcamp._MARIOLEVELS++;
                        bootcamp._LASTSTATE = "Mario";
                        this.started = false;
                        this.onTube = false;
                    }
                }
            }


            this.bg.body.position.x = this.game.camera.x / 600 * 288 - 2;

        } else if (this.playerDead == true && this.started) {

            if (this.player.body.position.y > bootcamp._HEIGHT + 27) {
                bootcamp._LIVES -= 1;
                this.livesText.text = bootcamp._LIVES;
                if (bootcamp._LIVES <= 0) {
                    this.inShip = false;
                    this.started = false;
                    this.game.state.start('MainMenu');
                    bootcamp._LIVES = 3;
                } else {
                    console.log(this.coinsCollected);
                    bootcamp._SCORE = bootcamp._SCORE - this.coinsCollected;
                    this.scoreText.text = bootcamp._SCORE;
                    this.inShip = false;
                    this.started = false;
                    this.game.state.start('Mario');
                }

            }

            this.player.animations.play("dead");
            //this.lostLifeSound.play();
            this.player.body.velocity.x = 0;

        } else if (!this.playerDead && !this.started) {
            if (this.startAnim == 0) {
                if (this.startShip.body.position.y < bootcamp._HEIGHT / 4 * 3) {
                    this.startShip.frame = 0;
                    this.player.body.position.y = this.startShip.body.position.y;
                    this.player.body.position.x = this.startShip.body.position.x;
                    this.player.body.velocity.y = -300;
                    this.player.body.collideWorldBounds = true;
                    this.started = true;
                }
            }else {
                if (this.startTube.body.position.y > 0) {
                    this.player.body.position.y = this.startTube.body.position.y;
                    this.player.body.position.x = this.startTube.body.position.x + 5;
                    this.startTube.body.velocity.y = -50;
                    this.player.body.velocity.y = 0;
                    this.started = true;
                }
            }

        }
        //MAX SPEED
        if (this.player.body.velocity.x < -150) {
            this.player.body.velocity.x = -150;
        } else if (this.player.body.velocity.x > 150) {
            this.player.body.velocity.x = 150;
        }
    },
    collisionHandlerEnemy: function (player, enemy) {
        if (enemy.body.touching.up) {
            enemy.animations.play("dead");
            this.enemyHitSound.play();
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
        bootcamp._SCORE += 1;
        this.scoreText.text = bootcamp._SCORE;
        this.coinsCollected += 1;
        this.coinSound.play();
        coin.kill();
    },
    collisionHandlerTube: function (player, tube) {
        if (tube.body.touching.up) {
            this.onTube = true;
            this.player.body.position.x = this.endTube.body.position.x;
        }
    },
    handleOrientation: function (e) {
        // Device Orientation API
        var x = e.gamma; // range [-90,90], left-right
        var y = e.beta; // range [-180,180], top-bottom
        var z = e.alpha; // range [0,360], up-down
        bootcamp._player.body.velocity.x += 5 * x;

    },
    render: function () {
        //this.game.debug.cameraInfo(this.game.camera, 0, 32);
    }
};
