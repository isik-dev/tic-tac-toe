import { utils } from 'utils';

const Board = ({ squares, onClick }) => {
  const { renderSquare } = utils();
  return (
    <div>
      <div className="board-row">
        {renderSquare(0, { onClick, squares })}
        {renderSquare(1, { onClick, squares })}
        {renderSquare(2, { onClick, squares })}
      </div>
      <div className="board-row">
        {renderSquare(3, { onClick, squares })}
        {renderSquare(4, { onClick, squares })}
        {renderSquare(5, { onClick, squares })}
      </div>
      <div className="board-row">
        {renderSquare(6, { onClick, squares })}
        {renderSquare(7, { onClick, squares })}
        {renderSquare(8, { onClick, squares })}
      </div>
    </div>
  );
};

export default Board;
