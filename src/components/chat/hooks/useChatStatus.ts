import { useCallback, useEffect, useRef, useState } from "react";

const LEAVING_FADE_MS = 250;

export type ChatStatusKind = "loading" | "info";

type ChatStatusState = {
  current: string | null;
  leaving: string | null;
  kind: ChatStatusKind;
};

type ChatStatusController = {
  status: string | null;
  leavingStatus: string | null;
  statusKind: ChatStatusKind;
  show: (value: string, kind?: ChatStatusKind) => void;
  clear: () => void;
  reset: () => void;
};

const INITIAL_STATE: ChatStatusState = {
  current: null,
  leaving: null,
  kind: "loading",
};

export function useChatStatus(): ChatStatusController {
  const [state, setState] = useState<ChatStatusState>(INITIAL_STATE);
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
    (value: string, kind: ChatStatusKind = "loading") => {
      clearTimer();
      commit({ current: value, leaving: null, kind });
    },
    [clearTimer, commit],
  );

  const clear = useCallback(() => {
    const current = stateRef.current.current;
    if (current === null) return;

    clearTimer();
    commit({
      current: null,
      leaving: current,
      kind: stateRef.current.kind,
    });
    leavingTimer.current = setTimeout(() => {
      leavingTimer.current = null;
      commit({
        current: stateRef.current.current,
        leaving: null,
        kind: stateRef.current.kind,
      });
    }, LEAVING_FADE_MS);
  }, [clearTimer, commit]);

  const reset = useCallback(() => {
    clearTimer();
    commit(INITIAL_STATE);
  }, [clearTimer, commit]);

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  return {
    status: state.current,
    leavingStatus: state.leaving,
    statusKind: state.kind,
    show,
    clear,
    reset,
  };
}
