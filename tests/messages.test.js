import { describe, it, expect } from "vitest";
import { getUserMessage } from "../src/ui/messages.js";

describe("getUserMessage", () => {
  it("debería dar un mensaje claro para rate limit (429)", () => {
    const error = { status: 429 };
    expect(getUserMessage(error)).toBe(
      "Mickey está muy solicitado ahora mismo. Probá de nuevo en un ratito."
    );
  });

  it("debería dar un mensaje claro para errores de servidor (5xx)", () => {
    const error = { status: 500 };
    expect(getUserMessage(error)).toBe(
      "Hubo un problema del lado del servidor. Intentá de nuevo en unos minutos."
    );
  });

  it("debería dar un mensaje claro para errores de conexión", () => {
    const error = new TypeError("Failed to fetch");
    expect(getUserMessage(error)).toBe(
      "No pudimos conectar. Revisá tu conexión a internet."
    );
  });

  it("debería dar un mensaje genérico para errores no reconocidos", () => {
    const error = { status: 418 };
    expect(getUserMessage(error)).toBe("Ups, algo salió mal. Intentá de nuevo.");
  });
});