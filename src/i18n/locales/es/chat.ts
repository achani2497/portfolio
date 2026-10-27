export const esChat = {
  title: "Conversa con Moonie",
  description:
    "Pregunta sobre mi experiencia, proyectos o disponibilidad. Moonie responde en tiempo real.",
  emptyState: "Pregúntame lo que quieras...",
  input: {
    placeholder: "Escribe un mensaje...",
    ariaLabel: "Mensaje",
    send: "Enviar",
    stop: "Detener",
    retry: "Reintentar",
    dismiss: "Descartar",
  },
  status: {
    thinking: "Pensando...",
    loading: "Cargando...",
  },
  limits: {
    messagesLeft: "Quedan {count} mensajes",
    messageLeft: "Queda {count} mensaje",
    limitReached: "Límite de mensajes alcanzado",
  },
  export: {
    label: "Exportar",
    buttonTitle: "Exportar conversación (.md)",
    header: "Conversación con Moonie",
    exportedAt: "Exportada el {date}",
    userRole: "Usuario",
    assistantRole: "Asistente",
  },
  errors: {
    network:
      "No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.",
    timeout: "La solicitud tardó demasiado. Inténtalo de nuevo.",
    interruptedStream: "La respuesta se interrumpió. Inténtalo de nuevo.",
    generic: "Algo salió mal. Inténtalo de nuevo.",
    scheduleFailure: "No pude agendar la reunión. ¿Lo intentamos de nuevo?",
    scheduleSuccess: "Listo, la reunión quedó agendada.",
  },
  unavailable: {
    title: "Chat no disponible",
    description:
      "Moonie no está disponible en este momento. Inténtalo de nuevo más tarde.",
  },
  options: {
    scheduleMeeting: "Agendar reunión",
    downloadCv: "Descargar CV",
    openCalendar: "Abrir calendario",
    schedulePending: "Agendando...",
  },
} as const;
