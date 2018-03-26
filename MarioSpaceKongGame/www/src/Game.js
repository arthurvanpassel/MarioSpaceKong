bootcamp.Game = function(game) {};
bootcamp.Game.prototype = {
	create: function() {
		this.physics.startSystem(Phaser.Physics.ARCADE);

		this.player = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
		this.player.scale.setTo(5);
		this.player.smoothed = false;
		this.player.anchor.set(0.5);
		this.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 1200;

		this.player.body.collideWorldBounds = true;

		this.player.animations.add('idle', [0], 1, true);
    this.player.animations.add('walk', [1,2, 3, 4], 10, true);
		this.player.animations.add('jump', [6], 1, true);

		controls = {
      left: this.input.keyboard.addKey(Phaser.Keyboard.Q),
      right: this.input.keyboard.addKey(Phaser.Keyboard.D),
      up: this.input.keyboard.addKey(Phaser.Keyboard.Z)
    };

		this.barrel = this.add.sprite(0, this.game.world.centerY, 'barrel');
		this.barrel.scale.setTo(0.5);
		this.physics.enable(this.barrel, Phaser.Physics.ARCADE);
		this.barrel.body.collideWorldBounds = true;

		//bootcamp._player = this.player;
		//window.addEventListener("deviceorientation", this.handleOrientation, true);

	},
	update: function() {
		//-----PLAYER-MOVEMENT-------------------------------------------------------------
		this.player.scale.setTo(5);
		this.player.body.velocity.x = 0;
		this.barrel.body.velocity.x = 0;

		if(controls.left.isDown) {
			this.player.body.velocity.x -= 500;
			this.player.scale.setTo(-5, 5);
		}
		else if(controls.right.isDown) {
			this.player.body.velocity.x += 500;
			this.player.scale.setTo(5, 5);
		}
		if (controls.up.isDown && this.player.body.blocked.down) {
			this.player.body.velocity.y -= 500;
		}

		if (this.player.body.blocked.down) {
			if (this.player.body.velocity.x > 0 || this.player.body.velocity.x < 0) {
				this.player.animations.play('walk');
			}
			else {
				this.player.animations.play('idle');
			}
		}
		else {
			this.player.animations.play('jump');
		}

		//-----BARREL-MOVEMENT-------------------------------------------------------------
		var barrelMoveLeft = false;
		if (barrelMoveLeft) {
			this.barrel.body.velocity.x -= 500
			this.barrel.angle += 50;
		}
		else {
			this.barrel.body.velocity.x += 500
			this.barrel.angle += 50;
		}


	},
	handleOrientation: function(e) {
		// Device Orientation API
		var x = e.gamma; // range [-90,90], left-right
		var y = e.beta;  // range [-180,180], top-bottom
		var z = e.alpha; // range [0,360], up-down
		bootcamp._player.body.velocity.x += x;
		bootcamp._player.body.velocity.y += y*0.5;
	}
};
