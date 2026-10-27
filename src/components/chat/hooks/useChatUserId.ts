import { useEffect, useState } from "react";
import { CHAT_USER_ID_KEY } from "../../../config/chat";
import { createChatId } from "../lib/chatId";

export function useChatUserId(): string | null {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let id: string | null = null;

    try {
      id = localStorage.getItem(CHAT_USER_ID_KEY);
    } catch {
      id = null;
    }

    if (!id) {
      id = createChatId();
      try {
        localStorage.setItem(CHAT_USER_ID_KEY, id);
      } catch {
        // Storage may be blocked; the in-memory id still works for this session.
      }
    }

    if (!cancelled) {
      setUserId(id);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return userId;
}
