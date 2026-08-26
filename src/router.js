import { renderHome } from "./views/home.js";
import { renderChat } from "./views/chat.js";
import { renderAbout } from "./views/about.js";
import { renderNotFound } from "./views/notFound.js";

// Mapa de rutas: cada path apunta a la funcion que dibuja esa vista
const routes = {
  "/": renderHome,
  "/home": renderHome,
  "/chat": renderChat,
  "/about": renderAbout,
};

// Lee la URL actual y ejecuta la funcion de render correspondiente
export function router() {
  const path = window.location.pathname;
  const render = routes[path] || renderNotFound;
  render();
}