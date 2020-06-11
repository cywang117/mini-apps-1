import React from 'react';
import styled from 'styled-components';
import Row from './Row';

const StyledBoard = styled.div`
  margin-bottom: 20px;
`;

const Board = ({ board, handleClick }) => {
  return (
    <StyledBoard data-testid="game-board">
      {
        board.map((row, idx) => <Row row={row} rowIdx={idx} key={idx} handleClick={handleClick} />)
      }
    </StyledBoard>
  );
}

export default Board;