export const Square = ({
  value,
  onClick,
  isWinning,
}: {
  value: 'X' | 'O' | null;
  onClick: () => void;
  isWinning: boolean;
}) => {
  return (
    <button
      className={`w-16 h-16 border border-gray-500 ${isWinning ? 'bg-green-500' : 'bg-white'}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};