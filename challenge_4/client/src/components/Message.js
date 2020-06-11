import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MessageDisplay = styled.div`
  margin-bottom: 20px;
  display: inline-flex;
  height: 30px;
  font-size: 1.5em;
  & button {
    margin-left: 20px;
  }
`;

const Message = ({ turn, hasWinner }) => {
  const [message, setMessage] = useState(`${turn}\'s turn!`);

  useEffect(() => {
    hasWinner ? setMessage(`${turn} wins! Click anywhere to reset.`) : setMessage(`${turn}\'s turn!`);
  }, [turn, hasWinner]);

  return (
    <MessageDisplay>
      {message}
    </MessageDisplay>
  )
}

export default Message;