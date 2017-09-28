//player
function Zombie(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = game.add.sprite(this.x, this.y, "zombie");
    this.sprite.anchor.set(0.5);
    this.sprite.health = 100;
    game.physics.arcade.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.collideWorldBounds = true;
    return this.sprite;
}
