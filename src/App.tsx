import { useState } from 'react';
import './App.css';
import { Board } from './Board';


function App() {
  const [size, setSize] = useState(3);
  const [history, setHistory] = useState<Array<Array<string | null>>>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove] as Array<'X' | 'O' | null>;

  const handlePlay = (nextSquares: Array<string | null>) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const startGame = () => {
    setHistory([Array(size * size).fill(null)]);
    setCurrentMove(0);
  };

  return (
    <div>
      <div className="flex flex-row">
        <input
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="border border-gray-300"
        />
        <button onClick={startGame} className="p-2 border border-gray-300">Let's Game</button>
      </div>
    <div className="flex">
      <div className="game-board">
        Game board
      </div>
    </div>
  </div>
  );
};
export default App;
