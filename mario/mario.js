//mario constructor
function Mario(x, y, gravity, jumpForce, speed) {
    this.x = x;
    this.y = y;
    this.gravity = gravity;
    this.jumpForce = jumpForce;
    this.speed = speed;
    var cursors = game.input.keyboard.createCursorKeys();
    //create sprite
    this.sprite = game.add.sprite(this.x, this.y, "marioSmall", 0);
    this.sprite.anchor.setTo(0.5);
    //enable physics
    game.physics.arcade.enable(this.sprite);
    // this.sprite.body.collideWorldBounds = true;
    this.sprite.body.gravity.y = this.gravity;
    //create animation
    this.sprite.animations.add("left", [2, 4, 5], 10, false);
    //check input for movement and jump
    this.checkInput = function() {
        //reset velocity
        this.sprite.body.velocity.x = 0;
        //jump
        if (cursors.up.isDown) {
            this.sprite.animations.frame = 5;
            if (this.sprite.body.touching.down) {
                this.sprite.body.velocity.y = -jumpForce;
            }
        }
        //movement
        if (cursors.left.isDown) {
            this.sprite.body.velocity.x = -speed;
            this.sprite.scale.x = -1;
            if (this.sprite.body.touching.down) {
                this.sprite.animations.play("left");
            }
        } else if (cursors.right.isDown) {
            this.sprite.body.velocity.x = speed;
            this.sprite.scale.x = 1;
            if (this.sprite.body.touching.down) {
                this.sprite.animations.play("left");
            }
        } else if (this.sprite.body.touching.down) {
            this.sprite.animations.stop();
            this.sprite.animations.frame = 0;
        }
    };
}
