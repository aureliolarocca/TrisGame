const cell = document.querySelectorAll(".cell");
const button = document.querySelector("button");
const resetBtn = document.getElementById("resetBtn");
let sceltaPlayer2 = [];
let sceltaPlayer1 = [];
let player = true;
let gameOver = false;

const combinazioniVincenti = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function cellaCliccata(event) {
  if (gameOver) return;
  event.target.removeEventListener("click", cellaCliccata);
  const index = parseInt(event.target.getAttribute("data-index"));

  if (player) {
    event.target.style.backgroundImage = "url(croce.png)";
    sceltaPlayer1.push(index);
    if (checkWin(sceltaPlayer1)) {
      alert("Giocatore 1 ha vinto!");
      gameOver = true;
      resetGame();
      return;
    }
    player = false;
  } else {
    event.target.style.backgroundImage = "url(cerchio.png)";
    sceltaPlayer2.push(index);
    if (checkWin(sceltaPlayer2)) {
      alert("Giocatore 2 ha vinto!");
      gameOver = true;
      resetGame();
      return;
    }
    player = true;
  }

  if (sceltaPlayer1.length + sceltaPlayer2.length === 9) {
    alert("È un pareggio!");
    gameOver = true;
  }
}

function checkWin(playerChoices) {
  return combinazioniVincenti.some((combination) =>
    combination.every((index) => playerChoices.includes(index))
  );
}

function resetGame() {
  sceltaPlayer1 = [];
  sceltaPlayer2 = [];
  player = true;
  gameOver = false;
  cell.forEach((element) => {
    element.style.backgroundImage = "none";
    element.addEventListener("click", cellaCliccata);
  });
}

function startGame() {
  cell.forEach((element) => {
    element.addEventListener("click", cellaCliccata);
  });
}

button.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);
