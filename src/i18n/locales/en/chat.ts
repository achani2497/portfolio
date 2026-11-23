export const enChat = {
  title: "Chat with Moonie",
  emptyState: "Ask me anything...",
  input: {
    placeholder: "Type a message...",
    ariaLabel: "Message",
    send: "Send",
    stop: "Stop",
    stopTitle: "Stop generating",
    retry: "Retry",
    dismiss: "Dismiss",
  },
  status: {
    thinking: "Thinking...",
    loading: "Loading...",
    stopped: "Stopped.",
    done: "Response ready.",
  },
  limits: {
    messagesLeft: "{count} messages left",
    messageLeft: "{count} message left",
    limitReached: "Message limit reached",
  },
  export: {
    label: "Export",
    buttonTitle: "Export conversation (.md)",
    header: "Conversation with Moonie",
    exportedAt: "Exported on {date}",
    userRole: "User",
    assistantRole: "Assistant",
  },
  errors: {
    network:
      "Could not reach the server. Please check your connection and try again.",
    timeout: "The request took too long. Please try again.",
    interruptedStream: "The response was interrupted. Please try again.",
    generic: "Something went wrong. Please try again.",
    quota: "You've reached today's message limit. Try again tomorrow.",
    scheduleFailure: "I couldn't schedule the meeting. Shall we try again?",
    scheduleSuccess: "Done, the meeting is scheduled.",
  },
  serverErrors: {
    quota_exceeded: "You've reached today's message limit. Try again tomorrow.",
    model_unavailable:
      "Moonie can't respond right now. Please try again in a moment.",
    chat_busy: "One moment, I'm still working on your last message.",
    schedule_busy: "I'm already scheduling that meeting. Give me a second.",
    meeting_already_scheduled:
      "You already have a meeting scheduled with Ale. To change it, reach out by email.",
    session_invalid:
      "I couldn't validate your session. Please try again from the chat.",
    schedule_failed:
      "I couldn't schedule the meeting. Shall we try again?",
    schedule_timeout:
      "I couldn't confirm whether the meeting was created in time. Check your calendar before trying again.",
    invalid_body: "That message couldn't be processed. Please try again.",
    message_too_long: "That message is too long. Please send a shorter one.",
    origin_not_allowed: "The chat isn't available from this site.",
    generic: "Something went wrong. Please try again.",
  },
  unavailable: {
    title: "Chat unavailable",
    description: "Moonie is not available right now. Please try again later.",
  },
  options: {
    schedulePending: "Scheduling...",
  },
} as const;
