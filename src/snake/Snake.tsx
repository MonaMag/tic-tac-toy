import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export function Snake({
  rows,
  cols,
  snakeLenght = 3,
}: {
  rows: number;
  cols: number;
  snakeLenght: number;
}) {
  const [snake, setSnake] = useState<{ x: number; y: number }[]>([]);
  const [direction, setDirection] = useState<{ x: number; y: number }>({
    x: 0,
    y: -1,
  });
  const [isGameStart, setIsGameStart] = useState(false);

  useEffect(() => {
    const initialSnake = Array.from({ length: snakeLenght }, (_, index) => ({
      x: Math.floor(cols / 2) - index,
      y: Math.floor(rows / 2),
    }));
    setSnake(initialSnake);
  }, [snakeLenght, cols, rows]);

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        setDirection({ x: 1, y: 0 });
        break;
      case 'ArrowUp':
        setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        setDirection({ x: 0, y: 1 });
        break;
    }
    if (!isGameStart) {
      setIsGameStart(true);
    }
  };

  useEffect(() => {
    if (!isGameStart) return;

    const moveSnake = () => {
      const newSnake = [...snake];
      const head = newSnake[0];

      const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y,
      };

      if (
        newHead.x < 0 ||
        newHead.x >= cols ||
        newHead.y < 0 ||
        newHead.y >= rows ||
        snake.some((pic) => pic.x === newHead.x && pic.y === newHead.y)
      ) {
        setIsGameStart(false);
        return;
      }
      newSnake.unshift(newHead);
      newSnake.pop();

      setSnake(newSnake);
    };

    const interval = setInterval(moveSnake, 100);
    return () => clearInterval(interval);
  }, [direction, isGameStart]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col w-full items-center p-10">
      <h2 className="mb-8 text-2xl font-semibold text-blue-400 underline">
        Snake game
      </h2>
      {Array.from({ length: rows }, (_, rowIndex) => (
        <div key={rowIndex} className="flex justify-center items-center">
          {Array.from({ length: cols }, (_, colIndex) => {
            const isSnakePart = snake.some(
              (pic) => pic.x === colIndex && pic.y === rowIndex
            );
            const isHead =
              isSnakePart && snake[0].x === colIndex && snake[0].y === rowIndex;

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={twMerge(
                  'w-8 h-8 border relative',
                  `${isSnakePart ? 'bg-blue-400 border rounded-full' : 'bg-white'}`
                )}
              >
                {isHead && (
                  <>
                    <div className="absolute w-2 h-2 bg-white rounded-full top-[20%] left-[15%]" />
                    <div className="absolute w-2 h-2 bg-white rounded-full top-[20%] left-[55%]" />
                  </>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
