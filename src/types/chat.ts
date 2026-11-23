export type ChatRole = "user" | "assistant";

export type ChatPhase = "thinking" | "streaming" | "done";

export type ChatStatus = string;

export type StreamStopReason = "user" | "unmount";

export type ChatErrorCode =
  | "network"
  | "timeout"
  | "interruptedStream"
  | "generic"
  | "http"
  | "quota";

export type ChatErrorState = {
  code: ChatErrorCode;
  message?: string; // server-owned text
  errorKey?: string; // stable server key, translated by the client
  retryable: boolean;
};

export type OptionAction = "download-cv" | "schedule-meeting";

export type Option = {
  label: string;
  value: string;
  action: OptionAction;
};

export type ChatEvent =
  | { type: "status"; status: ChatStatus }
  | { type: "messageChunk"; content: string }
  | { type: "options"; options: Option[] }
  | { type: "done"; messageLimit?: number }
  | { type: "error"; message: string; errorKey?: string };

export type ChatMessageData = {
  id: string;
  role: ChatRole;
  content: string;
  options?: Option[];
  pendingKey?: string | null;
  optionsLocked?: boolean;
  streaming?: boolean;
};
