bootcamp.Preloader = function(game) {};
bootcamp.Preloader.prototype = {
	preload: function() {
		
        //SPRITES
        
        this.load.spritesheet('player', 'img/ship.png', 52, 57, 2);
        this.load.spritesheet('enemy', 'img/enemy-sprites.png', 22, 33);
        this.load.image('bullet', 'img/bullet.png');
        this.load.image('bomb', 'img/bomb.png');
        this.load.spritesheet('explosion', 'img/explosion.png', 80, 80);
    },
    
	create: function() {
		this.game.state.start('Game');
	}
};
