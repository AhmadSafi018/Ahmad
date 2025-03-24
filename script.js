const gameBoard = document.getElementById("gameBoard");
const message = document.getElementById("message");

// Initial grid state
let tiles = [1, 2, 3, 4, 5, 6, 7, 8, ""];

// Initialize the game board
function initGame() {
  gameBoard.innerHTML = "";
  tiles.forEach((tile, index) => {
    const tileElement = document.createElement("div");
    tileElement.className = "tile";
    if (tile === "") {
      tileElement.classList.add("empty");
    } else {
      tileElement.textContent = tile;
      tileElement.addEventListener("click", () => moveTile(index));
    }
    gameBoard.appendChild(tileElement);
  });
  message.textContent = "";
}

// Move a tile
function moveTile(index) {
  const emptyIndex = tiles.indexOf("");
  const validMoves = [
    emptyIndex - 3, // Above
    emptyIndex + 3, // Below
    emptyIndex - 1, // Left
    emptyIndex + 1, // Right
  ];

  if (validMoves.includes(index) && isValidMove(index, emptyIndex)) {
    // Swap tiles
    [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
    initGame();
    checkWin();
  }
}

// Check if move is valid
function isValidMove(index, emptyIndex) {
  // Prevent invalid moves across rows
  if (Math.abs(index - emptyIndex) === 1) {
    const rowStart = Math.floor(index / 3) * 3;
    return emptyIndex >= rowStart && emptyIndex < rowStart + 3;
  }
  return true;
}

// Shuffle tiles
function shuffle() {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  initGame();
}

// Reset the game
function resetGame() {
  tiles = [1, 2, 3, 4, 5, 6, 7, 8, ""];
  initGame();
}

// Check for a win
function checkWin() {
  const winningState = [1, 2, 3, 4, 5, 6, 7, 8, ""];
  if (tiles.every((tile, index) => tile === winningState[index])) {
    message.textContent = "Congratulations! You solved the puzzle!";
  }
}

// Initialize game on load
initGame();
