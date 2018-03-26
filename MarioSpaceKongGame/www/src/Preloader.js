bootcamp.Preloader = function(game) {};
bootcamp.Preloader.prototype = {
	preload: function() {
		this.preloadBg = this.add.sprite((TestGame._WIDTH-297)*0.5, (TestGame._HEIGHT-145)*0.5, 'preloaderBg');
		this.preloadBar = this.add.sprite((TestGame._WIDTH-158)*0.5, (TestGame._HEIGHT-50)*0.5, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
        
        //SPRITES
        
        this.load.spritesheet('enemy1', 'img/enemy-sprites.png', 6, 18, )
    },
    
	create: function() {
		this.game.state.start('Game');
	}
};
