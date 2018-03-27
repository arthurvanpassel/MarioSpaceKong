bootcamp.Game = function(game) {};
bootcamp.Game.prototype = {
    
	create: function() {
		this.physics.startSystem(Phaser.Physics.ARCADE);
        
        // MARIO
        this.player = this.add.sprite(this.game.world.centerX, 250, 'player');
        this.player.frame = 1
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
        this.bulletTime = 0;

        // MARIO CONTROLS
        this.cursors = this.input.keyboard.createCursorKeys();
        this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        // ENEMIES
        this.createEnemies();
        this.animateEnemies();
        
        // ENEMY BOMBS
        this.bombs = this.add.group();
        this.bombs.enableBody = true;
        this.bombs.physicsBodyType = Phaser.Physics.ARCADE;
        this.bombs.createMultiple(10, 'bomb');
        this.bombs.setAll('anchor.x', 0.5);
        this.bombs.setAll('anchor.y', 0.5);
        this.bombs.setAll('checkWorldBounds', true);
        this.bombs.setAll('outOfBoundsKill', true);
        
        // EXPLOSIONS
        this.explosions = this.add.group();
        this.explosions.createMultiple(10, 'explosion');
        this.explosions.setAll('anchor.x', 0.5);
        this.explosions.setAll('anchor.y', 0.5);
        this.explosions.forEach(this.setupExplosion, this);
        
        // SCORES + TEXT
        this.lives = 3;
        this.score = 0;
        this.highscore = 0 ;
        this.savedHighScore = 240;
        //Cookies.set('highScore', this.highScore, { expires: '2078-12-31' });
        
        this.style = { font: "9px silkscreen", fill: "#fff ", align: "center" };
        
        this.livesText = this.add.text(this.world.bounds.width - 5, 0, "LIVES: " + this.lives, this.style);
        this.livesText.anchor.set(1, 0);

        this.scoreText = this.add.text(this.world.centerX, 0, '', this.style);
        this.scoreText.anchor.set(0.5, 0);

        this.highScoreText = this.add.text(5, 0, '', this.style);
        this.highScoreText.anchor.set(0, 0);

        this.getHighScore();
        this.updateScore();
        
        // ACCELEROMETER
		window.addEventListener("deviceorientation", this.handleOrientation, true);

	},
	update: function() {
        
        // MOVEMENT
		this.playerMovement();
        
        // FIRE
        if (this.fireButton.isDown) {
            this.fireBullet();
        }
        
        // BOMBS
        this.handleBombs();
        
        // HIT & EXPLODE
        this.physics.arcade.overlap(this.bullets, this.enemies, this.bulletHitsEnemy, null, this);
        this.physics.arcade.overlap(this.bombs, this.player, this.  bombHitsPlayer, null, this);
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
            
            if (this.bullet) {
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
        
        for (var y = 0; y < 3; y++) {
            for (var x = 0; x < 8; x++) {
                var enemy = this.enemies.create(x * 22, y * 33, 'enemy');
                enemy.anchor.setTo(0.5, 0.5);
                enemy.body.moves = false;
            }
        }
        
        this.enemies.x = 10;
        this.enemies.y = 10;
    },
    
    animateEnemies: function() {
        // LETS THE ENEMIES MOVE
        var tween = this.add.tween(this.enemies).to( { x: 30}, 3000, Phaser.Easing.Quintic.InOut, true, 0, 1000, true);
        
        // When the tween loops it calls descend
            console.log("test");
        tween.onLoop.add(this.descend, this);
    },
    
    descend: function() {
        if (this.player.alive) {
        //enemies.y += 8;
        this.add.tween(this.enemies).to( { y: this.enemies.y + 100 }, 3000, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
    },
    
    bulletHitsEnemy: function(bullet, enemy) {
        bullet.kill();
        this.explode(enemy);
        this.score += 10;
        this.updateScore();   

        if (this.enemies.countLiving() == 0) {
            // LEVEL KLAAR
            console.log("KLAAR")
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
        this.lives -= 1;
        this.livesText.text = "LIVES: " + this.lives;
        if (this.lives > 0) {
            this.respawnPlayer();
        }
        else {
            this.gameOver();
        }
    },
    
    respawnPlayer: function() {
        this.player.body.x = this.game.world.centerX;
        setTimeout(function () {
            console.log("DOOD")
            this.player.reset();
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
    
    getHighScore: function() {
        //this.savedHighScore = this.Cookies.get('highScore');
        if (this.savedHighScore != undefined) {
            this.highScore = this.savedHighScore;
        }
    },
    
    updateScore: function() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
        }
        this.scoreText.text = this.pad(this.score, 4);
        this.highScoreText.text = "HIGH: " + this.pad(this.highScore, 4);
    },
    
    pad: function(number, length) {
        var str = '' + number;
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
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
