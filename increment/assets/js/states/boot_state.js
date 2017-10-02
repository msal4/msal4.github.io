var BootState = {
    init: function() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },
    preload: function() {
        this.load.image("bar", "assets/images/preloadBar.png");
        this.load.image("logo", "assets/images/zombieHeart.png");
    },
    create: function() {
        this.game.stage.backgroundColor = "#fff";
        this.game.state.start("PreloadState");
    }
};
