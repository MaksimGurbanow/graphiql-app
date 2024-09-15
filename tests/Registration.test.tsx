import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { IsLogedInContext } from '../app/context/loginContext';
import Registration from '../app/routes/registration/route';
import { vi } from 'vitest';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (str) => str,
    }),
}));

vi.mock('../app/utils/signUp', () => ({
    default: vi.fn().mockResolvedValue(true),
}));

describe('Registration Component', () => {
    it('renders the form and allows user input', () => {
        const isLoggedIn = [false];

        render(
            <MemoryRouter>
                <IsLogedInContext.Provider value={isLoggedIn}>
                    <Registration />
                </IsLogedInContext.Provider>
            </MemoryRouter>
        );

       expect(screen.getByText('form.signUpHeading')).toBeInTheDocument();

        const emailInput = screen.getByLabelText(/E-mail/i);
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(emailInput).toHaveValue('test@example.com');

        const passwordInput = screen.getByLabelText('form.password');
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        expect(passwordInput).toHaveValue('password123');

        expect(screen.getByRole('button', { name: /form.signUp/i })).toBeInTheDocument();
    });
});
