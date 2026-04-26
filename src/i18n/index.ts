import { enDictionary } from "./locales/en";
import { esDictionary } from "./locales/es";
import type { AppDictionary, Locale } from "./types";

export const DEFAULT_LOCALE: Locale = "en";
export const SUPPORTED_LOCALES: Locale[] = ["en", "es"];

const dictionaries: Record<Locale, AppDictionary> = {
  en: enDictionary,
  es: esDictionary,
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "es";
}

export function getDictionary(locale: Locale): AppDictionary {
  return dictionaries[locale];
}

export function getDictionarySafe(
  locale: string | null | undefined,
): AppDictionary {
  if (isLocale(locale)) {
    return dictionaries[locale];
  }
  return dictionaries[DEFAULT_LOCALE];
}
