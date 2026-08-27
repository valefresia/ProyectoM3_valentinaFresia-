# Chat con Mickey Mouse 🐭

Proyecto Integrador Módulo 3 — Henry Bootcamp

Single Page Application que permite chatear con Mickey Mouse usando inteligencia artificial (Google Gemini), desarrollada como prueba de concepto para **ComicSansCon**, una agencia digital de experiencias interactivas para fans.

## Sobre el personaje: Mickey Mouse

Mickey es el personaje más emblemático del cine animado, creado por Walt Disney en 1928. En este chat, Mickey mantiene su personalidad clásica: optimista, entusiasta y siempre de buen humor, con muletillas como "¡Uh-oh!" y "Gee...". El personaje está diseñado para no salirse de tono ante temas oscuros o controvertidos, y no tiene conocimiento de eventos reales recientes ni tecnología moderna, ya que "vive" en su mundo de dibujos animados.

## Stack tecnológico

- **Frontend**: HTML, CSS y JavaScript vanilla (sin frameworks ni build tools)
- **Routing**: SPA con History API nativa del navegador
- **Backend/Proxy**: Vercel Serverless Functions
- **IA**: Google Gemini API (SDK `@google/generative-ai`)
- **Testing**: Vitest
- **Deploy**: Vercel

## Requisitos previos

- Node.js instalado
- Una API key de Google Gemini (gratuita, se obtiene en [aistudio.google.com/apikey](https://aistudio.google.com/apikey))
- Vercel CLI instalado globalmente: `npm install -g vercel`

## Cómo correr el proyecto en local

1. Cloná el repositorio:
```bash
   git clone https://github.com/valefresia/ProyectoM3_valentinaFresia-.git
   cd ProyectoM3_valentinaFresia-
```

2. Instalá las dependencias:
```bash
   npm install
```

3. Configurá las variables de entorno: copiá `.env.example` como `.env` y completá con tu propia API key de Gemini:
```bash
   copy .env.example .env
```
TU_API_KEY_AQUI = 

4. Corré el proyecto con Vercel CLI (necesario para que la serverless function funcione en local):
```bash
   vercel dev
```

5. Abrí [http://localhost:3000](http://localhost:3000) en el navegador.

## Cómo ejecutar los tests

`[PENDIENTE — se agrega cuando estén implementados los tests con Vitest]`

```bash
npm test
```

## Cómo desplegar a Vercel

`[PENDIENTE — se completa en el paso de deploy]`



## Link a la aplicación desplegada

