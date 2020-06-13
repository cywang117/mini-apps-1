import test from 'ava';
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import App from '../client/src/components/App';

let playerColors = {
  'Player 1': 'rgb(211, 52, 52)',
  'Player 2': 'rgb(80, 80, 80)'
};

// Run ava in serial mode (-s flag) to ensure .afterEach(cleanup) works as intended
test.beforeEach(() => render(<App />));
test.afterEach(cleanup);

test('Smoke test - renders correctly', t => {
  // Title
  t.notThrows(() => screen.getByText('Connect Four'));

  // Scoreboard
  try {
    let scoreDisplays = screen.getAllByText(/Player\s\d\:\s\d+/);
    t.notThrows(() => scoreDisplays);
    t.is(scoreDisplays.length, 2);
  } catch(e) {
    t.fail(e.message);
  }

  // Initial message
  t.notThrows(() => screen.getByText('Player 1\'s turn!'));

  // Game board
  t.notThrows(() => screen.getByTestId('game-board'));
  // Placement row
  try {
    let placementRows = screen.getAllByTestId(/game-sq-p\d/);
    t.notThrows(() => placementRows);
    t.is(placementRows.length, 7);
  } catch(e) {
    t.fail(e.message);
  }
  // Rows
  try {
    let rows = screen.getAllByTestId(/game-row-\d/);
    t.notThrows(() => rows);
    t.is(rows.length, 6);
  } catch(e) {
    t.fail(e.message);
  }
  // Squares
  try {
    let squares = screen.getAllByTestId(/game-sq-\d{2}/);
    t.notThrows(() => squares);
    t.is(squares.length, 42);
  } catch(e) {
    t.fail(e.message);
  }

  // 2 reset buttons
  let resetButtons = screen.getAllByRole('button');
  t.notThrows(() => resetButtons);
  t.is(resetButtons.length, 2);
});

test('Updates even columns correctly on clicking placement button', t => {
  // Piece should drop from highest slot to lowest free slot
  for (let i = 0; i <= 6; i+=2) {
    for (let j = 5; j >= 0; j--) {
      fireEvent.click(screen.getByTestId(`game-sq-p${i}`), { button: 0 });
      let style = window.getComputedStyle(screen.getByTestId(`game-sq-${j}${i}`));
      t.is(style.background, playerColors[`Player ${j % 2 ? '1' : '2'}`]);
    }
  }
});

// Two separate test blocks to ensure board reset & prevent unintended win state (without testing reset button yet)
test('Updates odd columns correctly on clicking placement button', t => {
  // Piece should drop from highest slot to lowest free slot
  for (let i = 1; i <= 5; i += 2) {
    for (let j = 5; j >= 0; j--) {
      fireEvent.click(screen.getByTestId(`game-sq-p${i}`), { button: 0 });
      let style = window.getComputedStyle(screen.getByTestId(`game-sq-${j}${i}`));
      t.is(style.background, playerColors[`Player ${j % 2 ? '1' : '2'}`]);
    }
  }
});

test('Resets board on clicking anywhere after win state', t => {
  let cols = screen.getAllByTestId(/game-sq-p\d/);
  let leftClick = { button: 0 };

  const clickCol = (idx) => {
    fireEvent.click(cols[idx], leftClick);
  }

  for (let i = 0; i < 4; i++) {
    if (i !== 3) {
      for (let j = 0; j < 2; j++) {
        clickCol(j);
      }
    } else {
      clickCol(0);
    }
  }
  t.notThrows(() => screen.getByText(/wins/));
  fireEvent.click(screen.getByText('Connect Four'), leftClick);
  t.notThrows(() => screen.getByText('Player 1\'s turn!'));
});

test('Resets scores and/or board on button click', t => {
  let cols = screen.getAllByTestId(/game-sq-p\d/);
  let leftClick = { button: 0 };

  const clickCol = (idx) => {
    fireEvent.click(cols[idx], leftClick);
  }

  // Reset Board button
  clickCol(0);
  clickCol(1);
  t.is(window.getComputedStyle(screen.getByTestId('game-sq-50')).background, playerColors['Player 1']);
  t.is(window.getComputedStyle(screen.getByTestId('game-sq-51')).background, playerColors['Player 2']);
  fireEvent.click(screen.getByText('Reset Board'), leftClick);
  t.is(window.getComputedStyle(screen.getByTestId('game-sq-50')).background, 'transparent');
  t.is(window.getComputedStyle(screen.getByTestId('game-sq-51')).background, 'transparent');

  // Reset Score button
  for (let k = 0; k < 3; k++) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 2; j++) {
        clickCol(i);
      }
    }
  }
  t.notThrows(() => screen.getByText('Player 1: 3'));
  fireEvent.click(screen.getByText('Reset Scores'), leftClick);
  t.notThrows(() => screen.getByText('Player 1: 0'));
});

test('Updates displays appropriately only for valid wins', t => {
  let cols = screen.getAllByTestId(/game-sq-p\d/);
  let leftClick = { button: 0 };

  const clickCol = (idx) => {
    fireEvent.click(cols[idx], leftClick);
  }

  // Row
  for (let i = 0; i < 4; i++) {
    if (i !== 3) {
      for (let j = 0; j < 2; j++) {
        clickCol(i);
      }
    } else {
      clickCol(i);
    }
  }
  t.notThrows(() => screen.getByText(/wins/));

  // Col
  fireEvent.click(screen.getByText('Reset Board'), leftClick);
  for (let i = 0; i < 4; i++) {
    if (i !== 3) {
      for (let j = 0; j < 2; j++) {
        clickCol(j);
      }
    } else {
      clickCol(0);
    }
  }
  t.notThrows(() => screen.getByText(/wins/));

  // Major diag
  fireEvent.click(screen.getByText('Reset Board'), leftClick);
  clickCol(0);
  for (let i = 0; i < 3; i++) {
    clickCol(1);
  }
  for (let i = 0; i < 3; i++) {
    clickCol(2);
  }
  for (let i = 0; i < 4; i++) {
    clickCol(3);
  }
  t.notThrows(() => screen.getByText(/wins/));

  // Minor diag
  fireEvent.click(screen.getByText('Reset Board'), leftClick);
  clickCol(6);
  for (let i = 0; i < 3; i++) {
    clickCol(5);
  }
  for (let i = 0; i < 3; i++) {
    clickCol(4);
  }
  for (let i = 0; i < 4; i++) {
    clickCol(3);
  }
  t.notThrows(() => screen.getByText(/wins/));
});