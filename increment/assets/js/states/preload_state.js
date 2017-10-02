var PreloadState = {
    preload: function() {
        //logo
        this.logo = this.game.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            "logo"
        );
        this.logo.anchor.set(0.5);
        this.logo.scale.set(2);
        //loading bar
        this.preloadBar = this.game.add.sprite(
            0,
            this.game.world.height - 100,
            "bar"
        );
        this.preloadBar.width = this.game.world.width / 2;
        this.preloadBar.x = this.game.world.centerX - this.preloadBar.width / 2;
        this.load.setPreloadSprite(this.preloadBar);

        this.load.image("zombie", "assets/images/player.png");
        this.load.image("human", "assets/images/enemy.png");
        this.load.image("bullet", "assets/images/bullet.png");
        this.load.image("zombieHeart", "assets/images/zombieHeart.png");
    },
    create: function() {
        this.game.state.start("HomeState");
    }
};
