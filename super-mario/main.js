var game = new Phaser.Game(500, 400, Phaser.AUTO, "", {
    preload: preload,
    create: create,
    update: update
});

function preload() {
    game.load.spritesheet(
        "marioSmall",
        "assets/images/marioSmall.png",
        34,
        34,
        6,
        1
    );
    game.load.image("ground", "assets/images/ground.png");
}

var mario;
var ground;
function create() {
    ground = game.add.sprite(0, 370, "ground");
    game.physics.arcade.enable(ground);
    ground.body.immovable = true;
    mario = new Mario(100, 100, 700, 1000, 100);
}

function update() {
    mario.checkInput();
    game.physics.arcade.collide(ground, mario.sprite);
}
