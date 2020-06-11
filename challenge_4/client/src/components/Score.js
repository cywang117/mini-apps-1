import React from 'react';
import styled from 'styled-components';

const FlexScore = styled.div`
  display: flex;
  justify-content: space-between;
  & p {
    margin: 5px 10px 20px 10px;
  }
`;

const Score = ({ score }) => {
  return (
    <FlexScore>
      <p>Player 1: {score[0]}</p>
      <p>Player 2: {score[1]}</p>
    </FlexScore>
  );
}

export default Score;