bootcamp.Space = function(game) {};
bootcamp.Space.prototype = {
    
	create: function() {
		this.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.world.setBounds(0, 0, 200, bootcamp._HEIGHT);
        
        this.levelCompleteVar = 0;
        
        // BACKGROUND
        this.background = this.add.tileSprite(0,0,1000, 500, 'background');
        
        // MARIO
        this.player = this.add.sprite(100, bootcamp._HEIGHT + 55, 'playerS');
        this.player.frame = 1
        this.player.anchor.setTo(0.5, 0.5);
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = false;
        console.log(this.player.body.position.y);
        this.player.body.velocity.y = -200;
        
        // MARIO BULLETS
        this.bullets = this.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(5, 'bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bulletTime = 0;

        // MARIO CONTROLS
        this.cursors = this.input.keyboard.createCursorKeys();
        this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        
        // ENEMIES
        this.createEnemies();
        this.animateEnemies();
        //this.timesToHit = 1;
        console.log("timesToHit42: "+this.timesToHit);
        
        // ENEMY BOMBS
        this.bombs = this.add.group();
        this.bombs.enableBody = true;
        this.bombs.physicsBodyType = Phaser.Physics.ARCADE;
        this.bombs.createMultiple(10, 'bomb');
        this.bombs.setAll('anchor.x', 0.5);
        this.bombs.setAll('anchor.y', 0.5);
        this.bombs.setAll('checkWorldBounds', true);
        this.bombs.setAll('outOfBoundsKill', true);
        
        // POWERUPS
        this.oneUps = this.add.group();
        this.oneUps.enableBody = true;
        this.oneUps.physicsBodyType = Phaser.Physics.ARCADE;
        this.oneUps.createMultiple(10, 'powerUp', [0]);
        this.oneUps.setAll('anchor.x', 0.5);
        this.oneUps.setAll('anchor.y', 0.5);
        this.oneUps.setAll('checkWorldBounds', true);
        this.oneUps.setAll('outOfBoundsKill', true);
        
        this.coins = this.add.group();
        this.coins.enableBody = true;
        this.coins.physicsBodyType = Phaser.Physics.ARCADE;
        this.coins.createMultiple(10, 'powerUp', [1]);
        this.coins.setAll('anchor.x', 0.5);
        this.coins.setAll('anchor.y', 0.5);
        this.coins.setAll('checkWorldBounds', true);
        this.coins.setAll('outOfBoundsKill', true);
        
        // EXPLOSIONS
        this.explosions = this.add.group();
        this.explosions.createMultiple(10, 'explosion');
        this.explosions.setAll('anchor.x', 0.5);
        this.explosions.setAll('anchor.y', 0.5);
        this.explosions.forEach(this.setupExplosion, this);
        
        // SCORES + TEXT
        this.score = this.add.sprite(1, 1, 'stats');
        this.score.frame = 1;
        this.score.fixedToCamera = true;
        this.lives = this.add.sprite(165, 1, 'stats');
        this.lives.frame = 0;

        this.style = {
            font: "9px silkscreen",
            fill: "#fff ",
            align: "left"
        };

        this.scoreText = this.add.text(30, -1, bootcamp._SCORE, this.style);
        this.scoreText.anchor.set(0.5, 0);
        this.scoreText.stroke = '#000000';
        this.scoreText.strokeThickness = 3;
        this.scoreText.fixedToCamera = true;

        this.livesText = this.add.text(195, -1, bootcamp._LIVES, this.style);
        this.livesText.anchor.set(0.5, 0);
        this.livesText.stroke = '#000000';
        this.livesText.strokeThickness = 3;
        this.livesText.fixedToCamera = true;
        
        // ACCELEROMETER
        bootcamp._player = this.player;
		window.addEventListener("deviceorientation", this.handleOrientation, true);

	},
	update: function() {
        //INTRO
        if (this.levelCompleteVar == 0) {
            if(this.player.body.position.y < bootcamp._HEIGHT - 60) {
                this.player.body.position.y = bootcamp._HEIGHT - 60;
                this.player.body.collideWorldBounds = true;
                this.player.body.velocity.y = 0;
            }if(this.player.body.position.y > bootcamp._HEIGHT - 60) {
                this.player.body.velocity.y += 3.5;
            }
        }
            
        //SCROLL BACKGROUND
        this.background.tilePosition.y += 2;
        
        // MOVEMENT
		this.playerMovement();
        
        // PHONE CONTROLS
        if (this.game.input.pointer1.isDown) {
            this.fireBullet();
        }
        
        // FIRE
        if (this.fireButton.isDown) {
            this.fireBullet();
        }
        
        // BOMBS
        this.handleBombs();
        
        // HIT & EXPLODE
        this.physics.arcade.overlap(this.bullets, this.enemies, this.bulletHitsEnemy, null, this);
        this.physics.arcade.overlap(this.bombs, this.player, this.bombHitsPlayer, null, this);
        this.physics.arcade.overlap(this.coins, this.player, this.coinHitsPlayer, null, this);
        this.physics.arcade.overlap(this.oneUps, this.player, this.oneUpHitsplayer, null, this);
        
        //MAX SPEED
        if(this.player.body.velocity.x < -200) {
            this.player.body.velocity.x = -200;
        }else if(this.player.body.velocity.x > 200) {
            this.player.body.velocity.x = 200;
        }
        
        //LEVELCOMPLETE
        if (this.levelCompleteVar) {
            this.player.body.collideWorldBounds = true;
            this.player.body.velocity.y -= 5;
        }
        if (this.player.body.position.y == 0) {
            bootcamp._SPACEINVADERSLEVELS ++;
            this.game.state.start('Mario');
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
        if (this.time.now > this.bulletTime) {
            this.bullet = this.bullets.getFirstExists(false);
            // HAS A BULLET BEEN FIRED RECENTLY
            
            if (this.bullet && this.player.alive) {
                // NO? THEN FIRE
                this.bullet.reset(this.player.x, this.player.y - 16);
                this.bullet.body.velocity.y = -400;
                this.bullet.body.velocity.x = this.player.body.velocity.x / 4
                this.bulletTime = this.time.now + 400;
            }
        }
    },
    
    createEnemies: function() {
        this.enemies = this.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
        
        if (bootcamp._SPACEINVADERSLEVELS == 1) {
            for (var y = 0; y < 1; y++) {
                for (var x = 0; x < 6; x++) {
                    var enemy = this.enemies.create(x * 32, y * 25, 'enemyS');
                    enemy.anchor.setTo(0.5, 0.5);
                    enemy.body.moves = false;
                }
            }

            this.enemies.x = 16;
            this.enemies.y = 28;
        }
        
        if (bootcamp._SPACEINVADERSLEVELS == 2) {
            for (var y = 0; y < 3; y++) {
                for (var x = 0; x < 6; x++) {
                    if (x == 2 || x == 3) {
                        var enemy = this.enemies.create(x * 32, y * 25, 'enemyS');
                        enemy.anchor.setTo(0.5, 0.5);
                        enemy.body.moves = false;
                    }
                }
            }

            this.enemies.x = 16;
            this.enemies.y = 28;
        }
        
        if (bootcamp._SPACEINVADERSLEVELS == 0) {
            for (var y = 0; y < 1; y++) {
                for (var x = 0; x < 2; x++) {
                    if (x == 1) {
                        this.timesToHit = 5;
                        console.log("timesToHit237: "+this.timesToHit);
                        var bowser = this.enemies.create(x * 67, y * 97, 'bowser');
                        bowser.anchor.setTo(0.5, 0.5);
                        bowser.body.moves = false;
                        bowser.animations.add('bowserLive', [0, 1, 2, 3, 4], 8, true);
                        bowser.animations.add('bowserDead', [5,6], 8, true);
                        bowser.animations.play('bowserLive');
                    }
                }
            }

            this.enemies.x = 16;
            this.enemies.y = 50;
        }
        
    },
    
    animateEnemies: function() {
        // LET THE ENEMIES MOVE
        var tween = this.add.tween(this.enemies).to( { x: 30}, 3000, Phaser.Easing.Quintic.InOut, true, 0, 1000, true);
        
        // When the tween loops it calls descend
        //tween.onLoop.add(this.descend, this);
    },
    
    /* descend: function() {
        if (this.player.alive) {
        //enemies.y += 8;
        this.add.tween(this.enemies).to( { y: this.enemies.y + 100 }, 3000, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
    }, */
    
    bulletHitsEnemy: function(bullet, enemy) {
        bullet.kill();
        this.dropItem(enemy);
        
        this.timesToHit --;
        console.log("timesToHit271: " +this.timesToHit);
        
        if (bootcamp._SPACEINVADERSLEVELS == 0) {
            enemy.animations.play('bowserDead');
            setTimeout(function () {
                enemy.animations.play('bowserLive');
            }, 500);
            
        }
        
        if (this.timesToHit == 0) {
            this.explode(enemy);
            this.timesToHit = 1;
        }
        else {
            //animate a hit
            
        }
        
        

        if (this.enemies.countLiving() == 0) {
            // LEVEL KLAAR
            console.log("KLAAR")
            this.levelCompleteVar = 1;
        }
    },
    
    dropBomb: function(enemy) {
        bomb = this.bombs.getFirstExists(false);

        if (bomb && this.player.alive) {
            //bombSound.play();
            // And drop it
            bomb.reset(enemy.x + this.enemies.x, enemy.y + this.enemies.y + 16);
            bomb.body.velocity.y = +100;
            bomb.body.gravity.y = 250
        }
    },
    
    dropItem: function(enemy) {
        if (this.player.alive) {
            chanceOfDroppingOneUp = this.rnd.integerInRange(0, 2);
            chanceOfDroppingCoin = this.rnd.integerInRange(0, 2);
            if (chanceOfDroppingCoin == 0) {
                console.log("COIN");
                coin = this.coins.getFirstExists(false);
                coin.reset(enemy.x + this.enemies.x, enemy.y + this.enemies.y + 16);
                coin.body.velocity.y = +100;
                coin.body.gravity.y = 75
            }
            if (chanceOfDroppingOneUp == 0 && chanceOfDroppingCoin != 0 && this.timesToHit == 1) {
                console.log("1UP");        
                oneUp = this.oneUps.getFirstExists(false);
                oneUp.reset(enemy.x + this.enemies.x, enemy.y + this.enemies.y + 16);
                oneUp.body.velocity.y = +100;
                oneUp.body.gravity.y = 75
            }
        }
    },
    
    oneUpHitsplayer: function(player, oneUp) {
        oneUp.kill();
        console.log("oneuphitsplayer");
        bootcamp._LIVES += 1;
        this.livesText.text = bootcamp._LIVES;
    },
    
    coinHitsPlayer: function(player, coin) {
        coin.kill();
        console.log("coinhitsplayer");
        bootcamp._SCORE += 1;
        this.scoreText.text = bootcamp._SCORE;
    },
    
    handleBombs: function() {
        this.enemies.forEachAlive(function (enemy) {
            chanceOfDroppingBomb = this.rnd.integerInRange(0, 50 * this.enemies.countLiving());
            if (chanceOfDroppingBomb == 0) {
                this.dropBomb(enemy);
                console.log("bom");
            }
        }, this)
    },
    
    bombHitsPlayer: function(bomb, player) {
        bomb.kill();
        this.explode(player);
        bootcamp._LIVES -= 1;
        this.livesText.text = bootcamp._LIVES;
        if (bootcamp._LIVES > 0) {
             this.respawnPlayer(this.player);
         }
        else {
            this.gameOver();
        }
    },
    
    respawnPlayer: function(player) {
        this.player.body.x = this.game.world.centerX;
        setTimeout(function () {
            console.log("DOOD")
            player.revive();
        }, 1000);
    },
    
    gameOver: function() {
        setTimeout(function() {
            gameOverText = this.add.text(this.world.centerX, this.world.centerY, "GAME OVER", this.style);
            gameOverText.anchor.set(0.5, 0.5);
            restartText = this.add.text(this.world.centerX, this.world.height - 16, "PRESS 'SPACE' TO RESTART", style);
            restartText.anchor.set(0.5, 1);
        }, 1000);
    },
    
    setupExplosion: function(explosion) {
           explosion.animations.add('explode');
    },
    
    explode: function(entity) {
        entity.kill();

        // And create an explosion :)
        //explodeSound.play();
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(entity.body.x + (entity.width / 2), entity.body.y + (entity.height / 2));
        explosion.play('explode', 30, false, true);
    },
    
	handleOrientation: function(e) {
		// Device Orientation API
		var x = e.gamma; // range [-90,90], left-right
		var y = e.beta;  // range [-180,180], top-bottom
		var z = e.alpha; // range [0,360], up-down
		bootcamp._player.body.velocity.x += 10*x;
        
        // PLAYER MOVEMENT
        var maxVelocity = 200;
        
        if (x<0 && this.player.body.velocity.x > -maxVelocity) {
            // Move to the left
            this.player.body.velocity.x -= 5;
        }
        else if (x>=0 && this.player.body.velocity.x < maxVelocity) {
            // Move to the right
            this.player.body.velocity.x += 5;
        }
        else {
            // Stop
            this.player.body.velocity.x = 0 ;
        }
	}
};