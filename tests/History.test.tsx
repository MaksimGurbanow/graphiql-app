import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import History from '../app/routes/history/route';
import { MemoryRouter } from 'react-router-dom';
import { IsLogedInContext } from '../app/context/loginContext';
import * as RequestContextModule from '../app/context/RequestContext';

vi.spyOn(RequestContextModule, 'useRequestContext').mockReturnValue({
    setIsActive: vi.fn(),
});

describe('History Component', () => {
    it('redirects to home page if user is not logged in', () => {
        render(
            <MemoryRouter>
                <IsLogedInContext.Provider value={[false]}>
                    <History />
                </IsLogedInContext.Provider>
            </MemoryRouter>
        );

        expect(screen.queryByText(/history.history/i)).not.toBeInTheDocument();
    });

    it('renders history for logged-in users', () => {
        const mockSetIsActive = vi.fn();

        vi.spyOn(RequestContextModule, 'useRequestContext').mockReturnValue({
            setIsActive: mockSetIsActive,
        });

        render(
            <MemoryRouter>
                <IsLogedInContext.Provider value={[true]}>
                    <History />
                </IsLogedInContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText(/history.history/i)).toBeInTheDocument();
        expect(mockSetIsActive).toHaveBeenCalledWith(false);
    });
});
