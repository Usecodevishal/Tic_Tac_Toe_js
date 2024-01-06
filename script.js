var currentPlayer = "X";
var gameState = ["", "", "", "", "", "", "", "", ""];
var gameRunning = true;
players = {};

// let play with players first

function StartGame() {
  players.player1 = document.getElementById("player-1").value || "Player 1";
  players.player2 = document.getElementById("player-2").value || "Player 2";

  document.getElementById(
    "player-turn"
  ).innerText = `${players.player1}'s turn`;

  

  document.getElementById("startGame-page").style.display = "none";
  document.getElementById("GameBoard").style.display = "block";
}

function moveInBox(index) {
  if (gameState[index] !== "" || !gameRunning) {
    return;
  }

  document.getElementsByClassName("cell")[index].innerText = currentPlayer;

  gameState[index] = currentPlayer;

  

  checkResult();
}

function checkResult() {
  const winConditions = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6],
  ];

  let gameWon = false;
  let allWin = winConditions.length;

  for (let i = 0; i < allWin; i++) {
    let winConditon = winConditions[i];
    let a = gameState[winConditon[0]];
    let b = gameState[winConditon[1]];
    let c = gameState[winConditon[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      gameWon = true;
      break;
    }
  }

  if(gameWon){
    gameActive = false;
    gameOver(currentPlayer === "X"? `${players.player1} (X)`: `${players.player2} (O)`);
  }

  let gameDraw = !gameState.includes("");

  if(gameDraw){
    gameRunning = false;
    gameOver("Draw");
  }

  currentPlayer = currentPlayer === "X"? "O": "X";
  document.getElementById("player-turn").innerText = currentPlayer === "X"? `${players.player1}'s turn`: `${players.player2}'s turn`;
}

function gameOver(result) {
  
  //alert(`Result is ${result}`);
  document.getElementById("game-over").style.display="flex";
  document.getElementById("winner-div").innerText = result === "Draw"? "Game is Draw!" : `Winner is ${result}`
}

function restartGame(){

  document.getElementById("startGame-page").style.display = "block";
  document.getElementById("GameBoard").style.display = "none";
  document.getElementById("game-over").style.display="none";

currentPlayer = "X";
gameState = ["", "", "", "", "", "", "", "", ""];

document.querySelectorAll(".cell").forEach((el) => el.innerText = "");
gameRunning = true;
players = {};

}

document.addEventListener('DOMContentLoaded', () => {
  restartGame();
})


