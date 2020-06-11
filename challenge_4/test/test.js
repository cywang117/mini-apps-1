import test from 'ava';
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import App from '../client/src/components/App';

let initialBoard = new Array(6).fill(new Array(7).fill('transparent'));
let winningRows = [
  [[0, 0], [0, 1], [0, 2], [0, 3]],
  [[0, 1], [0, 2], [0, 3], [0, 4]],
  [[0, 2], [0, 3], [0, 4], [0, 5]],
  [[0, 3], [0, 4], [0, 5], [0, 6]],
  [[1, 0], [1, 1], [1, 2], [1, 3]],
  [[1, 1], [1, 2], [1, 3], [1, 4]],
  [[1, 2], [1, 3], [1, 4], [1, 5]],
  [[1, 3], [1, 4], [1, 5], [1, 6]],
  [[2, 0], [2, 1], [2, 2], [2, 3]],
  [[2, 1], [2, 2], [2, 3], [2, 4]],
  [[2, 2], [2, 3], [2, 4], [2, 5]],
  [[2, 3], [2, 4], [2, 5], [2, 6]],
  [[3, 0], [3, 1], [3, 2], [3, 3]],
  [[3, 1], [3, 2], [3, 3], [3, 4]],
  [[3, 2], [3, 3], [3, 4], [3, 5]],
  [[3, 3], [3, 4], [3, 5], [3, 6]],
  [[4, 0], [4, 1], [4, 2], [4, 3]],
  [[4, 1], [4, 2], [4, 3], [4, 4]],
  [[4, 2], [4, 3], [4, 4], [4, 5]],
  [[4, 3], [4, 4], [4, 5], [4, 6]],
  [[5, 0], [5, 1], [5, 2], [5, 3]],
  [[5, 1], [5, 2], [5, 3], [5, 4]],
  [[5, 2], [5, 3], [5, 4], [5, 5]],
  [[5, 3], [5, 4], [5, 5], [5, 6]]
];
let winningCols = [
  [[0, 0], [1, 0], [2, 0], [3, 0]],
  [[1, 0], [2, 0], [3, 0], [4, 0]],
  [[2, 0], [3, 0], [4, 0], [5, 0]],
  [[0, 1], [1, 1], [2, 1], [3, 1]],
  [[1, 1], [2, 1], [3, 1], [4, 1]],
  [[2, 1], [3, 1], [4, 1], [5, 1]],
  [[0, 2], [1, 2], [2, 2], [3, 2]],
  [[1, 2], [2, 2], [3, 2], [4, 2]],
  [[2, 2], [3, 2], [4, 2], [5, 2]],
  [[0, 3], [1, 3], [2, 3], [3, 3]],
  [[1, 3], [2, 3], [3, 3], [4, 3]],
  [[2, 3], [3, 3], [4, 3], [5, 3]],
  [[0, 4], [1, 4], [2, 4], [3, 4]],
  [[1, 4], [2, 4], [3, 4], [4, 4]],
  [[2, 4], [3, 4], [4, 4], [5, 4]],
  [[0, 5], [1, 5], [2, 5], [3, 5]],
  [[1, 5], [2, 5], [3, 5], [4, 5]],
  [[2, 5], [3, 5], [4, 5], [5, 5]],
  [[0, 6], [1, 6], [2, 6], [3, 6]],
  [[1, 6], [2, 6], [3, 6], [4, 6]],
  [[2, 6], [3, 6], [4, 6], [5, 6]]
];
let winningMajorDiag = [
  [[0, 0], [1, 1], [2, 2], [3, 3]],
  [[0, 1], [1, 2], [2, 3], [3, 4]],
  [[0, 2], [1, 3], [2, 4], [3, 5]],
  [[0, 3], [1, 4], [2, 5], [3, 6]],
  [[1, 0], [2, 1], [3, 2], [4, 3]],
  [[1, 1], [2, 2], [3, 3], [4, 4]],
  [[1, 2], [2, 3], [3, 4], [4, 5]],
  [[1, 3], [2, 4], [3, 5], [4, 6]],
  [[2, 0], [3, 1], [4, 2], [5, 3]],
  [[2, 1], [3, 2], [4, 3], [5, 4]],
  [[2, 2], [3, 3], [4, 4], [5, 5]],
  [[2, 3], [3, 4], [4, 5], [5, 6]]
];
let winningMinorDiag = [
  [[0, 3], [1, 2], [2, 1], [3, 0]],
  [[0, 4], [1, 3], [2, 2], [3, 1]],
  [[0, 5], [1, 4], [2, 3], [3, 2]],
  [[0, 6], [1, 5], [2, 4], [3, 3]],
  [[1, 3], [2, 2], [3, 1], [4, 0]],
  [[1, 4], [2, 3], [3, 2], [4, 1]],
  [[1, 5], [2, 4], [3, 3], [4, 2]],
  [[1, 6], [2, 5], [3, 4], [4, 3]],
  [[2, 3], [3, 2], [4, 1], [5, 0]],
  [[2, 4], [3, 3], [4, 2], [5, 1]],
  [[2, 5], [3, 4], [4, 3], [5, 2]],
  [[2, 6], [3, 5], [4, 4], [5, 3]],
];

// React Testing Library (RTL)'s cleanup doesn't actually seem to work between test blocks
// for now, so .before is used instead of .beforeEach, which will render App x times
// (where x is the number of test blocks)
test.before(() => render(<App />));
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

test('Updates board on clicking square', t => {
  // TODO
  t.fail();
});

test('Updates displays appropriately only for valid wins', t => {
  // TODO
  t.fail();
});

test('Resets scores and/or board on button click', t => {
  // TODO
  t.fail();
});

