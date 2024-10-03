document.addEventListener("DOMContentLoaded", function () {
  const dino = document.querySelector(".dino");
  const grid = document.querySelector(".grid");
  const alert = document.getElementById("alert");
  const desert = document.getElementById("desert");
  const gravity = 0.9;
  let isJumping = false;
  let isGameOver = false;
  let randomTime = Math.random() * 4000;
  document.addEventListener("keydown", control);

  function control(e) {
    if (e.keyCode === 32) {
      if (!isJumping) jump();
    }
  }
  let position = 0;
  function jump() {
    let count = 0;
    isJumping = true;
    let timerId = setInterval(function () {
      //move down
      if (count === 15) {
        clearInterval(timerId);
        let downTimerId = setInterval(function () {
          if (count === 1) {
            clearInterval(downTimerId);
            isJumping = false;
          }
          position -= 5;
          count--;
          position *= gravity;
          dino.style.bottom = position + "px";
        }, 20);
      }

      //move up !
      position += 30;
      count++;
      position *= gravity;
      dino.style.bottom = position + "px";
    }, 20);
  }

  function generateObstacles() {
    if (!isGameOver) {
      let obstaclePosition = 1000;
      const obstacle = document.createElement("div");
      obstacle.classList.add("obstacle");
      grid.appendChild(obstacle);
      obstacle.style.left = obstaclePosition + "px";

      let timerId = setInterval(function () {
        if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
          clearInterval(timerId);

          alert.innerHTML = "Game Over";
          // add style to stop grid
          desert.style.animationPlayState = "paused";

          isGameOver = true;

          //remove all children
          while (grid.firstChild) {
            grid.removeChild(grid.lastChild);
          }
        }

        obstaclePosition -= 10;
        obstacle.style.left = obstaclePosition + "px";
      }, 20);

      if (!isGameOver) setInterval(generateObstacles, randomTime);
    }
  }
  generateObstacles();
});
