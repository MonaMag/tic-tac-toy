import { useEffect, useState } from "react";
import { Square } from "./Square";

export const TicTacToe = ({ size }: { size: number }) => {
  const [board, setBoard] = useState(
    Array(size)
      .fill(null)
      .map(() => Array(size).fill(null))
  );
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<'X' | 'O' | null>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);

  useEffect(() => {
    setBoard(
      Array(size)
        .fill(null)
        .map(() => Array(size).fill(null))
    );
    setWinner(null);
    setIsXNext(true);
    setWinningLine([]);
  }, [size, setWinner, setIsXNext]);

  const handleClick = (row: number, col: number) => {
    if (board[row][col] || winner) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winInfo = checkWinner(newBoard);
    if (winInfo) {
      setWinner(winInfo.winner);
      setWinningLine(winInfo.line);
    }
  };

  const checkWinner = (board: Array<Array<'X' | 'O' | null>>) => {
    const size = board.length;
    const lines: Array<{ winner: 'X' | 'O' | null; line: number[] }> = [];

    // Проверка горизонталей и вертикалей
    for (let i = 0; i < size; i++) {
      // Горизонтальная проверка
      if (board[i][0] && board[i].every((cell) => cell === board[i][0])) {
        const line = Array.from(
          { length: size },
          (_, index) => i * size + index
        );
        lines.push({
          winner: board[i][0],
          line,
        });
        return lines[lines.length - 1];
      }

      const col = board.map((row) => row[i]);
      if (col[0] && col.every((cell) => cell === col[0])) {
        const line = Array.from(
          { length: size },
          (_, index) => index * size + i
        );
        lines.push({ winner: col[0], line });
        return lines[lines.length - 1];
      }
    }

    const topLeftToBottomRight = board.map((row, index) => row[index]);
    if (
      topLeftToBottomRight[0] &&
      topLeftToBottomRight.every((cell) => cell === topLeftToBottomRight[0])
    ) {
      const line = Array.from(
        { length: size },
        (_, index) => index * size + index
      );
      lines.push({
        winner: topLeftToBottomRight[0],
        line,
      });
      return lines[lines.length - 1];
    }

    const topRightToBottomLeft = board.map(
      (row, index) => row[size - 1 - index]
    );
    if (
      topRightToBottomLeft[0] &&
      topRightToBottomLeft.every((cell) => cell === topRightToBottomLeft[0])
    ) {
      const line = Array.from(
        { length: size },
        (_, index) => (index + 1) * size - index - 1
      );
      lines.push({
        winner: topRightToBottomLeft[0],
        line,
      });
      return lines[lines.length - 1];
    }

    return null;
  };

  return (
    <>
      <div
        className="grid grid-cols-1"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
        {board.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <Square
              key={`${rowIndex}+${colIndex}`}
              value={value}
              isWinning={winningLine.includes(rowIndex * size + colIndex)}
              onClick={() => handleClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
      {winner && <div className="mt-4 text-xl">Победитель: {winner}</div>}
    </>
  );
};
