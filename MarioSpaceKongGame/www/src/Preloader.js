bootcamp.Preloader = function(game) {};
bootcamp.Preloader.prototype = {
	preload: function() {
		
        //SPRITES
        
        this.load.image('player', 'img/player.png');
        this.load.spritesheet('enemy', 'img/enemy-sprites.png', 22, 33)
    },
    
	create: function() {
		this.game.state.start('Game');
	}
};
