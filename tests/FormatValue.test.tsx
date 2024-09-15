import { formatValue } from '../app/utils/defineTypedKey';

describe('formatValue', () => {
    it('should add a letter to the value when a valid key is pressed', () => {
        expect(formatValue('abc', 'd')).toBe('abcd');
    });

    it('should not add non-letter characters to the value', () => {
        expect(formatValue('abc', '1')).toBe('abc');
        expect(formatValue('abc', '!')).toBe('abc');
    });

    it('should remove the last character when Backspace is pressed', () => {
        expect(formatValue('abc', 'Backspace')).toBe('ab');
    });

    it('should return the original value when key is not a valid letter or Backspace', () => {
        expect(formatValue('abc', 'Enter')).toBe('abc');
    });

    it('should handle empty input gracefully', () => {
        expect(formatValue('', 'a')).toBe('a');
        expect(formatValue('', 'Backspace')).toBe('');
        expect(formatValue('', '1')).toBe('');
    });
});
