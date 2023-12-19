const locales = {
    'de': 'de-CH',
    'fr': 'fr-CH',
    'en': 'en-UK',
};

export function mapLocale(locale: string) {
    if (locales[locale as keyof typeof locales]) {
        return locales[locale as keyof typeof locales];
    }

    return locale;
}