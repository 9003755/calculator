import React, { useState } from 'react';
import { Display } from '../common/Display';
import { NumberPad } from '../common/NumberPad';
import { calculateBasic, calculateSquare, calculateSquareRoot } from '../../utils/calculations';

interface BasicCalculatorProps {
  showAdvanced?: boolean;
}

export const BasicCalculator: React.FC<BasicCalculatorProps> = ({ showAdvanced = false }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [error, setError] = useState<string>('');

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
    setError('');
  };

  const inputNumber = (num: string) => {
    if (error) setError('');
    
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (error) setError('');
    
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const inputOperator = (nextOperation: string) => {
    if (error) setError('');
    
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculateOperation(currentValue, inputValue, operation);
      
      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculateOperation = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        if (secondValue === 0) {
          throw new Error('除数不能为零');
        }
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    if (error) setError('');
    
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      try {
        const newValue = calculateOperation(previousValue, inputValue, operation);
        setDisplay(String(newValue));
        setPreviousValue(null);
        setOperation(null);
        setWaitingForNewValue(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : '计算错误');
      }
    }
  };

  const handleSquare = () => {
    if (error) setError('');
    
    try {
      const value = parseFloat(display);
      const result = calculateSquare(value);
      setDisplay(String(result));
      setWaitingForNewValue(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : '计算错误');
    }
  };

  const handleSquareRoot = () => {
    if (error) setError('');
    
    try {
      const value = parseFloat(display);
      const result = calculateSquareRoot(value);
      setDisplay(String(result));
      setWaitingForNewValue(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : '计算错误');
    }
  };

  return (
    <div className="space-y-4">
      <Display value={display} error={error} />
      <NumberPad
        onNumberClick={inputNumber}
        onOperatorClick={inputOperator}
        onClear={clear}
        onEquals={performCalculation}
        onDecimal={inputDecimal}
        showAdvanced={showAdvanced}
        onSquare={handleSquare}
        onSquareRoot={handleSquareRoot}
      />
    </div>
  );
};