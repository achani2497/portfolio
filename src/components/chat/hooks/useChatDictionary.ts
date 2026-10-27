import { useSyncExternalStore } from "react";
import { DEFAULT_LOCALE, getDictionary } from "../../../i18n";
import type { AppDictionary, Locale } from "../../../i18n/types";
import { getResolvedLocale, onLocaleChange } from "../../../utils/localeClient";

export type ChatDictionary = AppDictionary["chat"];

function subscribe(callback: () => void): () => void {
  return onLocaleChange(() => callback());
}

function resolveLocale(): Locale {
  if (typeof document !== "undefined") {
    const datasetLocale = document.documentElement.dataset.locale;
    if (datasetLocale === "en" || datasetLocale === "es") {
      return datasetLocale;
    }

    const lang = document.documentElement.lang;
    if (lang === "en" || lang === "es") return lang;
  }

  try {
    return getResolvedLocale();
  } catch {
    return DEFAULT_LOCALE;
  }
}

function getSnapshot(): ChatDictionary {
  return getDictionary(resolveLocale()).chat;
}

function getServerSnapshot(): ChatDictionary {
  return getDictionary(DEFAULT_LOCALE).chat;
}

export function useChatDictionary(): ChatDictionary {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
