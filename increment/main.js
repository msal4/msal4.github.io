var game = new Phaser.Game("100%", "100%", Phaser.AUTO);
game.state.add("BootState", BootState);
game.state.add("PreloadState", PreloadState);
game.state.add("HomeState", HomeState);
game.state.add("GameState", GameState);
game.state.start("BootState");
