const DEV_FALLBACK_URL = "http://localhost:3000/api/v1/new-message";
const SCHEDULE_ENDPOINT = "schedule-meeting";

export const CHAT_USER_ID_KEY = "moonie-user-id";
export const CHAT_SCHEDULE_TIMEOUT_MS = 15000;
export const CHAT_STREAM_INACTIVITY_TIMEOUT_MS = 60000;

export type ChatApiConfig = {
  readonly url: string | null;
  readonly configured: boolean;
};

function parseHttpUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

function resolveChatApiConfig(): ChatApiConfig {
  const envValue: unknown = import.meta.env.PUBLIC_MOONIE_API_URL;
  const envUrl = typeof envValue === "string" ? envValue.trim() : "";

  if (envUrl) {
    const url = parseHttpUrl(envUrl);
    if (url) {
      return { url, configured: true };
    }
  }

  if (import.meta.env.DEV) {
    return { url: DEV_FALLBACK_URL, configured: true };
  }

  return { url: null, configured: false };
}

export const CHAT_API: ChatApiConfig = resolveChatApiConfig();

export function deriveScheduleUrl(messageUrl: string): string {
  let url: URL;

  try {
    url = new URL(messageUrl);
  } catch {
    return messageUrl;
  }

  const segments = url.pathname.split("/");

  let lastSegmentIndex = -1;
  for (let index = segments.length - 1; index >= 0; index -= 1) {
    if (segments[index] !== "") {
      lastSegmentIndex = index;
      break;
    }
  }

  if (lastSegmentIndex === -1) {
    url.pathname = `/${SCHEDULE_ENDPOINT}`;
  } else {
    segments[lastSegmentIndex] = SCHEDULE_ENDPOINT;
    url.pathname = segments.join("/");
  }

  return url.toString();
}
