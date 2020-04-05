const messenger = new verdict();

function Snake() {
    //this.food= createVector(floor(random(floor(width / snakeScale))), floor(random(floor(height / snakeScale))));
    this.x = floor(width / 2) - snakeScale;
    this.y = floor(height / 2) - snakeScale;
    this.xspeed = floor(Math.random() * 10) % 2;
    this.yspeed = (this.xspeed + 1) % 2;
    this.total = 3;
    this.tail = [
        createVector(this.x, this.y - 3 * snakeScale),
        createVector(this.x, this.y - 2 * snakeScale),
        createVector(this.x, this.y - 1 * snakeScale),
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
            createVector(this.x, this.y - 3 * snakeScale),
            createVector(this.x, this.y - 2 * snakeScale),
            createVector(this.x, this.y - 1 * snakeScale),
        ];
        this.pause = false;
        this.dead = false;
        this.score = 0;
        scoreCard.innerHTML = this.score.toString();
        messenger.clear();
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
            messenger.greet();
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
                    messenger.over();
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
