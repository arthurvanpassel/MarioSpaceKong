Barrel = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'barrel');
    this.anchor.setTo(0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.gravity.y = 600;
    this.body.collideWorldBounds = true;
    this.barrelMoveLeft = false;
};

Barrel.prototype = Object.create(Phaser.Sprite.prototype);
Barrel.prototype.constructor = Barrel;

/**
 * Automatically called by World.update
 */
Barrel.prototype.update = function () {

  if (this.body.blocked.right) {
    barrelMoveLeft = true;
  }
  if (this.body.blocked.left) {
    barrelMoveLeft = false;
  }
  if (barrelMoveLeft) {
    this.body.velocity.x = -75;
  }
  else {
    this.body.velocity.x = 75;
  }

  this.angle += (this.body.velocity.x)/10


  if (this.body.blocked.down){
    this.kill();
  }

};
