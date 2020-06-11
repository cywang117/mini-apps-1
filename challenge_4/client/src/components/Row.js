import React from 'react';
import Square from './Square';

const Row = ({ row }) => {
  return (
    <React.Fragment>
      {
        row.map((square, idx) => <Square display={square} key={idx} />)
      }
    </React.Fragment>
  );
}

export default Row;