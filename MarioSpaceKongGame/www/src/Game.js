bootcamp.Game = function(game) {};
bootcamp.Game.prototype = {
    
	create: function() {
		this.physics.startSystem(Phaser.Physics.ARCADE);

        
        // MARIO
        this.player = this.add.sprite(this.game.world.centerX, 250, 'player');
        this.player.anchor.setTo(0.5, 0.5);
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
        
        // MARIO BULLETS
        this.bullets = this.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(5, 'bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);

        // MARIO CONTROLS
        this.cursors = this.input.keyboard.createCursorKeys();
        this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        // ENEMIES

		window.addEventListener("deviceorientation", this.handleOrientation, true);

	},
	update: function() {
        
        // MOVEMENT
		this.playerMovement();
        
        // FIRE
        if (this.fireButton.isDown) {
            this.fireBullet();
        }
	},
    
    playerMovement: function() {
        var maxVelocity = 1000;
        
        if (this.cursors.left.isDown && this.player.body.velocity.x > -maxVelocity) {
            // Move to the left
            this.player.body.velocity.x -= 20;
        }
        else if (this.cursors.right.isDown && this.player.body.velocity.x < maxVelocity) {
            // Move to the right
            this.player.body.velocity.x += 20;
        }
        else {
            // Stop
            this.player.body.velocity.x = 0 ;
        }
    },
    
    fireBullet: function() {
        if (this.time.now > 0) {
        this.bullet = this.bullets.getFirstExists(false);

        if (this.bullet) {
          // And fire it
          this.bullet.reset(this.player.x, this.player.y - 16);
          this.bullet.body.velocity.y = -400;
          this.bullet.body.velocity.x = this.player.body.velocity.x / 4
          this.bulletTime = this.time.now + 400;
        }
      }
    }
	/* handleOrientation: function(e) {
		// Device Orientation API
		var x = e.gamma; // range [-90,90], left-right
		var y = e.beta;  // range [-180,180], top-bottom
		var z = e.alpha; // range [0,360], up-down
		bootcamp._player.body.velocity.x += x;
		bootcamp._player.body.velocity.y += y*0.5;
	}*/
};
