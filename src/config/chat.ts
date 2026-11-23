const DEFAULT_API_BASE_URL = "http://localhost:3000/api/v1";
const NEW_MESSAGE_PATH = "new-message";
const SCHEDULE_MEETING_PATH = "schedule-meeting";

export const CHAT_USER_ID_KEY = "moonie-user-id";
export const CHAT_SCHEDULE_TIMEOUT_MS = 25000;
export const CHAT_STREAM_INACTIVITY_TIMEOUT_MS = 60000;
export const CHAT_MAX_MESSAGE_CHARS = 2000;

export type ChatApiConfig = {
  readonly baseUrl: string | null;
  readonly newMessageUrl: string | null;
  readonly scheduleMeetingUrl: string | null;
  readonly configured: boolean;
};

const UNCONFIGURED_CHAT_API: ChatApiConfig = {
  baseUrl: null,
  newMessageUrl: null,
  scheduleMeetingUrl: null,
  configured: false,
};

function parseHttpBaseUrl(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString().replace(/\/+$/, "");
  } catch {
    return null;
  }
}

function buildEndpointUrl(baseUrl: string, path: string): string {
  return `${baseUrl}/${path}`;
}

function resolveChatApiConfig(): ChatApiConfig {
  const envValue: unknown = import.meta.env.PUBLIC_MOONIE_API_URL;
  const envUrl = typeof envValue === "string" ? envValue.trim() : "";
  const envBase = envUrl === "" ? null : parseHttpBaseUrl(envUrl);
  const baseUrl = envBase ?? (import.meta.env.DEV ? DEFAULT_API_BASE_URL : null);

  if (baseUrl === null) return UNCONFIGURED_CHAT_API;

  return {
    baseUrl,
    newMessageUrl: buildEndpointUrl(baseUrl, NEW_MESSAGE_PATH),
    scheduleMeetingUrl: buildEndpointUrl(baseUrl, SCHEDULE_MEETING_PATH),
    configured: true,
  };
}

export const CHAT_API: ChatApiConfig = resolveChatApiConfig();
