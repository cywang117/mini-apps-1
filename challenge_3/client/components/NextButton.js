import React from 'react';
import { ClickAwayListener, Tooltip, Button } from '@material-ui/core';

const NextButton = ({ tooltipMessage, tooltipOpen, setTooltipOpen, handleNextClick }) => (
  <div className="centerFlex">
    <ClickAwayListener onClickAway={() => { setTooltipOpen(false); }}>
      <Tooltip
        arrow
        title={tooltipMessage}
        open={tooltipOpen}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextClick}
        >
          Next
        </Button>
      </Tooltip>
    </ClickAwayListener>
  </div>
);

export default NextButton;