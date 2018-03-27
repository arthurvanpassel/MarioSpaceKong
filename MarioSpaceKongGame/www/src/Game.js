var platforms;

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
		this.player.body.setCircle(3);
		this.player.body.offset.y = 17;
		this.player.body.collideWorldBounds = true;

		this.game.physics.arcade.gravity.y = 1200;

		this.player.animations.add('idle', [0], 1, true);
    this.player.animations.add('walk', [1,2, 3, 4], 10, true);
		this.player.animations.add('jump', [6], 1, true);

		controls = {
      left: this.input.keyboard.addKey(Phaser.Keyboard.Q),
      right: this.input.keyboard.addKey(Phaser.Keyboard.D),
      up: this.input.keyboard.addKey(Phaser.Keyboard.Z)
    };

		/*this.barrel = this.add.sprite(0, 0, 'barrel');
		this.barrel.scale.setTo(0.15, 0.2);
		this.barrel.anchor.setTo(0.5);
		this.physics.enable(this.barrel, Phaser.Physics.ARCADE);
		this.barrel.body.immovable = true;
		this.barrel.body.collideWorldBounds = true;
		*/

			_WIDTH = 200;
			_HEIGHT = 200 * (window.innerHeight / window.innerWidth);


		platforms = this.add.group();
		platforms.physicsBodyType = Phaser.Physics.ARCADE;
		platforms.enableBody = true;
		platforms.setAll('body.allowGravity', false);

		//create random platforms
		var holeRight = true;
		var startposition = _WIDTH;
		var endposition = _WIDTH;
		for(i = (_HEIGHT/100)+40; i < (_HEIGHT) - 10;){
			if (holeRight) {
				startposition = _WIDTH/100;
				endposition = _WIDTH-50;
			}
			else {
				startposition =(_WIDTH/100)+30;
				endposition = _WIDTH;
			}
			if (i > (_HEIGHT)-20) {
				startposition = _WIDTH/100;
				endposition = _WIDTH;
			}

			for( w=startposition; w < endposition; ){
				var steel = platforms.create(w,i, 'steel');

				steel.scale.setTo(0.5);
				steel.body.immovable = true;
				this.physics.enable(steel, Phaser.Physics.ARCADE);
				steel.body.allowGravity = false;
				if (i > (_HEIGHT)-20) {
					console.log('');
				}
				else {
					if (holeRight) {
						i +=0.5;
					}
					else {
						i -=0.5;
					}
				}
				w +=20;
		};
		i +=55;
		holeRight = !holeRight;
	};
	},
	update: function() {
		var hitplatform = this.physics.arcade.collide(this.player, platforms);
		//this.physics.arcade.collide(this.barrel, platforms);

		//-----PLAYER-MOVEMENT-------------------------------------------------------------
		this.player.body.velocity.x = 0;
		//this.barrel.body.velocity.x = 0;

		if(controls.left.isDown) {
			this.player.body.velocity.x -= 200;
			this.player.scale.setTo(-1, 1);
		}
		else if(controls.right.isDown) {
			this.player.body.velocity.x += 200;
			this.player.scale.setTo(1, 1);
		}
		if (controls.up.isDown && this.player.body.touching.down && hitplatform) {
			this.player.body.velocity.y -= 400;
		}

		if (this.player.body.blocked.down || hitplatform) {
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
		/*if (this.barrel.body.blocked.right) {
			this.barrel.body.x = 0;

		}
		this.barrel.body.velocity.x += 100
		this.barrel.angle += 10;

		this.physics.arcade.collide(this.player, this.barrel, function() {
			console.log('death');
		});
		*/

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
