var GameState = {
    preload: function() {
        this.load.image("background", "assets/images/yaseen01.jpg");
        this.load.spritesheet(
            "char01",
            "assets/images/spritesheet01.png",
            256,
            256,
            6
        );
        this.load.spritesheet(
            "char02",
            "assets/images/spritesheet01.png",
            256,
            256,
            6
        );
        this.load.spritesheet(
            "char03",
            "assets/images/spritesheet01.png",
            256,
            256,
            6
        );
        this.load.spritesheet(
            "char04",
            "assets/images/spritesheet01.png",
            256,
            256,
            6
        );
        this.load.audio("meaw", [
            "assets/audio/thunder.mp3",
            "assets/audio/thunder.ogg"
        ]);
        this.load.image("arrow", "assets/images/arrow.png");
    }, // End preload
    create: function() {
        // set the scale to the screen size
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        // align in the center
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        // the background as a sprite
        this.background = this.game.add.sprite(0, 0, "background");

        // // character sprite
        // this.char01 = this.game.add.sprite(
        //     this.game.world.centerX,
        //     this.game.world.centerY,
        //     "char01"
        // );
        // this.char01.anchor.setTo(0.5, 0.5);

        // // animate character on click
        // this.char01.inputEnabled = true;
        // this.char01.input.pixelPerfectClick = true;
        // this.char01.events.onInputDown.add(this.animateChar, this);

        // adding characters using groups
        var charData = [
            { key: "char01", text: "The one and only" },
            { key: "char02", text: "Alison" },
            { key: "char03", text: "Marison" },
            { key: "char04", text: "Salison" }
        ]; // characters data
        this.characters = this.game.add.group(); // characters group
        // refering to this as self to access it inside the forEach loop
        var self = this;
        var char;
        // loop through the data
        charData.forEach(function(element) {
            char = self.characters.create(
                -1000,
                this.game.world.centerY,
                element.key,
                0
            );
            char.customParams = {
                text: element.text,
                sound: self.game.add.audio("meaw")
            };
            char.anchor.setTo(0.5);

            char.animations.add("animate", [0, 1, 2, 3], 4, false);
            char.inputEnabled = true;
            char.input.pixelPerfectClick = true;
            char.events.onInputDown.add(self.animateChar, self);
        });
        // the current displayed character
        this.currentChar = this.characters.next(); // display the next character
        this.currentChar.position.set(
            this.game.world.centerX,
            this.game.world.centerY
        );
        //right arrow button(sprite)
        this.rightArrow = this.game.add.sprite(
            580,
            this.game.world.centerY,
            "arrow"
        );
        this.rightArrow.anchor.setTo(0.5);
        this.rightArrow.scale.setTo(0.5);
        this.rightArrow.tint = rgb(100, 100, 100);
        this.rightArrow.customParams = { direction: 1 };

        // right arrow user input
        this.rightArrow.inputEnabled = true;
        this.rightArrow.input.pixelPerfectClick = true;
        this.rightArrow.events.onInputDown.add(this.switchChar, this);

        // the left arrow button(sprite)
        this.leftArrow = this.game.add.sprite(
            60,
            this.game.world.centerY,
            "arrow"
        );
        this.leftArrow.anchor.setTo(0.5);
        this.leftArrow.scale.setTo(-0.5);
        this.leftArrow.tint = rgb(100, 100, 100);
        this.leftArrow.customParams = { direction: -1 };

        // left arrow user input
        this.leftArrow.inputEnabled = true;
        this.leftArrow.input.pixelPerfectClick = true;
        this.leftArrow.events.onInputDown.add(this.switchChar, this);
    }, // End create
    update: function() {}, // End update
    switchChar: function(sprite, event) {
        // check if the animation is still running
        // if true prevent the function from running
        if (this.isMoving) return false;
        this.isMoving = true;

        var newChar, endX;
        if (sprite.customParams.direction == 1) {
            // set the new character to the next one
            newChar = this.characters.next();
            // make the new character come from the left side
            newChar.x = -this.currentChar.width / 2;
            // set the x position of the current character to the right
            endX = 640 + this.currentChar.width / 2;
            this.animateChar(this.currentChar);
        } else {
            // set the new characte to the previous one
            newChar = this.characters.previous();
            // make the new character come from the right side
            newChar.x = 640 + this.currentChar.width / 2;
            // set the x position of the current character to the left
            endX = -this.currentChar.width / 2;
        }
        // smooth transition of the new character to the center of the screen
        var newCharTween = this.game.add.tween(newChar);
        newCharTween.to({ x: this.game.world.centerX }, 1000);
        newCharTween.start();
        // smooth transition of the current character to the
        // left or right of the screen depending on the value of endX
        var currentCharTween = this.game.add.tween(this.currentChar);
        currentCharTween.to({ x: endX }, 1000);
        // set this.isMoving to false when the animation is complete
        currentCharTween.onComplete.add(function() {
            this.isMoving = false;
            isLooping = true;
        }, this);
        currentCharTween.start();
        // set the current character to the new one
        this.currentChar = newChar;
        this.animateChar(newChar);
    },
    animateChar: function(sprite, event) {
        sprite.animations.play("animate");
        sprite.customParams.sound.play();
    }
}; // End GameState
// create the game
var game = new Phaser.Game(640, 360, Phaser.AUTO); // Phaser.AUTO means choose the renderer automatically
game.state.add("GameState", GameState); // add the game state
game.state.start("GameState"); // start the game
//convert rgb to hex
function rgb(r, g, b) {
    return (r << 16) | (g << 8) | b;
}
