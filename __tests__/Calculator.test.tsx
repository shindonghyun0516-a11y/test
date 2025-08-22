import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from '@/components/Calculator';

// Jest setup would be needed, but for now this demonstrates the test structure
describe('Calculator', () => {
  beforeEach(() => {
    render(<Calculator />);
  });

  test('displays initial value of 0', () => {
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('can input numbers', () => {
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  test('can perform addition', () => {
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('can perform subtraction', () => {
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('-'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('can perform multiplication', () => {
    fireEvent.click(screen.getByText('4'));
    fireEvent.click(screen.getByText('×'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  test('can perform division', () => {
    fireEvent.click(screen.getByText('8'));
    fireEvent.click(screen.getByText('÷'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  test('handles division by zero', () => {
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('÷'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  test('can clear display', () => {
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('AC'));
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('can delete last digit', () => {
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('DEL'));
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  test('can input decimal numbers', () => {
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('.'));
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('4'));
    expect(screen.getByText('3.14')).toBeInTheDocument();
  });
});