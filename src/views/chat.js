import { getCharacterReply } from "../services/aiClient.js";
import { debounce, wait } from "../services/debounce.js";
import { getUserMessage } from "../ui/messages.js";

const state = {
  messages: [
    {
      role: "character",
      text: "¡Hola! Soy Mickey. ¿Qué te trae por acá hoy?",
    },
  ],
  status: "idle", // 'idle' | 'loading' | 'error'
  error: null,
  lastUserMessage: null,
  retryCountdown: null,
};

export function renderChat() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <div class="chatApp">
      <main
        class="chatMessages"
        id="chatMessages"
        aria-live="polite"
      >
        ${renderMessages()}
        ${renderStatus()}
      </main>

      <form class="chatComposer" id="chatComposer">
        <input
          class="chatComposer__input"
          id="chatInput"
          type="text"
          placeholder="Escribí un mensaje..."
          aria-label="Escribí tu mensaje"
          autocomplete="off"
          ${state.status === "loading" ? "disabled" : ""}
        />

        <button
          class="chatComposer__send"
          type="submit"
          ${state.status === "loading" ? "disabled" : ""}
        >
          Enviar
        </button>
      </form>
    </div>
  `;

  setupChat();
  scrollToBottom();
}

function renderMessages() {
  return state.messages
    .map((msg) => {
      if (msg.role === "character") {
        return `
          <div class="message message--character">
            <img
              src="/assets/images/mickey-avatar.png"
              alt="Mickey"
              class="message__avatar"
            />

            <div class="message__bubble">
              ${escapeHtml(msg.text)}
            </div>
          </div>
        `;
      }

      return `
        <div class="message message--user">
          <div class="message__bubble">
            ${escapeHtml(msg.text)}
          </div>
        </div>
      `;
    })
    .join("");
}

function renderStatus() {
  // Estado de carga + contador para reintento
  if (state.status === "loading" && state.retryCountdown != null) {
    return `
      <div class="message message--character">
        <img
          src="/assets/images/mickey-avatar.png"
          alt="Mickey"
          class="message__avatar"
        />

        <div class="message__bubble message__bubble--typing">
          Esperando para reintentar (${state.retryCountdown}s)...
        </div>
      </div>
    `;
  }

  // Estado de carga normal
  if (state.status === "loading") {
    return `
      <div class="message message--character">
        <img
          src="/assets/images/mickey-avatar.png"
          alt="Mickey"
          class="message__avatar"
        />

        <div class="message__bubble message__bubble--typing">
          Mickey está escribiendo...
        </div>
      </div>
    `;
  }

  // Estado de error
  if (state.status === "error") {
    return `
      <div class="message message--error">
        ${escapeHtml(state.error || "Ocurrió un error.")}

        <button
          class="message__retry"
          id="retryBtn"
          type="button"
        >
          Reintentar
        </button>
      </div>
    `;
  }

  return "";
}

// Evita que un usuario inyecte HTML/scripts en el chat
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = String(str);
  return div.innerHTML;
}

function setState(updates) {
  Object.assign(state, updates);
  renderChat();
}

function setupChat() {
  const $form = document.querySelector("#chatComposer");
  const $input = document.querySelector("#chatInput");
  const $retry = document.querySelector("#retryBtn");

  if (!$form || !$input) return;

  const debouncedSend = debounce(async () => {
    if (state.status === "loading") return;

    const text = $input.value.trim();

    if (!text) return;

    $input.value = "";

    await sendMessage(text);
  }, 200);

  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    debouncedSend();
  });

  $retry?.addEventListener("click", () => {
    if (state.lastUserMessage) {
      sendMessage(state.lastUserMessage, true);
    }
  });

  $input.focus();
}

async function sendMessage(text, isRetry = false) {
  const nextMessages = isRetry
    ? state.messages
    : [
        ...state.messages,
        {
          role: "user",
          text,
        },
      ];

  setState({
    messages: nextMessages,
    status: "loading",
    error: null,
    retryCountdown: null,
    lastUserMessage: isRetry ? state.lastUserMessage : text,
  });

  try {
    const reply = await getCharacterReply(nextMessages);

    setState({
      messages: [
        ...nextMessages,
        {
          role: "character",
          text: reply,
        },
      ],
      status: "idle",
      error: null,
      lastUserMessage: null,
      retryCountdown: null,
    });
  } catch (err) {
    // Rate limit (429):
    // esperamos el tiempo indicado y reintentamos una sola vez
    if (err.status === 429) {
      const seconds = err.retryAfterSeconds ?? 5;

      for (let s = seconds; s > 0; s--) {
        setState({
          status: "loading",
          retryCountdown: s,
        });

        await wait(1000);
      }

      try {
        setState({
          status: "loading",
          retryCountdown: null,
        });

        const reply = await getCharacterReply(nextMessages);

        setState({
          messages: [
            ...nextMessages,
            {
              role: "character",
              text: reply,
            },
          ],
          status: "idle",
          error: null,
          lastUserMessage: null,
          retryCountdown: null,
        });

        return;
      } catch (errRetry) {
        setState({
          status: "error",
          error: getUserMessage(errRetry),
          retryCountdown: null,
        });

        return;
      }
    }

    setState({
      status: "error",
      error: getUserMessage(err),
      retryCountdown: null,
    });
  }
}

function scrollToBottom() {
  const $messages = document.querySelector("#chatMessages");

  if ($messages) {
    $messages.scrollTop = $messages.scrollHeight;
  }
}