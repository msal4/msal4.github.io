var GameState = {
    preload: function() {
        this.load.image("background", "assets/images/yaseen01.jpg");
        this.load.image("char01", "assets/images/char01.png");
        this.load.image("char02", "assets/images/char02.png");
        this.load.image("char03", "assets/images/char03.png");
        this.load.image("char04", "assets/images/char04.png");
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
                element.key
            );
            char.customParams = { text: element.text };
            char.anchor.setTo(0.5);

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
        var newChar, endX;
        if (sprite.customParams.direction == 1) {
            newChar = this.characters.next();
            endX = 640 + this.currentChar.width / 2;
        } else {
            newChar = this.characters.previous();
            endX = -this.currentChar.width / 2;
        }
        this.currentChar.x = endX;
        this.currentChar = newChar;
        this.currentChar.x = this.game.world.centerX;
    },
    animateChar: function(sprite, event) {
        sprite.tint = rgb(255, 0, 100);
    }
}; // End GameState
var game = new Phaser.Game(640, 360, Phaser.AUTO);
game.state.add("GameState", GameState);
game.state.start("GameState");

function rgb(r, g, b) {
    return (r << 16) | (g << 8) | b;
}
