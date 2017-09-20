// Flappy Rock
var game = new Phaser.Game(360, 640, Phaser.AUTO, "", {
    preload: preload,
    create: create,
    update: update
});

var background;
var player;
var pipes;
var pipesManager = [];
// start screen
var playBtnDefault;
var gameStarted = false;
// score
var score = 0;
scoreAv = 1;
var scoreText;
// game over
var gameOverText;
var timesPlayed = 0;

function preload() {
    game.load.image("background", "assets/images/background1.png");
    game.load.image("player", "assets/images/player2.png");
    game.load.image("pipe1", "assets/images/pipe1.png");
    game.load.image("pipe2", "assets/images/pipe2.png");
    game.load.image("play_default", "assets/images/play_default.png");
    game.load.image("play_active", "assets/images/play_active.png");
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
    startScreen();
    showScore();
}

function update() {
    if (gameStarted) {
        checkCollision();
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
    var pipeUp = pipes.create(500, game.world.height + 100, "pipe1");
    pipeUp.anchor.setTo(0, 0.5);
    // Down
    var pipeDown = pipes.create(500, -100, "pipe2");
    pipeDown.anchor.setTo(0, 0.5);

    pipes.forEachAlive(function(element) {
        element.body.velocity.x -= 200;
    });
    pipes.centerY = Math.random() * 500 + 50;
    pipesManager.push(pipes);
}
function startScreen() {
    // Default state
    playBtnDefault = game.add.sprite(
        game.world.centerX,
        game.world.centerY,
        "play_default"
    );
    playBtnDefault.anchor.setTo(0.5);
    playBtnDefault.inputEnabled = true;
    playBtnDefault.events.onInputDown.add(startGame, this);
}

function startGame() {
    scoreAv = 0;
    score = 0;
    scoreText.text = score;
    if (timesPlayed > 0) gameOverText.kill();
    timesPlayed++;

    gameStarted = true;

    var startAnimation = game.add.tween(playBtnDefault);
    startAnimation.to({ alpha: 0, y: 600 }, 100);
    startAnimation.start();
    startAnimation.onComplete.add(function() {
        playBtnDefault.visible = false;
    });

    // Add the player and set its properties
    player = game.add.sprite(100, 200, "player");
    player.scale.setTo(0.3);
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
function checkCollision() {
    if (pipes.centerX < -50) {
        spawnPipes();
        removePipes();
    }
    if (game.physics.arcade.collide(player, pipes)) {
        gameOver();
    }
}

function gameOver() {
    gameOverText = game.add.text(
        game.world.centerX,
        game.world.centerY - 100,
        "Game Over!"
    );

    // Tween animation
    playBtnDefault.visible = true;
    var overAnimation = game.add.tween(playBtnDefault);
    overAnimation.to({ alpha: 1, y: game.world.centerY }, 100);
    overAnimation.start();

    //	Center align
    gameOverText.anchor.set(0.5);
    gameOverText.align = "center";

    //	Font style
    gameOverText.font = "Asap Condensed";
    gameOverText.fontSize = 50;
    gameOverText.fontWeight = "bold";

    gameOverText.fill = "#fff";

    var textAnimation = game.add.tween(gameOverText);
    textAnimation.to({ tint: rgb(255, 100, 100) });
    textAnimation.start();

    // playBtnDefault.visible = true;
    removePipes();
    player.kill();
}
function removePipes() {
    pipesManager[0].children[0].kill();
    pipesManager[0].children[1].kill();
    pipesManager.splice(0, 1);
    scoreAv++;
    score += scoreAv;
    scoreText.text = score;
}
function showScore() {
    scoreText = game.add.text(game.world.centerX, 50, score);

    //	Center align
    scoreText.anchor.set(0.5);
    scoreText.align = "center";

    //	Font style
    scoreText.font = "Asap Condensed";
    scoreText.fontSize = 70;
    scoreText.fontWeight = "bold";

    scoreText.fill = "#476065";
}

function rgb(r, g, b) {
    return (r << 16) | (g << 8) | b;
}
