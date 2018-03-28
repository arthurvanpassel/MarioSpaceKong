Enemy = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'enemy');
    this.animations.add('walk', [0, 1], 5, true);
    this.animations.play('walk');
    this.anchor.setTo(0.5, 0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.xSpeed = -1;
    this.body.gravity.y = 600;
    this.body.collideWorldBounds = true;
    this.walking = false;
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

/**
 * Automatically called by World.update
 */
Enemy.prototype.update = function () {

    if(this.body.position.x < this.game.camera.x + 200) {
        this.walking = true;
    }
    if(this.walking) {
        this.body.position.x += this.xSpeed;
    }

    if(this.xSpeed < 0) {
        this.body.scale = 1;
    }else {
        this.body.scale = -1;
    }

    if(this.body.blocked.left) {
        this.xSpeed = -1;
    }else if (this.body.blocked.right) {
        this.xSpeed = 1;
    }

};
