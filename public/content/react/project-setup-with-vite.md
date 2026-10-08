# Project Setup with Vite

## Introduction
Create React App is deprecated; the standard way to start a new React project is **Vite**, a fast build tool with instant dev server startup and optimized production builds. This topic covers creating a project, understanding its files, using environment variables safely, and producing a production build.

## Subtopics
- Creating a project with `npm create vite@latest`
- Project structure (`index.html`, `src/main.jsx`, `App.jsx`)
- `npm run dev`, `build`, `preview`
- Importing CSS, images and JSON
- Environment variables (`import.meta.env`, `VITE_` prefix)
- `.env` files and `.gitignore`
- Absolute imports and aliases
- Production build and hosting static files
- Single Page App routing fallback

## Syntax
```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev        # development server (http://localhost:5173)
npm run build      # creates optimized files in /dist
npm run preview    # test the production build locally
```

```text
my-app/
├─ index.html          <- single HTML page with <div id="root">
├─ package.json
├─ vite.config.js
├─ public/             <- static files served as-is
└─ src/
   ├─ main.jsx         <- entry: createRoot(...).render(<App />)
   ├─ App.jsx
   └─ assets/
```

```bash
# .env  (never commit secrets)
VITE_API_URL=https://api.example.com
```

```jsx
const apiUrl = import.meta.env.VITE_API_URL;      // available in the browser
console.log(import.meta.env.MODE);                // "development" | "production"
fetch(`${apiUrl}/products`);
```

```js
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { proxy: { "/api": "http://localhost:3000" } },   // avoids CORS in development
});
```

## Important Methods & Properties
| Item | Purpose | Example |
|---|---|---|
| `npm run dev` | Start dev server with hot reload | `localhost:5173` |
| `npm run build` | Production bundle in `dist/` | Upload to a static host |
| `import.meta.env.VITE_*` | Public config values | `VITE_API_URL` |
| `.env`, `.env.production` | Environment-specific values | Different API per environment |
| `public/` | Files copied unchanged | `/favicon.ico` |
| `vite.config.js` | Plugins, proxy, aliases | `@vitejs/plugin-react` |

## Common Use Cases
- **Beginner:** starting a new React app and editing `App.jsx`.
- **Practical UI:** using an API URL from an environment variable.
- **Real-world application:** building `dist/` and hosting it on a static host, with a proxy in development.

## Common Errors
1. ❌
```jsx
const key = import.meta.env.API_KEY;     // undefined
```
**Why it fails:** Vite only exposes variables that start with `VITE_`.
✅
```jsx
const url = import.meta.env.VITE_API_URL;
```
**Explanation:** Prefix client-visible variables with `VITE_`.

2. ❌
```text
VITE_SECRET_DB_PASSWORD=mysecret
```
**Why it fails:** Everything in the browser bundle is public; any user can read it.
✅
```text
# Keep secrets on the server. Only put public config (API base URL) in VITE_ variables.
```
**Explanation:** Front-end environment variables are not secret.

3. ❌
```text
Edited .env while the dev server is running; value did not change
```
**Why it fails:** Environment variables are read when the dev server starts.
✅
```bash
# stop the server (Ctrl+C) and run again
npm run dev
```
**Explanation:** Restart after changing `.env`.

4. ❌
```text
Refreshing /products on the live site shows "404 Not Found"
```
**Why it fails:** The static host looks for a real `/products` file, but the app has only one `index.html`.
✅
```text
Configure the host to rewrite all routes to /index.html (SPA fallback).
```
**Explanation:** With client-side routing, the server must return `index.html` for unknown paths.

## Common Mistakes
- Committing `.env` files with secrets.
- Expecting `process.env` to work (Vite uses `import.meta.env`).
- Uploading the `src/` folder instead of the `dist/` folder.
- Using `.js` files for JSX instead of `.jsx` (Vite expects `.jsx`/`.tsx` for JSX).
- Hard-coding `http://localhost:3000` in code.

## Quick Reference
```bash
npm create vite@latest app -- --template react
npm install && npm run dev
npm run build && npm run preview
```
```jsx
import.meta.env.VITE_API_URL
```
