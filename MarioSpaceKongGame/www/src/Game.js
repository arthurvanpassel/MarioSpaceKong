bootcamp.Game = function (game) {};
bootcamp.Game.prototype = {
    create: function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.bg = this.add.sprite(0, 0, 'bg');
        
        this.player = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
        this.player.anchor.set(0.5);
        this.player.smoothed = false;
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.gravity.y = 600;
        this.player.body.collideWorldBounds = true;
        
        this.player.animations.add('idle', [0], 1, true);
        this.player.animations.add('walk', [0, 1, 2, 3], 10, true);
        this.player.animations.add('jump', [6], 1, true);
        
        this.keys = this.game.input.keyboard.createCursorKeys();

        bootcamp._player = this.player;
        window.addEventListener("deviceorientation", this.handleOrientation, true);

    },
    update: function () {
        if (this.keys.left.isDown){
            this.player.body.velocity.x = -200;
        }
        else if (this.keys.right.isDown){
            this.player.body.velocity.x = 200;
        }
        else {
            this.player.body.velocity.x = 0;
        }
        // Make the player jump if he is touching the ground
        if (this.keys.up.isDown && this.player.body.blocked.down) {
            this.player.body.velocity.y = -250;
        }
        
        this.physics.arcade.collide(this.player, this.borderGroup);
        
        if(this.player.body.velocity.x == 0) {
            this.player.animations.play('idle');
        }else if (this.player.body.velocity.x > 0){
            this.player.animations.play('walk');
            this.player.scale.x = 1;
        }else {
            this.player.animations.play('walk');
            this.player.scale.x = -1;
        }
        if(this.player.body.velocity.y < 0) {
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
    }
};
