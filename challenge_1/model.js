class GameModel {
  constructor(view, turn = 'Player 1', score = [0, 0], players = ['Player 1', 'Player 2']) {
    this.View = view;
    this.winningIdxs = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    this.state = {
      turn,
      score,
      players,
      board: new Array(9).fill(''),
      movesLeft: 9,
      winnerFound: false,
      winningIdx: null
    };

    this.View.render({ ...this.state });
  }

  // Getters
  getCurrentPlayerAndIdx() {
    return [this.state.turn, this.state.players.indexOf(this.state.turn)];
  }

  getNextPlayerAndIdx() {
    return this.state.players.indexOf(this.state.turn) ? [this.state.players[0], 0] : [this.state.players[1], 1];
  }

  getScore() {
    return this.state.score.slice();
  }

  getPlayers() {
    return this.state.players.slice();
  }

  getTurn() {
    return this.state.turn;
  }

  isSquareEmpty(idx) {
    return this.state.board[idx] === '';
  }

  hasWinner() {
    return this.state.winnerFound;
  }

  // Returns array of 3 indexes if winner, else empty array
  getWinner(board) {
    return this.winningIdxs.reduce((acc, triplet) => {
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
  }

  // Setters
  setState(squareId, players) {
    // Given a changed square id in the board, update Model state,
    // handling internal state changes, then rendering

    // Update player & turn names if changed
    if (players !== undefined && players.some((player, idx) => this.state.players[idx] !== player)) {
      let changedPlayerIdx = this.state.players.indexOf(this.state.turn);
      this.state.players = [...players];
      this.state.turn = this.state.players[changedPlayerIdx];
      console.log('Player name changed')
    }

    if (squareId !== undefined) {
      // Update board state & check winner
      let [curPlayer, curIdx] = this.getCurrentPlayerAndIdx();
      let [nxtPlayer, nxtIdx] = this.getNextPlayerAndIdx();
      this.state.board[squareId] = curIdx === 0 ? 'X' : 'O';
      let winnerIdxIfPresent = this.getWinner(this.state.board);
      if (winnerIdxIfPresent.length) {
        this.state.winnerFound = true;
        this.state.winningIdx = winnerIdxIfPresent;
        this.state.score[curIdx]++;
      } else {
        // If no winner, toggle turn & decrement moves
        this.state.turn = nxtPlayer;
        this.state.movesLeft--;
      }
    }

    this.View.render({ ...this.state });
  }
}