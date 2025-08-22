'use client';

import { useState, useEffect } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let result: number;

      switch (operation) {
        case '+':
          result = currentValue + inputValue;
          break;
        case '-':
          result = currentValue - inputValue;
          break;
        case '×':
          result = currentValue * inputValue;
          break;
        case '÷':
          if (inputValue === 0) {
            setDisplay('Error');
            setPreviousValue(null);
            setOperation(null);
            setWaitingForOperand(true);
            return;
          }
          result = currentValue / inputValue;
          break;
        default:
          return;
      }

      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = () => {
    if (operation && previousValue !== null) {
      performOperation('');
      setOperation(null);
      setPreviousValue(null);
      setWaitingForOperand(true);
    }
  };

  const toggleSign = () => {
    if (display !== '0') {
      setDisplay(display.charAt(0) === '-' ? display.substr(1) : '-' + display);
    }
  };

  const percentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const deleteLastDigit = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      
      if (key >= '0' && key <= '9') {
        inputNumber(key);
      } else if (key === '.') {
        inputDecimal();
      } else if (key === '+') {
        performOperation('+');
      } else if (key === '-') {
        performOperation('-');
      } else if (key === '*') {
        performOperation('×');
      } else if (key === '/') {
        event.preventDefault();
        performOperation('÷');
      } else if (key === 'Enter' || key === '=') {
        calculate();
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clear();
      } else if (key === 'Backspace') {
        deleteLastDigit();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [display, operation, previousValue, waitingForOperand]);

  const buttons = [
    { label: 'AC', onClick: clear, className: 'col-span-2 bg-gray-300 hover:bg-gray-400 text-gray-800' },
    { label: 'DEL', onClick: deleteLastDigit, className: 'bg-gray-300 hover:bg-gray-400 text-gray-800' },
    { label: '÷', onClick: () => performOperation('÷'), className: 'bg-orange-500 hover:bg-orange-600 text-white' },
    
    { label: '7', onClick: () => inputNumber('7'), className: 'bg-gray-200 hover:bg-gray-300 text-gray-800' },
    { label: '8', onClick: () => inputNumber('8'), className: 'bg-gray-200 hover:bg-gray-300 text-gray-800' },
    { label: '9', onClick: () => inputNumber('9'), className: 'bg-gray-200 hover:bg-gray-300 text-gray-800' },
    { label: '×', onClick: () => performOperation('×'), className: 'bg-orange-500 hover:bg-orange-600 text-white' },
    
    { label: '4', onClick: () => inputNumber('4'), className: 'bg-gray-200 hover:bg-gray-300 text-gray-800' },
    { label: '5', onClick: () => inputNumber('5'), className: 'bg-gray-200 hover:bg-gray-300 text-gray-800' },
    { label: '6', onClick: () => inputNumber('6'), className: 'bg-gray-200 hover:bg-gray-300 text-gray-800' },
    { label: '-', onClick: () => performOperation('-'), className: 'bg-orange-500 hover:bg-orange-600 text-white' },
    
    { label: '1', onClick: () => inputNumber('1'), className: 'bg-gray-200 hover:bg-gray-300 text-gray-800' },
    { label: '2', onClick: () => inputNumber('2'), className: 'bg-gray-200 hover:bg-gray-300 text-gray-800' },
    { label: '3', onClick: () => inputNumber('3'), className: 'bg-gray-200 hover:bg-gray-300 text-gray-800' },
    { label: '+', onClick: () => performOperation('+'), className: 'bg-orange-500 hover:bg-orange-600 text-white' },
    
    { label: '0', onClick: () => inputNumber('0'), className: 'col-span-2 bg-gray-200 hover:bg-gray-300 text-gray-800' },
    { label: '.', onClick: inputDecimal, className: 'bg-gray-200 hover:bg-gray-300 text-gray-800' },
    { label: '=', onClick: calculate, className: 'bg-orange-500 hover:bg-orange-600 text-white' },
  ];

  return (
    <div className="max-w-md mx-auto mt-8 bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-6">
        <div className="bg-black rounded-lg p-4 mb-4">
          <div className="text-right text-white text-3xl font-mono overflow-hidden">
            {display}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`h-16 rounded-lg text-lg font-semibold transition-colors ${button.className}`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}