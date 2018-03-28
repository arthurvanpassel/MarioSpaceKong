var platforms, barrels, barrel;
var barrelCount = 0;
var barrelMoveLeft = false;
var barrelTimer = 0;
var steel;


bootcamp.Game = function(game) {};
bootcamp.Game.prototype = {
	create: function() {
		this.physics.startSystem(Phaser.Physics.ARCADE);

		Phaser.Canvas.setSmoothingEnabled(this.game.context, false);

		_WIDTH = 200;
		_HEIGHT = 200 * (window.innerHeight / window.innerWidth);
		this.kong = this.add.sprite(0,10, 'kong');
		this.kong.animations.add('donkey', [0,1,2,3,4,5], 10,true);
		this.kong.animations.play('donkey');


		// player
		this.player = this.add.sprite(_WIDTH -20, _HEIGHT -75, 'player');
		this.player.scale.setTo(-1, 1);
		this.player.smoothed = false;
		this.player.anchor.set(0.5);
		this.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.player.body.setCircle(13);
		this.player.body.mass = 50;
		this.player.body.collideWorldBounds = true;


		this.game.physics.arcade.TILE_BIAS = 32;
		this.game.physics.arcade.gravity.y = 400;

		this.player.animations.add('idle', [0], 1, true);
    	this.player.animations.add('walk', [1,2, 3, 4], 10, true);
		this.player.animations.add('jump', [6], 1, true);

		controls = {
      			left: this.input.keyboard.addKey(Phaser.Keyboard.Q),
      			right: this.input.keyboard.addKey(Phaser.Keyboard.D),
      			up: this.input.keyboard.addKey(Phaser.Keyboard.Z)
    			};
		bootcamp._player = this.player;
		window.addEventListener("deviceorientation", this.handleOrientation, true);

//barrels----------------------------------------------------------------------------------------------------------
		this.barrels = this.add.group();
	
//platforms----------------------------------------------------------------------------------------------------------
		platforms = this.add.group();
		platforms.physicsBodyType = Phaser.Physics.ARCADE;
		platforms.enableBody = true;
		platforms.setAll('body.allowGravity', false);

		//create random platforms
		var holeRight = true;
		var startposition = _WIDTH;
		var endposition = _WIDTH;
		for(i = (_HEIGHT/100)+45; i < (_HEIGHT) - 10;){
			if (holeRight) {
				startposition = _WIDTH/100;
				endposition = _WIDTH-50;
			}
			else {
				startposition =(_WIDTH/100)+30;
				endposition = _WIDTH;
			}
			if (i > (_HEIGHT)-50) {
				startposition = _WIDTH/100;
				endposition = _WIDTH-50;
			}

			for( w=startposition; w < endposition; ){
					steel = platforms.create(w,i, 'steel');

					steel.scale.setTo(0.5);
					steel.body.immovable = true;
					this.physics.enable(steel, Phaser.Physics.ARCADE);
					steel.body.allowGravity = false;
					//steel.body.friction = 0.5;
					steel.body.width = 24;
					steel.body.height = 16;
					if (i > (_HEIGHT)-50) {
                        steel.name = 'lowestSteel';
					}
					else {
						if (holeRight) {
							i +=0.5;
						}
						else {
							i -=0.5;
						}
					}
					w +=15;
		}

		i +=70;
		holeRight = !holeRight;
		};
        
	},
	update: function() {
		var hitplatform = this.physics.arcade.collide(this.player, platforms);
		this.physics.arcade.collide(this.barrels, platforms);

		//-----PLAYER-MOVEMENT-------------------------------------------------------------
		this.player.body.velocity.x = 0;
		//this.barrel.body.velocity.x = 0;

		if(controls.left.isDown) {
			this.player.body.velocity.x -= 150;
			this.player.scale.setTo(-1, 1);
		}
		else if(controls.right.isDown) {
			this.player.body.velocity.x += 150;
			this.player.scale.setTo(1, 1);
		}
		if (controls.up.isDown && ( this.player.body.touching.down || this.player.body.blocked.down)) {
			this.player.body.velocity.y -= 300;
		}
		if (this.game.input.pointer1.isDown && this.player.body.touching.down && hitplatform) {
			this.player.body.velocity.y -= 300;
		}

		if (this.player.body.blocked.down || hitplatform || this.player.body.touching.down ) {
			if (this.player.body.velocity.x >= 0 ) {
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




		bootcamp._game = this.game;
		this.physics.arcade.collide(this.player, this.barrels, function() {
			console.log('death');
		});

		

		if (this.game.time.now > barrelTimer) {
			var barrel = new Barrel(this.game,0,0);
            barrel.name = "barrel" + barrelCount ;
			this.barrels.add(barrel);
			barrelCount++;
			barrelTimer = this.game.time.now + 3000;
		};

 		

		this.physics.arcade.collide(barrel, platforms, this.loweSteelcollide );

    


	},
	handleOrientation: function(e) {
		// Device Orientation API
		var x = e.gamma; // range [-90,90], left-right
		var y = e.beta;  // range [-180,180], top-bottom
		var z = e.alpha; // range [0,360], up-down
		bootcamp._player.body.velocity.x += x;
		bootcamp._player.body.velocity.y += y*0.5;
	},
	loweSteelcollide: function(){ 
		console.log("fuckers");
		if(steel.name === 'lowestSteel'){

			
			console.log("killl alllll barrels fuckers");
		};
	},

};
