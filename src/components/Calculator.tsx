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
      setDisplay(display.charAt(0) === '-' ? display.substring(1) : '-' + display);
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
    { label: 'AC', onClick: clear, className: 'col-span-2 bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-red-500/25' },
    { label: 'DEL', onClick: deleteLastDigit, className: 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-red-500/25' },
    { label: '÷', onClick: () => performOperation('÷'), className: 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg hover:shadow-indigo-500/25' },
    
    { label: '7', onClick: () => inputNumber('7'), className: 'bg-gray-600 hover:bg-gray-500 text-white shadow-lg hover:shadow-gray-500/25' },
    { label: '8', onClick: () => inputNumber('8'), className: 'bg-gray-600 hover:bg-gray-500 text-white shadow-lg hover:shadow-gray-500/25' },
    { label: '9', onClick: () => inputNumber('9'), className: 'bg-gray-600 hover:bg-gray-500 text-white shadow-lg hover:shadow-gray-500/25' },
    { label: '×', onClick: () => performOperation('×'), className: 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg hover:shadow-indigo-500/25' },
    
    { label: '4', onClick: () => inputNumber('4'), className: 'bg-gray-600 hover:bg-gray-500 text-white shadow-lg hover:shadow-gray-500/25' },
    { label: '5', onClick: () => inputNumber('5'), className: 'bg-gray-600 hover:bg-gray-500 text-white shadow-lg hover:shadow-gray-500/25' },
    { label: '6', onClick: () => inputNumber('6'), className: 'bg-gray-600 hover:bg-gray-500 text-white shadow-lg hover:shadow-gray-500/25' },
    { label: '-', onClick: () => performOperation('-'), className: 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg hover:shadow-indigo-500/25' },
    
    { label: '1', onClick: () => inputNumber('1'), className: 'bg-gray-600 hover:bg-gray-500 text-white shadow-lg hover:shadow-gray-500/25' },
    { label: '2', onClick: () => inputNumber('2'), className: 'bg-gray-600 hover:bg-gray-500 text-white shadow-lg hover:shadow-gray-500/25' },
    { label: '3', onClick: () => inputNumber('3'), className: 'bg-gray-600 hover:bg-gray-500 text-white shadow-lg hover:shadow-gray-500/25' },
    { label: '+', onClick: () => performOperation('+'), className: 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg hover:shadow-indigo-500/25' },
    
    { label: '0', onClick: () => inputNumber('0'), className: 'col-span-2 bg-gray-600 hover:bg-gray-500 text-white shadow-lg hover:shadow-gray-500/25' },
    { label: '.', onClick: inputDecimal, className: 'bg-gray-600 hover:bg-gray-500 text-white shadow-lg hover:shadow-gray-500/25' },
    { label: '=', onClick: calculate, className: 'bg-green-500 hover:bg-green-400 text-white shadow-lg hover:shadow-green-500/25' },
  ];

  return (
    <div className="max-w-md mx-auto mt-8 bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
      <div className="p-6">
        <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-600">
          <div className="text-right text-gray-100 text-4xl font-mono overflow-hidden tracking-wider">
            {display}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`h-16 rounded-xl text-lg font-semibold transition-all duration-150 transform active:scale-95 ${button.className}`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}