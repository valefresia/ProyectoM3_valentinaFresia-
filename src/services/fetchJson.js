export async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    const err = new Error(`HTTP ${response.status}: ${response.statusText}`);
    err.status = response.status;

    // Intentamos leer el body del error (por si el servidor mando detalles,
    // como el retryAfterSeconds cuando hay rate limit).
    try {
      err.body = await response.json();
    } catch {
      err.body = null;
    }

    throw err;
  }

  return await response.json();
}