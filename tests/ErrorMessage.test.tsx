import { render, screen } from '@testing-library/react';
import ErrorMessage from '../app/components/errorMessage/ErrorMessage';
import '@testing-library/jest-dom';

describe('ErrorMessage Component', () => {
    it('should render the error message', () => {
        const message = 'Test error message';
        render(<ErrorMessage message={message} />);
        expect(screen.getByText(message)).toBeInTheDocument();
    });
});
