class Game {
  constructor() {
    this.turn = 'X';
    this.scores = {
      x: 0,
      o: 0
    };
    this.board = new Array(9).fill('');
    this.movesLeft = 9;
    this.winnerFound = false;
  }

  updateState(squareId) {
    // Update board state & check winner
    this.board[squareId] = this.turn;
    let winnerIdxIfPresent = getWinner(this.board);
    if (winnerIdxIfPresent.length) {
      this.winnerFound = true;
      this.winningIdx = winnerIdxIfPresent;
      return;
    }

    // If no winner, toggle turn & decrement moves
    if (this.turn === 'X') this.turn = 'O';
    else this.turn = 'X';
    this.movesLeft--;
  }

  updateDisplays() {
    // Board display update
    let squareNodes = document.getElementsByClassName('square');
    for (let i = 0; i < squareNodes.length; i++) {
      squareNodes[i].innerText = this.board[i];
      if (this.winningIdx && this.winningIdx.length && this.winningIdx.includes(i)) {
        squareNodes[i].style.backgroundColor = 'green';
      }
    }

    // Game status display update
    let status = document.getElementById('status');
    if (this.winnerFound) {
      status.innerText = `${this.turn} wins!`;
      this.scores[this.turn.toLowerCase()]++;
    } else if (this.movesLeft === 0) {
      status.innerText = 'Tie!';
    } else  {
      status.innerText = `${this.turn}'s turn`;
    }

    // Score display
    document.getElementById('x').innerText = this.scores.x;
    document.getElementById('o').innerText = this.scores.o;
  }

  handleClick(e) {
    let sqId = e.target.id.slice(-1);
    if (this.board[sqId] === '' && !this.winnerFound) {
      this.updateState(sqId);
      this.updateDisplays();
    }
  }

  resetBoard() {
    this.board = new Array(9).fill('');
    this.turn = 'X';
    this.movesLeft = 9;
    this.winnerFound = false;
    this.winningIdx = [];
    let squareNodes = document.getElementsByClassName('square');
    for (let node of squareNodes) {
      node.style.backgroundColor = "transparent";
    }
    this.updateDisplays();
  }

  resetGame() {
    this.scores.x = 0;
    this.scores.o = 0;
    this.resetBoard();
  }
}

window.onload = () => {
  // Initialize game instance
  window.game = new Game();

  // Setup click handlers
  let squareNodes = document.getElementsByClassName('square');
  for (let node of squareNodes) {
    node.onclick = game.handleClick.bind(game);
  }
};

// Utils
/**
 * Checks a tic-tac-toe board for winners.
 * If so, return idx of squares won, i.e. [0,1,2]
 * else return empty array
 * @param {Array} board
 * @returns {Array}
 */
const getWinner = (board) => {
  return winningIdxs.reduce((acc, triplet) => {
    let [f, s, t] = triplet;
    if (
      board[f] === board[s] &&
      board[s] === board[t] &&
      board[f] === board[t] &&
      board[f] !== ''
      ) {
        return triplet;
      } else return acc;
  }, []);
};

const winningIdxs = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
