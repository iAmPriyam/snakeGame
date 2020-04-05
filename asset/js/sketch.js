let s;
const snakeScale = 20;
var foodPosition;
const scoreCard = document.querySelector(".score-card");
const highScore = document.querySelector(".high-score");
const message = new verdict();

function setup() {
    const can = createCanvas(600, 600);
    const parentDiv = document.querySelector(".game-wrapper");
    can.parent(parentDiv);
    s = new Snake();
    frameRate(10);
    pickLocation();
}

function draw() {
    background(51);
    s.isOver();
    s.update();
    s.show();

    if (s.eat(foodPosition)) {
        pickLocation();
    }

    fill(255, 0, 100);
    rect(foodPosition.x, foodPosition.y, snakeScale, snakeScale);
}

function pickLocation() {
    let cols = floor(width / snakeScale);
    let rows = floor(height / snakeScale);
    foodPosition = createVector(
        floor(random(floor(width / snakeScale))),
        floor(random(floor(height / snakeScale)))
    );
    foodPosition.mult(snakeScale);
}

function keyPressed() {
    if (keyCode === UP_ARROW && s.getYspeed() == 0 && !s.pause) {
        s.direction(0, -1);
    }
    if (keyCode === DOWN_ARROW && s.getYspeed() == 0 && !s.pause) {
        s.direction(0, 1);
    }
    if (keyCode === RIGHT_ARROW && s.getXspeed() == 0 && !s.pause) {
        s.direction(1, 0);
    }
    if (keyCode === LEFT_ARROW && s.getXspeed() == 0 && !s.pause) {
        s.direction(-1, 0);
    }
    if (keyCode === ESCAPE) {
        s.pause = !s.pause;
        message.pause(s.pause);
    }
    if (keyCode === ENTER) {
        if (s.pause || s.dead) {
            s.reset();
        }
    }
}
