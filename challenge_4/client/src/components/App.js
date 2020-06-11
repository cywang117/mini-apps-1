import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import checkWinner from '../../utils/checkWinner';
import Score from './Score';
import Message from './Message';
import Board from './Board';

const GlobalStyle = createGlobalStyle`
  body, html {
    height: 100vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;
  }
  p {
    margin: 0;
  }
  #app {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const FlexDiv = styled.div`
  width: 600px;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 80px;
`;

const StyledButton = styled.button`
  font-size: 1.5em;
  background: none;
  border: 1px solid black;
  font-family: inherit;
`;

const App = () => {
  // 6 rows, 7 cols
  let initialBoard = new Array(6).fill(new Array(7).fill('transparent'));
  let playerColors = {
    'Player 1': ['rgb(211, 52, 52)', 'rgba(211, 52, 52, 0.5)'],
    'Player 2': ['rgb(80, 80, 80)', 'rgba(80, 80, 80, 0.5)']
  };

  const [board, setBoard] = useState(initialBoard);
  const [score, setScore] = useState([0, 0]);
  const [hasWinner, setHasWinner] = useState(false);
  const [turn, setTurn] = useState('');

  useEffect(() => {
    if (JSON.stringify(board) !== JSON.stringify(initialBoard)) {
      let winnerExists = checkWinner(board);
      if (winnerExists) {
        setHasWinner(true);
      } else {
        turn === 'Player 1' ? setTurn('Player 2') : setTurn('Player 1');
      }
    } else {
      setHasWinner(false);
      setTurn('Player 1');
    }
  }, [board]);

  useEffect(() => {
    if (hasWinner) {
      let newScore = [...score];
      turn === 'Player 1' ? newScore[0]++ : newScore[1]++;
      setScore(newScore);
      document.addEventListener('click', resetBoard);
    } else {
      document.removeEventListener('click', resetBoard);
    }
  }, [hasWinner]);

  const resetBoard = (e) => {
    setBoard(initialBoard);
  }

  const handleSlotClick = (e, rowIdx, colIdx) => {
    if (!hasWinner) {
      if (board[rowIdx][colIdx] === 'transparent') {
        // Deep clone board to avoid mutating current state
        let newBoard = board.map(row => row.map(sq => sq));
        newBoard[rowIdx][colIdx] = playerColors[turn][0];
        setBoard(newBoard);
      }
    }
  }

  return (
    <React.Fragment>
      <GlobalStyle />
      <h1>Connect Four</h1>
      <Score score={score} />
      <Message turn={turn} hasWinner={hasWinner} />
      <Board board={board} handleClick={handleSlotClick} />
      <FlexDiv>
        <StyledButton onClick={resetBoard}>Reset Board</StyledButton>
        <StyledButton onClick={() => setScore([0, 0])}>Reset Scores</StyledButton>
      </FlexDiv>

    </React.Fragment>
  );
}

export default App;