import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Welcome from '../app/components/Welcome/Welcome';
import { IsLogedInContext } from '../app/context/loginContext';
import { MemoryRouter } from 'react-router-dom';
import { RequestContext } from '../app/context/RequestContext';

vi.mock('../app/components/audio-player/AudioPlayer', () => ({
    __esModule: true,
    default: ({ onPlay, onPause }: { onPlay: () => void; onPause: () => void }) => (
        <div>
            <button onClick={onPlay} data-testid="play-pause-button">Play</button>
            <button onClick={onPause}>Pause</button>
        </div>
    ),
}));

describe('Welcome Component', () => {
    const mockRequestContextValue = {
        setRest: vi.fn(),
        setGraphql: vi.fn(),
        setIsActive: vi.fn(),
    };

    it('renders the welcome page for unauthenticated users', () => {
        render(
            <MemoryRouter>
                <IsLogedInContext.Provider value={[false]}>
                    <RequestContext.Provider value={mockRequestContextValue}>
                        <Welcome />
                    </RequestContext.Provider>
                </IsLogedInContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText(/войти/i)).toBeInTheDocument();
        expect(screen.getByText(/зарегистрироваться/i)).toBeInTheDocument();
    });

    it('renders the play button in the audio player', () => {
        render(
            <MemoryRouter>
                <IsLogedInContext.Provider value={[false]}>
                    <RequestContext.Provider value={mockRequestContextValue}>
                        <Welcome />
                    </RequestContext.Provider>
                </IsLogedInContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByTestId('play-pause-button')).toBeInTheDocument();
    });

    it('renders the team members section correctly', () => {
        render(
            <MemoryRouter>
                <IsLogedInContext.Provider value={[false]}>
                    <RequestContext.Provider value={mockRequestContextValue}>
                        <Welcome />
                    </RequestContext.Provider>
                </IsLogedInContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText(/Максим Гурбанов/i)).toBeInTheDocument();
        expect(screen.getByText(/Егор Паневин/i)).toBeInTheDocument();
        expect(screen.getByText(/Дмитрий Николаев/i)).toBeInTheDocument();
    });

    it('renders the GitHub profile buttons for team members', () => {
        render(
            <MemoryRouter>
                <IsLogedInContext.Provider value={[false]}>
                    <RequestContext.Provider value={mockRequestContextValue}>
                        <Welcome />
                    </RequestContext.Provider>
                </IsLogedInContext.Provider>
            </MemoryRouter>
        );

        const githubButtons = screen.getAllByText(/профиль на github/i);
        expect(githubButtons.length).toBe(3);
    });
    it('switches between mobile and desktop view based on window width', () => {
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });

        render(
            <MemoryRouter>
                <IsLogedInContext.Provider value={[false]}>
                    <RequestContext.Provider value={mockRequestContextValue}>
                        <Welcome />
                    </RequestContext.Provider>
                </IsLogedInContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByTestId('swipper')).toBeInTheDocument();

        act(() => {
            Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
            window.dispatchEvent(new Event('resize'));
        });

        expect(screen.getByTestId('swipper')).toBeInTheDocument();
    });
});
