# Know Reel (Svelte Prototype)

Svelte (Vite) prototype for the demo.

## Run (Dev)

```
cd know-reel
npm install
npm run dev -- --open
```

Optional: specify a port via Vite flag `-- --port 5173`.

## App Structure

- `src/App.svelte` — App shell and navigation
- `src/routes/*` — Screens: Home, Videos, Hadith, Settings
- `src/lib/*` — Router and theme store
- `src/styles/app.css` — Styles with Light/Dark CSS variables

Data persists via `localStorage` for demo purposes.

## Features

- Add Videos: title, URL, tags; YouTube/Vimeo preview.
- Add Hadith: text, source, narrator, reference.
- Settings → Appearance: Dark/Light mode (persisted).
