// Select the game status display element
const statusDisplay = document.querySelector('.game--status');

// Game state variables
let gameActive = true; // Tracks whether the game is ongoing
let currentPlayer = "X"; // Tracks the current player
let gameState = ["", "", "", "", "", "", "", "", ""]; // Tracks the state of each cell

// Messages for game states
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// Initialize the game status display
statusDisplay.innerHTML = currentPlayerTurn();

// Winning conditions: All possible lines for a win
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal lines
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical lines
    [0, 4, 8], [2, 4, 6]             // Diagonal lines
];

// Function to handle a played cell
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer; // Update game state
    clickedCell.innerHTML = currentPlayer; // Display player's mark
    clickedCell.style.transform = "scale(1.3)"; // Animate mark
    setTimeout(() => {
        clickedCell.style.transform = "scale(1)";
    }, 200);
}

// Function to change player
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player
    statusDisplay.innerHTML = currentPlayerTurn(); // Update status
}

// Function to validate the result
function handleResultValidation() {
    let roundWon = false; // Flag for win
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i]; // Check each condition
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') continue; // Skip empty cells
        if (a === b && b === c) {
            roundWon = true; // Set win flag
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage(); // Display win message
        gameActive = false; // End game
        return;
    }

    const roundDraw = !gameState.includes(""); // Check for draw
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage(); // Display draw message
        gameActive = false; // End game
        return;
    }

    handlePlayerChange(); // If no win/draw, change player
}

// Function to handle a cell click
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target; // Get clicked cell
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index')); // Get cell index

    // If cell already filled or game over, do nothing
    if (gameState[clickedCellIndex] !== "" || !gameActive) return;

    handleCellPlayed(clickedCell, clickedCellIndex); // Mark cell
    handleResultValidation(); // Check for result
}

// Function to restart the game
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X"; // Reset to player X
    gameState = ["", "", "", "", "", "", "", "", ""]; // Clear game state
    statusDisplay.innerHTML = currentPlayerTurn(); // Reset status display
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerHTML = ""; // Clear cell contents
    });
}

// Add event listeners for each cell and the restart button
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

