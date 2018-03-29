bootcamp.Preloader = function(game) {};
bootcamp.Preloader.prototype = {
	preload: function() {

		this.load.spritesheet('kong', 'img/kong.png', 37,38, 6);
		this.load.spritesheet('player', 'img/Mario.png', 17, 27, 7);
		this.load.image('barrel', 'img/barrel.png');
		this.load.spritesheet('tiles', 'img/tiles.png', 16, 16, 20);

		this.load.spritesheet('mainmenuGif', 'img/HomePageSpriteSheet.png', 200, 400, 61);

		this.load.image('steel', 'img/steel.png');
		this.load.image('greenTube', 'img/greenTube.png');
		this.load.image('button', 'img/button.png');


	},
	create: function() {
		this.game.state.start('Game');
	}
};
