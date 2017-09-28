//enemy
function Human(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = game.add.sprite(this.x, this.y, "human");
    this.sprite.anchor.set(0.5);
    this.sprite.alpha = 0;
    game.physics.arcade.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.velocity = (0, 0);
    this.sprite.health = 100;
    this.alphaAnimation = game.add.tween(this.sprite).to({alpha: 1});
    this.alphaAnimation.start();
    return this.sprite;
}
