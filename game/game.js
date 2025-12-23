const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');

const groundY = 240;
const player = {
  x: 80,
  y: groundY,
  width: 40,
  height: 50,
  vy: 0,
  jumping: false
};

const gravity = 0.6;
const jumpForce = -12;
let obstacles = [];
let spawnTimer = 0;
let score = 0;
let gameOver = false;

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
    height: 40,
    speed: 6
  });
}

function update() {
  if (gameOver) return;

  // gravity
  player.vy += gravity;
  player.y += player.vy;

  // stay on ground
  if (player.y >= groundY) {
    player.y = groundY;
    player.vy = 0;
    player.jumping = false;
  }

  // spawn obstacles
  spawnTimer--;
  if (spawnTimer <= 0) {
    spawnObstacle();
    spawnTimer = 80 + Math.random() * 60;
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
      gameOver = true;
    }
  }

  // score
  score++;
  scoreEl.textContent = 'Score: ' + score;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ground line
  ctx.strokeStyle = '#4b5563';
  ctx.beginPath();
  ctx.moveTo(0, groundY + player.height);
  ctx.lineTo(canvas.width, groundY + player.height);
  ctx.stroke();

  // player (box for now)
  ctx.fillStyle = '#60a5fa';
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // obstacles
  ctx.fillStyle = '#f97316';
  obstacles.forEach(o => {
    ctx.fillRect(o.x, o.y, o.width, o.height);
  });

  if (gameOver) {
    ctx.fillStyle = '#e5e7eb';
    ctx.font = '24px Arial';
    ctx.fillText('Game Over - tap or press SPACE to restart', 40, 150);
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

function handleJumpOrRestart() {
  if (gameOver) {
    resetGame();
    return;
  }
  if (!player.jumping) {
    player.vy = jumpForce;
    player.jumping = true;
  }
}

// controls
