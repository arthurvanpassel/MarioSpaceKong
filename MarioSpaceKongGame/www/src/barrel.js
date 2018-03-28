barrel = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'barrel');
    this.anchor.setTo(0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.gravity.y = 600;
    this.body.collideWorldBounds = true;
};

barrel.prototype = Object.create(Phaser.Sprite.prototype);
barrel.prototype.constructor = barrel;

/**
 * Automatically called by World.update
 */
barrel.prototype.update = function () {



};
