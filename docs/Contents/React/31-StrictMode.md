# StrictMode

## Introduction
`<StrictMode>` is a development-only wrapper that helps you find bugs early. In development it renders components an **extra time** and runs each effect's setup and cleanup an **extra time** to reveal impure rendering and missing cleanup. It has no effect on the production build and renders no UI.

## Subtopics
- Enabling `StrictMode` in `main.jsx`
- Double render in development
- Effect setup, cleanup, setup again
- Why "it runs twice" is intentional
- Finding impure components
- Missing cleanup bugs
- Ref callback and deprecated API warnings
- Only affects development

## Syntax
```jsx
// main.jsx (created by Vite)
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

```jsx
// In development you will see: setup -> cleanup -> setup
useEffect(() => {
  const connection = createConnection();
  connection.connect();
  return () => connection.disconnect();     // proper cleanup makes this harmless
}, []);
```

## Important Methods & Properties
| Behaviour | Why it exists | What to do |
|---|---|---|
| Component renders twice | Detect impure rendering | Keep render pure |
| Effects re-run once (mount, unmount, mount) | Detect missing cleanup | Add cleanup |
| Extra ref callback run | Detect ref cleanup issues | Return cleanup from ref callbacks |
| Warnings for deprecated APIs | Prepare for upgrades | Fix the warnings |
| Production | No double behaviour | Nothing changes |

## Common Use Cases
- **Beginner:** understanding why `console.log` appears twice.
- **Practical UI:** finding a timer that never stops.
- **Real-world application:** catching subscription leaks and impure rendering before release.

## Common Errors
1. ❌
```jsx
useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);  // never cleared
}, []);                                                      // two timers in dev
```
**Why it fails:** The extra mount in development starts a second timer and the first is never stopped, which exposes the missing cleanup.
✅
```jsx
useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(id);
}, []);
```
**Explanation:** An effect must be able to start, stop and start again safely. (Do one-time user actions such as "send analytics on click" in event handlers instead.)

2. ❌
```jsx
let nextId = 0;
function Item() {
  const id = nextId++;            // changes global value during render
  return <li>{id}</li>;
}
```
**Why it fails:** Double rendering makes the IDs skip and shows impure code.
✅
```jsx
function Item({ id }) { return <li>{id}</li>; }
```
**Explanation:** Render should not change anything outside the component.

3. ❌
```jsx
useEffect(() => {
  window.addEventListener("scroll", onScroll);
}, []);                            // listener added twice, never removed
```
**Why it fails:** Strict Mode shows the leak immediately.
✅
```jsx
useEffect(() => {
  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);
```
**Explanation:** Always write the cleanup.

## Common Mistakes
- Removing `StrictMode` to "fix" double logs instead of fixing the cause.
- Thinking the double render happens in production.
- Using refs or module variables to skip the second effect run (hides the real bug).
- Ignoring Strict Mode warnings.

## Quick Reference
```jsx
<StrictMode><App /></StrictMode>
// Dev only: render twice, effect setup -> cleanup -> setup.
// Fix by making render pure and writing proper cleanup.
```
