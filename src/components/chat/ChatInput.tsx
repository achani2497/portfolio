import { useState } from "react";
import type { FormEvent } from "react";

export type ChatInputLabels = {
  placeholder: string;
  ariaLabel: string;
  send: string;
};

type ChatInputProps = {
  disabled: boolean;
  labels: ChatInputLabels;
  onSend: (message: string) => void;
};

export default function ChatInput({
  disabled,
  labels,
  onSend,
}: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center gap-3">
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        disabled={disabled}
        placeholder={labels.placeholder}
        aria-label={labels.ariaLabel}
        className="shadow-neumorphic-inset bg-surface text-text-primary placeholder:text-text-muted w-full rounded-2xl px-4 py-3 text-sm outline-none disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={disabled}
        className="bg-lilac-600 hover:bg-lilac-700 text-text-primary rounded-full px-5 py-3 text-sm font-semibold transition-colors disabled:opacity-60"
      >
        {labels.send}
      </button>
    </form>
  );
}
