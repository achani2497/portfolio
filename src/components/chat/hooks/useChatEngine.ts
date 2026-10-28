import { useEffect, useRef, useState } from "react";
import { CHAT_STREAM_INACTIVITY_TIMEOUT_MS } from "../../../config/chat";
import type {
  ChatErrorCode,
  ChatErrorState,
  ChatMessageData,
  ChatPhase,
  Option,
  StreamStopReason,
} from "../../../types/chat";
import { createChatId } from "../lib/chatId";
import { ChatStreamError, streamChatEvents } from "../lib/chatStream";
import { scheduleMeeting } from "../lib/chatApi";
import { isAbortError } from "../lib/guards";
import type { ChatDictionary } from "./useChatDictionary";
import { useChatStatus } from "./useChatStatus";
import type { ChatStatusKind } from "./useChatStatus";
import { useChatUserId } from "./useChatUserId";

type UseChatEngineOptions = {
  backendUrl: string;
  scheduleUrl: string;
  dictionary: ChatDictionary;
};

export type ChatEngine = {
  messages: ChatMessageData[];
  isStreaming: boolean;
  isBusy: boolean;
  status: string | null;
  leavingStatus: string | null;
  statusKind: ChatStatusKind;
  messageLimit: number | null;
  error: ChatErrorState | null;
  isLimitReached: boolean;
  isScheduling: boolean;
  isReady: boolean;
  sendMessage: (text: string) => Promise<void>;
  stopStream: () => void;
  retry: () => Promise<void>;
  dismissError: () => void;
  scheduleOption: (messageId: string, option: Option) => Promise<void>;
};

export function useChatEngine({
  backendUrl,
  scheduleUrl,
  dictionary,
}: UseChatEngineOptions): ChatEngine {
  const userId = useChatUserId();
  const {
    status,
    leavingStatus,
    statusKind,
    show: showStatus,
    clear: clearStatus,
    reset: resetStatus,
  } = useChatStatus();

  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [phase, setPhase] = useState<ChatPhase>("done");
  const [messageLimit, setMessageLimit] = useState<number | null>(null);
  const [error, setError] = useState<ChatErrorState | null>(null);
  const [isScheduling, setIsScheduling] = useState(false);

  const chatInFlightRef = useRef(false);
  const scheduleInFlightRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const stopReasonRef = useRef<StreamStopReason | null>(null);
  const lastRequestRef = useRef<{
    text: string;
    assistantId: string;
  } | null>(null);
  const mountedRef = useRef(true);

  const isLimitReached = messageLimit !== null && messageLimit <= 0;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      const controller = abortControllerRef.current;
      if (controller !== null) {
        stopReasonRef.current = "unmount";
        controller.abort();
      }
      abortControllerRef.current = null;
      chatInFlightRef.current = false;
    };
  }, []);

  const addUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: createChatId(), role: "user", content: text },
    ]);
  };

  const appendAssistantChunk = (assistantId: string, chunk: string) => {
    setMessages((prev) => {
      const index = prev.findIndex((message) => message.id === assistantId);
      if (index === -1) {
        return [
          ...prev,
          {
            id: assistantId,
            role: "assistant",
            content: chunk,
            streaming: true,
          },
        ];
      }

      const next = [...prev];
      next[index] = {
        ...next[index],
        content: next[index].content + chunk,
      };
      return next;
    });
  };

  const attachAssistantOptions = (assistantId: string, options: Option[]) => {
    setMessages((prev) => {
      const index = prev.findIndex((message) => message.id === assistantId);
      if (index === -1) {
        return [
          ...prev,
          {
            id: assistantId,
            role: "assistant",
            content: "",
            options,
            streaming: true,
          },
        ];
      }

      const next = [...prev];
      next[index] = { ...next[index], options };
      return next;
    });
  };

  const finishAssistantMessage = (assistantId: string) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === assistantId && message.streaming
          ? { ...message, streaming: false }
          : message,
      ),
    );
  };

  const addAssistantMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      { id: createChatId(), role: "assistant", content },
    ]);
  };

  const updateOptionState = (
    messageId: string,
    pendingValue: string | null,
    optionsLocked?: boolean,
  ) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id !== messageId) return message;
        return {
          ...message,
          pendingValue,
          ...(optionsLocked === undefined ? {} : { optionsLocked }),
        };
      }),
    );
  };

  const setChatError = (
    code: ChatErrorCode,
    retryable: boolean,
    message?: string,
  ) => {
    resetStatus();
    setError({
      code,
      retryable,
      ...(message === undefined ? {} : { message }),
    });
  };

  const showStreamError = (error: unknown) => {
    const stopReason = stopReasonRef.current;

    if (stopReason === "user") {
      showStatus(dictionary.status.stopped, "info");
      return;
    }

    if (stopReason === "unmount") return;

    if (error instanceof ChatStreamError) {
      switch (error.code) {
        case "network":
          setChatError("network", true);
          return;
        case "timeout":
          setChatError("timeout", true);
          return;
        case "interrupted":
          setChatError("interruptedStream", true);
          return;
        case "http": {
          const status = error.status;
          const retryable =
            typeof status === "number" &&
            (status >= 500 ||
              status === 408 ||
              status === 409 ||
              status === 429);
          setChatError("http", retryable, error.message || undefined);
          return;
        }
      }
    }

    if (isAbortError(error)) {
      setChatError("network", true);
      return;
    }

    setChatError("generic", true);
  };

  const stopStream = () => {
    const controller = abortControllerRef.current;
    if (controller === null) return;
    stopReasonRef.current = "user";
    controller.abort();
  };

  const runRequest = async (
    text: string,
    appendUserMessage: boolean,
  ): Promise<void> => {
    if (!userId) return;
    if (chatInFlightRef.current) return;

    chatInFlightRef.current = true;
    stopReasonRef.current = null;

    const assistantId = createChatId();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    lastRequestRef.current = { text, assistantId };

    if (appendUserMessage) {
      addUserMessage(text);
    }
    setPhase("thinking");
    showStatus(dictionary.status.thinking);

    try {
      for await (const event of streamChatEvents({
        url: backendUrl,
        userId,
        message: text,
        signal: controller.signal,
        idleTimeoutMs: CHAT_STREAM_INACTIVITY_TIMEOUT_MS,
      })) {
        if (!mountedRef.current) break;

        switch (event.type) {
          case "status":
            showStatus(event.status);
            break;
          case "messageChunk":
            clearStatus();
            setPhase((current) =>
              current === "thinking" ? "streaming" : current,
            );
            appendAssistantChunk(assistantId, event.content);
            break;
          case "options":
            resetStatus();
            attachAssistantOptions(assistantId, event.options);
            break;
          case "done":
            resetStatus();
            if (typeof event.messageLimit === "number") {
              setMessageLimit(event.messageLimit);
            }
            break;
          case "error":
            setChatError("generic", false, event.message || undefined);
            break;
        }
      }
    } catch (error) {
      if (mountedRef.current) {
        showStreamError(error);
      }
    } finally {
      if (mountedRef.current) {
        finishAssistantMessage(assistantId);
      }
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
      stopReasonRef.current = null;
      chatInFlightRef.current = false;
      if (mountedRef.current) {
        setPhase("done");
      }
    }
  };

  const sendMessage = async (text: string): Promise<void> => {
    if (isLimitReached) return;
    setError(null);
    await runRequest(text, true);
  };

  const retry = async (): Promise<void> => {
    const lastRequest = lastRequestRef.current;
    if (lastRequest === null) return;
    if (chatInFlightRef.current) return;
    if (scheduleInFlightRef.current) return;
    if (isLimitReached) return;

    setError(null);
    const failedAssistantId = lastRequest.assistantId;
    setMessages((prev) =>
      prev.filter((message) => message.id !== failedAssistantId),
    );
    await runRequest(lastRequest.text, false);
  };

  const dismissError = () => {
    setError(null);
  };

  const scheduleOption = async (
    messageId: string,
    option: Option,
  ): Promise<void> => {
    if (option.action !== "schedule-meeting") return;
    if (!userId) return;
    if (scheduleInFlightRef.current) return;

    setError(null);
    scheduleInFlightRef.current = true;
    setIsScheduling(true);
    updateOptionState(messageId, option.value);

    try {
      const result = await scheduleMeeting(scheduleUrl, userId, option.value);
      if (!mountedRef.current) return;
      updateOptionState(messageId, null, result.ok);
      addAssistantMessage(
        result.message ??
          (result.ok
            ? dictionary.errors.scheduleSuccess
            : dictionary.errors.scheduleFailure),
      );
    } catch {
      if (mountedRef.current) {
        updateOptionState(messageId, null);
        addAssistantMessage(dictionary.errors.scheduleFailure);
      }
    } finally {
      scheduleInFlightRef.current = false;
      if (mountedRef.current) {
        setIsScheduling(false);
      }
    }
  };

  const isStreaming = phase !== "done";
  const isReady = userId !== null;
  const isBusy = !isReady || isStreaming || isScheduling || isLimitReached;

  return {
    messages,
    isStreaming,
    isBusy,
    status,
    leavingStatus,
    statusKind,
    messageLimit,
    error,
    isLimitReached,
    isScheduling,
    isReady,
    sendMessage,
    stopStream,
    retry,
    dismissError,
    scheduleOption,
  };
}
