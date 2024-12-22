import { SUPPORTED_LOCALES } from './consts';

/**
 * Type representing the supported locale values (ISO 639-1 language codes)
 * Extracts the value types from the SUPPORTED_LOCALES constant
 * @example 'en' for English
 */
export type SupportedLocale =
  (typeof SUPPORTED_LOCALES)[keyof typeof SUPPORTED_LOCALES];
