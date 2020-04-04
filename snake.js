let s;
const snakeScale = 20;

function setup() {
    createCanvas(600, 600);
    s = new Snake();
    frameRate(10);
}

function draw() {
    background(51);
    s.update();
    s.show();
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        s.direction(0, -1);
    }
    if (keyCode === DOWN_ARROW) {
        s.direction(0, 1);
    }
    if (keyCode === RIGHT_ARROW) {
        s.direction(1, 0);
    }
    if (keyCode === LEFT_ARROW) {
        s.direction(-1, 0);
    }
}

function Snake() {
    this.x = 1;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.update = function () {
        this.x = this.x + this.xspeed * snakeScale;
        this.y = this.y + this.yspeed * snakeScale;

        this.x = constrain(this.x, 0, width - snakeScale);
        this.y = constrain(this.y, 0, width - snakeScale);
    };

    this.show = function () {
        fill(255);
        rect(this.x, this.y, snakeScale, snakeScale);
    };

    this.direction = function (x, y) {
        this.xspeed = x;
        this.yspeed = y;
    };
}
