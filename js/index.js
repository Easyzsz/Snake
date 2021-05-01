const canvasW = 1000;
const canvasH = 800;
const width = 20;
const height = 20;

let gen;
let gameSpeed = 10;
let snake;
let apple;
let score;
let points;
let sx = 1;
let sy = 0;
let hasMoved = false;
let isAppleGone = false;
let gameOver = false;

function setup() {
    createCanvas(canvasW, canvasH);

    snake = new Snake(width, height);
    apple = new Apple(0, 0, width, height);
    spawnApple();
    gen = snake.genOver();

    frameRate(gameSpeed);

    document.addEventListener("keydown", keyPush);

    score = createDiv('0');
    score.position(width, height);
    score.style('font-size', '30px');
    score.style('color', 'white');
    score.style('font-family', 'Arial');

    /*points = createDiv('0');
    points.position(canvasW - width * 5, height);
    points.style('font-size', '30px');
    points.style('color', 'white');
    points.style('font-family', 'Arial');*/

}

function keyPush(event) {
    if (event.isComposing || event.keyCode === 229) {
        return;
    }
    if (hasMoved == true) { return; }
    switch (event.code) {
        case "ArrowDown":
        case "KeyS":
            if (sy != -1) {
                sx = 0; sy = 1;
                hasMoved = true;
            }
            break;
        case "ArrowUp":
        case "KeyW":
            if (sy != 1) {
                sx = 0; sy = -1;
                hasMoved = true;
            }
            break;
        case "ArrowRight":
        case "KeyD":
            if (sx != -1) {
                sx = 1; sy = 0;
                hasMoved = true;
            }
            break;
        case "ArrowLeft":
        case "KeyA":
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

    if (gameOver == false) {
        clear();
        fill(0, 102, 102);
        stroke(25, 51, 0);
        strokeWeight(10);
        rect(0, 0, canvasW, canvasH);

        snake.move(sx, sy);
        hasMoved = false;

        isAppleGone = snake.eat(apple);

        snake.drawSnake();
        apple.drawApple();
    }

    if (gameOver) {
        //snake.gameOver();
        //snake.gameOverBig();
        gen.next();
    }

    if (isAppleGone) {
        spawnApple();
        gameSpeed += 1;
        frameRate(gameSpeed);
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

        apple.moveApple(x, y);
        break;
    }
}