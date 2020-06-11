import React from 'react';
import Row from './Row';

const Board = ({ board, setBoard }) => {
  return (
    <React.Fragment>
      {
        board.map((row, idx) => <Row row={row} key={idx} />)
      }
    </React.Fragment>
  );
}

export default Board;