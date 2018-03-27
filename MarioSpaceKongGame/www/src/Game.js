bootcamp.Game = function(game) {};
bootcamp.Game.prototype = {
    
	create: function() {
		this.physics.startSystem(Phaser.Physics.ARCADE);

        
        // MARIO
        this.player = this.add.sprite(this.game.world.centerX, 250, 'player');
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
        if (this.time.now > 0) {
        this.bullet = this.bullets.getFirstExists(false);

        if (this.bullet) {
          // And fire it
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
        /*var tween = this.add.tween(this.enemies).to( { x: 30}, 3000, Phaser.Easing.Quintic.InOut, true, 2, 20, true);
        
        // When the tween loops it calls descend
        tween.onLoop.add(this.descend, this);*/
    },
    
    descend: function() {
        if (this.player.alive) {
        //enemies.y += 8;
        this.add.tween(this.enemies).to( { y: this.enemies.y + 1 }, 2500, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
    },
    
    bulletHitsEnemy: function(bullet, enemy) {
        bullet.kill();
        this.explode(enemy);
        //score += 10;
        //updateScore();   

        /*if (enemies.countLiving() == 0) {
        // LEVEL KLAAR
        }*/
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
    
	/* handleOrientation: function(e) {
		// Device Orientation API
		var x = e.gamma; // range [-90,90], left-right
		var y = e.beta;  // range [-180,180], top-bottom
		var z = e.alpha; // range [0,360], up-down
		bootcamp._player.body.velocity.x += x;
		bootcamp._player.body.velocity.y += y*0.5;
	}*/
};
