function verdict() {
    this.index = 0;
    this.array = [
        "Nice!",
        "Well Done!",
        "You are awesome!",
        "Bravo!",
        "Did it like a pro!",
        "Cool!",
        "Kicking it!",
        "Dope!",
        "Aced it!",
    ];
    this.greet = function () {
        let message = this.array[this.index];
        const elem = document.querySelector(".verdict");
        elem.innerHTML = `<h3>${message}</h3>`;
        let i = Math.floor(Math.random() * 2313) % this.array.length;
        while (i == this.index) {
            i = Math.floor(Math.random() * 2313) % this.array.length;
        }
        this.index = i;
    };

    this.pause = function (status) {
        const elem = document.querySelector(".verdict");
        if (status) {
            elem.innerHTML =
                '<h2> Game Paused \
    </h2>\
    <div class="help">\
        Press ESC to resume! <br><br><br>\
        Press Enter to restart!\
    </div>';
        } else {
            elem.innerHTML = "";
        }
    };

    this.over = function () {
        const elem = document.querySelector(".verdict");
        elem.innerHTML =
            '<h2> Game Over \
    </h2>\
    <div class="help">\
        Press Enter to restart!\
    </div>';
    };

    this.clear = function () {
        const elem = document.querySelector(".verdict");
        elem.innerHTML = "";
    };
}
