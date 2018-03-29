var platforms;
var barrels;
var barrel;
var barrelCount = 0;
var barrelMoveLeft = false;
var barrelTimer = 0;
var steel;
var coins;
var gameFinished = false;
var endGamePlayed = false;
var hitplatformEnd = true;
var screenWidth = bootcamp._WIDTH;
var screenHeight = bootcamp._HEIGHT;
var winningSound, walkSound;


bootcamp.Game = function(game) {};
bootcamp.Game.prototype = {
	create: function() {
		bootcamp._this = this;
		this.physics.startSystem(Phaser.Physics.ARCADE);

        //kong-----------------------------------------------------------------------------------------
		this.kong = this.add.sprite(20,30, 'kong');
        this.kong.anchor.setTo(0.5);
        this.physics.enable(this.kong, Phaser.Physics.ARCADE);
        this.kong.body.allowGravity = false;
        this.kong.body.immovable = true;
		this.kong.animations.add('donkey', [0,1,2,3,4,5], 10,true);
		this.kong.animations.play('donkey');

		bootcamp._kong = this.kong;
        bootcamp._explode = this.explode;

		//coins-----------------------------------------------------------------
		this.coins = this.add.group();
		bootcamp._coins = this.coins;
		this.coins.physicsBodyType = Phaser.Physics.ARCADE;
		this.coins.enableBody = true;
		this.coins.setAll('body.allowGravity', false);

		// player-----------------------------------------------------------------------------------------
		this.player = this.add.sprite(bootcamp._WIDTH -25, bootcamp._HEIGHT -60, 'player');
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
        
        //sounds-----------------------------------------------------------------------------------------
        winningSound= this.game.add.audio('winningSound');
        walkSound= this.game.add.audio('walkSound');
        
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

		bootcamp._bottoms = this.Bottoms;
        bootcamp._platforms = this.platforms;

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
						if(w >= 30){
							if(w%4==0){
							this.coinCreator(i,w);
							}
						}
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
        this.beginAnim();
	},
	update: function() {
        //collide-----------------------------------------------------------------------------------------
		var hitplatform = this.physics.arcade.collide(this.player, this.platforms);
        if (hitplatformEnd == true) {
            var hitplatformBottom = this.physics.arcade.collide(this.player, this.Bottoms);
        }        
        this.physics.arcade.collide(this.platforms, this.Bottoms);
		this.physics.arcade.collide(this.barrels, this.platforms, this.collideBarrelPlatform, null, this);
		this.physics.arcade.overlap(this.player, this.coins, this.collisionHandlerCoin, null, this);


        this.physics.arcade.collide(this.player, this.kong, this.finishGame, null, this);

		//player movement-----------------------------------------------------------------------------------------

		if (gameFinished == false) {
			if(controls.left.isDown) {
				this.player.body.velocity.x -= 25;
				this.player.scale.setTo(-1, 1);
			}
			else if(controls.right.isDown) {
				this.player.body.velocity.x += 25;
				this.player.scale.setTo(1, 1);
			} 
			if (controls.up.isDown && ( this.player.body.touching.down || this.player.body.blocked.down)) {
				this.player.body.velocity.y -= 300;
			}
			if (this.game.input.pointer1.isDown && this.player.body.touching.down && ( hitplatform||hitplatformBottom)) {
				this.player.body.velocity.y -= 300;
			}

			if (this.player.body.blocked.down || hitplatform || hitplatformBottom) {
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
		}

		//barrel movement-----------------------------------------------------------------------------------------
		bootcamp._game = this.game;
		this.physics.arcade.collide(this.player, this.barrels, function(player) {
			console.log('death');
			player.kill();
			player.revive();
		});

		this.physics.arcade.collide(this.barrels, this.Bottoms, function(barrel){
			barrel.kill();
		});


		//create barrel-----------------------------------------------------------------------------------------
       
        if ((this.game.time.now > barrelTimer)&& gameFinished===false) {
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
		
		if(bootcamp._player.body.velocity.x > 0){
			bootcamp._player.scale.setTo(-1, 1);
		}
		
	},
	collideBarrelPlatform: function(steel, barrel){
		if(steel.name == 'steelLow'){
			console.log('blabla');
		};
	},
	coinCreator : function(i,w){
		i-=15;
		w++;
		var coin = this.game.add.sprite(w,i, 'tiles');
		coin.animations.add('coin', [17, 18, 19, 18], 10, true);
		coin.animations.play('coin');
		this.physics.enable(coin, Phaser.Physics.ARCADE);
		coin.body.allowGravity = false;
		coin.body.immovable = true;
						
		coin.name = "coin" + i;
		this.coins.add(coin);
	},
	collisionHandlerCoin: function (player, coin) {
        coin.kill();
    },
    beginAnim: function() {
        console.log('begin');
    },
    finishGame: function() {
    
            if (endGamePlayed == false) {

			//bool to remove animation conditions

			gameFinished = true;
			bootcamp._player.animations.play('idle');

			//destroy coins
			bootcamp._coins.destroy();
        
            var explode = this.add.sprite(-15, -10, 'explosionAnim')        
            explode.animations.add('explode', [0,1,2,3,4,5,6,7,8,9], 10, false);
            explode.animations.play('explode');
            setTimeout(function() {
                bootcamp._kong.destroy();
                //set player garvity off and set position/scale
                bootcamp._player.body.allowGravity = false;
                bootcamp._player.scale.setTo(1, 1);
                winningSound.play();

                //allow gravity from platforms and set player animation on walk
                setTimeout(function(){
                    bootcamp._platforms.setAll('body.allowGravity', true);
                    bootcamp._player.animations.play('walk');
                }, 500);
                setTimeout(function(){
                    walkSound.play();
                    bootcamp._player.body.allowGravity = true;
                    bootcamp._game.physics.arcade.gravity.y = 100;

                    setTimeout(function(){
                        bootcamp._game.physics.arcade.gravity.y = 400;
                        var greentube = bootcamp._this.add.sprite(screenWidth, screenHeight-30, 'greenTube');
                        greentube.angle = -90;
                        bootcamp._this.physics.enable(greentube, Phaser.Physics.ARCADE);
                        greentube.body.allowGravity = false;
                        bootcamp._player.body.allowGravity = false;
                        greentube.body.velocity.x -= 50;
                        setTimeout(function() {
                            greentube.body.velocity.x = 0;
                            bootcamp._player.y -= 0.5;
                            bootcamp._player.body.collideWorldBounds = false;
                            bootcamp._player.body.velocity.x += 100;
                            setTimeout(function() {
                                bootcamp._player.body.velocity.x = 0;
                            }, 5000);

                        }, 600);
                    }, 2500);
                }, 2000);
            }, 500);
            endGamePlayed = true;
        }
    }

};
