import React, { useState } from 'react';
import Score from './Score';
import Board from './Board';

const App = () => {
  // 6 rows, 7 cols
  let initialBoard = [
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '']
  ];

  const [board, setBoard] = useState(initialBoard);
  const [score, setScore] = useState([0, 0]);

  return (
    <React.Fragment>
      <Score score={score} setBoard={setScore} />
      <Board board={board} setBoard={setBoard} />
    </React.Fragment>
  );
}

export default App;