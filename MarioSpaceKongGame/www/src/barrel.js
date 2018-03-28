barrel = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'barrel');
    this.anchor.setTo(0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.gravity.y = 600;
    this.body.collideWorldBounds = true;
    this.barrelMoveLeft = false;
};

barrel.prototype = Object.create(Phaser.Sprite.prototype);
barrel.prototype.constructor = barrel;

/**
 * Automatically called by World.update
 */
barrel.prototype.update = function () {

  if (barrel.body.blocked.right) {
    barrelMoveLeft = true;
  }
  if (barrel.body.blocked.left) {
    barrelMoveLeft = false;
  }
  if (barrelMoveLeft) {
    barrel.body.velocity.x = -75;
  }
  else {
    barrel.body.velocity.x = 75;
  }

  barrel.angle += (barrel.body.velocity.x)/10


  if (barrel.body.blocked.down){
    barrel.destroy();
  }

};
