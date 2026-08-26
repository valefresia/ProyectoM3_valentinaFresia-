export function getUserMessage(error) {
  if (error?.status === 429) {
    return "Mickey está muy solicitado ahora mismo. Probá de nuevo en un ratito.";
  }

  if (error?.status >= 500) {
    return "Hubo un problema del lado del servidor. Intentá de nuevo en unos minutos.";
  }

  if (error?.name === "TypeError" && error.message.includes("fetch")) {
    return "No pudimos conectar. Revisá tu conexión a internet.";
  }

  return "Ups, algo salió mal. Intentá de nuevo.";
}