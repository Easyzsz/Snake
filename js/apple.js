class Apple {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }

    teleport(x, y) {
        this.x = x;
        this.y = y;
    }

    drawApple() {
        fill(255, 0, 0);
        rect(this.x * this.width, this.y * this.height, this.width, this.height);
    }
}