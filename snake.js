let s;
const snakeScale = 20;
let foodPosition;

function setup() {
    createCanvas(600, 600);
    s = new Snake();
    frameRate(10);
    pickLocation();
}

function draw() {
    background(51);
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
    foodPosition = createVector(floor(random(cols)), floor(random(rows)));
    foodPosition.mult(snakeScale);
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
    this.total = 0;
    this.tail = [];
    this.update = function () {
        if (this.total === this.tail.length) {
            for (let i = 0; i < this.total; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }
        this.tail[this.total - 1] = createVector(this.x, this.y);
        this.x = this.x + this.xspeed * snakeScale;
        this.y = this.y + this.yspeed * snakeScale;

        this.x = constrain(this.x, 0, width - snakeScale);
        this.y = constrain(this.y, 0, width - snakeScale);
    };

    this.show = function () {
        fill(255);

        for (let i = 0; i < this.total; i++) {
            rect(this.tail[i].x, this.tail[i].y, snakeScale, snakeScale);
        }
        rect(this.x, this.y, snakeScale, snakeScale);
    };

    this.direction = function (x, y) {
        this.xspeed = x;
        this.yspeed = y;
    };

    this.eat = function (pos) {
        let distance = dist(this.x, this.y, pos.x, pos.y);
        if (distance < 1) {
            this.total++;
            return true;
        } else {
            return false;
        }
    };
}
