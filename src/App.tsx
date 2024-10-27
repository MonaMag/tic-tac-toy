import { useState } from 'react';
import './App.css';
import { Board } from './Board';


function App() {
  const [size, setSize] = useState(3);

  return (
    <div className="flex flex-col items-center p-10">
      <div className="flex flex-row mb-6">
        <input
          min="3"
          max="10"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="p-2 border border-gray-300"
        />
      </div>
      {/* <TicTacToe size={size} /> */}

      <Board n={size} />
    </div>
  );
}
export default App;



