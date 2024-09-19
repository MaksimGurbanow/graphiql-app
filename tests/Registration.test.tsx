import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Login from '../app/routes/login/route';
import Registration from '../app/routes/registration/route';
import { IsLogedInContext } from '../app/context/loginContext';
import { MemoryRouter } from 'react-router-dom';
import { useRequestContext } from '../app/context/RequestContext';

vi.mock('../app/context/RequestContext', () => ({
    useRequestContext: vi.fn(),
}));

vi.mock('../app/utils/signIn', () => ({
    __esModule: true,
    default: vi.fn(),
}));

vi.mock('../app/utils/signUp', () => ({
    __esModule: true,
    default: vi.fn(),
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,  // Возвращаем ключи как текст
    }),
}));

describe('Login and Registration Components', () => {
    beforeEach(() => {
        (useRequestContext as vi.Mock).mockReturnValue({
            setIsActive: vi.fn(),
        });
    });

    it('redirects authenticated user to the home page (Login)', () => {
        render(
            <MemoryRouter>
                <IsLogedInContext.Provider value={[true]}>
                    <Login />
                </IsLogedInContext.Provider>
            </MemoryRouter>
        );

        expect(screen.queryByTestId('email-input')).toBeNull();
    });

    it('renders registration form for unauthenticated users (Registration)', () => {
        render(
            <MemoryRouter>
                <IsLogedInContext.Provider value={[false]}>
                    <Registration />
                </IsLogedInContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
        expect(screen.getByLabelText('form.password')).toBeInTheDocument();
        expect(screen.getByText('form.signUp')).toBeInTheDocument();
    });
});
