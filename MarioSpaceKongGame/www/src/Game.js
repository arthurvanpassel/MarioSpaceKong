
bootcamp.Game = function(game) {};
bootcamp.Game.prototype = {
	create: function() {
		this.physics.startSystem(Phaser.Physics.ARCADE);

		Phaser.Canvas.setSmoothingEnabled(this.game.context, false);


		this.player = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
		this.player.scale.setTo(1);
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

		this.barrel = this.add.sprite(0, bootcamp._HEIGHT - 2, 'barrel');
		this.barrel.scale.setTo(0.15, 0.2);
		this.barrel.anchor.setTo(0.5);
		this.physics.enable(this.barrel, Phaser.Physics.ARCADE);
		this.barrel.body.immovable = true;
		this.barrel.body.collideWorldBounds = true;


			_WIDTH = 200;
			_HEIGHT = 200 * (window.innerHeight / window.innerWidth);


<<<<<<< HEAD
		var platforms = this.add.group();
		platforms.physicsBodyType = Phaser.Physics.ARCADE;
		platforms.enableBody = true;
		platforms.body.allowGravity = false;

		
		
		
		platforms = this.add.group();
		platforms.physicsBodyType = Phaser.Physics.ARCADE;
		platforms.enableBody = true;
		platforms.setAll('body.allowGravity', false);

>>>>>>> 9271ee5a24546eb6fc85d69bae7a3485de1773fb
		//create random platforms
		for(i = (_HEIGHT/100); i < (_HEIGHT) - 10;){

			for( w=_WIDTH/100; w < _WIDTH; ){

				var steel = platforms.create(w,i, 'steel');
<<<<<<< HEAD
				steel.scale.setTo(0.5);
				steel.body.immovable = true;
				steel.body.static= false;
			
=======

				steel.scale.setTo(0.5);
				steel.body.immovable = true;
				this.physics.enable(steel, Phaser.Physics.ARCADE);
				steel.body.allowGravity = false;

>>>>>>> 9271ee5a24546eb6fc85d69bae7a3485de1773fb
				i +=0.5;
				w +=20;
		};
		i +=45;
	};
	},
	update: function() {
		this.physics.arcade.collide(this.player, platforms);

		//-----PLAYER-MOVEMENT-------------------------------------------------------------
		this.player.scale.setTo(1);
		this.player.body.velocity.x = 0;
		this.barrel.body.velocity.x = 0;

		if(controls.left.isDown) {
			this.player.body.velocity.x -= 200;
			this.player.scale.setTo(-1, 1);
		}
		else if(controls.right.isDown) {
			this.player.body.velocity.x += 200;
			this.player.scale.setTo(1, 1);
		}
		if (controls.up.isDown && this.player.body.blocked.down) {
			this.player.body.velocity.y -= 300;
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
		if (this.barrel.body.blocked.right) {
			this.barrel.body.x = 0;

		}
		this.barrel.body.velocity.x += 100
		this.barrel.angle += 10;

		this.physics.arcade.collide(this.player, this.barrel, function() {
			console.log('death');
		});


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
