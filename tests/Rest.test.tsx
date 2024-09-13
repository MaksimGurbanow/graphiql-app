import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Rest from '../app/routes/rest.($method).($requestUrl).($body)/route';
import { useRequestContext } from '../app/context/RequestContext';
import { useNavigate } from '@remix-run/react';

vi.mock('../app/context/RequestContext', () => ({
    useRequestContext: vi.fn(),
}));

vi.mock('@remix-run/react', () => ({
    useNavigate: vi.fn(),
}));

describe('Rest Component', () => {
    const mockSetRest = vi.fn();
    const mockNavigate = vi.fn();

    beforeEach(() => {
        (useRequestContext as vi.Mock).mockReturnValue({
            rest: {
                url: '',
                params: [],
                headers: [],
                body: '',
                method: 'GET',
            },
            setRest: mockSetRest,
        });

        (useNavigate as vi.Mock).mockReturnValue(mockNavigate);
    });

    it('navigates on send button click', () => {
        render(<Rest />);

        const sendButton = screen.getByRole('button', { name: /Send/i });
        fireEvent.click(sendButton);

        expect(mockNavigate).toHaveBeenCalledWith(expect.any(String));
    });
});
