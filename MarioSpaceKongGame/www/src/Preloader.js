bootcamp.Preloader = function(game) {};
bootcamp.Preloader.prototype = {
	preload: function() {
		
        //SPRITES
        
        this.load.spritesheet('enemy1', 'img/enemy-sprites.png', 15, 16, 6)
    },
    
	create: function() {
		this.game.state.start('Game');
	}
};
