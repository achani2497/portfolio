import { DEFAULT_LOCALE, getDictionary, isLocale } from "../i18n";
import type { AppDictionary, Locale } from "../i18n/types";

const LOCALE_STORAGE_KEY = "locale";
const LOCALE_EVENT = "app:locale-change";

type LocaleChangeEventDetail = {
  locale: Locale;
  dictionary: AppDictionary;
};

function getNestedValue(
  source: Record<string, unknown>,
  path: string,
): unknown {
  return path.split(".").reduce<unknown>((accumulator, part) => {
    if (accumulator && typeof accumulator === "object" && part in accumulator) {
      return (accumulator as Record<string, unknown>)[part];
    }
    return undefined;
  }, source);
}

function detectBrowserLocale(): Locale {
  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const candidate of candidates) {
    const normalized = candidate.toLowerCase();
    if (normalized.startsWith("es")) return "es";
    if (normalized.startsWith("en")) return "en";
  }

  return DEFAULT_LOCALE;
}

export function getResolvedLocale(): Locale {
  const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (isLocale(savedLocale)) return savedLocale;
  return detectBrowserLocale();
}

function updateMeta(dictionary: AppDictionary): void {
  document.title = dictionary.meta.title;
  const descriptionMeta = document.querySelector<HTMLMetaElement>(
    'meta[name="description"]',
  );

  if (descriptionMeta) {
    descriptionMeta.setAttribute("content", dictionary.meta.description);
    return;
  }

  const createdMeta = document.createElement("meta");
  createdMeta.name = "description";
  createdMeta.content = dictionary.meta.description;
  document.head.appendChild(createdMeta);
}

function updateTextNodes(dictionary: AppDictionary): void {
  const targets = document.querySelectorAll<HTMLElement>("[data-i18n]");

  targets.forEach((element) => {
    const key = element.dataset.i18n;
    if (!key) return;

    const value = getNestedValue(
      dictionary as unknown as Record<string, unknown>,
      key,
    );
    if (typeof value !== "string") return;

    if (element.hasAttribute("data-scramble")) {
      element.setAttribute("data-text", value);
    }

    element.textContent = value;
  });
}

function dispatchLocaleEvent(locale: Locale, dictionary: AppDictionary): void {
  window.dispatchEvent(
    new CustomEvent<LocaleChangeEventDetail>(LOCALE_EVENT, {
      detail: { locale, dictionary },
    }),
  );
}

export function applyLocale(locale: Locale): void {
  const dictionary = getDictionary(locale);
  document.documentElement.lang = locale;
  document.documentElement.dataset.locale = locale;
  updateMeta(dictionary);
  updateTextNodes(dictionary);
  dispatchLocaleEvent(locale, dictionary);
}

export function setLocale(locale: Locale): void {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  applyLocale(locale);
}

export function initializeLocale(): void {
  const locale = getResolvedLocale();
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  applyLocale(locale);
}

export function onLocaleChange(
  callback: (detail: LocaleChangeEventDetail) => void,
): () => void {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<LocaleChangeEventDetail>;
    callback(customEvent.detail);
  };

  window.addEventListener(LOCALE_EVENT, handler);
  return () => window.removeEventListener(LOCALE_EVENT, handler);
}
