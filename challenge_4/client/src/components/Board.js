import React from 'react';
import styled from 'styled-components';
import PlacementRow from './PlacementRow';
import Row from './Row';

const StyledBoard = styled.div`
  margin-bottom: 20px;
`;

const Board = ({ board, handleClick }) => {
  return (
    <StyledBoard data-testid="game-board">
      <PlacementRow handleClick={handleClick} />
      {
        board.map((row, idx) => (
          <Row
            row={row}
            rowIdx={idx}
            key={idx}
            testid={`game-row-${idx}`}
          />
        ))
      }
    </StyledBoard>
  );
}

export default Board;