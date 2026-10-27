export const enChat = {
  title: "Chat with Moonie",
  description:
    "Ask about my experience, projects, or availability. Moonie replies in real time.",
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
    scheduleFailure: "I couldn't schedule the meeting. Shall we try again?",
    scheduleSuccess: "Done, the meeting is scheduled.",
  },
  unavailable: {
    title: "Chat unavailable",
    description: "Moonie is not available right now. Please try again later.",
  },
  options: {
    scheduleMeeting: "Schedule meeting",
    downloadCv: "Download CV",
    openCalendar: "Open calendar",
    schedulePending: "Scheduling...",
  },
} as const;
