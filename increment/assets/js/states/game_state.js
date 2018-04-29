var GameState = {
	create: function() {
		this.score = 0;
		this.game.stage.backgroundColor = "#34495e";

		//create zombie
		this.zombies = this.game.add.group();
		this.zombies.add(
			new Zombie(this.game.world.centerX, this.game.world.centerY)
		);

		//create a human every 2 secs
		this.humans = this.game.add.group();
		game.time.events.loop(
			Phaser.Timer.SECOND * 2,
			function() {
				var x = game.rnd.integerInRange(0, game.world.width);
				var y = game.rnd.integerInRange(0, game.world.height);
				this.humans.add(new Human(x, y));
			},
			this
		);

		var style = {font: "bold 20px Arial", fill: "#99f0f8"};
		//health stat
		this.game.add.sprite(0, 0, "zombieHeart").scale.set(0.7);
		this.zombiesHealthtext = this.game.add.text(
			35,
			7,
			this.totalHealth + "%",
			style
		);
		//zombie count
		this.game.add.sprite(100, 8, "zombie").scale.set(1.2);
		this.zombiesCountText = this.game.add.text(
			130,
			7,
			this.zombies.length,
			style
		);
	},
	update: function() {
		this.humans.forEach(function(human) {
			human.checkBulletCollision();
			human.fire();
		});
		this.zombies.forEach(function(zombie) {
			zombie.checkInput();
		}, this);
		this.game.physics.arcade.collide(this.zombies, this.zombies);
		this.game.physics.arcade.collide(
			this.zombies,
			this.humans,
			this.turnHuman
		);
		//update stat
		this.updateZombiesStat();
	},
	turnHuman: function(zombie, human) {
		//decrease human health
		game.time.events.add(
			Phaser.Timer.SECOND * 2,
			function() {
				human.health -= 10;
			},
			this
		);
		//spawn zombie instead of human
		if (human.health < 0) {
			GameState.zombies.add(
				new Zombie(human.position.x, human.position.y)
			);
			human.kill();
			GameState.humans.remove(human);
			GameState.score++;
		}
	},
	updateZombiesStat: function() {
		//health
		var tempHealth = 0; //temporary health holder
		this.zombies.forEach(function(zombie) {
			tempHealth += zombie.health;
			zombie.alpha = zombie.health / 100;
		}, this);
		this.totalHealth = tempHealth / this.zombies.length;
		this.zombiesHealthtext.text = Math.round(this.totalHealth) + "%";
		if (!this.totalHealth || this.totalHealth < 0) {
			this.zombiesHealthtext.text = "Zombies are Exterminated";
			this.game.state.start(
				"HomeState",
				true,
				false,
				"GameOver!",
				this.score
			);
		}
		//count
		this.zombiesCountText.text = this.zombies.length;
	}
};
