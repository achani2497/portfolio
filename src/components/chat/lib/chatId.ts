export function createChatId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `chat-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
