var platforms;
var barrels;
var barrel;
var barrelCount = 0;
var barrelMoveLeft = false;
var barrelTimer = 0;
var steel;

bootcamp.Game = function(game) {};
bootcamp.Game.prototype = {
	create: function() {
		this.physics.startSystem(Phaser.Physics.ARCADE); 
        
        //kong-----------------------------------------------------------------------------------------
		this.kong = this.add.sprite(0,10, 'kong');
		this.kong.animations.add('donkey', [0,1,2,3,4,5], 10,true);
		this.kong.animations.play('donkey');

		// player-----------------------------------------------------------------------------------------
		this.player = this.add.sprite(bootcamp._WIDTH -20, bootcamp._HEIGHT -75, 'player');
		this.player.scale.setTo(-1, 1);
		this.player.smoothed = false;
		this.player.anchor.set(0.5);
		this.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.player.body.setCircle(13);
		this.player.body.mass = 50;
		this.player.body.collideWorldBounds = true;

        //physics-----------------------------------------------------------------------------------------
		this.game.physics.arcade.TILE_BIAS = 32;
		this.game.physics.arcade.gravity.y = 400;

        //animations-----------------------------------------------------------------------------------------
		this.player.animations.add('idle', [0], 1, true);
    	this.player.animations.add('walk', [1,2, 3, 4], 10, true);
		this.player.animations.add('jump', [6], 1, true);

        //controls-----------------------------------------------------------------------------------------
		controls = {
      			left: this.input.keyboard.addKey(Phaser.Keyboard.Q),
      			right: this.input.keyboard.addKey(Phaser.Keyboard.D),
      			up: this.input.keyboard.addKey(Phaser.Keyboard.Z)
    			};
        
		bootcamp._player = this.player;
		window.addEventListener("deviceorientation", this.handleOrientation, true);

        //barrels-----------------------------------------------------------------------------------------
		this.barrels = this.add.group();
	
        //platforms-----------------------------------------------------------------------------------------
		this.platforms = this.add.group();
		this.platforms.physicsBodyType = Phaser.Physics.ARCADE;
		this.platforms.enableBody = true;
		this.platforms.setAll('body.allowGravity', false);
		//bottoms 
		this.Bottoms = this.add.group();
		this.Bottoms.physicsBodyType = Phaser.Physics.ARCADE;
		this.Bottoms.enableBody = true;
		this.Bottoms.setAll('body.allowGravity', false);

		//create random platforms-----------------------------------------------------------------------------------------
		var holeRight = true;
		var startposition = bootcamp._WIDTH;
		var endposition = bootcamp._WIDTH;
		for(i = (bootcamp._HEIGHT/100)+45; i < (bootcamp._HEIGHT) - 10;){
			if (holeRight) {
				startposition = bootcamp._WIDTH/100;
				endposition = bootcamp._WIDTH-50;
			}
			else {
				startposition =(bootcamp._WIDTH/100)+30;
				endposition = bootcamp._WIDTH;
			}
			if (i > (bootcamp._HEIGHT)-50) {
				startposition = bootcamp._WIDTH/100;
				endposition = bootcamp._WIDTH;
			}

			for( w=startposition; w < endposition; ){
					
					if (i > (bootcamp._HEIGHT)-50) {
					steel = this.Bottoms.create(w,i, 'steel');

					steel.scale.setTo(0.5);
					steel.body.immovable = true;
					this.physics.enable(steel, Phaser.Physics.ARCADE);
					steel.body.allowGravity = false;
					//steel.body.friction = 0.5;
					steel.body.width = 24;
					steel.body.height = 16;
					}
					else {
                        steel = this.platforms.create(w,i, 'steel');

						steel.scale.setTo(0.5);
						steel.body.immovable = true;
						this.physics.enable(steel, Phaser.Physics.ARCADE);
						steel.body.allowGravity = false;
						//steel.body.friction = 0.5;
						steel.body.width = 24;
						steel.body.height = 16;
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
        //collide-----------------------------------------------------------------------------------------
		var hitplatform = this.physics.arcade.collide(this.player, this.platforms);
		this.physics.arcade.collide(this.barrels, this.platforms, this.collideBarrelPlatform, null, this);

		//player movement-----------------------------------------------------------------------------------------

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

		//barrel movement-----------------------------------------------------------------------------------------
		bootcamp._game = this.game;
		this.physics.arcade.collide(this.player, this.barrels, function() {
			console.log('death');
		});

		this.physics.arcade.collide(this.barrels, this.Bottoms, function(){
			this.barrels.kill();
		});


		//create barrel-----------------------------------------------------------------------------------------
        if (this.game.time.now > barrelTimer) {
			var barrel = new Barrel(this.game,0,0);
            barrel.name = "barrel" + barrelCount ;
			this.barrels.add(barrel);
			barrelCount++;
			barrelTimer = this.game.time.now + 3000;
		};
	},
	
	handleOrientation: function(e) {
		// Device Orientation API
		var x = e.gamma; // range [-90,90], left-right
		var y = e.beta;  // range [-180,180], top-bottom
		var z = e.alpha; // range [0,360], up-down
        bootcamp._player.body.velocity.x += 5*x;
	},
	collideBarrelPlatform: function(steel, barrel){ 
		if(steel.name == 'steelLow'){
			console.log('blabla');
		};
	},

};
