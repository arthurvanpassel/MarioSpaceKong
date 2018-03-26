bootcamp.Game = function(game) {};
bootcamp.Game.prototype = {
	create: function() {
		this.physics.startSystem(Phaser.Physics.ARCADE);


		this.player = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
		this.player.anchor.set(0.5);
		this.physics.enable(this.player, Phaser.Physics.ARCADE);

		this.keys = this.game.input.keyboard.createCursorKeys();

		bootcamp._player = this.player;
		window.addEventListener("deviceorientation", this.handleOrientation, true);

		this.borderGroup = this.add.group();
		this.borderGroup.enableBody = true;
		this.borderGroup.physicsBodyType = Phaser.Physics.ARCADE;
		this.borderGroup.create(0, 0, 'border-horizontal');
		this.borderGroup.create(0, bootcamp._HEIGHT-2, 'border-horizontal');
		this.borderGroup.create(0, 0, 'border-vertical');
		this.borderGroup.create(bootcamp._WIDTH-2, 0, 'border-vertical');
		this.borderGroup.setAll('body.immovable', true);
	},
	update: function() {
		if(this.keys.left.isDown) {
			this.player.body.velocity.x -= this.movementForce;
		}
		else if(this.keys.right.isDown) {
			this.player.body.velocity.x += this.movementForce;
		}
		if(this.keys.up.isDown) {
			this.player.body.velocity.y -= this.movementForce;
		}
		else if(this.keys.down.isDown) {
			this.player.body.velocity.y += this.movementForce;
		}
		this.physics.arcade.collide(this.player, this.borderGroup);
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
