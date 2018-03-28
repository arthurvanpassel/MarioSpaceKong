bootcamp.Preloader = function(game) {};
bootcamp.Preloader.prototype = {
	preload: function() {
		
        //BACKGROUND
        this.load.image('background', 'img/bg.png');
        
        //SPRITES
        this.load.spritesheet('player', 'img/ship.png', 52, 55 );
        this.load.spritesheet('enemy', 'img/enemies.png', 30, 23);
        this.load.image('bullet', 'img/bullet.png');
        this.load.image('bomb', 'img/bomb.png');
        this.load.spritesheet('explosion', 'img/explosion.png', 80, 80);
        this.load.spritesheet('powerUp', 'img/objects.png', 16, 16, 3);
        
        //SOUNDS
        this.load.audio('1up', 'aud/1up.wav');
        this.load.audio('coin', 'aud/coin.wav');
        this.load.audio('fireball', 'aud/fireball.wav');
        this.load.audio('lostlife', 'aud/lost_a_life.wav');
    },
    
	create: function() {
		this.game.state.start('Game');
	}
};
