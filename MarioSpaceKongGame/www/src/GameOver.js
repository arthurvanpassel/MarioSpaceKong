bootcamp.GameOver = function(game) {
};
bootcamp.GameOver.prototype = {
	create: function() {
        this.gameover = this.game.add.sprite(0, 0, 'fuck');
		this.gameover.animations.add('gameoveranime');
		this.gameover.animations.play('gameoveranime',50, true);

			_WIDTH = 200;
			_HEIGHT = 200 * (window.innerHeight / window.innerWidth);

		
        
        this.game.input.onUp.add(this.EndGame, this);
	},
	EndGame: function() {
		this.game.state.start('MainMenu');
	}
};