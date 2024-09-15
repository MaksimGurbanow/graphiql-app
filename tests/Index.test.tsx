import { render, screen } from '@testing-library/react';
import Index, { meta } from '../app/routes/_index';
import { vi } from 'vitest';

vi.mock('../app/components/welcome/Welcome', () => ({
    __esModule: true,
    default: () => <div>Welcome Component</div>,
}));

describe('Index Component', () => {
    it('should render the Welcome component', () => {
        render(<Index />);
        expect(screen.getByText('Welcome Component')).toBeInTheDocument();
    });

    it('should return correct meta tags', () => {
        const result = meta();

        expect(result).toContainEqual({ title: 'New Remix App' });
        expect(result).toContainEqual({
            name: 'description',
            content: 'Welcome to Remix!',
        });
    });
});
