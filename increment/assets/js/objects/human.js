//enemy
function Human(x, y) {
    this.x = x;
    this.y = y;
    this.health = 100;
    this.sprite = game.add.sprite(this.x, this.x, "human");
    this.sprite.anchor.set(0.5);
    game.physics.arcade.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.velocity = (0, 0);
    return this.sprite;
}
