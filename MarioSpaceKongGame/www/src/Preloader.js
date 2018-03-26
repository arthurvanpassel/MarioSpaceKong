bootcamp.Preloader = function(game) {};
bootcamp.Preloader.prototype = {
	preload: function() {
		this.preloadBg = this.add.sprite((bootcamp._WIDTH-297)*0.5, (bootcamp._HEIGHT-145)*0.5, 'preloaderBg');
		this.preloadBar = this.add.sprite((bootcamp._WIDTH-158)*0.5, (bootcamp._HEIGHT-50)*0.5, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
        
        // MARIO ASSETS ///////////////////////////////////////////////////////////////////////////////////////////////////
        this.load.spritesheet('player', 'img/Mario.png', 17, 27, 7);
        this.load.spritesheet('bg', 'img/bg.png', 516, 434, 8);
	},
	create: function() {
		this.game.state.start('Game');
	}
};
