import { cleanup, render, screen } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });

    [
        { from: 'PLN', to: 'USD', amount: 1, expectedOutput: 'PLN 1.00 = $0.29' },
        { from: 'PLN', to: 'USD', amount: 100, expectedOutput: 'PLN 100.00 = $28.57' },
        { from: 'PLN', to: 'USD', amount: 999, expectedOutput: 'PLN 999.00 = $285.43' },
    ].forEach(testSuite => {
        it('should render proper info about conversion when PLN -> USD', () => {
            render(<ResultBox from={testSuite.from} to={testSuite.to} amount={testSuite.amount} />);
            const output = screen.getByTestId('conversion-result');
            expect(output).toHaveTextContent(testSuite.expectedOutput);
        });
        cleanup();
    });

    [
        { from: 'USD', to: 'PLN', amount: 1, expectedOutput: '$1.00 = PLN 3.50' },
        { from: 'USD', to: 'PLN', amount: 100, expectedOutput: '$100.00 = PLN 350.00' },
        { from: 'USD', to: 'PLN', amount: 999, expectedOutput: '$999.00 = PLN 3,496.50' },
    ].forEach(testSuite => {
        it('should render proper info about conversion when USD -> PLN', () => {
            render(<ResultBox from={testSuite.from} to={testSuite.to} amount={testSuite.amount} />);
            const output = screen.getByTestId('conversion-result');
            expect(output).toHaveTextContent(testSuite.expectedOutput);
        });
        cleanup();
    });

    [
        { from: 'PLN', to: 'PLN', amount: 1, expectedOutput: 'PLN 1.00 = PLN 1.00' },
        { from: 'PLN', to: 'PLN', amount: 123, expectedOutput: 'PLN 123.00 = PLN 123.00' },
        { from: 'USD', to: 'USD', amount: 1, expectedOutput: '$1.00 = $1.00' },
        { from: 'USD', to: 'USD', amount: 123, expectedOutput: '$123.00 = $123.00' },
    ].forEach(testSuite => {
        it('should render proper info about conversion from a currency to itself', () => {
            render(<ResultBox from={testSuite.from} to={testSuite.to} amount={testSuite.amount} />);
            const output = screen.getByTestId('conversion-result');
            expect(output).toHaveTextContent(testSuite.expectedOutput);
        });
        cleanup();
    });

    [
        { from: 'PLN', to: 'USD', amount: -1, expectedOutput: 'Wrong value...' },
        { from: 'USD', to: 'PLN', amount: -999, expectedOutput: 'Wrong value...' },
    ].forEach(testSuite => {
        it('should render proper info about conversion from a currency to itself', () => {
            render(<ResultBox from={testSuite.from} to={testSuite.to} amount={testSuite.amount} />);
            const output = screen.getByTestId('conversion-result');
            expect(output).toHaveTextContent(testSuite.expectedOutput);
        });
        cleanup();
    });
});