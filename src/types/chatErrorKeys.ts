export const CHAT_ERROR_KEYS = [
  "quota_exceeded",
  "model_unavailable",
  "chat_busy",
  "schedule_busy",
  "meeting_already_scheduled",
  "session_invalid",
  "schedule_failed",
  "schedule_timeout",
  "invalid_body",
  "message_too_long",
  "origin_not_allowed",
  "generic",
] as const;

export type ChatErrorKey = (typeof CHAT_ERROR_KEYS)[number];

const CHAT_ERROR_KEY_SET: ReadonlySet<string> = new Set(CHAT_ERROR_KEYS);

export function isChatErrorKey(value: unknown): value is ChatErrorKey {
  return typeof value === "string" && CHAT_ERROR_KEY_SET.has(value);
}
