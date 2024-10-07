const state = {
    view: {
      squares: document.querySelectorAll(".square"),
      enemy: document.querySelector(".enemy"),
      timeLeft: document.querySelector("#time"),
      score: document.querySelector("#score"),
      modal: document.querySelector("#gameOverModal"),
      modalText: document.querySelector("#modalText"),
      modalButton: document.querySelector("#modalButton"),
      lives: document.querySelector("#lives"),
    },
    values: {
      timerId: null,
      countDownTimerId: setInterval(countDown, 1000),
      gameVelocity: 1000,
      hitPosition: 0,
      result: 0,
      currentTime: 10,
      lives: 3,
    },
  };
  
  function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
  
    if (state.values.currentTime <= 0 || state.values.lives <= 0) {
      clearInterval(state.values.countDownTimerId);
      clearInterval(state.values.timerId);
      showGameOverModal();
    }
  }
  
  function playSound() {
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
  }
  
  function playMissSound() {
    let audio = new Audio("./src/audios/miss.wav");
    audio.volume = 0.2;
    audio.play();
  }
  
  function randomSquare() {
    state.view.squares.forEach((square) => {
      square.classList.remove("enemy");
    });
  
    let randomNumber = Math.floor(Math.random() * state.view.squares.length);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
  }
  
  function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
  }
  
  function addListenerHitBox() {
    state.view.squares.forEach((square) => {
      square.addEventListener("mousedown", () => {
        if (square.id === state.values.hitPosition) {
          state.values.result++;
          state.view.score.textContent = state.values.result;
          state.values.hitPosition = null;
          playSound();
        } else {
          state.values.lives--;
          state.view.lives.textContent = "x" + state.values.lives;
          playMissSound();
          if (state.values.lives <= 0) {
            clearInterval(state.values.countDownTimerId);
            clearInterval(state.values.timerId);
            showGameOverModal();
          }
        }
      });
    });
  }
  
  function showGameOverModal() {
    state.view.modalText.textContent = "Game Over! Seu score foi: " + state.values.result;
    state.view.modal.style.display = "block";
  }
  
  function hideGameOverModal() {
    state.view.modal.style.display = "none";
    resetGame();
  }
  
  function resetGame() {
    state.values.result = 0;
    state.view.score.textContent = state.values.result;
    state.values.currentTime = 10;
    state.view.timeLeft.textContent = state.values.currentTime;
    state.values.lives = 3;
    state.view.lives.textContent = "x" + state.values.lives;
    state.values.timerId = null;
    state.values.countDownTimerId = setInterval(countDown, 1000);
    moveEnemy();
  }
  
  function init() {
    moveEnemy();
    addListenerHitBox();
    state.view.modalButton.addEventListener("click", hideGameOverModal);
  }
  
  init();