const startX = 30;
const startY = 30;
const bodySize = 5;

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

        if (nextStepX < 0 || nextStepX >= canvasW / this.width ||
            nextStepY < 0 || nextStepY >= canvasH / this.height ||
            this.wasTooHungry(nextStepX, nextStepY)) {
            gameOver = true;
            //noLoop();
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
            const oldScore = parseInt(score.html());
            score.html(oldScore + 1);
            //points.html(Math.exp(oldScore)); implement bonus points through time
            return true;
        }

        return false;
    }

    /*gameOver() {
        const gWidth = 15;
        const gHeight = 9;
        const cordX = Math.floor((canvasW / this.width - gWidth) / 2);
        const cordY = Math.floor((canvasH / this.height - gHeight) / 2);

        const rows = [[cordX + 3, cordX + 7, cordX + 9, cordX + 11], [cordX + 1, cordX + 2, cordX + 3, cordX + 5, cordX + 7, cordX + 11, cordX + 14], [cordX + 1, cordX + 3, cordX + 7, cordX + 9, cordX + 11, cordX + 13, cordX + 14], [cordX + 3, cordX + 5, cordX + 7, cordX + 9, cordX + 11], [cordX + 3, cordX + 5, cordX + 7, cordX + 11], [cordX + 1, cordX + 3, cordX + 5, cordX + 7, cordX + 10, cordX + 11], [cordX + 1, cordX + 3, cordX + 5, cordX + 7, cordX + 9, cordX + 10, cordX + 11, cordX + 14], [cordX + 3, cordX + 4, cordX + 6, cordX + 7, cordX + 11, cordX + 13]];
        //const row1 = [[cordX + 3, cordX + 7, cordX + 9, cordX + 11], [cordX + 1, cordX + 2, cordX + 3, cordX + 5, cordX + 7, cordX + 11, cordX + 14], [cordX + 1, cordX + 3, cordX + 7, cordX + 9, cordX + 11, cordX + 13, cordX + 14], [cordX + 3, cordX + 5, cordX + 7, cordX + 9, cordX + 11]];
        //const row2 = [[cordX + 3, cordX + 5, cordX + 7, cordX + 11], [cordX + 1, cordX + 3, cordX + 5, cordX + 7, cordX + 10, cordX + 11], [cordX + 1, cordX + 3, cordX + 5, cordX + 7, cordX + 9, cordX + 10, cordX + 11, cordX + 14], [cordX + 3, cordX + 4, cordX + 6, cordX + 7, cordX + 11, cordX + 13]];

        fill(0, 0, 0);
        for (let j = cordY; j <= cordY + gHeight; j++) {
            for (let i = cordX; i < cordX + gWidth; i++) {
                if (rows[j - cordY].includes(i) == false) {

                    rect(i * this.width, j > cordY + 3 ? (j + 1) * this.height : j * this.height, this.width, this.height);
                }

                /* if (j < cordY + 4) {
                    if (row1[j - cordY].includes(i) == false) {
                        rect(i * this.width, j * this.height, this.width, this.height);

                    }
                }
                if (j > cordY + 4) {
                    if (row2[j - (cordY + 5)].includes(i) == false) {
                        rect(i * this.width, j * this.height, this.width, this.height);
                    }
                }
            }
        }
    }*/

    /*gameOverBig() {
        const gWidth = 20;
        const gHeight = 11;
        const cordX = Math.floor((canvasW / this.width - gWidth) / 2);
        const cordY = Math.floor((canvasH / this.height - gHeight) / 2);

        const rows = [[cordX + 4, cordX + 5, cordX + 8, cordX + 9, cordX + 11, cordX + 12, cordX + 13, cordX + 15], [cordX + 1, cordX + 2, cordX + 3, cordX + 4, cordX + 6, cordX + 7, cordX + 9, cordX + 12, cordX + 15, cordX + 17, cordX + 18, cordX + 19], [cordX + 1, cordX + 4, cordX + 9, cordX + 11, cordX + 13, cordX + 15, cordX + 19], [cordX + 1, cordX + 2, cordX + 4, cordX + 6, cordX + 7, cordX + 9, cordX + 11, cordX + 12, cordX + 13, cordX + 15, cordX + 17, cordX + 18, cordX + 19], [cordX + 4, cordX + 6, cordX + 7, cordX + 9, cordX + 11, cordX + 12, cordX + 13, cordX + 15], [cordX, cordX + 4, cordX + 5, cordX + 7, cordX + 8, cordX + 10, cordX + 15], [cordX + 1, cordX + 2, cordX + 3, cordX + 5, cordX + 7, cordX + 8, cordX + 10, cordX + 12, cordX + 13, cordX + 14, cordX + 15, cordX + 17, cordX + 18], [cordX + 1, cordX + 2, cordX + 3, cordX + 5, cordX + 7, cordX + 8, cordX + 10, cordX + 14, cordX + 15], [cordX + 1, cordX + 2, cordX + 3, cordX + 5, cordX + 7, cordX + 8, cordX + 10, cordX + 12, cordX + 13, cordX + 14, cordX + 15, cordX + 17, cordX + 19], [cordX, cordX + 4, cordX + 5, cordX + 6, cordX + 9, cordX + 10, cordX + 15, cordX + 17, cordX + 18]];
        //const row1 = [[cordX + 3, cordX + 7, cordX + 9, cordX + 11], [cordX + 1, cordX + 2, cordX + 3, cordX + 5, cordX + 7, cordX + 11, cordX + 14], [cordX + 1, cordX + 3, cordX + 7, cordX + 9, cordX + 11, cordX + 13, cordX + 14], [cordX + 3, cordX + 5, cordX + 7, cordX + 9, cordX + 11]];
        //const row2 = [[cordX + 3, cordX + 5, cordX + 7, cordX + 11], [cordX + 1, cordX + 3, cordX + 5, cordX + 7, cordX + 10, cordX + 11], [cordX + 1, cordX + 3, cordX + 5, cordX + 7, cordX + 9, cordX + 10, cordX + 11, cordX + 14], [cordX + 3, cordX + 4, cordX + 6, cordX + 7, cordX + 11, cordX + 13]];

        fill(0, 0, 0);
        for (let j = cordY; j <= cordY + gHeight; j++) {
            for (let i = cordX; i < cordX + gWidth; i++) {
                if (rows[j - cordY].includes(i) == false) {

                    rect(i * this.width, j > cordY + 4 ? (j + 1) * this.height : j * this.height, this.width, this.height);
                }
            }
        }
    }*/

    * genOver() {
        const gHeight = 11;
        const cordY = Math.floor((canvasH / this.height - gHeight) / 2);

        for (let j = cordY; j < cordY + gHeight - 1; j++) {
            yield this.drawGameOver(j);
        }
    }

    drawGameOver(j) {
        const gWidth = 20;
        const gHeight = 11;
        const cordX = Math.floor((canvasW / this.width - gWidth) / 2);
        const cordY = Math.floor((canvasH / this.height - gHeight) / 2);

        const rows = [[cordX + 4, cordX + 5, cordX + 8, cordX + 9, cordX + 11, cordX + 12, cordX + 13, cordX + 15], [cordX + 1, cordX + 2, cordX + 3, cordX + 4, cordX + 6, cordX + 7, cordX + 9, cordX + 12, cordX + 15, cordX + 17, cordX + 18, cordX + 19], [cordX + 1, cordX + 4, cordX + 9, cordX + 11, cordX + 13, cordX + 15, cordX + 19], [cordX + 1, cordX + 2, cordX + 4, cordX + 6, cordX + 7, cordX + 9, cordX + 11, cordX + 12, cordX + 13, cordX + 15, cordX + 17, cordX + 18, cordX + 19], [cordX + 4, cordX + 6, cordX + 7, cordX + 9, cordX + 11, cordX + 12, cordX + 13, cordX + 15], [cordX, cordX + 4, cordX + 5, cordX + 7, cordX + 8, cordX + 10, cordX + 15], [cordX + 1, cordX + 2, cordX + 3, cordX + 5, cordX + 7, cordX + 8, cordX + 10, cordX + 12, cordX + 13, cordX + 14, cordX + 15, cordX + 17, cordX + 18], [cordX + 1, cordX + 2, cordX + 3, cordX + 5, cordX + 7, cordX + 8, cordX + 10, cordX + 14, cordX + 15], [cordX + 1, cordX + 2, cordX + 3, cordX + 5, cordX + 7, cordX + 8, cordX + 10, cordX + 12, cordX + 13, cordX + 14, cordX + 15, cordX + 17, cordX + 19], [cordX, cordX + 4, cordX + 5, cordX + 6, cordX + 9, cordX + 10, cordX + 15, cordX + 17, cordX + 18]];
        //const row1 = [[cordX + 3, cordX + 7, cordX + 9, cordX + 11], [cordX + 1, cordX + 2, cordX + 3, cordX + 5, cordX + 7, cordX + 11, cordX + 14], [cordX + 1, cordX + 3, cordX + 7, cordX + 9, cordX + 11, cordX + 13, cordX + 14], [cordX + 3, cordX + 5, cordX + 7, cordX + 9, cordX + 11]];
        //const row2 = [[cordX + 3, cordX + 5, cordX + 7, cordX + 11], [cordX + 1, cordX + 3, cordX + 5, cordX + 7, cordX + 10, cordX + 11], [cordX + 1, cordX + 3, cordX + 5, cordX + 7, cordX + 9, cordX + 10, cordX + 11, cordX + 14], [cordX + 3, cordX + 4, cordX + 6, cordX + 7, cordX + 11, cordX + 13]];

        fill(0, 0, 0);
        for (let i = cordX; i < cordX + gWidth; i++) {
            if (rows[j - cordY].includes(i) == false) {

                rect(i * this.width, j > cordY + 4 ? (j + 1) * this.height : j * this.height, this.width, this.height);
            }
        }

    }
}
