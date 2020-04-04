let s;
const snakeScale = 20;
var foodPosition;
const scoreCard = document.querySelector(".score-card");
const highScore = document.querySelector(".high-score");

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
    }
    if (keyCode === ENTER) {
        if (s.pause || s.dead) {
            s.reset();
        }
    }
}

function Snake() {
    //this.food= createVector(floor(random(floor(width / snakeScale))), floor(random(floor(height / snakeScale))));
    this.x = floor(width / 2) - snakeScale;
    this.y = floor(height / 2) - snakeScale;
    this.xspeed = floor(Math.random() * 10) % 2;
    this.yspeed = (this.xspeed + 1) % 2;
    this.total = 3;
    this.tail = [
        createVector(this.x - 3, this.y - 3),
        createVector(this.x - 2, this.y - 2),
        createVector(this.x - 1, this.y - 1),
    ];
    this.dead = true;
    this.score = 0;
    this.highScore = 0;
    this.pause = false;

    this.reset = function () {
        this.x = floor(width / 2) - snakeScale;
        this.y = floor(height / 2) - snakeScale;
        this.xspeed = floor(Math.random() * 10) % 2;
        this.yspeed = (this.xspeed + 1) % 2;
        this.total = 3;
        this.tail = [
            createVector(this.x - 3, this.y - 3),
            createVector(this.x - 2, this.y - 2),
            createVector(this.x - 1, this.y - 1),
        ];
        this.dead = false;
        this.score = 0;
        scoreCard.innerHTML = this.score.toString();
    };

    this.update = function () {
        if (!this.dead && !this.pause) {
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
        }
    };

    this.show = function () {
        fill(0, 255, 100);
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
        if (distance < snakeScale - 1) {
            this.total++;
            this.score++;
            console.log(this.score);
            this.highScore =
                this.highScore > this.score ? this.highScore : this.score;
            // var temp = parseInt(this.score);
            scoreCard.innerHTML = this.score.toString();
            highScore.innerHTML = this.highScore.toString();
            return true;
        } else {
            return false;
        }
    };

    this.isOver = function () {
        if (!this.dead) {
            for (var i = 0; i < this.tail.length; i++) {
                var distance = dist(
                    this.x,
                    this.y,
                    this.tail[i].x,
                    this.tail[i].y
                );
                if (distance < 1) {
                    console.log("game over");
                    this.dead = true;
                    this.xspeed = 0;
                    this.yspeed = 0;
                }
            }
        }
    };

    this.getXspeed = function () {
        return this.xspeed;
    };
    this.getYspeed = function () {
        return this.yspeed;
    };
}
