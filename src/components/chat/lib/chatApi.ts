import { CHAT_SCHEDULE_TIMEOUT_MS } from "../../../config/chat";
import { isRecord } from "./guards";

const MAX_ERROR_MESSAGE_LENGTH = 300;

export type ScheduleMeetingResult = {
  ok: boolean;
  message?: string;
};

function truncateMessage(message: string): string {
  const trimmed = message.trim();
  if (trimmed === "") return "";
  return trimmed.length > MAX_ERROR_MESSAGE_LENGTH
    ? `${trimmed.slice(0, MAX_ERROR_MESSAGE_LENGTH)}...`
    : trimmed;
}

export function isEventStreamResponse(response: Response): boolean {
  const contentType = response.headers.get("content-type");
  return (
    contentType !== null &&
    contentType.toLowerCase().includes("text/event-stream")
  );
}

export async function scheduleMeeting(
  url: string,
  userId: string,
  value: string,
): Promise<ScheduleMeetingResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    CHAT_SCHEDULE_TIMEOUT_MS,
  );

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, value }),
      signal: controller.signal,
    });

    const data = (await response.json().catch(() => null)) as {
      message?: unknown;
    } | null;

    const message =
      data && typeof data.message === "string" ? data.message : undefined;

    return { ok: response.ok, message };
  } catch {
    return { ok: false };
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function readErrorMessage(
  response: Response,
  fallback: string = "",
): Promise<string> {
  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  const body = (await response.text().catch(() => "")).trim();
  if (body === "") return fallback;

  if (contentType.includes("application/json") || body.startsWith("{")) {
    try {
      const parsed: unknown = JSON.parse(body);
      if (isRecord(parsed) && typeof parsed.message === "string") {
        return truncateMessage(parsed.message);
      }
    } catch {
      return fallback;
    }
    return fallback;
  }

  if (contentType.includes("text/html") || body.startsWith("<")) {
    return fallback;
  }

  return truncateMessage(body);
}
