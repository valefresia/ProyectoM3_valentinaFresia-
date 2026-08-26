export function renderNotFound() {
  const app = document.querySelector("#app");
  app.innerHTML = `
    <section class="view view--notFound">
      <h2>404 — Ruta no encontrada</h2>
      <p>La página que buscás no existe.</p>
      <a class="btn btn--primary" href="/home">Volver al inicio</a>
    </section>
  `;
}