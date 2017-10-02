//player
function Zombie(x = 100, y = 100) {
	var self = this;
	//sprite
	this.sprite = game.add.sprite(x, y, "zombie");
	this.sprite.anchor.set(0.5);
	this.sprite.health = 100;
	game.physics.arcade.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.body.collideWorldBounds = true;
	//movement
	this.sprite.checkInput = function() {
		if (game.input.activePointer.isDown) {
			//move zombie
			game.physics.arcade.moveToPointer(self.sprite, 500);
			//if in box reset velocity
			if (
				Phaser.Rectangle.contains(
					self.sprite.body,
					game.input.x,
					game.input.y
				)
			) {
				self.sprite.body.velocity.setTo(0, 0);
			} //end if
		} else {
			self.sprite.body.velocity.setTo(0, 0);
		} //end else
	};
	return this.sprite;
}
