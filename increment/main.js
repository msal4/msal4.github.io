var game = new Phaser.Game(400, 400, Phaser.AUTO, "", {
    preload: preload,
    create: create,
    update: update
});

function preload() {
    game.load.image("zombie", "assets/images/player.png");
    game.load.image("human", "assets/images/enemy.png");
    game.load.image("bullet", "assets/images/bullet.png");
    game.load.image("zombieHeart", "assets/images/zombieHeart.png");
}

var zombies;
var humans;
var fireRate = 1000;
var nextFire = 0;
var totalHealth = 100;
var zombiesHealthtext;

function create() {
    //create 4 zombies to start with
    zombies = game.add.group();
    for (var j = 0; j < 2; j++) {
        for (var i = 0; i < 2; i++) {
            zombies.add(
                new Zombie(
                    game.world.centerX + i * 32,
                    game.world.centerY + j * 32
                )
            );
        }
    }

    //create humans each 5 seconds
    spawnHumans();

    var style = {font: "bold 20px Oswald", fill: "#99f0f8"};
    game.add.sprite(0, 0, "zombieHeart").scale.set(0.7);
    zombiesHealthtext = game.add.text(35, 4, totalHealth, style);
}

function update() {
    //collision
    checkCollision();
    //check movement input
    checkInput();
    //human fire
    if (game.time.now > nextFire) {
        fire();
    }
    //update zombies health stat
    updateZombiesTextHealth();
}
function spawnHumans() {
    humans = game.add.group();

    game.time.events.loop(Phaser.Timer.SECOND * 5, function() {
        humans.add(
            new Human(
                game.rnd.integerInRange(0, game.world.width),
                game.rnd.integerInRange(0, game.world.height)
            )
        );
        var humanCount = humans.length - 1;
        humans.children[humanCount].bullets = game.add.group();
        humans.children[humanCount].bullets.enableBody = true;
        humans.children[humanCount].bullets.physicsBodyType =
            Phaser.Physics.ARCADE;

        humans.children[humanCount].bullets.createMultiple(50, "bullet");
        humans.children[humanCount].bullets.setAll("checkWorldBounds", true);
        humans.children[humanCount].bullets.setAll("outOfBoundsKill", true);
    });
}

function checkCollision() {
    game.physics.arcade.collide(zombies, zombies);
    game.physics.arcade.collide(zombies, humans, turnHuman);
    //bullets collision
    humans.forEach(function(human) {
        game.physics.arcade.collide(human.bullets, zombies, damageZombie);
    }, this);
}

function checkInput() {
    if (game.input.activePointer.isDown) {
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
            human.health -= 10;
        },
        this
    );

    if (human.health < 0) {
        zombies.add(new Zombie(human.position.x, human.position.y));
        human.kill();
        humans.remove(human);
    }
}

function fire() {
    //fire from each sprite
    humans.forEach(function(human) {
        nextFire = game.time.now + fireRate;
        var bullet = human.bullets.getFirstDead();
        bullet.reset(human.x, human.y);
        game.physics.arcade.moveToXY(
            bullet,
            zombies.centerX,
            zombies.centerY,
            game.rnd.integerInRange(50, 300)
        );
    }, this);
}

function damageZombie(bullet, zombie) {
    bullet.kill();
    zombie.health -= 10;
    if (zombie.health < 0) {
        zombie.kill();
        zombies.remove(zombie);
    }
}

function updateZombiesTextHealth() {
    var tempHealth = 0; //temporary health holder
    zombies.forEach(function(zombie) {
        tempHealth += zombie.health;
        zombie.alpha = zombie.health / 100;
    }, this);
    totalHealth = tempHealth / zombies.length;
    zombiesHealthtext.text = Math.round(totalHealth);
    if (!totalHealth || totalHealth < 0) {
        zombiesHealthtext.text = "Zombies are Exterminated";
    }
}
