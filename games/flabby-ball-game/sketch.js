var player;
var pipes = [];
var score = 0;
function setup() {
    createCanvas(400, 600);
    player = new Player();
    pipes.push(new Pipe());
}

function draw() {
    background(0);
    textSize(70);
    text(score, width/2 - 35, 70);
    for (var i = pipes.length - 1; i >=0; i--){
        pipes[i].show();
        pipes[i].update();

        if(pipes[i].hits(player)){
            pipes[i].color = color(255, 0, 0);
            score-=1;
        }
    }

    player.show();
    player.applyPhysics();

    if (frameCount%100 == 0){
        pipes.push(new Pipe());
        
    }
    if (frameCount%110 == 0){
        score++;
    }
}

function keyPressed() {
    if (key == " ")player.jump();
}