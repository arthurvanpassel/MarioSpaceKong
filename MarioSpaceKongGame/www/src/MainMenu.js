bootcamp.MainMenu = function(game) {};
bootcamp.MainMenu.prototype = {
	create: function() {
		this.home = this.add.sprite(0, 0, 'mainmenuGif');
		this.home.animations.add('homeGif', Phaser.ArrayUtils.numberArray(0, 61), 24, true);
		this.home.animations.play('homeGif');

		this.startButton = this.add.button(50, 200, 'button', this.startGame, this, 2, 0, 1);
		//this.startButton.anchor.set(0.5,0);
		//this.startButton.input.useHandCursor = true;

	},
	startGame: function() {
        bootcamp._SCORE = 0;
        bootcamp._LIVES = 3;
		this.game.state.start('Kong');
	}
};