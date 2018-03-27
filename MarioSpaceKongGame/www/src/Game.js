bootcamp.Game = function (game) {};
bootcamp.Game.prototype = {
    create: function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.world.enableBody = true;
        this.game.world.setBounds(0, 0, 1000, bootcamp._HEIGHT);

        this.bg = this.add.sprite(-2, bootcamp._HEIGHT, 'bg');
        this.bg.anchor.set(0, 1);

        this.player = this.add.sprite(40, this.game.world.centerY, 'player');
        this.player.anchor.set(0.5, 0.5);
        this.player.smoothed = false;
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.gravity.y = 600;
        this.player.body.collideWorldBounds = true;
        this.player.body.tilePadding.y = 5;
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

        this.player.animations.add('idle', [0], 1, true);
        this.player.animations.add('walk', [0, 1, 2, 3], 10, true);
        this.player.animations.add('jump', [6], 1, true);

        // Create 3 groups that will contain our objects
        this.ground = this.game.add.group();
        
        // Design the level. x = wall, o = coin, ! = lava.
        var level1 = [
            '                                        ',
            '                                        ',
            '                                        ',
            '                                        ',
            '                                        ',
            'gggggggggggggggggggggggggggggggggggggggg',
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        ];

        for (var i = 0; i < level1.length; i++) {
            for (var j = 0; j < level1[i].length; j++) {

                // Create ground
                if (level1[i][j] == 'x') {
                    var ground = this.game.add.sprite(16 * j, bootcamp._HEIGHT - 112 + 16 * i, 'ground');
                    ground.frame = 4;
                    ground.body.immovable = true;
                    this.ground.add(ground);
                }

                // Create ground top
                else if (level1[i][j] == 'g') {
                    var ground = this.game.add.sprite(16 * j,bootcamp._HEIGHT - 112 + 16 * i, 'ground');
                    ground.frame = 1;
                    ground.body.immovable = true;
                    this.ground.add(ground);
                }
            }
        }

        this.keys = this.game.input.keyboard.createCursorKeys();

        bootcamp._player = this.player;
        window.addEventListener("deviceorientation", this.handleOrientation, true);

    },
    update: function () {
        this.physics.arcade.collide(this.player, this.ground);
        
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
    },
    handleOrientation: function (e) {
        // Device Orientation API
        var x = e.gamma; // range [-90,90], left-right
        var y = e.beta; // range [-180,180], top-bottom
        var z = e.alpha; // range [0,360], up-down
        bootcamp._player.body.velocity.x += x;
        bootcamp._player.body.velocity.y += y * 0.5;
    },
    render: function () {
        this.game.debug.cameraInfo(this.game.camera, 0, 32);
    }
};
