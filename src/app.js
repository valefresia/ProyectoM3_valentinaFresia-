// Referencias a las vistas
const views = document.querySelectorAll(".view");
const navButtons = document.querySelectorAll("[data-view]");

// Función simple: muestra la vista pedida, esconde las demás
function showView(viewName) {
  views.forEach((view) => {
    view.classList.remove("view--active");
  });
  document.getElementById(`${viewName}-view`).classList.add("view--active");
}

// Escuchar clicks en botones de nav y en el CTA de Home
navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const viewName = button.dataset.view;
    showView(viewName);
  });
});

// Vista inicial
showView("home");