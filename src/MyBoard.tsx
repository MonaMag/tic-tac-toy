import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export const MyBoard = ({ n }: { n: number }) => {
  const [board, setBoard] = useState<Array<Array<string>>>(
    Array(n)
      .fill(null)
      .map(() => Array(n).fill(null))
  );
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string>();

  const handleClick = (row: number, col: number) => {
    if (board[row][col]) return;
    if (winner) return;

    const newBoard = board.map((r) => [...r]);
    if (isXNext) {
      newBoard[row][col] = 'X';
    } else {
      newBoard[row][col] = 'O';
    }
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setWinner(isWinner(newBoard));
  };

  const isWinner = (board: Array<Array<string>>) => {
    const winnerRow = board.find(
      (row) => row[0] && row.every((value) => value === row[0])
    );
    if (winnerRow) {
      return winnerRow[0];
    }

    for (let col = 0; col < n; col++) {
      const colValues = board.map((row) => row[col]);

      if (colValues[0] && colValues.every((value) => value === colValues[0])) {
        return colValues[0];
      }
    }

    const mainDiagonal = board[0][0];
    if (
      mainDiagonal &&
      board.every((row, index) => row[index] === mainDiagonal)
    ) {
      return mainDiagonal;
    }

    const srcondaryDiagonal = board[0][n - 1];
    if (
      srcondaryDiagonal &&
      board.every((row, index) => row[n - 1 - index] === srcondaryDiagonal)
    ) {
      return srcondaryDiagonal;
    }
  };

  return (
    <div className="grid" style={{ gridTemplateRows: `repeat(${n}, 1fr)` }}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center items-center">
          {row.map((value, colIndex) => (
            <button
              key={`${rowIndex} - ${colIndex}`}
              className={twMerge('flex justify-center items-center w-16 h-16 border border-gray-300', `${value ? 'bg-green-400' : ''}`)}
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              {value}
            </button>
          ))}
        </div>
      ))}
      <div>Winner: {winner}</div>
    </div>
  );
};
