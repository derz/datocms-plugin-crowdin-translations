const locales = {
    'de': 'de-CH',
    'fr': 'fr-CH',
    'en': 'en-GB',
};

export function mapLocale(locale: string) {
    if (locales[locale as keyof typeof locales]) {
        return locales[locale as keyof typeof locales];
    }

    return locale;
}