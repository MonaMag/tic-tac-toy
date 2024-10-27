export const Board = ({
  xIsNext,
  squares,
  onPlay,
  size,
}: {
  size: number;
  xIsNext: boolean;
  squares: Array<'X' | 'O' | null>;
  onPlay: (nextSquares: Array<'X' | 'O' | null>) => void;
}) => {
  const handleClick = (i: number) => {
    if (calculateWinner(squares, size) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  };

  const winner = calculateWinner(squares, size);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div>
      <div className="mb-4">{status}</div>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${size}, 1fr)`}}>
        {squares.map((value, index) => (
          //<Square key={index} value={value} onSquareClick={() => handleClick(index)} />
          <button
            className="border border-gray-500 w-10 h-10 text-2xl font-bold"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

const calculateWinner = (squares: (string | null)[], size: number) => {
  const lines = [];
  // Горизонтальные линии
  for (let i = 0; i < size; i++) {
    lines.push(Array.from({ length: size }, (_, j) => i * size + j));
  }
  // Вертикальные линии
  for (let i = 0; i < size; i++) {
    lines.push(Array.from({ length: size }, (_, j) => i + j * size));
  }
  // Диагонали
  lines.push(Array.from({ length: size }, (_, i) => i * size + i));
  lines.push(Array.from({ length: size }, (_, i) => (size - 1) * (i + 1)));

  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};