import type { AppDictionary } from "../../../i18n/types";
import type { ChatErrorKey } from "../../../types/chatErrorKeys";

export type ChatDictionary = AppDictionary["chat"];

function getServerErrorMessage(
  dictionary: ChatDictionary,
  errorKey?: ChatErrorKey,
): string | undefined {
  return errorKey === undefined ? undefined : dictionary.serverErrors[errorKey];
}

export function resolveErrorMessage(
  dictionary: ChatDictionary,
  source: { errorKey?: ChatErrorKey; message?: string },
  fallback: string,
): string {
  return (
    getServerErrorMessage(dictionary, source.errorKey) ||
    source.message ||
    fallback
  );
}
