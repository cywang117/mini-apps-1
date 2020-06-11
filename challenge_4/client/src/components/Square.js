import React from 'react';
import styled from 'styled-components';

const Slot = styled.div`
  border-radius: 50%;
  height: 75px;
  width: 75px;
  margin: 5px;
  box-sizing: border-box;
  border: ${props => props.display === 'transparent' ? '1px solid black' : `1px solid ${props.display}`};
  background: ${props => props.display};
  cursor: pointer;
  :hover {
    opacity: 0.5;
  }
`;

const Square = ({ display, rowIdx, colIdx, handleClick }) => {
  return (
    <Slot display={display} onClick={(e) => handleClick(e, rowIdx, colIdx)} />
  );
}

export default Square;