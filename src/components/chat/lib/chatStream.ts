import { CHAT_STREAM_INACTIVITY_TIMEOUT_MS } from "../../../config/chat";
import type { ChatEvent } from "../../../types/chat";
import { isEventStreamResponse, readErrorPayload } from "./chatApi";
import { isAbortError } from "./guards";
import { createSseParser, parseChatEvent } from "./sse";

export type ChatStreamErrorCode =
  "network" | "http" | "timeout" | "interrupted";

export class ChatStreamError extends Error {
  readonly code: ChatStreamErrorCode;
  readonly status?: number;
  readonly errorKey?: string;

  constructor(
    code: ChatStreamErrorCode,
    message: string,
    status?: number,
    errorKey?: string,
  ) {
    super(message);
    this.name = "ChatStreamError";
    this.code = code;
    this.status = status;
    this.errorKey = errorKey;
  }
}

type StreamChatEventsOptions = {
  url: string;
  userId: string;
  message: string;
  signal: AbortSignal;
  idleTimeoutMs?: number;
};

type ReaderResult = ReadableStreamReadResult<Uint8Array>;

async function readWithIdleTimeout(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  idleTimeoutMs: number,
): Promise<ReaderResult> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new ChatStreamError("timeout", "The stream stalled."));
    }, idleTimeoutMs);
  });

  try {
    return await Promise.race([reader.read(), timeout]);
  } finally {
    if (timeoutId !== null) clearTimeout(timeoutId);
  }
}

export async function* streamChatEvents({
  url,
  userId,
  message,
  signal,
  idleTimeoutMs = CHAT_STREAM_INACTIVITY_TIMEOUT_MS,
}: StreamChatEventsOptions): AsyncGenerator<ChatEvent, void, void> {
  const controller = new AbortController();
  let timedOut = false;
  let connectTimeoutId: ReturnType<typeof setTimeout> | null = null;

  const forwardAbort = () => {
    controller.abort();
  };

  if (signal.aborted) {
    controller.abort();
  } else {
    signal.addEventListener("abort", forwardAbort, { once: true });
  }

  const removeAbortListener = () => {
    signal.removeEventListener("abort", forwardAbort);
  };

  connectTimeoutId = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, idleTimeoutMs);

  let response: Response;

  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify({ userId, message }),
      signal: controller.signal,
    });
  } catch (error) {
    removeAbortListener();
    if (connectTimeoutId !== null) clearTimeout(connectTimeoutId);

    if (timedOut) {
      throw new ChatStreamError("timeout", "The request timed out.");
    }

    if (signal.aborted || isAbortError(error)) throw error;

    throw new ChatStreamError("network", "Could not reach the server.");
  }

  if (connectTimeoutId !== null) {
    clearTimeout(connectTimeoutId);
    connectTimeoutId = null;
  }

  if (!response.ok || !response.body) {
    const payload = await readErrorPayload(response);
    removeAbortListener();
    throw new ChatStreamError(
      "http",
      payload.message,
      response.status,
      payload.errorKey,
    );
  }

  if (!isEventStreamResponse(response)) {
    const payload = await readErrorPayload(response);
    removeAbortListener();
    throw new ChatStreamError(
      "http",
      payload.message,
      response.status,
      payload.errorKey,
    );
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  const parser = createSseParser();
  let terminal = false;

  const parseEvents = (dataList: string[]): ChatEvent[] => {
    const events: ChatEvent[] = [];
    for (const data of dataList) {
      const event = parseChatEvent(data);
      if (event !== null) events.push(event);
    }
    return events;
  };

  try {
    while (!terminal) {
      const result = await readWithIdleTimeout(reader, idleTimeoutMs);
      if (result.done) break;

      const events = parseEvents(
        parser.push(decoder.decode(result.value, { stream: true })),
      );

      for (const event of events) {
        yield event;
        if (event.type === "done" || event.type === "error") {
          terminal = true;
          break;
        }
      }
    }

    if (!terminal) {
      const events = parseEvents(parser.push(decoder.decode()));
      for (const event of events) {
        yield event;
        if (event.type === "done" || event.type === "error") {
          terminal = true;
          break;
        }
      }
    }

    // A backend may close the stream without a trailing blank line.
    if (!terminal) {
      const events = parseEvents(parser.flush());
      for (const event of events) {
        yield event;
        if (event.type === "done" || event.type === "error") {
          terminal = true;
          break;
        }
      }
    }

    if (!terminal) {
      throw new ChatStreamError(
        "interrupted",
        "The stream ended without a done event.",
      );
    }
  } finally {
    removeAbortListener();
    await reader.cancel().catch(() => {});
  }
}
