export function renderHome() {
  const app = document.querySelector("#app");
  app.innerHTML = `
    <section class="view view--home">
      <div class="home__avatar">🐭</div>
      <h2 class="home__name">Hola, soy Mickey</h2>
      <p class="home__description">
        El ratón más famoso del mundo está para charlar con vos. Preguntame lo que quieras,
        contame tu día o simplemente vení a pasarla bien un rato.
      </p>
      <a class="btn btn--primary" href="/chat">Empezar a chatear</a>
    </section>
  `;
}