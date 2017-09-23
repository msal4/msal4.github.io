var game = new Phaser.Game(256, 256, Phaser.AUTO, "", {
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
    game.load.spritesheet("mario", "assets/images/marioSmall.png", 34, 34, 7);
}

var map;
var layer;
var mario;
function create() {
    map = game.add.tilemap("map");
    map.addTilesetImage("items", "tiles");
    layer = map.createLayer("Capa de Patrones 1");
    layer.resizeWorld();
    layer.wrap = true;
    map.setCollision(40);
    mario = new Mario(32, 0, 1000, 500, 300);
    game.camera.follow(mario.sprite);
}

function update() {
    game.physics.arcade.collide(mario.sprite, layer);
    mario.checkInput();
}
