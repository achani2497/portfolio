import type { AppDictionary } from "../../../i18n/types";

export type ChatDictionary = AppDictionary["chat"];

function getServerErrorMessage(
  dictionary: ChatDictionary,
  errorKey?: string,
): string | undefined {
  if (errorKey === undefined) return undefined;
  if (!Object.prototype.hasOwnProperty.call(dictionary.serverErrors, errorKey)) {
    return undefined;
  }
  return (dictionary.serverErrors as Record<string, string>)[errorKey];
}

export function resolveErrorMessage(
  dictionary: ChatDictionary,
  source: { errorKey?: string; message?: string },
  fallback: string,
): string {
  return (
    getServerErrorMessage(dictionary, source.errorKey) ||
    source.message ||
    fallback
  );
}
