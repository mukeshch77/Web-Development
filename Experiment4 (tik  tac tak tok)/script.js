// Select all cells and buttons
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset-button');


let currentPlayer = 'X';
let gameActive = true;

// Winning combinations
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]            
];


function checkWinner() {
    for (let i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i];
        
        if (
            cells[a].textContent !== '' &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            gameActive = false;
            status.textContent = `${currentPlayer} Wins!`;
            return;
        }
    }
    
    // Check for a draw
    if ([...cells].every(cell => cell.textContent !== '')) {
        gameActive = false;
        status.textContent = "It's a Draw!";
    }
}

// Function to handle cell click
function handleCellClick(event) {
    if (!gameActive) return; 
    
    const cell = event.target;
    if (cell.textContent !== '') return; 
    
    cell.textContent = currentPlayer; // Mark the cell
    checkWinner();
    
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}


function resetGame() {
    cells.forEach(cell => (cell.textContent = ''));
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = '';
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
