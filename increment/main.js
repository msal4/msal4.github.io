var game = new Phaser.Game(400, 400, Phaser.AUTO, "", {
    preload: preload,
    create: create,
    update: update
});

function preload() {
    game.load.image("player", "assets/images/player.png");
    game.load.image("enemy", "assets/images/enemy.png");
}

var player;
var enemy;

function create() {
    player = game.add.sprite(game.world.centerX, game.world.centerY, "player");
    player.anchor.set(0.5);
    game.physics.arcade.enable(player, Phaser.Physics.ARCADE);
    // game.input.onTap.add(follow, this);
}

function update() {
    if (game.input.mousePointer.isDown) {
        //  400 is the speed it will move towards the mouse
        game.physics.arcade.moveToPointer(player, 400);
        //  if it's overlapping the mouse, don't move any more
        if (
            Phaser.Rectangle.contains(player.body, game.input.x, game.input.y)
        ) {
            player.body.velocity.setTo(0, 0);
        }
    } else {
        player.body.velocity.setTo(0, 0);
    }
}
// function follow() {
//     //  400 is the speed it will move towards the mouse
//     game.physics.arcade.moveToPointer(player, 400);
//     //  if it's overlapping the mouse, don't move any more
//     if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y)) {
//         player.body.velocity.setTo(0, 0);
//     }
// }
