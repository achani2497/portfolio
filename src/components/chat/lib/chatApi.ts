const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again.";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isEventStreamResponse(response: Response): boolean {
  const contentType = response.headers.get("content-type");
  return (
    contentType !== null &&
    contentType.toLowerCase().includes("text/event-stream")
  );
}

export async function readErrorMessage(
  response: Response,
  fallback: string = DEFAULT_ERROR_MESSAGE,
): Promise<string> {
  const body = await response.text().catch(() => "");
  if (body === "") return fallback;

  try {
    const parsed: unknown = JSON.parse(body);
    if (isRecord(parsed) && typeof parsed.message === "string") {
      return parsed.message;
    }
    return fallback;
  } catch {
    return body;
  }
}
