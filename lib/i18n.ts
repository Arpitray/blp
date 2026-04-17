import { SUPPORTED_LOCALES, DEFAULT_LANGUAGE } from './languages';

export const supportedLocales = SUPPORTED_LOCALES;
export const defaultLocale = DEFAULT_LANGUAGE;

export function getLocale(lang: string) {
  return supportedLocales.includes(lang) ? lang : defaultLocale;
}
