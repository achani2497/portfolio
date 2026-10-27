import type { ChatMessageData, ChatRole } from "../../../types/chat";

const AUTHOR_BY_ROLE: Record<ChatRole, string> = {
  user: "🙂 Usuario",
  assistant: "🤖 Moonie (asistente)",
};

function formatStamp(date: Date): string {
  return date.toISOString().slice(0, 19).replace("T", " ");
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function buildChatMarkdown(
  messages: readonly ChatMessageData[],
  now: Date = new Date(),
): string {
  const lines = messages.map(
    (message) => `### ${AUTHOR_BY_ROLE[message.role]}\n${message.content}`,
  );

  return `# Conversación con Moonie\n\n_Exportada el ${formatStamp(now)}_\n\n${lines.join("\n\n")}\n`;
}

export function downloadChatMarkdown(
  messages: readonly ChatMessageData[],
  now: Date = new Date(),
): void {
  if (messages.length === 0) return;

  const markdown = buildChatMarkdown(messages, now);
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `moonie-chat-${formatDate(now)}.md`;
  link.click();
  URL.revokeObjectURL(url);
}
