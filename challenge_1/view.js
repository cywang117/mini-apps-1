class GameView {
  constructor() {
    this.curState = null;
    this.squareNodes = document.getElementsByClassName('square');
    this.statusMessage = document.getElementById('status');
    this.xScoreDisplay = document.getElementById('x');
    this.oScoreDisplay = document.getElementById('o');
    this.playerInputs = document.getElementsByClassName('player-input');
  }
  // { turn, score, players, board, movesLeft, winnerFound, winningIdx }
  render(newState) {
    // Initial render on initialization or reset
    if (!this.curState) {
      this.curState = { ...newState };
      this.curState.board = new Array(9).fill('');
      this.statusMessage.innerText = `${this.curState.turn}'s turn`;
      for (let i = 0; i < this.squareNodes.length; i++) {
        this.squareNodes[i].innerText = this.curState.board[i];
        this.squareNodes[i].style.backgroundColor = 'transparent';
      }
      this.curState.players.forEach((playerName, idx) => {
        this.playerInputs[idx].value = playerName;
      });

    }

    // State changes that don't have direct render effects, but nonetheless updated in curState
    this.curState.movesLeft = newState.movesLeft;
    this.curState.winnerFound = newState.winnerFound;

    this.renderStatusMessage(newState);
    this.renderBoard(newState);
    this.renderScoreboard(newState);
  }

  renderStatusMessage({ turn, winnerFound, winningIdx, movesleft }) {
    if (this.curState.winnerFound) {
      this.curState.winningIdx = [...winningIdx];
      this.statusMessage.innerText = `${this.curState.turn} wins!`;
    } else if (this.curState.movesLeft === 0) {
      this.statusMessage.innerText = 'Tie!';
    } else if (this.curState.turn !== turn) {
      this.curState.turn = turn;
      this.statusMessage.innerText = `${this.curState.turn}'s turn`;
    }
  }

  renderBoard({ board }) {
    // only re-render board squares that have changed since last render
    let changeIdx = this.getBoardChanges(this.curState.board, board);
    if (changeIdx && changeIdx.length) {
      this.curState.board = [...board];
      changeIdx.forEach(idx => {
        this.squareNodes[idx].innerText = this.curState.board[idx];
      });
      // If winner, render square color
      this.curState.winnerFound && this.curState.winningIdx.forEach(idx => {
        this.squareNodes[idx].style.backgroundColor = 'green';
      });
    }
  }

  renderScoreboard({ score, players }) {
    this.curState.score = [...score];
    this.curState.players = [...players];
    this.xScoreDisplay.innerText = this.curState.score[0];
    this.oScoreDisplay.innerText = this.curState.score[1];
    this.playerInputs[0].value = players[0];
    this.playerInputs[1].value = players[1];
  }

  getBoardChanges(oldBoard, newBoard) {
    return oldBoard.reduce((acc, curVal, idx) => {
      if (newBoard[idx] !== curVal) {
        if (!acc) {
          acc = [];
        }
        acc.push(idx);
      }
      return acc;
    }, null);
  }
}