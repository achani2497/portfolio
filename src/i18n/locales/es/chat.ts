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
    stopTitle: "Detener la respuesta",
    retry: "Reintentar",
    dismiss: "Descartar",
  },
  status: {
    thinking: "Pensando...",
    loading: "Cargando...",
    stopped: "Detenido.",
    done: "Respuesta lista.",
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
    quota: "Llegaste al límite de mensajes de hoy. Probá de nuevo mañana.",
    scheduleFailure: "No pude agendar la reunión. ¿Lo intentamos de nuevo?",
    scheduleSuccess: "Listo, la reunión quedó agendada.",
  },
  serverErrors: {
    quota_exceeded:
      "Llegaste al límite de mensajes de hoy. Probá de nuevo mañana.",
    model_unavailable:
      "Moonie no puede responder en este momento. Probá de nuevo en un ratito.",
    chat_busy: "Esperá un cachito, todavía estoy con tu mensaje anterior.",
    schedule_busy: "Ya estoy agendando esa reunión, dame un segundo.",
    meeting_already_scheduled:
      "Ya tenés una reunión agendada con Ale. Si querés cambiarla, contactalo por mail.",
    session_invalid: "No pude validar tu sesión. Probá de nuevo desde el chat.",
    schedule_failed: "No pude agendar la reunión. ¿Lo intentamos de nuevo?",
    schedule_timeout:
      "No pude confirmar si la reunión se creó a tiempo. Revisá tu calendario antes de reintentar.",
    invalid_body: "No pude procesar ese mensaje. Probá de nuevo.",
    message_too_long: "El mensaje es demasiado largo. Mandame uno más corto.",
    origin_not_allowed: "El chat no está disponible desde este sitio.",
    generic: "Algo salió mal. Inténtalo de nuevo.",
  },
  unavailable: {
    title: "Chat no disponible",
    description:
      "Moonie no está disponible en este momento. Inténtalo de nuevo más tarde.",
  },
  options: {
    scheduleMeeting: "Agendar reunión",
    downloadCv: "Descargar CV",
    schedulePending: "Agendando...",
  },
} as const;
