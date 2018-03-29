bootcamp.Preloader = function(game) {};
bootcamp.Preloader.prototype = {
	preload: function() {
		this.preloadBg = this.add.sprite((bootcamp._WIDTH-297)*0.5, (bootcamp._HEIGHT-145)*0.5, 'preloaderBg');
		this.preloadBar = this.add.sprite((bootcamp._WIDTH-158)*0.5, (bootcamp._HEIGHT-50)*0.5, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
        
        // MARIO ASSETS ///////////////////////////////////////////////////////////////////////////////////////////////////
        this.load.spritesheet('playerM', 'img/Mario.png', 17, 27, 7);
        this.load.spritesheet('bgM', 'img/bgM.png', 516, 434, 8);
        this.load.spritesheet('tilesM', 'img/tiles.png', 16, 16, 20);
        this.load.spritesheet('enemyM', 'img/enemies.png', 16, 16, 3);
        this.load.spritesheet('shipM', 'img/ship.png', 52, 55, 2);
        
        // SPACE INVADERS ASSETS ///////////////////////////////////////////////////////////////////////////////////////////////////
        //BACKGROUND
        this.load.image('background', 'img/bgS.png');
        
        //SPRITES
        this.load.spritesheet('playerS', 'img/ship.png', 52, 55 );
        this.load.spritesheet('enemyS', 'img/ufo.png', 30, 23);
        this.load.spritesheet('bowser', 'img/bowser.png', 67, 97);
        this.load.image('bullet', 'img/bullet.png');
        this.load.image('bomb', 'img/bomb.png');
        this.load.spritesheet('explosion', 'img/explosion.png', 80, 80);
        this.load.spritesheet('powerUp', 'img/objects.png', 16, 16, 2);
        
        // MAIN MENU ///////////////////////////////////////////////////////////////////////////////////////////////////////
        this.load.spritesheet('mainmenuGif', 'img/HomePageSpriteSheet.png', 200, 400, 61);
        this.load.image('button', 'img/button.png');
        
        // SCORE //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this.load.spritesheet('stats', 'img/stats.png', 22, 12, 2);
        
        // SOUNDS  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        this.load.audio('1up', 'aud/1up.wav');
        this.load.audio('coin', 'aud/coin.wav');
        this.load.audio('fireball', 'aud/fireball.wav');
        this.load.audio('lostlife', 'aud/lost_a_life.wav');
        this.load.audio('enemyhit', 'aud/enemyHit.wav');
        this.load.audio('bomb', 'aud/bomb.wav');
        
        // DONKEY KONG ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this.load.spritesheet('kong', 'img/kong.png', 37,38, 6);
		this.load.image('barrel', 'img/barrel.png');

		this.load.spritesheet('mainmenuGif', 'img/HomePageSpriteSheet.png', 200, 400, 61);
		this.load.spritesheet('explosionAnim', 'img/explosion.png', 80, 80 , 10);
		this.load.spritesheet('gameover', 'img/GameOver.png', 200, 400, 45);

		this.load.image('steel', 'img/steel.png');
		this.load.image('greenTube', 'img/tube.png');
        
        this.game.load.audio('winningSound', 'audio/dk-a2600_victory.wav');
        this.game.load.audio('walkSound', 'audio/dk-a2600_walk.wav');
        
        
	},
	create: function() {
		this.game.state.start('MainMenu');
	}
};
