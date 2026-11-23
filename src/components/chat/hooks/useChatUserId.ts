import { useCallback, useEffect, useState } from "react";
import { CHAT_USER_ID_KEY } from "../../../config/chat";
import { createChatId } from "../lib/chatId";

type ChatUserId = {
  userId: string | null;
  resetUserId: () => void;
};

function readStoredUserId(): string | null {
  try {
    return localStorage.getItem(CHAT_USER_ID_KEY);
  } catch {
    return null;
  }
}

function createAndPersistUserId(): string {
  const id = createChatId();

  try {
    localStorage.setItem(CHAT_USER_ID_KEY, id);
  } catch {
    // Storage may be blocked; the in-memory id still works for this session.
  }

  return id;
}

export function useChatUserId(): ChatUserId {
  const [userId, setUserId] = useState<string | null>(null);

  const resetUserId = useCallback(() => {
    setUserId(createAndPersistUserId());
  }, []);

  useEffect(() => {
    let cancelled = false;
    const id = readStoredUserId() || createAndPersistUserId();

    if (!cancelled) {
      setUserId(id);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return { userId, resetUserId };
}
