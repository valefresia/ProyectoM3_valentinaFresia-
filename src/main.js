import { setupLinkInterception } from "./navigation.js";
import { router } from "./router.js";

// Activar la intercepcion de clicks en links internos
setupLinkInterception();

// Cuando el usuario usa los botones atras/adelante del navegador,
// el evento popstate se dispara y volvemos a renderizar segun la URL actual
window.addEventListener("popstate", router);

// Render inicial: dibuja la vista que corresponde a la URL con la que se abrió la app
router();