bootcamp.MainMenu = function(game) {};
bootcamp.MainMenu.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'screen-mainmenu');

			_WIDTH = 200;
			_HEIGHT = 200 * (window.innerHeight / window.innerWidth);
		
		this.startButton = this.add.button(50, 200, 'button', this.startGame, this, 2, 0, 1);
		//this.startButton.anchor.set(0.5,0);
		//this.startButton.input.useHandCursor = true;

		// button to "read the article"
	},
	startGame: function() {
		this.game.state.start('Game');
	}
};
