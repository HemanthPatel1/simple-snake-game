const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');

// Game variables
const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 1;
let dy = 0;
let nextDx = 1;
let nextDy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameRunning = false;
let gamePaused = false;
let gameSpeed = 100;

highScoreDisplay.textContent = highScore;

// Draw functions
function drawTile(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * gridSize, y * gridSize, gridSize - 2, gridSize - 2);
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach((segment, index) => {
        drawTile(segment.x, segment.y, index === 0 ? '#00ff00' : '#00cc00');
    });

    // Draw food
    drawTile(food.x, food.y, '#ff6b6b');
}

function update() {
    if (!gameRunning || gamePaused) return;

    // Update direction
    dx = nextDx;
    dy = nextDy;

    // Calculate new head
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Check wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
        return;
    }

    // Check self collision
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }

    snake.unshift(head);

    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };

    // Ensure food doesn't spawn on snake
    if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        generateFood();
    }
}

function gameOver() {
    gameRunning = false;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreDisplay.textContent = highScore;
    }
    alert(`Game Over! Score: ${score}\nHigh Score: ${highScore}`);
    resetGame();
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 1;
    dy = 0;
    nextDx = 1;
    nextDy = 0;
    score = 0;
    scoreDisplay.textContent = score;
    gameRunning = false;
    gamePaused = false;
    pauseBtn.textContent = 'Pause';
    startBtn.textContent = 'Start Game';
}

function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        gamePaused = false;
        startBtn.textContent = 'Restart Game';
        pauseBtn.textContent = 'Pause';
        gameLoop();
    }
}

function togglePause() {
    if (gameRunning) {
        gamePaused = !gamePaused;
        pauseBtn.textContent = gamePaused ? 'Resume' : 'Pause';
        if (!gamePaused) {
            gameLoop();
        }
    }
}

function gameLoop() {
    update();
    draw();
    if (gameRunning && !gamePaused) {
        setTimeout(gameLoop, gameSpeed);
    }
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;

    switch(e.key) {
        case 'ArrowUp':
            if (dy === 0) { nextDx = 0; nextDy = -1; }
            e.preventDefault();
            break;
        case 'ArrowDown':
            if (dy === 0) { nextDx = 0; nextDy = 1; }
            e.preventDefault();
            break;
        case 'ArrowLeft':
            if (dx === 0) { nextDx = -1; nextDy = 0; }
            e.preventDefault();
            break;
        case 'ArrowRight':
            if (dx === 0) { nextDx = 1; nextDy = 0; }
            e.preventDefault();
            break;
    }
});

// Button event listeners
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', togglePause);

// Initial draw
draw();