const MODEL_NAME = "gemini-flash-lite-latest";
const MAX_OUTPUT_TOKENS = 200;
const TEMPERATURE = 0.8;
const MAX_TURNS_HISTORY = 12; 

export function toApiMessages(uiMessages) {
  return uiMessages.map((msg) => ({
    role: msg.role === "character" ? "model" : "user",
    parts: [{ text: msg.text }],
  }));
}

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


export function normalizeAIResponse(raw) {
  const parts = raw?.candidates?.[0]?.content?.parts;

  if (!Array.isArray(parts)) return "";

  return parts
    .filter((p) => p && typeof p.text === "string")
    .map((p) => p.text)
    .join("")
    .trim();
}


export function getTrimmedHistory(messages, maxTurns = MAX_TURNS_HISTORY) {
  return messages.slice(-maxTurns);
}