import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Welcome from '../app/components/welcome/Welcome';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('Welcome Component', () => {
    it('renders the welcome title', () => {
        render(<Welcome />);
        expect(screen.getByText('welcome.reactGroup')).toBeInTheDocument();
    });

    it('renders team members', () => {
        render(<Welcome />);
        expect(screen.getByText('welcome.maksimName')).toBeInTheDocument();
        expect(screen.getByText('welcome.egorName')).toBeInTheDocument();
        expect(screen.getByText('welcome.dmitryName')).toBeInTheDocument();
    });

    it('renders GitHub profile buttons', () => {
        render(<Welcome />);
        expect(screen.getAllByRole('button', { name: 'welcome.githubProfile' })).toHaveLength(3);
    });
});
