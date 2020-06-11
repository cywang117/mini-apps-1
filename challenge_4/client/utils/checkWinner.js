const checkWinner = (board) => {
  for (let i = 0; i < board.length; i++) {
    let row = board[i];
    for (let j = 0; j < row.length; j++) {
      // Check winning rows
      if (
        j < row.length - 3 &&
        row[j] !== 'transparent' &&
        row[j] === row[j + 1] &&
        row[j] === row[j + 2] &&
        row[j] === row[j + 3]
      ) {
        return [[i, j], [i, j + 1], [i, j + 2], [i, j + 3]];
      }

      // Check winning cols
      if (
        i < board.length - 3 &&
        board[i][j] !== 'transparent' &&
        board[i][j] === board[i + 1][j] &&
        board[i][j] === board[i + 2][j] &&
        board[i][j] === board[i + 3][j]
      ) {
        return [[i, j], [i + 1, j], [i + 2, j], [i + 3, j]];
      }

      // Check winning major diagonals
      if (
        i < board.length - 3 &&
        j < row.length - 3 &&
        board[i][j] !== 'transparent' &&
        board[i][j] === board[i + 1][j + 1] &&
        board[i][j] === board[i + 2][j + 2] &&
        board[i][j] === board[i + 3][j + 3]
      ) {
        return [[i, j], [i + 1, j + 1], [i + 2, j + 2], [i + 3, j + 3]];
      }

      // Check winning minor diagonals
      if (
        i < board.length - 3 &&
        j >= 3 &&
        board[i][j] !== 'transparent' &&
        board[i][j] === board[i + 1][j - 1] &&
        board[i][j] === board[i + 2][j - 2] &&
        board[i][j] === board[i + 3][j - 3]
      ) {
        return [[i, j], [i + 1, j - 1], [i + 2, j - 2], [i + 3, j - 3]];
      }
    }
  }
  return false;
}

export default checkWinner;