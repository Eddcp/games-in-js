import { WINNING_COMBINATIONS } from "../helpers/game-logic";
import { BoardState, Player } from "../types";
import Square from "./Square";

type BoardProps = {
  board: BoardState;
  winner: Player | null;
  onClick: (index: number) => void;
};

function Board({ board, onClick, winner }: BoardProps) {
  const isWinner = (index: number, winner: Player | null) => {
    if (!winner) return false;

    return WINNING_COMBINATIONS.some(
      (combination) =>
        combination.includes(index) &&
        combination.every((i) => board[i] === winner),
    );
  };

  return (
    <div className="mx-auto grid max-w-[26rem] grid-cols-3 gap-4">
      {board.map((square, index) => (
        <Square
          key={index}
          value={square}
          onClick={() => onClick(index)}
          isWinner={isWinner(index, winner)}
        />
      ))}
    </div>
  );
}

export default Board;
