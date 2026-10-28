import type { FormEvent, KeyboardEvent, RefObject } from "react";
import { useRef, useState } from "react";

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
  const isComposingRef = useRef(false);
  const isSendDisabled = disabled || value.trim().length === 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
    <form onSubmit={handleSubmit} className="flex w-full items-center gap-3">
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
        enterKeyHint="send"
        placeholder={labels.placeholder}
        aria-label={labels.ariaLabel}
        className="shadow-neumorphic-inset bg-surface text-text-primary placeholder:text-text-muted focus-visible:border-lilac-700 w-full rounded-2xl border-2 border-transparent px-4 py-3 text-sm transition-colors focus-visible:outline-none disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={isSendDisabled}
        className="bg-lilac-600 hover:bg-lilac-700 text-text-primary rounded-full px-5 py-3 text-sm font-semibold transition-colors disabled:opacity-60"
      >
        {labels.send}
      </button>
    </form>
  );
}
