# Browser Storage

## Introduction
Browsers offer client-side storage APIs — `localStorage` and `sessionStorage` — to persist data without a server, useful for saving preferences, cached data, or session state.

## Subtopics
- `localStorage` (persists indefinitely)
- `sessionStorage` (persists per tab/session)
- Storing and retrieving values (`setItem`, `getItem`, `removeItem`, `clear`)
- Storing objects/arrays via `JSON.stringify`/`JSON.parse`
- Storage limitations (string-only, ~5-10MB, synchronous)
- The `storage` event (cross-tab communication)

## Syntax

```js
// localStorage - persists even after browser closes
localStorage.setItem("username", "Alice");
localStorage.getItem("username");     // "Alice"
localStorage.removeItem("username");
localStorage.clear();                    // removes everything

// sessionStorage - cleared when the tab/window closes
sessionStorage.setItem("token", "abc123");
sessionStorage.getItem("token");
sessionStorage.removeItem("token");

// Storing objects/arrays (must serialize to JSON first)
const user = { name: "Alice", age: 30 };
localStorage.setItem("user", JSON.stringify(user));

const stored = JSON.parse(localStorage.getItem("user"));
console.log(stored.name); // "Alice"

// Checking if a key exists
if (localStorage.getItem("theme") === null) {
  localStorage.setItem("theme", "light");
}

// Listening for storage changes from other tabs
window.addEventListener("storage", (event) => {
  console.log(event.key, event.oldValue, event.newValue);
});
```
- `localStorage` — data persists indefinitely, across browser restarts, until explicitly cleared.
- `sessionStorage` — data persists only for the lifetime of the current tab; closing the tab clears it (though it survives page reloads).
- Both APIs only store **strings** — objects/arrays must be converted with `JSON.stringify()` before storing and `JSON.parse()` after retrieving.
- `getItem()` returns `null` (not `undefined`) if the key doesn't exist.
- The `storage` event fires on *other* tabs/windows (not the one that made the change), useful for syncing state across tabs.

## Important Methods & Properties

| Method | Purpose | Syntax | Example |
|---|---|---|---|
| `setItem()` | Store a key-value pair | `storage.setItem(key, val)` | `localStorage.setItem("k","v")` |
| `getItem()` | Retrieve a value by key | `storage.getItem(key)` | `localStorage.getItem("k")` |
| `removeItem()` | Delete a specific key | `storage.removeItem(key)` | `localStorage.removeItem("k")` |
| `clear()` | Remove all stored data | `storage.clear()` | `localStorage.clear()` |
| `JSON.stringify()`/`JSON.parse()` | Serialize/deserialize objects | See JSON chapter | `JSON.stringify(obj)` |
| `storage` event | React to cross-tab changes | `window.addEventListener("storage", fn)` | Sync tabs |

## Common Use Cases
- **Beginner:** saving a user's preferred theme (`"light"`/`"dark"`) to `localStorage` so it persists on reload.
- **DOM example:** a to-do list app that saves the task array to `localStorage` on every change and reloads it on page load.
- **Real-world application:** storing a temporary auth token in `sessionStorage` for a single browsing session, or caching API responses in `localStorage` with a timestamp to avoid redundant network requests.

## Common Errors
1. ❌
```js
localStorage.setItem("user", { name: "Alice" }); // storing an object directly
console.log(localStorage.getItem("user")); // "[object Object]"
```
**Why it fails:** `localStorage` only stores strings; passing an object implicitly calls `.toString()`, producing the useless `"[object Object]"`.
✅
```js
localStorage.setItem("user", JSON.stringify({ name: "Alice" }));
const user = JSON.parse(localStorage.getItem("user"));
```
**Explanation:** Always serialize objects/arrays with `JSON.stringify()` before storing, and `JSON.parse()` after retrieving.

2. ❌
```js
const theme = localStorage.getItem("theme");
if (!theme) { ... } // treats "" (empty string) and null the same, may be unintended
```
**Why it fails:** Not strictly wrong, but conflating an empty string with a missing key can cause subtle bugs if `""` is a valid stored value.
✅
```js
if (theme === null) { ... } // explicitly check for "key not found"
```
**Explanation:** Use a strict `=== null` check when distinguishing "never set" from "set to an empty value."

3. ❌
```js
JSON.parse(localStorage.getItem("missingKey")); // getItem returns null
// throws: Unexpected token u in JSON at position 0 (parsing "null" incorrectly, or actual null causing issues depending on context)
```
**Why it fails:** If the key doesn't exist, `getItem()` returns `null`, and `JSON.parse(null)` actually returns `null` in modern engines but relying on this is fragile and can throw in edge cases with malformed data.
✅
```js
const raw = localStorage.getItem("missingKey");
const data = raw ? JSON.parse(raw) : null;
```
**Explanation:** Guard against `null`/missing values before parsing.

4. ❌
```js
sessionStorage.setItem("cart", JSON.stringify(cart));
// later, in a NEW tab:
console.log(sessionStorage.getItem("cart")); // null — different tab, different session
```
**Why it fails:** `sessionStorage` is scoped per tab/window; it is not shared across different tabs even on the same site.
✅
```js
// Use localStorage instead if data needs to persist/share across tabs
localStorage.setItem("cart", JSON.stringify(cart));
```
**Explanation:** Choose `localStorage` for cross-tab persistence, `sessionStorage` for single-tab-only data.

5. ❌
```js
window.addEventListener("storage", (e) => {
  console.log("changed in this same tab");
}); // expecting it to fire when THIS tab makes the change
```
**Why it fails:** The `storage` event only fires in *other* tabs/windows, not the one that made the change.
✅
```js
// Update local UI directly after your own setItem() call;
// use the storage event only to react to changes from other tabs.
```
**Explanation:** Understand the `storage` event is for cross-tab sync, not same-tab notifications.

## Common Mistakes
- Storing objects/arrays without `JSON.stringify()`.
- Not guarding against `null` before `JSON.parse()`.
- Confusing `localStorage` (persistent) with `sessionStorage` (tab-scoped).
- Expecting the `storage` event to fire in the same tab that made the change.
- Exceeding storage limits (~5-10MB) with large cached datasets.

## Quick Reference
```js
localStorage.setItem("key", "value");
localStorage.getItem("key");
localStorage.removeItem("key");
localStorage.clear();

sessionStorage.setItem("key", "value"); // tab-scoped version

localStorage.setItem("obj", JSON.stringify(obj));
const obj = JSON.parse(localStorage.getItem("obj"));
```
