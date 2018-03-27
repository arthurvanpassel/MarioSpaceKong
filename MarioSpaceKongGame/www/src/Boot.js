var bootcamp = {
	_WIDTH: window.innerWidth * window.devicePixelRatio,
	_HEIGHT: window.innerHeight * window.devicePixelRatio
};
bootcamp.Boot = function(game) {};
bootcamp.Boot.prototype = {
	preload: function() {
	},
	create: function() {
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.state.start('Preloader');
	}
};
