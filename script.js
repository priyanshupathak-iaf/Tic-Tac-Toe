const board = document.getElementById("board");
const statusText = document.getElementById("status");

let cells = [];
let currentPlayer = "X";
let gameActive = true;

function createBoard() {
    board.innerHTML = "";
    cells = [];

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;

        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
        cells.push(cell);
    }
}

function handleClick(e) {
    const cell = e.target;

    if (cell.textContent !== "" || !gameActive) return;

    cell.textContent = currentPlayer;

    if (checkWin()) {
        statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (cells.every(c => c.textContent !== "")) {
        statusText.textContent = "🤝 It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin() {
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    return wins.some(combo => {
        return combo.every(i => cells[i].textContent === currentPlayer);
    });
}

function resetGame() {
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's Turn";
    createBoard();
}

function toggleTheme() {
    document.body.classList.toggle("light");
}

// Initialize
createBoard();
statusText.textContent = "Player X's Turn";