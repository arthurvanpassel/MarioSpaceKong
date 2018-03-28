Barrel = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'barrel');
    this.scale.setTo(0.15, 0.2)
    this.anchor.setTo(0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.gravity.y = 600;
    this.body.collideWorldBounds = true;
    this.barrelMoveLeft = false;

		this.body.friction = 0.1;
	
};

Barrel.prototype = Object.create(Phaser.Sprite.prototype);
Barrel.prototype.constructor = Barrel;

/**
 * Automatically called by World.update
 */
Barrel.prototype.update = function () {

  if (this.body.blocked.right) {
    
    this.body.velocity.x = -75;
  }
  if (this.body.blocked.left) {
  
    this.body.velocity.x = 75;
  }
  

  this.angle += (this.body.velocity.x)/10


  if (this.body.blocked.down){
    this.kill();
  }

};
