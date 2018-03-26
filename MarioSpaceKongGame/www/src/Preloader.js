bootcamp.Preloader = function(game) {};
bootcamp.Preloader.prototype = {
	preload: function() {
		this.preloadBg = this.add.sprite((TestGame._WIDTH-297)*0.5, (TestGame._HEIGHT-145)*0.5, 'preloaderBg');
		this.preloadBar = this.add.sprite((TestGame._WIDTH-158)*0.5, (TestGame._HEIGHT-50)*0.5, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);



		this.load.image('title', 'img/title.png');
		this.load.image('screen-mainmenu', 'img/screen-mainmenu.png');
		this.load.image('screen-howtoplay', 'img/screen-howtoplay.png');
		this.load.image('border-horizontal', 'img/border-horizontal.png');
		this.load.image('border-vertical', 'img/border-vertical.png');

		this.load.spritesheet('button-start', 'img/button-start.png', 146, 51);
	},
	create: function() {
		this.game.state.start('Game');
	}
};
