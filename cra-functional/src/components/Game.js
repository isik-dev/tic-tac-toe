import Board from 'components/Board';
import { useState } from 'react';
import { utils } from 'utils';

const Game = () => {
  const { calculateWinner } = utils();
  const [state, setState] = useState({
    history: [{ squares: Array(9).fill(null) }],
    xIsNext: true,
    stepNumber: 0,
  });

  const history = state.history;
  const current = history[state.stepNumber];

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
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div></div>
        <ol></ol>
      </div>
    </div>
  );
};

export default Game;
