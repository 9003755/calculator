import React from 'react';

interface NumberPadProps {
  onNumberClick: (num: string) => void;
  onOperatorClick: (op: string) => void;
  onClear: () => void;
  onEquals: () => void;
  onDecimal: () => void;
  showAdvanced?: boolean;
  onSquare?: () => void;
  onSquareRoot?: () => void;
}

export const NumberPad: React.FC<NumberPadProps> = ({
  onNumberClick,
  onOperatorClick,
  onClear,
  onEquals,
  onDecimal,
  showAdvanced = false,
  onSquare,
  onSquareRoot
}) => {
  const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
  const operators = ['/', '*', '-', '+'];

  return (
    <div className="grid grid-cols-4 gap-2">
      {/* 清除按钮 */}
      <button
        onClick={onClear}
        className="col-span-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
      >
        清除
      </button>
      
      {/* 高级功能按钮 */}
      {showAdvanced && (
        <>
          <button
            onClick={onSquare}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            x²
          </button>
          <button
            onClick={onSquareRoot}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            √x
          </button>
        </>
      )}
      
      {/* 数字按钮 */}
      {numbers.map((num) => (
        <button
          key={num}
          onClick={() => onNumberClick(num)}
          className={`bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors ${
            num === '0' ? 'col-span-2' : ''
          }`}
        >
          {num}
        </button>
      ))}
      
      {/* 小数点 */}
      <button
        onClick={onDecimal}
        className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
      >
        .
      </button>
      
      {/* 运算符 */}
      {operators.map((op) => (
        <button
          key={op}
          onClick={() => onOperatorClick(op)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          {op}
        </button>
      ))}
      
      {/* 等号 */}
      <button
        onClick={onEquals}
        className="col-span-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
      >
        =
      </button>
    </div>
  );
};