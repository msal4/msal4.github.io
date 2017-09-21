function Mario(x, y, gravity, jumpForce, speed) {
    this.x = x;
    this.y = y;
    this.gravity = gravity;
    this.jumpForce = jumpForce;
    this.speed = speed;
    //create sprite
    this.sprite = game.add.sprite(this.x, this.y, "marioSmall", 0);
    //enable physics
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.gravity.y = this.gravity;
    //add keys
    var cursors = game.input.keyboard.createCursorKeys();
    //check for input
    this.checkInput = function() {
        if (cursors.up.isDown && !this.sprite.body.touching.down) {
            console.log("works");
            this.sprite.body.velocity.y -= jumpForce;
        }
    };
}
