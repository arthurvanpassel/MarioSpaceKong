var bootcamp = {
	_WIDTH: 200,
	_HEIGHT: 200 * (window.innerHeight / window.innerWidth),
    _SCORE: 0,
    _LIVES: 3,
    _LASTSTATE: null,
    _SPACEINVADERSLEVELS: 0,
    _MARIOLEVELS: 0,
};
bootcamp.Boot = function(game) {};
bootcamp.Boot.prototype = {
	preload: function() {
		this.load.image('preloaderBg', 'img/loading-bg.png');
		this.load.image('preloaderBar', 'img/loading-bar.png');
	},
	create: function() {
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.state.start('Preloader');
	}
};
