bootcamp.MainMenu = function(game) {};
bootcamp.MainMenu.prototype = {
	create: function() {
		this.home = this.add.sprite(0, 0, 'mainmenuGif');
		this.home.animations.add('homeGif', Phaser.ArrayUtils.numberArray(0, 61), 24, true);
		this.home.animations.play('homeGif');

			_WIDTH = 200;
			_HEIGHT = 200 * (window.innerHeight / window.innerWidth);

		this.startButton = this.add.button(50, 200, 'button', this.startGame, this, 2, 0, 1);
		//this.startButton.anchor.set(0.5,0);
		//this.startButton.input.useHandCursor = true;

	},
	startGame: function() {
		this.game.state.start('Game');
	}
};
