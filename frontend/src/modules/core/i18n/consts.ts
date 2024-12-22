/**
 * Object containing supported locales for internationalization
 * Maps locale names to their ISO 639-1 language codes
 */
export const SUPPORTED_LOCALES = {
  English: 'en',
} as const;

/**
 * Default locale to use when no locale is specified
 * Set to English ('en')
 */
export const DEFAULT_LOCALE = SUPPORTED_LOCALES.English;
