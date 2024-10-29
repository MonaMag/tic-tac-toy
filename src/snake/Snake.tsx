import { useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export function Snake({
  rows,
  cols,
  snakeLength = 3,
}: {
  rows: number;
  cols: number;
  snakeLength: number;
}) {
  const [snake, setSnake] = useState<{ x: number; y: number }[]>([]);
  const [direction, setDirection] = useState<{ x: number; y: number }>({
    x: 0,
    y: -1,
  });
  const [isGameStart, setIsGameStart] = useState(false);
  const [isAutoMove, setIsAutoMove] = useState(false);

  useEffect(() => {
    const initialSnake = Array.from({ length: snakeLength }, (_, index) => ({
      x: Math.floor(cols / 2) + Math.floor(snakeLength / 2) - index,
      y: Math.floor(rows / 2),
    }));
    setSnake(initialSnake);
  }, [snakeLength, cols, rows]);

  const moveSnake = useCallback(() => {
    if (!isGameStart || snake.length === 0) return;

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
      snake.some((part) => part.x === newHead.x && part.y === newHead.y)
    ) {
      setIsGameStart(false);
      return;
    }

    newSnake.unshift(newHead);
    newSnake.pop();
    setSnake(newSnake);
  }, [cols, rows, snake, direction, isGameStart]);

  useEffect(() => {
    if (isAutoMove && isGameStart) {
      const interval = setInterval(moveSnake, 100);
      return () => clearInterval(interval);
    }
  }, [isAutoMove, isGameStart, direction, snake, moveSnake]);

  useEffect(() => {
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
      if (!isAutoMove) {
        moveSnake();
      }

      if (!isGameStart) {
        setIsGameStart(true);
        moveSnake();
      } else {
        moveSnake();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isGameStart, direction, isAutoMove, moveSnake]);

  const toggleMode = () => {
    setIsAutoMove(!isAutoMove);
  };

  return (
    <div className="flex flex-col w-full items-center p-10">
      <h2 className="mb-8 text-2xl font-semibold text-blue-400 underline">
        Snake game
      </h2>
      <button
        onClick={toggleMode}
        className="mb-2 w-20 px-4 py-1 bg-gray-400 text-white rounded"
      >
        {isAutoMove ? 'click' : 'auto'}
      </button>
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
