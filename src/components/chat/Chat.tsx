import { useEffect, useRef } from "react";
import { deriveScheduleUrl } from "../../config/chat";
import type { Option } from "../../types/chat";
import { downloadChatMarkdown } from "./lib/exportChat";
import { useChatDictionary } from "./hooks/useChatDictionary";
import { useChatEngine } from "./hooks/useChatEngine";
import ChatErrorBubble from "./ChatErrorBubble";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import MoonieSprite from "./MoonieSprite";

// Dev-only sprite preview in the empty state; always false in a production build.
const SHOW_SPRITE_PREVIEW = import.meta.env.DEV;
const NEAR_BOTTOM_PX = 48;

type ChatProps = {
  backendUrl: string;
};

function formatLimitLabel(count: number, label: string): string {
  return label.replace("{count}", String(count));
}

export default function Chat({ backendUrl }: ChatProps) {
  const dictionary = useChatDictionary();
  const scheduleUrl = deriveScheduleUrl(backendUrl);
  const engine = useChatEngine({ backendUrl, scheduleUrl, dictionary });
  const rootRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const shouldRestoreFocusRef = useRef(false);
  const isNearBottomRef = useRef(true);

  useEffect(() => {
    if (engine.isBusy || !shouldRestoreFocusRef.current) return;
    shouldRestoreFocusRef.current = false;

    const active = document.activeElement;
    const root = rootRef.current;
    const canRestore =
      active === null ||
      active === document.body ||
      (root !== null && root.contains(active));

    if (canRestore) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [engine.isBusy]);

  useEffect(() => {
    if (!isNearBottomRef.current) return;
    const container = containerRef.current;
    if (container === null) return;
    container.scrollTo({ top: container.scrollHeight });
  }, [engine.messages, engine.status, engine.leavingStatus]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container === null) return;
    isNearBottomRef.current =
      container.scrollHeight - container.scrollTop - container.clientHeight <=
      NEAR_BOTTOM_PX;
  };

  const handleExport = () => {
    downloadChatMarkdown(engine.messages, dictionary.export);
  };

  const handleSend = (text: string) => {
    shouldRestoreFocusRef.current = true;
    isNearBottomRef.current = true;
    void engine.sendMessage(text);
  };

  const handleRetry = () => {
    shouldRestoreFocusRef.current = true;
    isNearBottomRef.current = true;
    void engine.retry();
  };

  const handleDismiss = () => {
    engine.dismissError();
    const input = inputRef.current;
    if (input !== null && !input.disabled) {
      input.focus({ preventScroll: true });
      return;
    }
    containerRef.current?.focus({ preventScroll: true });
  };

  const handleOptionClick = (messageId: string, option: Option) => {
    shouldRestoreFocusRef.current = true;
    isNearBottomRef.current = true;
    void engine.scheduleOption(messageId, option);
  };

  const limitLabel =
    engine.messageLimit === null
      ? null
      : engine.messageLimit <= 0
        ? dictionary.limits.limitReached
        : formatLimitLabel(
            engine.messageLimit,
            engine.messageLimit === 1
              ? dictionary.limits.messageLeft
              : dictionary.limits.messagesLeft,
          );

  const errorMessage =
    engine.error === null
      ? null
      : engine.error.code === "http"
        ? engine.error.message || dictionary.errors.generic
        : dictionary.errors[engine.error.code];

  return (
    <div ref={rootRef} className="moonie-chat flex flex-col gap-6">
      {limitLabel !== null ? (
        <div className="flex items-center justify-between">
          <span
            className={[
              "rounded-full px-3 py-1 text-xs font-semibold",
              (engine.messageLimit ?? 0) >= 10
                ? "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-300"
                : (engine.messageLimit ?? 0) >= 5
                  ? "bg-amber-500/15 text-amber-600 dark:bg-amber-400/15 dark:text-amber-300"
                  : "bg-red-500/15 text-red-600 dark:bg-red-400/15 dark:text-red-300",
            ].join(" ")}
          >
            {limitLabel}
          </span>
        </div>
      ) : null}
      <div
        ref={containerRef}
        role="log"
        aria-live="polite"
        aria-busy={engine.isStreaming}
        tabIndex={0}
        onScroll={handleScroll}
        className="scrollbar-moonie flex max-h-[24rem] w-full flex-col overflow-y-auto pb-4"
      >
        {engine.messages.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-2">
            {SHOW_SPRITE_PREVIEW ? (
              <div className="flex items-end gap-4">
                <MoonieSprite variant="playing" />
                <MoonieSprite variant="face" />
              </div>
            ) : null}
            <p className="text-text-secondary text-center text-sm">
              {dictionary.emptyState}
            </p>
          </div>
        ) : (
          engine.messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              content={message.content}
              phase={message.streaming ? "streaming" : "done"}
              options={message.options}
              optionsPendingValue={message.pendingValue ?? null}
              optionsPendingLabel={dictionary.options.schedulePending}
              optionsLocked={message.optionsLocked ?? false}
              optionsDisabled={engine.isStreaming || engine.isScheduling}
              onOptionClick={(option) => handleOptionClick(message.id, option)}
            />
          ))
        )}
        {engine.status ? (
          <ChatMessage
            role="assistant"
            content=""
            status={engine.status}
            phase={engine.statusKind === "loading" ? "thinking" : "done"}
            showDots={engine.statusKind === "loading"}
          />
        ) : null}
        {engine.leavingStatus ? (
          <ChatMessage
            role="assistant"
            content=""
            status={engine.leavingStatus}
            phase={engine.statusKind === "loading" ? "thinking" : "done"}
            showDots={engine.statusKind === "loading"}
            leaving
          />
        ) : null}
      </div>
      {engine.error && errorMessage !== null ? (
        <ChatErrorBubble
          message={errorMessage}
          retryable={engine.error.retryable && !engine.isLimitReached}
          retryLabel={dictionary.input.retry}
          dismissLabel={dictionary.input.dismiss}
          onRetry={handleRetry}
          onDismiss={handleDismiss}
        />
      ) : null}
      <div className="flex w-full items-center gap-2">
        <ChatInput
          disabled={engine.isBusy}
          inputRef={inputRef}
          labels={{
            placeholder: dictionary.input.placeholder,
            ariaLabel: dictionary.input.ariaLabel,
            send: dictionary.input.send,
          }}
          onSend={handleSend}
        />
        {engine.isStreaming ? (
          <button
            type="button"
            onClick={engine.stopStream}
            title={dictionary.input.stopTitle}
            className="text-text-primary bg-lilac-600 hover:bg-lilac-700 shrink-0 rounded-full px-3 py-3 text-xs font-semibold transition-colors"
          >
            {dictionary.input.stop}
          </button>
        ) : null}
        <button
          type="button"
          onClick={handleExport}
          disabled={engine.messages.length === 0}
          title={dictionary.export.buttonTitle}
          className="text-text-primary bg-lilac-600 hover:bg-lilac-700 shrink-0 rounded-full px-3 py-3 text-xs font-semibold transition-colors disabled:opacity-60"
        >
          {dictionary.export.label}
        </button>
      </div>
    </div>
  );
}
