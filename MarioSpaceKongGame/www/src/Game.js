bootcamp.Game = function(game) {};
bootcamp.Game.prototype = {
	create: function() {
		this.physics.startSystem(Phaser.Physics.ARCADE);

		Phaser.Canvas.setSmoothingEnabled(this.game.context, false);
<<<<<<< HEAD
=======

>>>>>>> efbb0508a5dba4495ae15cb2de0b57ed69296534

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
=======

>>>>>>> efbb0508a5dba4495ae15cb2de0b57ed69296534
		var platforms = this.add.group();
		platforms.enableBody = true;


		var steel = platforms.create(0,0, 'steel');
		steel.scale.setTo(0.5);
		//steel.body.immovable = true;

<<<<<<< HEAD
=======


>>>>>>> efbb0508a5dba4495ae15cb2de0b57ed69296534
		var platforms = this.add.group();
		platforms.enableBody = true;

<<<<<<< HEAD
=======



>>>>>>> efbb0508a5dba4495ae15cb2de0b57ed69296534
		//create random platforms
		for(i = _HEIGHT/100; i < _HEIGHT;){

			for( w=_WIDTH/100; w < _WIDTH; ){

				var steel = platforms.create(w,i, 'steel');
				steel.scale.setTo(0.5);

<<<<<<< HEAD
				//this.steel.body.immovable = true;
=======

				this.steel.body.immovable = true;


				//this.steel.body.immovable = true;

>>>>>>> efbb0508a5dba4495ae15cb2de0b57ed69296534
				steel.body.bounce.y = 0;
    		steel.body.allowGravity = false;
    		steel.body.collideWorldBounds = true;
				i +=0.5;
				w +=20;

<<<<<<< HEAD
				i +=1.5;
				w +=22;
=======

				i +=1.5;
				w +=22;

>>>>>>> efbb0508a5dba4495ae15cb2de0b57ed69296534
			};

			i+=15;
		};
		//bootcamp._player = this.player;
		//window.addEventListener("deviceorientation", this.handleOrientation, true);

	},
	update: function() {
		this.physics.arcade.collide(this.player, this.platforms);

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
