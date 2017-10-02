//enemy
function Human(x = 100, y = 100) {
	var self = this;
	//sprite
	this.sprite = game.add.sprite(x, y, "human");
	this.sprite.anchor.set(0.5);
	this.sprite.alpha = 0;
	game.physics.arcade.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.body.collideWorldBounds = true;
	this.sprite.body.velocity = (0, 0);
	this.sprite.health = 100;
	this.sprite.nextFire = 0;
	this.sprite.fireRate = game.rnd.integerInRange(500, 2000);
	this.alphaAnimation = game.add.tween(this.sprite).to({alpha: 1});
	this.alphaAnimation.start();
	//bullets
	this.sprite.bullets = game.add.group();
	this.sprite.bullets.enableBody = true;
	this.sprite.bullets.physicsBodyType = Phaser.Physics.ARCADE;
	this.sprite.bullets.createMultiple(50, "bullet");
	this.sprite.bullets.setAll("checkWorldBounds", true);
	this.sprite.bullets.setAll("outOfBoundsKill", true);
	//fire every second
	this.sprite.fire = function() {
		if (game.time.now > self.sprite.nextFire) {
			self.sprite.nextFire = game.time.now + self.sprite.fireRate;
			var bullet = self.sprite.bullets.getFirstDead();
			bullet.reset(self.sprite.x, self.sprite.y);
			game.physics.arcade.moveToXY(
				bullet,
				GameState.zombies.centerX,
				GameState.zombies.centerY,
				200
			);
		}
	};
	// bullets collision
	this.sprite.checkBulletCollision = function() {
		game.physics.arcade.collide(
			self.sprite.bullets,
			GameState.zombies,
			self.sprite.damageZombie
		);
	};

	this.sprite.damageZombie = function(bullet, zombie) {
		bullet.kill();
		zombie.health -= 10;
		if (zombie.health < 0) {
			zombie.kill();
			GameState.zombies.remove(zombie);
		}
	};
	return this.sprite;
}
