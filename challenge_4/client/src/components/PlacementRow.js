import React from 'react';
import styled from 'styled-components';
import Square from './Square';

const StyledPlacementRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const PlacementRow = ({ handleClick }) => {
  let cols = new Array(7).fill(0);
  return (
    <StyledPlacementRow>
      {
        cols.map((_, idx) => (
          <Square
            display={'lightgray'}
            rowIdx={'p'}
            colIdx={idx}
            key={idx}
            handleClick={handleClick}
            isPlacementDisplay={true}
          />
        ))
      }
    </StyledPlacementRow>
  );
}

export default PlacementRow;