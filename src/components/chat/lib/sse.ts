import type { ChatEvent, Option } from "../../../types/chat";
import { isChatErrorKey } from "../../../types/chatErrorKeys";
import { isRecord } from "./guards";

const OPTION_ACTIONS = new Set<string>(["download-cv", "schedule-meeting"]);

function stripLeadingBom(text: string): string {
  return text.startsWith("\uFEFF") ? text.slice(1) : text;
}

type SseParser = {
  push: (chunk: string) => string[];
  flush: () => string[];
};

export function createSseParser(): SseParser {
  let buffer = "";
  let dataLines: string[] = [];
  let hasData = false;

  const dispatch = (): string | null => {
    if (!hasData) return null;
    const data = dataLines.join("\n");
    dataLines = [];
    hasData = false;
    return data;
  };

  const processLine = (rawLine: string): string | null => {
    const line = stripLeadingBom(rawLine);
    if (line === "") return dispatch();
    if (line.startsWith(":")) return null;

    const colonIndex = line.indexOf(":");
    const field = colonIndex === -1 ? line : line.slice(0, colonIndex);
    if (field !== "data") return null;

    let value = colonIndex === -1 ? "" : line.slice(colonIndex + 1);
    if (value.startsWith(" ")) value = value.slice(1);

    dataLines.push(value);
    hasData = true;
    return null;
  };

  const push = (chunk: string): string[] => {
    buffer = stripLeadingBom(buffer + chunk);
    const events: string[] = [];

    for (;;) {
      const newlineIndex = buffer.indexOf("\n");
      if (newlineIndex === -1) break;

      let line = buffer.slice(0, newlineIndex);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      buffer = buffer.slice(newlineIndex + 1);

      const event = processLine(line);
      if (event !== null) events.push(event);
    }

    return events;
  };

  const flush = (): string[] => {
    const events: string[] = [];

    if (buffer.length > 0) {
      let line = buffer;
      if (line.endsWith("\r")) line = line.slice(0, -1);
      buffer = "";

      const event = processLine(line);
      if (event !== null) events.push(event);
    }

    const pending = dispatch();
    if (pending !== null) events.push(pending);

    return events;
  };

  return { push, flush };
}

function isOption(value: unknown): value is Option {
  if (!isRecord(value)) return false;
  return (
    typeof value.label === "string" &&
    typeof value.value === "string" &&
    typeof value.action === "string" &&
    OPTION_ACTIONS.has(value.action)
  );
}

export function parseChatEvent(data: string): ChatEvent | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(data);
  } catch {
    return null;
  }

  if (!isRecord(parsed) || typeof parsed.type !== "string") return null;

  switch (parsed.type) {
    case "status":
      return typeof parsed.status === "string"
        ? { type: "status", status: parsed.status }
        : null;
    case "messageChunk":
      return typeof parsed.content === "string"
        ? { type: "messageChunk", content: parsed.content }
        : null;
    case "options": {
      const { options } = parsed;
      if (!Array.isArray(options) || !options.every(isOption)) return null;
      return { type: "options", options };
    }
    case "done": {
      const { messageLimit } = parsed;
      const hasValidLimit =
        typeof messageLimit === "number" &&
        Number.isInteger(messageLimit) &&
        messageLimit >= 0;
      return hasValidLimit
        ? { type: "done", messageLimit }
        : { type: "done" };
    }
    case "error":
      return typeof parsed.message === "string"
        ? {
            type: "error",
            message: parsed.message,
            ...(isChatErrorKey(parsed.errorKey)
              ? { errorKey: parsed.errorKey }
              : {}),
          }
        : null;
    default:
      return null;
  }
}
