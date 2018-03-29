bootcamp.GameOver = function(game) {
};
bootcamp.GameOver.prototype = {
	create: function() {
        this.gameover = this.add.sprite(0, 0, 'gameover');
		this.gameover.animations.add('gameoveranime', Phaser.ArrayUtils.numberArray(0, 45), 24, true);
		this.gameover.animations.play('gameoveranime');

			_WIDTH = 200;
			_HEIGHT = 200 * (window.innerHeight / window.innerWidth);

		
        
        this.game.input.onUp.add(this.EndGame, this);
	},
	EndGame: function() {
		this.game.state.start('MainMenu');
	}
};