bootcamp.Preloader = function(game) {};
bootcamp.Preloader.prototype = {
	preload: function() {
		this.preloadBg = this.add.sprite((bootcamp._WIDTH-297)*0.5, (bootcamp._HEIGHT-145)*0.5, 'preloaderBg');
		this.preloadBar = this.add.sprite((bootcamp._WIDTH-158)*0.5, (bootcamp._HEIGHT-50)*0.5, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);


		this.load.spritesheet('player', 'img/Mario.png', 17, 27, 7);
		this.load.spritesheet('barrel', 'img/barrel.png', 150, 100, 2);

		this.load.image('title', 'img/title.png');
		this.load.image('screen-mainmenu', 'img/screen-mainmenu.png');
		this.load.image('screen-howtoplay', 'img/screen-howtoplay.png');
		this.load.image('steel', 'img/steel.png');

		this.load.spritesheet('button-start', 'img/button-start.png', 146, 51);
	},
	create: function() {
		this.game.state.start('Game');
	}
};
