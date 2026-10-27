import { useCallback, useEffect, useRef, useState } from "react";

const LEAVING_FADE_MS = 250;

type ChatStatusState = {
  current: string | null;
  leaving: string | null;
};

type ChatStatusController = {
  status: string | null;
  leavingStatus: string | null;
  show: (value: string) => void;
  clear: () => void;
  reset: () => void;
};

export function useChatStatus(): ChatStatusController {
  const [state, setState] = useState<ChatStatusState>({
    current: null,
    leaving: null,
  });
  const stateRef = useRef<ChatStatusState>(state);
  const leavingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const commit = useCallback((next: ChatStatusState) => {
    stateRef.current = next;
    setState(next);
  }, []);

  const clearTimer = useCallback(() => {
    if (leavingTimer.current !== null) {
      clearTimeout(leavingTimer.current);
      leavingTimer.current = null;
    }
  }, []);

  const show = useCallback(
    (value: string) => {
      clearTimer();
      commit({ current: value, leaving: null });
    },
    [clearTimer, commit],
  );

  const clear = useCallback(() => {
    const current = stateRef.current.current;
    if (current === null) return;

    clearTimer();
    commit({ current: null, leaving: current });
    leavingTimer.current = setTimeout(() => {
      leavingTimer.current = null;
      commit({ current: stateRef.current.current, leaving: null });
    }, LEAVING_FADE_MS);
  }, [clearTimer, commit]);

  const reset = useCallback(() => {
    clearTimer();
    commit({ current: null, leaving: null });
  }, [clearTimer, commit]);

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  return {
    status: state.current,
    leavingStatus: state.leaving,
    show,
    clear,
    reset,
  };
}
