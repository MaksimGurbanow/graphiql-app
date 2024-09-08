import i18n from '../app/i18n';
import enTranslation from '../app/locales/en/translation.json';
import ruTranslation from '../app/locales/ru/translation.json';
import { describe, it, expect } from 'vitest';

describe('i18n configuration', () => {
    it('initializes correctly with the provided resources', () => {
        expect(i18n.options.resources).toEqual({
            en: { translation: enTranslation },
            ru: { translation: ruTranslation },
        });
    });

    it('detects language from cookies', async () => {
        Object.defineProperty(document, 'cookie', {
            value: 'i18next=ru',
            writable: true,
        });

        await i18n.changeLanguage();
        expect(i18n.language).toBe('ru');
    });
});
