var game = new Phaser.Game(360, 640, Phaser.AUTO, "", {
    preload: preload,
    create: create,
    update: update
});

var background;
var player;
var pipes;

function preload() {
    game.load.image("background", "assets/images/background1.png");
    game.load.image("player", "assets/images/player1.png");
    game.load.image("pipe1", "assets/images/pipe1.png");
    game.load.image("pipe2", "assets/images/pipe2.png");
}

function create() {
    // Scale to screen size
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // Align to the center
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    // Add background
    background = game.add.sprite(0, -1400, "background");
    background.scale.setTo(11);

    // Add the player and set its properties
    player = game.add.sprite(
        game.world.width / 2,
        game.world.height / 2,
        "player"
    );
    player.scale.setTo(0.5);
    player.anchor.setTo(0.5);
    // Player physics
    game.physics.arcade.enable(player);
    player.body.gravity.y = 1000;
    // Player collision
    player.body.collideWorldBounds = true;
    // Player input
    game.input.onDown.add(jump, this);
    spawnPipes();
}

function update() {
    if (game.physics.arcade.overlap(player, pipes)) {
        gameOver();
    }
    if (pipes.centerX < -50) {
        spawnPipes();
    }
}

function jump() {
    player.body.velocity.y = -500;
}

function spawnPipes() {
    // Make pipes
    pipes = game.add.group();
    pipes.enableBody = true;
    // Up
    var pipeUp = pipes.create(game.world.width, game.world.height, "pipe1");
    pipeUp.anchor.setTo(0, 0.5);
    // Down
    var pipeDown = pipes.create(game.world.width, 0, "pipe2");
    pipeDown.anchor.setTo(0, 0.5);

    pipes.forEachAlive(function(element) {
        element.body.velocity.x -= 200;
    });
}
function gameOver() {
    //Game over code here
}
