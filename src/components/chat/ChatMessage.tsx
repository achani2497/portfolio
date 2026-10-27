import MoonieSprite, { MOONIE_PHASES } from "./MoonieSprite";
import type { ReactNode } from "react";
import type {
  ChatPhase,
  ChatRole,
  ChatStatus,
  Option,
} from "../../types/chat";

type ChatMessageProps = {
  role: ChatRole;
  content: string;
  phase?: ChatPhase;
  status?: ChatStatus;
  leaving?: boolean;
  options?: Option[];
  optionsPendingValue?: string | null;
  optionsLocked?: boolean;
  optionsDisabled?: boolean;
  onOptionClick?: (option: Option) => void;
};

const MARKDOWN_LINK_PATTERN = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
const URL_PATTERN = /(https?:\/\/[^\s]+)/g;
const URL_START = /^https?:\/\//;
const LINK_CLASS = "underline underline-offset-2 hover:opacity-80";

export function BouncingDots() {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="motion-safe:animate-bounce-dot inline-block size-[3px] rounded-full bg-current"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  );
}

function linkifyUrls(text: string, keyPrefix: string): ReactNode[] {
  return text.split(URL_PATTERN).map((part, index) => {
    if (URL_START.test(part)) {
      return (
        <a
          key={`${keyPrefix}-${index}`}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

function renderContent(content: string, linkify: boolean): ReactNode {
  if (!linkify) return content;
  const parts = content.split(MARKDOWN_LINK_PATTERN);
  const nodes: ReactNode[] = [];
  for (let i = 0; i < parts.length; i += 3) {
    nodes.push(...linkifyUrls(parts[i], `text-${i}`));
    const label = parts[i + 1];
    const url = parts[i + 2];
    if (label !== undefined && url !== undefined) {
      nodes.push(
        <a
          key={`link-${i}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}
        >
          {label}
        </a>,
      );
    }
  }
  return nodes;
}

export default function ChatMessage({
  role,
  content,
  phase = "done",
  status,
  leaving = false,
  options,
  optionsPendingValue = null,
  optionsLocked = false,
  optionsDisabled = false,
  onOptionClick,
}: ChatMessageProps) {
  const isUser = role === "user";
  const avatar = MOONIE_PHASES[phase];
  return (
    <div
      className={`flex w-full items-end gap-2 py-2 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {isUser ? null : (
        <MoonieSprite
          variant={avatar.variant}
          scale={avatar.scale}
          smooth={avatar.smooth}
          className="mb-1"
        />
      )}
      <div
        className={`max-w-[85%] rounded-2xl p-4 ${
          isUser
            ? "bg-lilac-600 text-text-primary"
            : "bg-elevated shadow-neumorphic text-text-primary"
        } ${leaving ? "animate-fade-out" : !isUser && content ? "animate-fade-in" : ""}`}
      >
        {content ? (
          <p className="text-sm break-words whitespace-pre-wrap">
            {renderContent(content, !isUser)}
          </p>
        ) : null}
        {!isUser && status ? (
          <p className="text-text-secondary mt-2 flex items-center gap-1.5 text-xs">
            <span>{status}</span>
            {leaving ? null : <BouncingDots />}
          </p>
        ) : null}
        {!isUser && options && options.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {options.map((option) => {
              const isSchedule = option.action === "schedule-meeting";
              const isPending = optionsPendingValue === option.value;
              const disabled =
                optionsDisabled ||
                optionsLocked ||
                !isSchedule ||
                optionsPendingValue !== null;
              return (
                <button
                  key={option.value}
                  type="button"
                  disabled={disabled}
                  onClick={() => onOptionClick?.(option)}
                  className="bg-lilac-600 hover:bg-lilac-700 text-text-primary rounded-full px-3 py-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isPending ? "Agendando..." : option.label}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
