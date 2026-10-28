type ChatErrorBubbleProps = {
  message: string;
  retryable: boolean;
  retryLabel: string;
  dismissLabel: string;
  onRetry: () => void;
  onDismiss: () => void;
};

export default function ChatErrorBubble({
  message,
  retryable,
  retryLabel,
  dismissLabel,
  onRetry,
  onDismiss,
}: ChatErrorBubbleProps) {
  return (
    <div
      role="alert"
      className="border-danger/20 bg-danger/10 text-danger flex w-full flex-wrap items-center gap-3 rounded-2xl border px-4 py-3 text-sm"
    >
      <p className="min-w-0 flex-1 break-words">{message}</p>
      <div className="flex shrink-0 items-center gap-2">
        {retryable ? (
          <button
            type="button"
            onClick={onRetry}
            className="bg-danger/15 hover:bg-danger/25 text-danger rounded-full px-3 py-1.5 text-xs font-semibold transition-colors"
          >
            {retryLabel}
          </button>
        ) : null}
        <button
          type="button"
          onClick={onDismiss}
          className="hover:bg-danger/15 text-danger rounded-full px-3 py-1.5 text-xs font-semibold transition-colors"
        >
          {dismissLabel}
        </button>
      </div>
    </div>
  );
}
