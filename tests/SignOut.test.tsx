import { describe, it, expect, vi } from 'vitest';
import { auth } from '../lib/firebase.config';
import { signOut } from '../app/utils/signOut';

vi.mock('../lib/firebase.config', () => ({
    auth: {
        signOut: vi.fn(),
    },
}));

describe('signOut function', () => {
    it('should sign out the user successfully', async () => {
        auth.signOut.mockResolvedValue();

        await expect(signOut()).resolves.toBeUndefined();
        expect(auth.signOut).toHaveBeenCalled();
    });

    it('should throw an error when sign out fails', async () => {
        const errorMessage = 'Sign out failed';
        auth.signOut.mockRejectedValue(new Error(errorMessage));

        await expect(signOut()).rejects.toThrow(errorMessage);
        expect(auth.signOut).toHaveBeenCalled();
    });
});
