var game = new Phaser.Game(400, 400, Phaser.AUTO, "", {
    preload: preload,
    create: create,
    update: update
});

function preload() {
    game.load.image("zombie", "assets/images/player.png");
    game.load.image("human", "assets/images/enemy.png");
}

var zombies;
var humans;
var box;

function create() {
    //create zombies
    zombies = game.add.group();
    for (var i = 0; i < 4; i++) {
        zombies.add(
            new Zombie(game.world.centerX + i * 32, game.world.centerY)
        );
    }
    //create humans each 10 seconds
    humans = game.add.group();

    game.time.events.loop(Phaser.Timer.SECOND * 5, function() {
        humans.add(new Human(game.world.centerX + 32, 100));
    });
}

function update() {
    //collision
    game.physics.arcade.collide(zombies, zombies);
    if (game.physics.arcade.collide(zombies, humans, turnHuman)) {
        console.log(zombies.children.length);
    } else {
        healZombies();
    }

    //check mouse down
    if (game.input.mousePointer.isDown) {
        //move all zombies
        zombies.forEach(function(zombie) {
            game.physics.arcade.moveToPointer(zombie, 400);

            //if in box reset velocity
            if (
                Phaser.Rectangle.contains(
                    zombie.body,
                    game.input.x,
                    game.input.y
                )
            ) {
                zombie.body.velocity.setTo(0, 0);
            } //end if
        }, this); //end forEach
    } else {
        zombies.forEach(function(zombie) {
            zombie.body.velocity.setTo(0, 0);
        }, this); //end forEach
    } //end else
}

function turnHuman(zombie, human) {
    game.time.events.add(
        Phaser.Timer.SECOND * 2,
        function() {
            human.health--;
        },
        this
    );
    game.time.events.add(
        Phaser.Timer.SECOND * 2,
        function() {
            zombie.health--;
        },
        this
    );

    if (human.health < 0) {
        zombies.add(new Zombie(human.position.x, human.position.y));
        humans.remove(human);
    }
    if (zombie.health < 0) {
        zombies.remove(zombie);
    }
}

function healZombies() {
    zombies.forEach(function(zombie) {
        game.time.events.add(
            Phaser.Timer.SECOND * 10,
            function() {
                if (zombie.health < 100) {
                    zombie.health = 100;
                }
            },
            this
        );
    });
}
