// Canvas setup
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');

// Ground and player
const groundY = 210; // where feet stand
const player = {
  x: 80,
  y: groundY,
  width: 50,
  height: 60,
  vy: 0,
  jumping: false
};

const gravity = 0.6;
const jumpForce = -13;

// Obstacles
let obstacles = [];
let spawnTimer = 0;

// Score / state
let score = 0;
let gameOver = false;

// ======= IMAGES (replace with your own later) =======

// Player image (for now, keep null = colored box)
const playerImg = null; // or new Image(); playerImg.src = 'img/runner.png';

// Obstacle image
const obstacleImg = null; // or new Image(); obstacleImg.src = 'img/obstacle.png';

// ======= SOUNDS (add your own later) =======

const jumpSound = null; // new Audio('audio/jump.mp3');
const hitSound  = null; // new Audio('audio/hit.mp3');

// ======= GAME LOGIC =======

function resetGame() {
  obstacles = [];
  spawnTimer = 0;
  score = 0;
  gameOver = false;
  player.y = groundY;
  player.vy = 0;
  player.jumping = false;
}

function spawnObstacle() {
  obstacles.push({
    x: canvas.width + 20,
    y: groundY,
    width: 30,
    height: 50,
    speed: 7
  });
}

function update() {
  if (gameOver) return;

  // gravity
  player.vy += gravity;
  player.y += player.vy;

  // ground collision
  if (player.y >= groundY) {
    player.y = groundY;
    player.vy = 0;
    player.jumping = false;
  }

  // obstacle spawn
  spawnTimer--;
  if (spawnTimer <= 0) {
    spawnObstacle();
    spawnTimer = 70 + Math.random() * 60;
  }

  // move obstacles
  obstacles.forEach(o => o.x -= o.speed);
  obstacles = obstacles.filter(o => o.x + o.width > 0);

  // collision
  for (const o of obstacles) {
    if (
      player.x < o.x + o.width &&
      player.x + player.width > o.x &&
      player.y < o.y + o.height &&
      player.y + player.height > o.y
    ) {
      onGameOver();
      break;
    }
  }

  // score
  score++;
  scoreEl.textContent = 'Score: ' + score;
}

function onGameOver() {
  gameOver = true;
  if (hitSound) {