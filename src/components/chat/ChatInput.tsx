import type { KeyboardEvent, RefObject, SyntheticEvent } from "react";
import { useId, useRef, useState } from "react";
import { CHAT_MAX_MESSAGE_CHARS } from "../../config/chat";
import ChatBadge from "./ChatBadge";
import type { ChatBadgeTone } from "./ChatBadge";

const WARNING_THRESHOLD = Math.floor(CHAT_MAX_MESSAGE_CHARS * 0.9);

function getCounterTone(length: number): ChatBadgeTone {
  if (length >= CHAT_MAX_MESSAGE_CHARS) return "danger";
  if (length >= WARNING_THRESHOLD) return "warning";
  return "neutral";
}

export type ChatInputLabels = {
  placeholder: string;
  ariaLabel: string;
  send: string;
};

type ChatInputProps = {
  disabled: boolean;
  labels: ChatInputLabels;
  inputRef: RefObject<HTMLInputElement | null>;
  onSend: (message: string) => void;
};

export default function ChatInput({
  disabled,
  labels,
  inputRef,
  onSend,
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const counterId = useId();
  const isComposingRef = useRef(false);
  const isSendDisabled = disabled || value.trim().length === 0;

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    if (event.nativeEvent.isComposing || isComposingRef.current) {
      event.preventDefault();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-1.5">
      <div className="flex w-full items-center gap-3">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => {
            isComposingRef.current = true;
          }}
          onCompositionEnd={() => {
            isComposingRef.current = false;
          }}
          disabled={disabled}
          maxLength={CHAT_MAX_MESSAGE_CHARS}
          enterKeyHint="send"
          placeholder={labels.placeholder}
          aria-label={labels.ariaLabel}
          aria-describedby={counterId}
          className="shadow-neumorphic-inset bg-surface text-text-primary placeholder:text-text-muted focus-visible:border-lilac-700 w-full rounded-2xl border-2 border-transparent px-4 py-3 text-sm transition-colors focus-visible:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isSendDisabled}
          className="bg-lilac-600 hover:bg-lilac-700 text-text-primary rounded-full px-5 py-3 text-sm font-semibold transition-colors disabled:opacity-60"
        >
          {labels.send}
        </button>
      </div>
      <div className="flex w-full justify-end">
        <ChatBadge id={counterId} tone={getCounterTone(value.length)}>
          {value.length}/{CHAT_MAX_MESSAGE_CHARS}
        </ChatBadge>
      </div>
    </form>
  );
}
