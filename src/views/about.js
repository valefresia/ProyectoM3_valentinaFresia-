export function renderAbout() {
  const app = document.querySelector("#app");
  app.innerHTML = `
    <section class="view view--about">
      <h2 class="about__title">Sobre el proyecto</h2>
      <p class="about__text">
        Esta app es una prueba de concepto desarrollada para ComicSansCon, una agencia digital
        dedicada a experiencias interactivas para fans. Permite chatear con Mickey Mouse usando
        inteligencia artificial (Google Gemini).
      </p>
      <h2 class="about__title">Sobre Mickey Mouse</h2>
      <p class="about__text">
        Mickey es el personaje más emblemático del cine animado: alegre, optimista y siempre
        dispuesto a ayudar a sus amigos. Nació en 1928 y desde entonces representa la magia
        y la buena onda para generaciones enteras.
      </p>
    </section>
  `;
}