function startFlappyBird() {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");

  const bird = { x: 50, y: 150, velocity: 0 };
  const gravity = 0.5;
  const lift = -8;
  const pipeWidth = 50;

  const pipes = [];
  let score = 0;
  let gameOver = false;

  function addPipe() {
    const gap = 120;
    const top = Math.random() * 200 + 20;
    pipes.push({ x: canvas.width, top: top, bottom: top + gap });
  }

  function drawBackground() {
    ctx.fillStyle = "#87CEEB"; // небо
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // земля
    ctx.fillStyle = "#DEB887";
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
  }

  function drawBird() {
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function drawPipes() {
    ctx.fillStyle = "#228B22";
    pipes.forEach(pipe => {
      pipe.x -= 2;
      ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
      ctx.fillRect(pipe.x, pipe.bottom, pipeWidth, canvas.height - pipe.bottom - 50);

      // столкновение
      if (
        bird.x + 12 > pipe.x && bird.x - 12 < pipe.x + pipeWidth &&
        (bird.y - 12 < pipe.top || bird.y + 12 > pipe.bottom)
      ) {
        gameOver = true;
      }

      // подсчет очков
      if (pipe.x + pipeWidth === bird.x) score++;
    });
  }

  function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Очки: " + score, 10, 25);
  }

  function updateGame() {
    if (gameOver) return;

    bird.velocity += gravity;
    bird.y += bird.velocity;

    if (bird.y > canvas.height - 50 || bird.y < 0) {
      gameOver = true;
    }

    drawBackground();
    drawPipes();
    drawBird();
    drawScore();

    requestAnimationFrame(updateGame);
  }

  setInterval(() => {
    if (!gameOver) addPipe();
  }, 1600);

  document.addEventListener("keydown", () => {
    if (!gameOver) bird.velocity = lift;
  });

  document.addEventListener("touchstart", () => {
    if (!gameOver) bird.velocity = lift;
  });

  updateGame();
}

document.getElementById("start-btn").addEventListener("click", function () {
  const audio = document.getElementById("bg-audio");
  audio.volume = 1.0;
  audio.play().catch(() => alert("Разрешите воспроизведение звука!"));
  document.getElementById("start-btn").style.display = "none";
  document.getElementById("game-canvas").style.display = "block";
  startFlappyBird();
});