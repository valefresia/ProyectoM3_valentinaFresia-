// Mapeo de rutas válidas a IDs de vista
const routes = {
  "/home": "home-view",
  "/chat": "chat-view",
  "/about": "about-view",
};

const views = document.querySelectorAll(".view");

// Muestra la vista que corresponde a una ruta, o Home si la ruta no existe
function renderView(path) {
  const viewId = routes[path] || routes["/home"];

  views.forEach((view) => {
    view.classList.remove("view--active");
  });

  document.getElementById(viewId).classList.add("view--active");
}

// Navega a una nueva ruta: actualiza la URL, el historial, y renderiza
function navigateTo(path) {
  // pushState cambia la URL sin recargar la página y agrega una entrada al historial
  history.pushState({ path }, "", path);
  renderView(path);
}

// Clicks en botones de navegación (nav y CTA de Home)
document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => {
    const path = `/${button.dataset.view}`;
    navigateTo(path);
  });
});

// Botones atrás/adelante del navegador disparan "popstate"
// Ahí NO usamos pushState (ya estamos en esa URL), solo renderizamos
window.addEventListener("popstate", () => {
  renderView(window.location.pathname);
});

// Carga inicial: fijamos la URL en /home la primera vez que se abre la app
// (replaceState en vez de pushState porque no queremos sumar una entrada
// extra al historial en la carga inicial, solo "corregir" la URL)
const initialPath = window.location.pathname === "/" ? "/home" : window.location.pathname;
history.replaceState({ path: initialPath }, "", initialPath);
renderView(initialPath);