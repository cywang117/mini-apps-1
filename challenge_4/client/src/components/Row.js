import React from 'react';
import styled from 'styled-components';
import Square from './Square';

const FlexRow = styled.div`
  display: flex;
`;

const Row = ({ row, rowIdx, handleClick }) => {
  return (
    <FlexRow>
      {
        row.map((square, idx) => (
          <Square
            display={square}
            rowIdx={rowIdx}
            colIdx={idx}
            key={idx}
            handleClick={handleClick}
          />
        ))
      }
    </FlexRow>
  );
}

export default Row;