import type { ReactNode } from "react";

export type ChatBadgeTone = "neutral" | "success" | "warning" | "danger";

const TONE_CLASSES: Record<ChatBadgeTone, string> = {
  neutral: "bg-elevated text-text-muted",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  danger: "bg-danger/15 text-danger",
};

type ChatBadgeProps = {
  id?: string;
  tone?: ChatBadgeTone;
  children: ReactNode;
};

export default function ChatBadge({
  id,
  tone = "neutral",
  children,
}: ChatBadgeProps) {
  return (
    <span
      id={id}
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums ${TONE_CLASSES[tone]}`}
    >
      {children}
    </span>
  );
}
