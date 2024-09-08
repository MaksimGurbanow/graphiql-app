import { render, screen } from '@testing-library/react';
import Footer from '../app/components/footer/Footer';
import { describe, it, expect, } from 'vitest';

describe('Footer Component', () => {
    it('renders the Footer component', () => {
        render(<Footer />);
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('renders GitHub logos', () => {
        render(<Footer />);
        const logos = screen.getAllByAltText('Github logo');
        expect(logos).toHaveLength(3);
    });

    it('renders correct GitHub links', () => {
        render(<Footer />);
        const links = screen.getAllByRole('link');

        expect(links[0]).toHaveAttribute('href', 'https://github.com/maksimgurbanow');
        expect(links[1]).toHaveAttribute('href', 'https://github.com/grammeri');
        expect(links[2]).toHaveAttribute('href', 'https://github.com/predsedatel228');
    });

    it('renders the RS school logo', () => {
        render(<Footer />);
        expect(screen.getByAltText('RS school logo')).toBeInTheDocument();
    });

    it('displays the year 2024', () => {
        render(<Footer />);
        expect(screen.getByText('2024')).toBeInTheDocument();
    });
});
