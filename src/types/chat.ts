export type ChatRole = "user" | "assistant";

export type ChatPhase = "thinking" | "streaming" | "done";

export type ChatStatus = string;

export type StreamStopReason = "user" | "unmount";

export type ChatErrorCode =
  "network" | "timeout" | "interruptedStream" | "generic" | "http";

export type ChatErrorState = {
  code: ChatErrorCode;
  message?: string; // server-owned text
  retryable: boolean;
};

export type OptionAction = "download-cv" | "schedule-meeting" | "open-calendar";

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
  | { type: "error"; message: string };

export type ChatMessageData = {
  id: string;
  role: ChatRole;
  content: string;
  options?: Option[];
  pendingValue?: string | null;
  optionsLocked?: boolean;
  streaming?: boolean;
};
