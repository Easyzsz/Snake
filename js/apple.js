class Apple {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }

    moveApple(x, y) {
        this.x = x;
        this.y = y;
    }

    drawApple() {
        fill(255, 0, 0);
        const r = Math.min(this.width, this.height);
        circle(this.x * this.width + r / 2, this.y * this.height + r / 2, r);
    }
}