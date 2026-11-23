import type { ChatMessageData, Option } from "../../../types/chat";

type MessagesAction =
  | { type: "reset" }
  | { type: "append"; message: ChatMessageData }
  | { type: "appendChunk"; id: string; chunk: string }
  | { type: "attachOptions"; id: string; options: Option[] }
  | { type: "finish"; id: string }
  | {
      type: "patchOption";
      id: string;
      pendingKey: string | null;
      locked?: boolean;
    }
  | { type: "remove"; id: string };

function updateById(
  state: ChatMessageData[],
  id: string,
  update: (message: ChatMessageData) => ChatMessageData,
): ChatMessageData[] {
  return state.map((message) =>
    message.id === id ? update(message) : message,
  );
}

export function messagesReducer(
  state: ChatMessageData[],
  action: MessagesAction,
): ChatMessageData[] {
  switch (action.type) {
    case "reset":
      return [];
    case "append":
      return [...state, action.message];
    case "appendChunk": {
      const index = state.findIndex((message) => message.id === action.id);
      if (index === -1) {
        return [
          ...state,
          {
            id: action.id,
            role: "assistant",
            content: action.chunk,
            streaming: true,
          },
        ];
      }

      const next = [...state];
      next[index] = {
        ...next[index],
        content: next[index].content + action.chunk,
      };
      return next;
    }
    case "attachOptions": {
      const index = state.findIndex((message) => message.id === action.id);
      if (index === -1) {
        return [
          ...state,
          {
            id: action.id,
            role: "assistant",
            content: "",
            options: action.options,
            streaming: true,
          },
        ];
      }

      const next = [...state];
      next[index] = { ...next[index], options: action.options };
      return next;
    }
    case "finish":
      return state.map((message) =>
        message.id === action.id && message.streaming
          ? { ...message, streaming: false }
          : message,
      );
    case "patchOption":
      return updateById(state, action.id, (message) => ({
        ...message,
        pendingKey: action.pendingKey,
        ...(action.locked === undefined ? {} : { optionsLocked: action.locked }),
      }));
    case "remove":
      return state.filter((message) => message.id !== action.id);
  }
}
