function startFlappyBird() {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");

  const bird = { x: 50, y: 150, velocity: 0 };
  const gravity = 0.5;
  const lift = -8;

  const pipes = [];
  let score = 0;

  function addPipe() {
    const gap = 100;
    const top = Math.random() * 200 + 20;
    pipes.push({ x: 320, top: top, bottom: top + gap });
  }

  function draw() {
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    bird.velocity += gravity;
    bird.y += bird.velocity;

    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "green";
    for (let pipe of pipes) {
      pipe.x -= 2;
      ctx.fillRect(pipe.x, 0, 40, pipe.top);
      ctx.fillRect(pipe.x, pipe.bottom, 40, 480 - pipe.bottom);

      if (
        bird.x + 10 > pipe.x && bird.x - 10 < pipe.x + 40 &&
        (bird.y - 10 < pipe.top || bird.y + 10 > pipe.bottom)
      ) {
        location.reload(); // restart on collision
      }

      if (pipe.x + 40 === bird.x) score++;
    }

    pipes.filter(p => p.x > -50);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Очки: " + score, 10, 25);

    if (bird.y > canvas.height || bird.y < 0) location.reload();

    requestAnimationFrame(draw);
  }

  setInterval(addPipe, 1500);

  document.addEventListener("keydown", () => {
    bird.velocity = lift;
  });

  document.addEventListener("touchstart", () => {
    bird.velocity = lift;
  });

  draw();
}

document.getElementById("start-btn").addEventListener("click", function () {
  const audio = document.getElementById("bg-audio");
  audio.volume = 1.0;
  audio.play().catch(() => alert("Разрешите воспроизведение звука!"));
  document.getElementById("start-btn").style.display = "none";
  document.getElementById("game-canvas").style.display = "block";
  startFlappyBird();
});