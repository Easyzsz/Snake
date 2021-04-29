const startX = 30;
const startY = 30;
const bodySize = 10;

class Snake {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.head = { x: startX, y: startY };
        this.body = [...new Array(bodySize).fill(0).map((v, i) => ({ x: startX - bodySize + i, y: startY }))];
        this.tail = { x: startX - (bodySize + 1), y: startY };
        this.shadowTail = { ...this.tail };
    }

    move(sx, sy) {
        const nextStepX = this.head.x + sx;
        const nextStepY = this.head.y + sy;

        if (nextStepX < 0 || nextStepX >= canvasW / width ||
            nextStepY < 0 || nextStepY >= canvasH / height ||
            this.wasTooHungry(nextStepX, nextStepY)) {
            noLoop();
            return;
        }

        this.body.push({ x: this.head.x, y: this.head.y });
        this.shadowTail = { ...this.body.shift() };
        this.tail = { x: this.shadowTail.x, y: this.shadowTail.y };
        this.head.x = nextStepX;
        this.head.y = nextStepY;
    }

    drawSnake() {
        noStroke();
        this.drawBody();
        this.drawHead();
        this.drawTail();
    }

    drawHead() {
        fill(255, 0, 0);
        rect(this.head.x * this.width, this.head.y * this.height, this.width, this.height)
    }

    drawBody() {
        fill(0, 153, 0);
        for (let i = 0; i < this.body.length; i++) {
            rect(this.body[i].x * this.width, this.body[i].y * this.height, this.width, this.height)
        }
    }

    drawTail() {
        fill(255, 255, 0);
        rect(this.tail.x * this.width, this.tail.y * this.height, this.width, this.height);
    }

    wasTooHungry(x, y) {
        for (let i = 0; i < this.body.length; i++) {
            if (x == this.body[i].x && y == this.body[i].y) {
                return true;
            }
        }
        return false;
    }

    growBody() {
        this.body.unshift({ x: this.tail.x, y: this.tail.y });
        this.tail = { ...this.shadowTail };
    }

    eat(apple) {
        if (this.head.x == apple.x && this.head.y == apple.y) {
            this.growBody();
            return true;
        }

        return false;
    }
}
