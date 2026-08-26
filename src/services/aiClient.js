import { MICKEY_SYSTEM_PROMPT } from "./prompts.js";
import { buildPayload, normalizeAIResponse, getTrimmedHistory } from "../transform/chatPayload.js";
import { fetchJson } from "./fetchJson.js";

const CHAT_ENDPOINT = "/api/chat";

export async function getCharacterReply(uiMessages) {
  const trimmed = getTrimmedHistory(uiMessages);

  const payload = buildPayload({
    systemPrompt: MICKEY_SYSTEM_PROMPT,
    uiMessages: trimmed,
  });

  let rawResponse;
  try {
    rawResponse = await fetchJson(CHAT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    if (err.status === 429 && err.body?.retryAfterSeconds) {
      err.retryAfterSeconds = err.body.retryAfterSeconds;
    }
    throw err;
  }

  return normalizeAIResponse(rawResponse);
}
