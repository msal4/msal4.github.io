function Pipe() {
  this.top = random(height / 2);
  this.bottom = random(height / 2);
  this.x = width;
  this.w = 20;
  this.speed = 2;

  this.color = color(255);
  this.highlight = false;

  this.hits = function(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom)
        if (bird.x > this.x && bird.x < this.x + this.w){
            this.highlight = true;
            return true;
        }//end if
    this.highlight = false;
    return false;
  };

  this.show = function() {
    fill(this.color);

    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  };

  this.update = function() {
    this.x -= this.speed;
  };

  this.offscreen = function() {
    return this.x < -this.w;
  };
}
