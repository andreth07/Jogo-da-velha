document.addEventListener('DOMContentLoaded', function () {
  const board = document.getElementById('board');
  const status = document.getElementById('status');

  let currentPlayer = 'X';
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
      [0, 4, 8], [2, 4, 6]             // Diagonais
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        return gameBoard[a];
      }
    }

    if (!gameBoard.includes('')) {
      return 'draw';
    }

    return null;
  }

  function handleClick(index) {
    if (!gameActive || gameBoard[index] !== '') return;

    gameBoard[index] = currentPlayer;
    updateBoard();

    const winner = checkWinner();
    if (winner) {
      endGame(winner);
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = `Vez do Jogador ${currentPlayer}`;
    }
  }

  function updateBoard() {
    for (let i = 0; i < 9; i++) {
      const cellElement = document.getElementById(`cell${i}`);
      cellElement.textContent = gameBoard[i];
    }
  }

  function endGame(result) {
    if (result === 'draw') {
      status.textContent = 'Empate! O jogo acabou.';
    } else {
      status.textContent = `Jogador ${result} venceu!`;
    }
    gameActive = false;
  }

  function initializeBoard() {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.id = `cell${i}`;
      cell.addEventListener('click', () => handleClick(i));
      board.appendChild(cell);
    }
  }

  initializeBoard();
});
