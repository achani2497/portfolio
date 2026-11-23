import { useCallback, useEffect, useReducer, useRef, useState } from "react";
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
import { messagesReducer } from "../lib/messages";
import type { ChatDictionary } from "../lib/errorMessage";
import { resolveErrorMessage } from "../lib/errorMessage";
import { useChatStatus } from "./useChatStatus";
import type { ChatStatusKind } from "./useChatStatus";
import { useChatUserId } from "./useChatUserId";

type UseChatEngineOptions = {
  newMessageUrl: string;
  scheduleMeetingUrl: string;
  dictionary: ChatDictionary;
};

type ChatEngine = {
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
  lastOutcome: "done" | null;
  sendMessage: (text: string) => Promise<void>;
  stopStream: () => void;
  retry: () => Promise<void>;
  dismissError: () => void;
  scheduleOption: (
    messageId: string,
    option: Option,
    optionKey: string,
  ) => Promise<void>;
};

export function useChatEngine({
  newMessageUrl,
  scheduleMeetingUrl,
  dictionary,
}: UseChatEngineOptions): ChatEngine {
  const { userId, resetUserId } = useChatUserId();
  const {
    status,
    leavingStatus,
    statusKind,
    show: showStatus,
    clear: clearStatus,
    reset: resetStatus,
  } = useChatStatus();

  const [messages, dispatch] = useReducer(messagesReducer, []);
  const [phase, setPhase] = useState<ChatPhase>("done");
  const [messageLimit, setMessageLimit] = useState<number | null>(null);
  const [error, setError] = useState<ChatErrorState | null>(null);
  const [isScheduling, setIsScheduling] = useState(false);
  const [lastOutcome, setLastOutcome] = useState<"done" | null>(null);

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

  const setChatError = (
    code: ChatErrorCode,
    retryable: boolean,
    message?: string,
    errorKey?: string,
  ) => {
    resetStatus();
    setLastOutcome(null);
    setError({
      code,
      retryable,
      ...(message === undefined ? {} : { message }),
      ...(errorKey === undefined ? {} : { errorKey }),
    });
  };

  const resetConversation = () => {
    dispatch({ type: "reset" });
    setMessageLimit(null);
    lastRequestRef.current = null;
    setError(null);
    setLastOutcome(null);
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

          if (status === 400 && error.errorKey === "invalid_body") {
            resetUserId();
            resetConversation();
            setChatError(
              "http",
              false,
              error.message || undefined,
              error.errorKey,
            );
            return;
          }

          if (status === 429) {
            setChatError(
              "quota",
              false,
              error.message,
              error.errorKey ?? "quota_exceeded",
            );
            return;
          }

          const retryable =
            typeof status === "number" &&
            (status >= 500 || status === 408 || status === 409);
          setChatError(
            "http",
            retryable,
            error.message || undefined,
            error.errorKey,
          );
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

    setLastOutcome(null);
    chatInFlightRef.current = true;
    stopReasonRef.current = null;

    const assistantId = createChatId();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    lastRequestRef.current = { text, assistantId };

    if (appendUserMessage) {
      dispatch({
        type: "append",
        message: { id: createChatId(), role: "user", content: text },
      });
    }
    setPhase("thinking");
    showStatus(dictionary.status.thinking);

    try {
      for await (const event of streamChatEvents({
        url: newMessageUrl,
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
            dispatch({
              type: "appendChunk",
              id: assistantId,
              chunk: event.content,
            });
            break;
          case "options":
            resetStatus();
            dispatch({
              type: "attachOptions",
              id: assistantId,
              options: event.options,
            });
            break;
          case "done":
            resetStatus();
            setLastOutcome("done");
            if (typeof event.messageLimit === "number") {
              setMessageLimit(event.messageLimit);
            }
            break;
          case "error":
            setChatError(
              "generic",
              false,
              event.message || undefined,
              event.errorKey,
            );
            break;
        }
      }
    } catch (error) {
      if (mountedRef.current) {
        showStreamError(error);
      }
    } finally {
      if (mountedRef.current) {
        dispatch({ type: "finish", id: assistantId });
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
    dispatch({ type: "remove", id: failedAssistantId });
    await runRequest(lastRequest.text, false);
  };

  const dismissError = () => {
    setError(null);
  };

  const scheduleOption = useCallback(
    async (
      messageId: string,
      option: Option,
      optionKey: string,
    ): Promise<void> => {
      if (option.action !== "schedule-meeting") return;
      if (!userId) return;
      if (scheduleInFlightRef.current) return;

      setError(null);
      scheduleInFlightRef.current = true;
      setIsScheduling(true);
      dispatch({ type: "patchOption", id: messageId, pendingKey: optionKey });

      try {
        const result = await scheduleMeeting(
          scheduleMeetingUrl,
          userId,
          option.value,
        );
        if (!mountedRef.current) return;
        dispatch({
          type: "patchOption",
          id: messageId,
          pendingKey: null,
          locked: result.ok,
        });
        const reply = result.ok
          ? (result.message || dictionary.errors.scheduleSuccess)
          : resolveErrorMessage(
              dictionary,
              result,
              dictionary.errors.scheduleFailure,
            );
        dispatch({
          type: "append",
          message: { id: createChatId(), role: "assistant", content: reply },
        });
      } catch {
        if (mountedRef.current) {
          dispatch({ type: "patchOption", id: messageId, pendingKey: null });
          dispatch({
            type: "append",
            message: {
              id: createChatId(),
              role: "assistant",
              content: dictionary.errors.scheduleFailure,
            },
          });
        }
      } finally {
        scheduleInFlightRef.current = false;
        if (mountedRef.current) {
          setIsScheduling(false);
        }
      }
    },
    [userId, scheduleMeetingUrl, dictionary],
  );

  const isStreaming = phase !== "done";
  const isBusy =
    userId === null || isStreaming || isScheduling || isLimitReached;

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
    lastOutcome,
    sendMessage,
    stopStream,
    retry,
    dismissError,
    scheduleOption,
  };
}
