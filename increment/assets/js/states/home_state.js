var HomeState = {
	init: function(message, score) {
		this.message = message;
		this.score = score;
	},
	create: function() {
		var scoreStyle = {font: "bold 50px Arial", fill: "#8B2323"};
		var homeStyle = {font: "bold 30px Arial", fill: "#4B4A4A"};
		if (this.message) {
			this.game.stage.backgroundColor = "#DA7773";
			homeStyle.fill = "#D0BA97";
			this.messageText = this.game.add.text(
				game.world.centerX,
				this.game.world.centerY - 100,
				this.message,
				scoreStyle
			);
			this.scoreText = this.game.add.text(
				game.world.centerX,
				this.game.world.centerY,
				this.score,
				scoreStyle
			);
			this.messageText.anchor.set(0.5);
			this.scoreText.anchor.set(0.5);
		}

		this.homeText = this.game.add.text(
			game.world.centerX,
			this.game.world.height - 100,
			"TAP TO START",
			homeStyle
		);
		this.homeText.anchor.set(0.5);
		this.game.input.onTap.add(this.startGame, this);
	},
	startGame: function() {
		this.game.state.start("GameState");
	}
};
