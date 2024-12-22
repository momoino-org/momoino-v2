import { getUserProfile } from '@/modules/auth/server';
import { getRequestConfig } from 'next-intl/server';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './consts';
import { defaultTo } from 'lodash-es';
import { AbstractIntlMessages } from 'next-intl';
import { SupportedLocale } from './types';

/**
 * Gets the locale from the user's profile, falling back to default locale if needed
 * @returns Promise resolving to a supported locale code
 */
async function getLocaleFromUserProfile(): Promise<SupportedLocale> {
  const userProfile = await getUserProfile();
  const locale = defaultTo(
    userProfile?.data?.locale,
    DEFAULT_LOCALE,
  ) as SupportedLocale;

  return Object.values(SUPPORTED_LOCALES).includes(locale)
    ? locale
    : DEFAULT_LOCALE;
}

/**
 * Loads translation messages for a given locale
 * @param locale - The locale code to load translations for
 * @returns Promise resolving to translation messages object
 */
async function loadTranslationMessages(
  locale: string,
): Promise<AbstractIntlMessages> {
  return (await import(`../../../resources/translation/${locale}.json`))
    .default;
}

/**
 * Configures internationalization for Next.js requests
 * Gets user locale preference and loads corresponding translations
 * @returns Promise resolving to locale config object with locale code and messages
 */
export default getRequestConfig(async () => {
  const locale = await getLocaleFromUserProfile();
  const messages = await loadTranslationMessages(locale);

  return { locale, messages };
});
