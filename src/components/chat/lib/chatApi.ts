import { CHAT_SCHEDULE_TIMEOUT_MS } from "../../../config/chat";
import type { ChatErrorKey } from "../../../types/chatErrorKeys";
import { isChatErrorKey } from "../../../types/chatErrorKeys";
import { isRecord } from "./guards";

const MAX_ERROR_MESSAGE_LENGTH = 300;

type ScheduleMeetingResult = {
  ok: boolean;
  message?: string;
  errorKey?: ChatErrorKey;
};

type ErrorPayload = {
  message: string;
  errorKey?: ChatErrorKey;
};

function truncateMessage(message: string): string {
  const trimmed = message.trim();
  if (trimmed === "") return "";
  return trimmed.length > MAX_ERROR_MESSAGE_LENGTH
    ? `${trimmed.slice(0, MAX_ERROR_MESSAGE_LENGTH)}...`
    : trimmed;
}

function parseJsonFields(
  body: string,
): { message?: string; errorKey?: ChatErrorKey } | null {
  let parsed: unknown;

  try {
    parsed = JSON.parse(body);
  } catch {
    return null;
  }

  if (!isRecord(parsed)) return null;

  return {
    ...(typeof parsed.message === "string" ? { message: parsed.message } : {}),
    ...(isChatErrorKey(parsed.errorKey) ? { errorKey: parsed.errorKey } : {}),
  };
}

export async function readJsonPayload(
  response: Response,
  fallbackMessage: string = "",
): Promise<ErrorPayload> {
  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  const body = (await response.text().catch(() => "")).trim();
  const isHtmlLike =
    contentType.includes("text/html") || body.startsWith("<");

  if (body === "" || isHtmlLike) return { message: fallbackMessage };

  const isJson =
    contentType.includes("application/json") || body.startsWith("{");
  if (!isJson) return { message: truncateMessage(body) };

  const fields = parseJsonFields(body);
  const message = truncateMessage(fields?.message ?? "") || fallbackMessage;

  return fields?.errorKey === undefined
    ? { message }
    : { message, errorKey: fields.errorKey };
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
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ userId, value }),
      signal: controller.signal,
    });

    const { message, errorKey } = await readJsonPayload(response);

    return {
      ok: response.ok,
      message,
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
