import './App.css';
import { Snake } from './snake/Snake';
import { TicTacToy } from './tic-tac-toy/TicTacToy';

function App() {
  return (
    <div className="flex flex-col items-center">
      <TicTacToy />
      <Snake rows={10} cols={15} snakeLenght={4}/>
    </div>
  );
}
export default App;
