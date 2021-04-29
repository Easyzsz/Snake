const canvasW = 1000;
const canvasH = 800;
const width = 20;
const height = 20;

let v = 20;

let snake;
let apple;
let sx = 1;
let sy = 0;
let hasMoved = false;
let isAppleGone = false;

function setup() {
    createCanvas(canvasW, canvasH);
    snake = new Snake(width, height);
    apple = new Apple(0, 0, width, height);
    spawnApple();

    document.addEventListener("keydown", keyPush);
    frameRate(v);

}

function keyPush(event) {
    if (event.isComposing || event.keyCode === 229) {
        return;
    }
    if (hasMoved == true) { return; }
    switch (event.code) {
        case "ArrowDown":
            if (sy != -1) {
                sx = 0; sy = 1;
                hasMoved = true;
            }
            break;
        case "ArrowUp":
            if (sy != 1) {
                sx = 0; sy = -1;
                hasMoved = true;
            }
            break;
        case "ArrowRight":
            if (sx != -1) {
                sx = 1; sy = 0;
                hasMoved = true;
            }
            break;
        case "ArrowLeft":
            if (sx != 1) {
                sx = -1; sy = 0;
                hasMoved = true;
            }
            break;
        default:

            break;
    }
}

function draw() {
    clear();
    fill(0, 102, 102)
    stroke(25, 51, 0);
    strokeWeight(10);
    rect(0, 0, canvasW, canvasH)

    snake.move(sx, sy);
    isAppleGone = snake.eat(apple)
    snake.drawSnake();
    apple.drawApple();
    hasMoved = false;

    if (isAppleGone) {
        spawnApple();
        v += 2;
        frameRate(v);
        isAppleGone = false;
    }
}

function spawnApple() {
    loop1: while (true) {
        const x = Math.floor(Math.random() * canvasW / width);
        const y = Math.floor(Math.random() * canvasH / height);

        if (x == snake.head.x && y == snake.head.y) {
            continue;
        }

        for (const part of snake.body) {
            if (x == part.x && y == part.y) {
                continue loop1;
            }
        }

        if (x == snake.tail.x && y == snake.tail.y) {
            continue;
        }

        apple.teleport(x, y);
        break;
    }
}