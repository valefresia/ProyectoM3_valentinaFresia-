import { router } from "./router.js";

// Cambia de ruta sin recargar la pagina: actualiza la URL y vuelve a renderizar
export function navigateTo(path) {
  history.pushState(null, "", path);
  router();
}

// Intercepta los clicks en links internos (<a href="/chat">) para que la SPA
// maneje la navegacion en vez de dejar que el navegador recargue la pagina
export function setupLinkInterception() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href) return;

    // No interceptar: click con teclas modificadoras (abrir en pestaña nueva)
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    // No interceptar: link que explicitamente pide abrir en otra pestaña
    if (link.target === "_blank") return;

    // No interceptar: link a otro dominio
    if (link.origin !== window.location.origin) return;

    // No interceptar: anclas, mailto, tel
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

    // Es un link interno de la SPA: navegar sin recargar
    event.preventDefault();
    navigateTo(href);
  });
}