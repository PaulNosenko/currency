import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';
import { cleanup, render, screen } from '@testing-library/react';

describe('Component CurrencyForm', () => {
    it('should render without crashing', () => {
        render(<CurrencyForm action={() => { }} />);
    });

    [
        { amount: '100', from: 'PLN', to: 'USD' },
        { amount: '20', from: 'USD', to: 'PLN' },
        { amount: '200', from: 'PLN', to: 'USD' },
        { amount: '345', from: 'USD', to: 'PLN' },
    ].forEach(testSuite => {
        it('should run action callback with proper data on form submit', () => {
            const action = jest.fn();

            // render component
            render(<CurrencyForm action={action} />);

            // find “convert” button
            const submitButton = screen.getByText('Convert');

            // find fields elems
            const amountField = screen.getByTestId('amount');
            const fromField = screen.getByTestId('from-select');
            const toField = screen.getByTestId('to-select');

            // set test values to fields
            userEvent.type(amountField, testSuite.amount);
            userEvent.selectOptions(fromField, testSuite.from);
            userEvent.selectOptions(toField, testSuite.to);

            // simulate user click on "convert" button
            userEvent.click(submitButton);

            // check if action callback was called once and with proper argument
            expect(action).toHaveBeenCalledTimes(1);
            expect(action).toHaveBeenCalledWith({...testSuite, amount: +testSuite.amount});
        });

        cleanup();
    });
});