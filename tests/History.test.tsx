import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import History from '../app/routes/history/route';
import { IsLogedInContext } from '../app/context/loginContext';
import '@testing-library/jest-dom';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

vi.mock('@remix-run/react', () => ({
    useNavigate: () => vi.fn(),
    Navigate: ({ to }) => <span>Navigate to {to}</span>,
}));

describe('History Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should redirect to home if not logged in', () => {
        localStorage.setItem('history', '');
        render(
            <MemoryRouter>
                <IsLogedInContext.Provider value={[false]}>
                    <History />
                </IsLogedInContext.Provider>
            </MemoryRouter>
        );
        expect(screen.getByText('Navigate to /')).toBeInTheDocument();
    });

    it('should display history items when logged in and history exists', () => {
        localStorage.setItem('history', 'GET /users,POST /login');

        render(
            <MemoryRouter>
                <IsLogedInContext.Provider value={[true]}>
                    <History />
                </IsLogedInContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText('GET /users')).toBeInTheDocument();
        expect(screen.getByText('POST /login')).toBeInTheDocument();
    });
    it('should display no requests message when logged in but history is empty', () => {
        render(
            <MemoryRouter>
                <IsLogedInContext.Provider value={[true]}>
                    <History />
                </IsLogedInContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText('history.noRequestsMessage')).toBeInTheDocument();
    });
});
