bootcamp.Preloader = function(game) {};
bootcamp.Preloader.prototype = {
	preload: function() {
		
        //BACKGROUND
        this.load.image('background', 'img/bg.png');
        
        //SPRITES
        this.load.spritesheet('player', 'img/ship.png', 52, 55, 2);
        this.load.spritesheet('enemy', 'img/enemies.png', 30, 23);
        this.load.image('bullet', 'img/bullet.png');
        this.load.image('bomb', 'img/bomb.png');
        this.load.spritesheet('explosion', 'img/explosion.png', 80, 80);
    },
    
	create: function() {
		this.game.state.start('Game');
	}
};
