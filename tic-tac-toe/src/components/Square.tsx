import { Player } from "../types";

type SquareProps = {
  value: Player | null;
  onClick: () => void;
};

const getTextColor = (value: Player | null) => {
  return value === "X" ? "text-pink" : "text-white";
};

function Square({ value, onClick }: SquareProps) {
  return (
    <button
      className={`h-32 w-32 rounded-xl border-4 border-gray-200 text-4xl font-bold ${getTextColor(value)}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Square;
