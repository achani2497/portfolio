import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import type { ComponentProps } from "react";
import MoonieSprite, { MOONIE_PHASES } from "./MoonieSprite";
import type { ChatPhase, ChatRole, ChatStatus, Option } from "../../types/chat";

type ChatMessageProps = {
  role: ChatRole;
  content: string;
  phase?: ChatPhase;
  status?: ChatStatus;
  leaving?: boolean;
  showDots?: boolean;
  options?: Option[];
  optionsPendingValue?: string | null;
  optionsPendingLabel?: string;
  optionsLocked?: boolean;
  optionsDisabled?: boolean;
  onOptionClick?: (option: Option) => void;
};

const REMARK_PLUGINS = [remarkGfm, remarkBreaks];

const MARKDOWN_COMPONENTS = {
  a: ({ children, href }: ComponentProps<"a">) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
};

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

export default function ChatMessage({
  role,
  content,
  phase = "done",
  status,
  leaving = false,
  showDots = true,
  options,
  optionsPendingValue = null,
  optionsPendingLabel,
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
          isUser ? (
            <p className="text-sm break-words whitespace-pre-wrap">{content}</p>
          ) : (
            <div className="chat-markdown text-sm break-words">
              <ReactMarkdown
                remarkPlugins={REMARK_PLUGINS}
                components={MARKDOWN_COMPONENTS}
                skipHtml
              >
                {content}
              </ReactMarkdown>
            </div>
          )
        ) : null}
        {!isUser && status ? (
          <p className="text-text-secondary mt-2 flex items-center gap-1.5 text-xs">
            <span>{status}</span>
            {!leaving && showDots ? <BouncingDots /> : null}
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
                  {isPending
                    ? (optionsPendingLabel ?? option.label)
                    : option.label}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
