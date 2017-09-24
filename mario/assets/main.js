var game = new Phaser.Game(400, 256, Phaser.AUTO, "", {
    preload: preload,
    create: create,
    update: update
});

function preload() {
    game.load.tilemap(
        "map",
        "assets/maps/map1-1.json",
        null,
        Phaser.Tilemap.TILED_JSON
    );
    game.load.image("tiles", "assets/images/items.png");
    game.load.spritesheet("mario", "assets/images/marioSmall.png", 17, 17, 7);
}

var map;
var layer;
var mario;
var test;
function create() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    map = game.add.tilemap("map");
    map.addTilesetImage("items", "tiles");
    layer = map.createLayer("Capa de Patrones 1");
    layer.resizeWorld();
    map.setCollision(40); //ground
    map.setCollisionBetween(14, 16);
    map.setCollisionBetween(27, 29);
    map.setCollisionBetween(20, 22);
    layer.wrap = true;
    //create instance of mario
    mario = new Mario(32, 0, 1000, 400, 200);
    //camera follow mario
    game.camera.follow(mario.sprite);
    //debug collision
    // layer.debug = true;
}

function update() {
    game.physics.arcade.collide(mario.sprite, layer);
    mario.checkInput();
}
function hitCoinBlock() {
    console.log("auch!");
}
