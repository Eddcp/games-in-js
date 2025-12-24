import { Player } from "../types";
import { motion } from "motion/react";

type SquareProps = {
  value: Player | null;
  onClick: () => void;
  isWinner: boolean;
};

const getTextColor = (value: Player | null) => {
  return value === "X" ? "text-pink" : "text-white";
};

const getBorderColor = (isWinner: boolean, value: Player | null) => {
  if (!isWinner) return "border-gray-200";
  return value === "X" ? "border-pink" : "border-white";
};

function Square({ value, onClick, isWinner }: SquareProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`h-32 w-32 rounded-xl border-4 ${getBorderColor(isWinner, value)} text-4xl font-bold ${getTextColor(value)}`}
      onClick={onClick}
    >
      {value && (
        <motion.span
          className="block"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.2 }}
        >
          {value}
        </motion.span>
      )}
    </motion.button>
  );
}

export default Square;
