import type { ChatMessageData, ChatRole } from "../../../types/chat";

type ChatExportLabels = {
  header: string;
  exportedAt: string;
  userRole: string;
  assistantRole: string;
};

function formatStamp(date: Date): string {
  return date.toISOString().slice(0, 19).replace("T", " ");
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function authorForRole(role: ChatRole, labels: ChatExportLabels): string {
  return role === "user" ? labels.userRole : labels.assistantRole;
}

function buildChatMarkdown(
  messages: readonly ChatMessageData[],
  labels: ChatExportLabels,
  now: Date = new Date(),
): string {
  const lines = messages.map(
    (message) =>
      `### ${authorForRole(message.role, labels)}\n${message.content}`,
  );
  const exportedAt = labels.exportedAt.replace("{date}", formatStamp(now));

  return `# ${labels.header}\n\n_${exportedAt}_\n\n${lines.join("\n\n")}\n`;
}

export function downloadChatMarkdown(
  messages: readonly ChatMessageData[],
  labels: ChatExportLabels,
  now: Date = new Date(),
): void {
  if (messages.length === 0) return;

  const markdown = buildChatMarkdown(messages, labels, now);
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `moonie-chat-${formatDate(now)}.md`;
  link.click();
  URL.revokeObjectURL(url);
}
