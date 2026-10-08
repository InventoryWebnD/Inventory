# useEffect

## Introduction
`useEffect` lets a component **synchronize with something outside React** after it renders: fetching data, adding event listeners, starting timers, changing the document title, or talking to a non-React library. The effect runs after the screen is painted, and its *dependency array* controls when it runs again. Use it for side effects, not for calculating what to render.

## Subtopics
- Effect timing (after render)
- Dependency array: none, `[]`, `[a, b]`
- Cleanup functions
- Effects that fetch data
- Event listeners, timers and subscriptions
- Stale closures and missing dependencies
- Infinite loops from bad dependencies
- When you do *not* need an effect

## Syntax
```jsx
import { useEffect, useState } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);        // cleanup
  }, []);                                  // run once after first render

  return <p>{time.toLocaleTimeString()}</p>;
}
```

```jsx
useEffect(() => { /* runs after every render */ });
useEffect(() => { /* runs once on mount */ }, []);
useEffect(() => { /* runs when userId changes */ }, [userId]);

useEffect(() => {
  function onResize() { setWidth(window.innerWidth); }
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, []);
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| Effect function | Code that runs after render | `useEffect(() => {...})` |
| No array | Run after every render | `useEffect(fn)` |
| `[]` | Run once after mount | `useEffect(fn, [])` |
| `[dep]` | Re-run when `dep` changes | `useEffect(fn, [id])` |
| Cleanup (return) | Undo the previous effect | `return () => clearInterval(id)` |
| Effect Event / ref | Read latest value without re-running | See React docs `useEffectEvent` |

## Common Use Cases
- **Beginner:** updating `document.title` when a count changes.
- **Practical UI:** a window `resize` or `keydown` listener.
- **Real-world application:** loading data when a route parameter changes, or connecting/disconnecting a WebSocket.

## Common Errors
1. ❌
```jsx
useEffect(() => {
  setCount(count + 1);
});            // no dependency array
```
**Why it fails:** Each render sets state, which renders again, which runs the effect again: an infinite loop.
✅
```jsx
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```
**Explanation:** Add a dependency array and avoid setting state unconditionally.

2. ❌
```jsx
useEffect(() => {
  const id = setInterval(tick, 1000);
}, []);        // never cleaned up
```
**Why it fails:** The timer keeps running after unmount (and duplicates in Strict Mode).
✅
```jsx
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, []);
```
**Explanation:** Return a cleanup function for anything you start.

3. ❌
```jsx
useEffect(() => {
  fetchUser(userId).then(setUser);
}, []);        // userId missing
```
**Why it fails:** The effect uses `userId` but never re-runs when it changes, so the UI shows stale data.
✅
```jsx
useEffect(() => {
  fetchUser(userId).then(setUser);
}, [userId]);
```
**Explanation:** List every reactive value the effect reads.

4. ❌
```jsx
useEffect(async () => {          // async effect
  const res = await fetch(url);
}, []);
```
**Why it fails:** An `async` function returns a Promise, but React expects nothing or a cleanup function.
✅
```jsx
useEffect(() => {
  async function load() {
    const res = await fetch(url);
    setData(await res.json());
  }
  load();
}, [url]);
```
**Explanation:** Define an async function inside the effect and call it.

5. ❌
```jsx
const [fullName, setFullName] = useState("");
useEffect(() => setFullName(first + " " + last), [first, last]);
```
**Why it fails:** Derived data does not need an effect; it causes an extra render.
✅
```jsx
const fullName = first + " " + last;
```
**Explanation:** Calculate during render when the value comes from props or state.

## Common Mistakes
- Omitting dependencies to "fix" a warning instead of fixing the logic.
- Putting objects/arrays/functions created in render into the dependency array (they change every render).
- Using effects to react to user events (handle them in the event handler instead).
- Forgetting cleanup for timers, listeners and subscriptions.
- Using effects for derived state.

## Quick Reference
```jsx
useEffect(() => {
  // setup: fetch, subscribe, start timer
  return () => {
    // cleanup: abort, unsubscribe, clear timer
  };
}, [dependencies]);
```
