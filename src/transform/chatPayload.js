const MODEL_NAME = "gemini-flash-lite-latest";
const MAX_OUTPUT_TOKENS = 200;
const TEMPERATURE = 0.8;
const MAX_TURNS_HISTORY = 12; // cuantos mensajes de historial mandamos como contexto

// Nuestros mensajes viven como { role: "user" | "character", text: "..." }
// Gemini espera { role: "user" | "model", parts: [{ text: "..." }] }
export function toApiMessages(uiMessages) {
  return uiMessages.map((msg) => ({
    role: msg.role === "character" ? "model" : "user",
    parts: [{ text: msg.text }],
  }));
}

// Arma el body completo que le vamos a mandar a nuestra serverless function
export function buildPayload({ systemPrompt, uiMessages }) {
  return {
    model: MODEL_NAME,
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
    contents: toApiMessages(uiMessages),
    generationConfig: {
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      temperature: TEMPERATURE,
    },
  };
}

// La respuesta cruda de Gemini viene con una estructura anidada.
// Esta funcion la reduce a un simple string de texto.
export function normalizeAIResponse(raw) {
  const parts = raw?.candidates?.[0]?.content?.parts;

  if (!Array.isArray(parts)) return "";

  return parts
    .filter((p) => p && typeof p.text === "string")
    .map((p) => p.text)
    .join("")
    .trim();
}

// Recorta el historial para no mandar una conversacion infinita
// (controla cuantos tokens gastamos en cada request)
export function getTrimmedHistory(messages, maxTurns = MAX_TURNS_HISTORY) {
  return messages.slice(-maxTurns);
}