import { useEffect, useRef, useState } from "react";
import { deriveScheduleUrl } from "../../config/chat";
import { readErrorMessage } from "./lib/chatApi";
import { downloadChatMarkdown } from "./lib/exportChat";
import { createSseParser, parseChatEvent } from "./lib/sse";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import MoonieSprite from "./MoonieSprite";
import type {
  ChatEvent,
  ChatMessageData,
  ChatPhase,
  Option,
} from "../../types/chat";

const USER_ID_KEY = "moonie-user-id";
const SCHEDULE_TIMEOUT_MS = 15000;
// Dev-only sprite preview in the empty state; always false in a production build.
const SHOW_SPRITE_PREVIEW = import.meta.env.DEV;

type ChatProps = {
  backendUrl: string;
};

export default function Chat({ backendUrl }: ChatProps) {
  const [userId] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    const existing = localStorage.getItem(USER_ID_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    localStorage.setItem(USER_ID_KEY, id);
    return id;
  });

  const scheduleUrl = deriveScheduleUrl(backendUrl);

  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [statusLeaving, setStatusLeaving] = useState<string | null>(null);
  const [messageLimit, setMessageLimit] = useState<number | null>(null);
  const [streaming, setStreaming] = useState(false);
  const [phase, setPhase] = useState<ChatPhase>("done");
  const [schedulePending, setSchedulePending] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const statusRef = useRef<string | null>(null);
  const leavingTimer = useRef<number | null>(null);
  const streamingMessageIdRef = useRef<string | null>(null);
  const scheduleInFlightRef = useRef(false);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight });
  }, [messages, status, statusLeaving]);

  useEffect(() => {
    return () => {
      if (leavingTimer.current !== null) {
        window.clearTimeout(leavingTimer.current);
      }
    };
  }, []);

  const clearStatusWithFade = () => {
    const current = statusRef.current;
    setStatus(null);
    if (current) {
      if (leavingTimer.current !== null) {
        window.clearTimeout(leavingTimer.current);
      }
      setStatusLeaving(current);
      leavingTimer.current = window.setTimeout(() => {
        setStatusLeaving(null);
        leavingTimer.current = null;
      }, 250);
    }
  };

  const getStreamId = (): string => {
    streamingMessageIdRef.current ??= crypto.randomUUID();
    return streamingMessageIdRef.current;
  };

  const appendStreamContent = (chunk: string) => {
    const id = getStreamId();
    setMessages((prev) => {
      const index = prev.findIndex((message) => message.id === id);
      if (index === -1) {
        return [...prev, { id, role: "assistant", content: chunk }];
      }
      const next = [...prev];
      next[index] = { ...next[index], content: next[index].content + chunk };
      return next;
    });
  };

  const attachStreamOptions = (options: Option[]) => {
    const id = getStreamId();
    setMessages((prev) => {
      const index = prev.findIndex((message) => message.id === id);
      if (index === -1) {
        return [...prev, { id, role: "assistant", content: "", options }];
      }
      const next = [...prev];
      next[index] = { ...next[index], options };
      return next;
    });
  };

  const handleExport = () => {
    downloadChatMarkdown(messages);
  };

  const handleSend = async (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: text },
    ]);
    streamingMessageIdRef.current = null;
    setStreaming(true);
    setPhase("thinking");
    setStatus("Thinking...");

    try {
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify({ userId, message: text }),
      });

      if (!res.ok || !res.body) {
        const message = await readErrorMessage(res);
        setStatus(message);
        setStreaming(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      const parser = createSseParser();

      const handleEvent = (event: ChatEvent) => {
        switch (event.type) {
          case "status":
            if (leavingTimer.current !== null) {
              window.clearTimeout(leavingTimer.current);
              leavingTimer.current = null;
            }
            setStatusLeaving(null);
            setStatus(event.status);
            break;
          case "messageChunk":
            clearStatusWithFade();
            setPhase((current) =>
              current === "thinking" ? "streaming" : current,
            );
            appendStreamContent(event.content);
            break;
          case "options":
            setStatus(null);
            attachStreamOptions(event.options);
            break;
          case "done": {
            setStatus(null);
            setStreaming(false);
            streamingMessageIdRef.current = null;
            if (typeof event.messageLimit === "number") {
              setMessageLimit(event.messageLimit);
            }
            break;
          }
          case "error":
            setStatus(
              event.message || "Something went wrong. Please try again.",
            );
            setStreaming(false);
            streamingMessageIdRef.current = null;
            break;
        }
      };

      const handleData = (data: string) => {
        const event = parseChatEvent(data);
        if (event !== null) handleEvent(event);
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        for (const data of parser.push(
          decoder.decode(value, { stream: true }),
        )) {
          handleData(data);
        }
      }

      for (const data of parser.push(decoder.decode())) {
        handleData(data);
      }
      // A backend may close the stream without a trailing blank line.
      for (const data of parser.flush()) {
        handleData(data);
      }
    } catch {
      setStatus("Could not reach the server. Is the backend running?");
    } finally {
      setStreaming(false);
      setPhase("done");
    }
  };

  const handleOptionClick = async (messageId: string, option: Option) => {
    if (option.action !== "schedule-meeting") return;
    if (scheduleInFlightRef.current) return;

    scheduleInFlightRef.current = true;
    setSchedulePending(true);

    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId
          ? { ...message, pendingValue: option.value }
          : message,
      ),
    );

    const controller = new AbortController();
    const timeoutId = window.setTimeout(
      () => controller.abort(),
      SCHEDULE_TIMEOUT_MS,
    );

    try {
      const res = await fetch(scheduleUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, value: option.value }),
        signal: controller.signal,
      });

      const data = (await res.json().catch(() => null)) as {
        message?: string;
      } | null;

      const reply =
        data && typeof data.message === "string"
          ? data.message
          : res.ok
            ? "Listo, agendé la reunión."
            : "No pude agendar la reunión. ¿Lo intentamos de nuevo?";

      setMessages((prev) => [
        ...prev.map((message) =>
          message.id === messageId
            ? { ...message, pendingValue: null, optionsLocked: res.ok }
            : message,
        ),
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: reply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev.map((message) =>
          message.id === messageId
            ? { ...message, pendingValue: null }
            : message,
        ),
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "No pude agendar la reunión. ¿Lo intentamos de nuevo?",
        },
      ]);
    } finally {
      window.clearTimeout(timeoutId);
      scheduleInFlightRef.current = false;
      setSchedulePending(false);
    }
  };

  const lastAssistantId = messages.reduce<string | null>(
    (acc, message) => (message.role === "assistant" ? message.id : acc),
    null,
  );
  const streamingReplyId = phase === "streaming" ? lastAssistantId : null;

  return (
    <div className="moonie-chat flex flex-col gap-6">
      {messageLimit !== null ? (
        <div className="flex items-center justify-between">
          <span
            className={[
              "rounded-full px-3 py-1 text-xs font-semibold",
              messageLimit >= 10
                ? "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-300"
                : messageLimit >= 5
                  ? "bg-amber-500/15 text-amber-600 dark:bg-amber-400/15 dark:text-amber-300"
                  : "bg-red-500/15 text-red-600 dark:bg-red-400/15 dark:text-red-300",
            ].join(" ")}
          >
            {messageLimit} message{messageLimit === 1 ? "" : "s"} left
          </span>
        </div>
      ) : null}
      <div
        ref={containerRef}
        role="log"
        aria-live="polite"
        aria-busy={streaming}
        tabIndex={0}
        className="scrollbar-moonie flex max-h-[24rem] w-full flex-col overflow-y-auto pb-4"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-2">
            {SHOW_SPRITE_PREVIEW ? (
              <div className="flex items-end gap-4">
                <MoonieSprite variant="playing" />
                <MoonieSprite variant="face" />
              </div>
            ) : null}
            <p className="text-text-secondary text-center text-sm">
              Ask me anything...
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              content={message.content}
              phase={message.id === streamingReplyId ? "streaming" : "done"}
              options={message.options}
              optionsPendingValue={message.pendingValue ?? null}
              optionsLocked={message.optionsLocked ?? false}
              optionsDisabled={streaming || schedulePending}
              onOptionClick={(option) => handleOptionClick(message.id, option)}
            />
          ))
        )}
        {status ? (
          <ChatMessage
            role="assistant"
            content=""
            status={status}
            phase="thinking"
          />
        ) : null}
        {statusLeaving ? (
          <ChatMessage
            role="assistant"
            content=""
            status={statusLeaving}
            phase="thinking"
            leaving
          />
        ) : null}
      </div>
      <div className="flex w-full items-center gap-2">
        <ChatInput
          disabled={streaming || schedulePending}
          onSend={handleSend}
        />
        <button
          type="button"
          onClick={handleExport}
          disabled={messages.length === 0}
          title="Exportar conversación (.md)"
          className="text-text-primary bg-lilac-600 hover:bg-lilac-700 shrink-0 rounded-full px-3 py-3 text-xs font-semibold transition-colors disabled:opacity-60"
        >
          Export
        </button>
      </div>
    </div>
  );
}
