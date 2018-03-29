bootcamp.Preloader = function(game) {};
bootcamp.Preloader.prototype = {
	preload: function() {

		this.load.spritesheet('kong', 'img/kong.png', 37,38, 6);
		this.load.spritesheet('player', 'img/Mario.png', 17, 27, 7);
		this.load.image('barrel', 'img/barrel.png');
		this.load.spritesheet('tiles', 'img/tiles.png', 16, 16, 20);

		this.load.spritesheet('mainmenuGif', 'img/HomePageSpriteSheet.png', 200, 400, 61);
        this.load.spritesheet('explosionAnim', 'img/explosion.png', 80, 80 , 10)

		this.load.image('steel', 'img/steel.png');
		this.load.image('greenTube', 'img/tube.png');
		this.load.image('button', 'img/button.png');
        
        this.game.load.audio('winningSound', 'audio/dk-a2600_victory.wav');
        this.game.load.audio('walkSound', 'audio/dk-a2600_walk.wav');


	},
	create: function() {
		this.game.state.start('Game');
	}
};
