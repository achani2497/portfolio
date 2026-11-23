import { CHAT_SCHEDULE_TIMEOUT_MS } from "../../../config/chat";
import { isRecord } from "./guards";

const MAX_ERROR_MESSAGE_LENGTH = 300;

export type ScheduleMeetingResult = {
  ok: boolean;
  message?: string;
  errorKey?: string;
};

export type ErrorPayload = {
  message: string;
  errorKey?: string;
};

function truncateMessage(message: string): string {
  const trimmed = message.trim();
  if (trimmed === "") return "";
  return trimmed.length > MAX_ERROR_MESSAGE_LENGTH
    ? `${trimmed.slice(0, MAX_ERROR_MESSAGE_LENGTH)}...`
    : trimmed;
}

async function requestJson(
  response: Response,
): Promise<{ message?: string; errorKey?: string }> {
  const data: unknown = await response.json().catch(() => null);
  if (!isRecord(data)) return {};
  return {
    ...(typeof data.message === "string" ? { message: data.message } : {}),
    ...(typeof data.errorKey === "string" ? { errorKey: data.errorKey } : {}),
  };
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
  let timedOut = false;
  const timeoutId = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, CHAT_SCHEDULE_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, value }),
      signal: controller.signal,
    });

    const { message, errorKey } = await requestJson(response);

    return {
      ok: response.ok,
      ...(message === undefined ? {} : { message }),
      ...(errorKey === undefined ? {} : { errorKey }),
    };
  } catch {
    return {
      ok: false,
      ...(timedOut ? { errorKey: "schedule_timeout" } : {}),
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function readErrorPayload(
  response: Response,
  fallback: string = "",
): Promise<ErrorPayload> {
  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  const body = (await response.text().catch(() => "")).trim();
  if (body === "") return { message: fallback };

  if (contentType.includes("application/json") || body.startsWith("{")) {
    try {
      const parsed: unknown = JSON.parse(body);
      if (isRecord(parsed) && typeof parsed.message === "string") {
        return {
          message: truncateMessage(parsed.message),
          ...(typeof parsed.errorKey === "string"
            ? { errorKey: parsed.errorKey }
            : {}),
        };
      }
    } catch {
      return { message: fallback };
    }
    return { message: fallback };
  }

  if (contentType.includes("text/html") || body.startsWith("<")) {
    return { message: fallback };
  }

  return { message: truncateMessage(body) };
}

export async function readErrorMessage(
  response: Response,
  fallback: string = "",
): Promise<string> {
  return (await readErrorPayload(response, fallback)).message;
}
