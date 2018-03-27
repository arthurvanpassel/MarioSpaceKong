bootcamp.Game = function (game) {};
bootcamp.Game.prototype = {
    create: function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.world.enableBody = true;
        this.game.world.setBounds(0, 0, 800, bootcamp._HEIGHT);

        this.bg = this.add.sprite(-2, bootcamp._HEIGHT, 'bg');
        this.bg.anchor.set(0, 1);

        this.player = this.add.sprite(40, this.game.world.centerY, 'player');
        this.player.name = "player";
        this.player.anchor.set(0.5, 0.5);
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.gravity.y = 600;
        this.player.body.collideWorldBounds = true;
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

        this.player.animations.add('idle', [0], 1, true);
        this.player.animations.add('walk', [0, 1, 2, 3], 10, true);
        this.player.animations.add('jump', [6], 1, true);

        // Create 3 groups that will contain our objects
        this.ground = this.game.add.group();
        this.enemies = this.game.add.group();
        this.ship = null;
        var inShip = false;

        // Design the level. x = wall, o = coin, ! = lava.
        var level1 = [
            '                                                  ',
            '                                                  ',
            '                !                                 ',
            '              bbb                                 ',
            '                                                  ',
            '                                          !s      ',
            '            bbb bbb                      !LGR     ',
            '                                        !LxxxR    ',
            '              !   !                    !LxxxxxR   ',
            'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGxxxxxxxGGG',
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        ];

        for (var i = 0; i < level1.length; i++) {
            for (var j = 0; j < level1[i].length; j++) {

                // Create ground
                if (level1[i][j] == 'x') {
                    var ground = this.game.add.sprite(16 * j, bootcamp._HEIGHT - 176 + 16 * i, 'tiles');
                    ground.frame = 4;
                    ground.body.immovable = true;
                    this.ground.add(ground);
                }

                // Create ground top
                else if (level1[i][j] == 'G') {
                    var ground = this.game.add.sprite(16 * j, bootcamp._HEIGHT - 176 + 16 * i, 'tiles');
                    ground.frame = 1;
                    ground.body.immovable = true;
                    this.ground.add(ground);
                }
                
                // Create ground left top border
                else if (level1[i][j] == 'L') {
                    var ground = this.game.add.sprite(16 * j, bootcamp._HEIGHT - 176 + 16 * i, 'tiles');
                    ground.frame = 0;
                    ground.body.immovable = true;
                    this.ground.add(ground);
                }
                
                // Create ground right top border
                else if (level1[i][j] == 'R') {
                    var ground = this.game.add.sprite(16 * j, bootcamp._HEIGHT - 176 + 16 * i, 'tiles');
                    ground.frame = 2;
                    ground.body.immovable = true;
                    this.ground.add(ground);
                }
                
                // Create ground right top border
                else if (level1[i][j] == 'b') {
                    var ground = this.game.add.sprite(16 * j, bootcamp._HEIGHT - 176 + 16 * i, 'tiles');
                    ground.frame = 9;
                    ground.body.immovable = true;
                    this.ground.add(ground);
                }

                // Create enemy
                else if (level1[i][j] == '!') {
                    var enemy = new Enemy(this.game, 16 * j, bootcamp._HEIGHT - 176 + 16 * i);
                    enemy.name = "enemy" + i + j;
                    this.enemies.add(enemy);
                } 
                
                // Create ship
                else if (level1[i][j] == 's') {
                    this.ship = this.game.add.sprite(16 * j - 16, bootcamp._HEIGHT - 176 + 16 * i - 39, 'ship');
                    this.ship.frame = 0;
                    this.ship.body.immovable = true;
                    this.ship.name = "ship";
                    this.player.anchor.set(0.5, 1);
                }
            }
        }

        this.keys = this.game.input.keyboard.createCursorKeys();

        bootcamp._player = this.player;
        window.addEventListener("deviceorientation", this.handleOrientation, true);

    },
    update: function () {
        this.physics.arcade.collide(this.player, this.ground);
        this.physics.arcade.collide(this.enemies, this.ground);
        this.physics.arcade.overlap(this.player, this.enemies, this.collisionHandlerEnemy, null, this);
        this.physics.arcade.overlap(this.player, this.ship, this.collisionHandlerShip, null, this);
        this.physics.arcade.collide(this.enemies);

        if (this.keys.left.isDown) {
            this.player.body.velocity.x = -200;
        } else if (this.keys.right.isDown) {
            Phaser.Camera.x += 2;
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
        
        if(this.inShip) {
            this.ship.body.velocity.y -= 5;
        }
        
        this.bg.body.position.x = this.game.camera.x / 600 * 288 - 2;
        
    },
    collisionHandlerEnemy: function (player, enemy) {
        if (enemy.body.touching.up) {
            enemy.kill();
            player.body.velocity.y = -250;
        } else {
            player.kill();
        }
    },
    collisionHandlerShip: function (player, ship) {
        player.kill();
        ship.frame = 1;
        this.game.camera.x = 600;
        this.inShip = true;
    },
    handleOrientation: function (e) {
        // Device Orientation API
        var x = e.gamma; // range [-90,90], left-right
        var y = e.beta; // range [-180,180], top-bottom
        var z = e.alpha; // range [0,360], up-down
        bootcamp._player.body.velocity.x += 10*x;
    },
    render: function () {
        //this.game.debug.cameraInfo(this.game.camera, 0, 32);
    }
};
