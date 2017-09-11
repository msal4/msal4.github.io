function Player() {
    this.x = 150;
    this.y = height/2;
    this.diameter = 30;
    this.gravity = .7;
    this.velocity = 0;
    this.jumpForce = 100;
    this.lift = -20;

    this.show = function() {
        fill(100, 100, 255);
        ellipse(this.x, this.y, this.diameter, this.diameter);
    }
    this.applyPhysics = function() {
        this.velocity += this.gravity;
        this.y += this.velocity;
        if (this.y > height) {
            this.y = height;
            this.velocity = 0;
        }if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }
    this.jump = function() {
        this.velocity += this.lift;
        print("jump");
    }
}