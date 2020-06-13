import React from 'react';
import styled from 'styled-components';

const Slot = styled.div`
  border-radius: 50%;
  height: ${props => props.isPlacementDisplay ? '50px' : '75px'};
  width: ${props => props.isPlacementDisplay ? '50px' : '75px'};
  margin: ${props => props.isPlacementDisplay ? '15px' : '5px'};
  box-sizing: border-box;
  border: ${props => props.display === 'transparent' ? '1px solid black' : `1px solid ${props.display}`};
  background: ${props => props.display};
  cursor: ${props => props.isPlacementDisplay ? 'pointer' : ''};
  :hover {
    ${props => props.isPlacementDisplay ? 'opacity: 0.5;' : ''};
  }
`;

const Square = ({ display, rowIdx, colIdx, handleClick = null, isPlacementDisplay = false }) => {
  return (
    <Slot
      display={display}
      onClick={handleClick ? () => {handleClick(colIdx)} : () => {}}
      isPlacementDisplay={isPlacementDisplay}
      data-testid={`game-sq-${rowIdx}${colIdx}`}
    />
  );
}

export default Square;