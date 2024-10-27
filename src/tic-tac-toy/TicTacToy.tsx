import { useState } from 'react';
import { Board } from './Board';

export function TicTacToy() {
  const [size, setSize] = useState(3);
  return (
    <div className="flex flex-col w-full items-center p-10 bg-gray-100">
      <h2 className='mb-5 text-2xl font-bold text-green-600 underline'>TicTacToy game</h2>
      <div className="flex flex-row mb-6">
        <input
          min="3"
          max="10"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="p-2 border border-gray-300"
        />
      </div>
      <Board n={size} />
    </div>
  );
}
