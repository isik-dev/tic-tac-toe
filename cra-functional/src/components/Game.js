import Board from 'components/Board';
import { useState } from 'react';
import { utils } from 'utils';

const Game = () => {
  const { calculateWinner } = utils();
  /**
   * Initial State is created with:
   * history: [{ squares: [null, null, null, null, null, null, null, null, null] }]
   * xIsNext: true
   * stepNumber: 0
   */
  const [state, setState] = useState({
    history: [{ squares: Array(9).fill(null) }],
    xIsNext: true,
    stepNumber: 0,
  });
  const history = state.history;
  const current = history[state.stepNumber];
  const winner = calculateWinner(current.squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (state.xIsNext ? 'X' : 'O');
  }

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to the game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  /**
   * handleClick Logic:
   * creates history var that looks like: [{ squares: [null, null, null, null, null, null, null, null, null] }]
   * creates current var (basicall the last obj of history var)
   * and looks like: { squares: [null, null, null, null, null, null, null, null, null] }
   * creates squares var that looks like: [null, null, null, null, null, null, null, null, null]
   * checks if there is a winner or the square is dirty, if yes return else proceed
   * sets that square to either X or O
   * sets state to latest data
   */
  function handleClick(i) {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = state.xIsNext ? 'X' : 'O';
    setState({
      stepNumber: history.length,
      history: history.concat([{ squares: squares }]),
      xIsNext: !state.xIsNext,
    });
    console.log('functional state', state);
  }

  function jumpTo(step) {
    setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
    console.log('class jumpTo state', state);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={state.history[state.stepNumber].squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
