import React from 'react';

const Score = ({ score, setScore }) => {
  return (
    <div>
      <p>Player 1: {score[0]}</p>
      <p>Player 2: {score[1]}</p>
    </div>
  );
}

export default Score;