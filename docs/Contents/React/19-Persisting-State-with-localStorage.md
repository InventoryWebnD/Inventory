# Persisting State with localStorage

## Introduction
React state disappears when the page is refreshed. The browser's `localStorage` stores small strings that survive reloads, so you can use it to remember a theme, a cart or a draft. In React the clean approach is to **initialize state from storage** and **sync changes back with an effect**, ideally wrapped in a reusable `useLocalStorage` hook.

## Subtopics
- `localStorage.getItem / setItem / removeItem`
- `JSON.stringify` and `JSON.parse`
- Lazy initial state from storage
- Syncing with `useEffect`
- A reusable `useLocalStorage` hook
- Handling invalid / missing data (`try/catch`)
- Cross-tab sync (the `storage` event)
- What not to store (passwords, tokens in sensitive apps)

## Syntax
```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;                       // corrupted or blocked
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function TodoApp() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  return (
    <>
      <button onClick={() => setTodos([...todos, { id: Date.now(), text: "New" }])}>Add</button>
      <ul>{todos.map(t => <li key={t.id}>{t.text}</li>)}</ul>
    </>
  );
}
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| `setItem(key, str)` | Save a string | `localStorage.setItem("theme", "dark")` |
| `getItem(key)` | Read (or `null`) | `localStorage.getItem("theme")` |
| `removeItem(key)` | Delete one key | `localStorage.removeItem("theme")` |
| `JSON.stringify` | Object to string | `JSON.stringify(cart)` |
| `JSON.parse` | String to object | `JSON.parse(saved)` |
| Lazy initializer | Read storage once | `useState(() => read())` |

## Common Use Cases
- **Beginner:** remembering a user's name after refresh.
- **Practical UI:** saving dark/light mode.
- **Real-world application:** persisting a shopping cart or a form draft.

## Common Errors
1. ❌
```jsx
localStorage.setItem("user", { name: "Asha" });
const user = localStorage.getItem("user");     // "[object Object]"
```
**Why it fails:** Storage only holds strings.
✅
```jsx
localStorage.setItem("user", JSON.stringify({ name: "Asha" }));
const user = JSON.parse(localStorage.getItem("user"));
```
**Explanation:** Stringify when saving, parse when reading.

2. ❌
```jsx
const [todos, setTodos] = useState([]);
useEffect(() => { setTodos(JSON.parse(localStorage.getItem("todos"))); }, []);
useEffect(() => { localStorage.setItem("todos", JSON.stringify(todos)); }, [todos]);
```
**Why it fails:** The second effect runs first with `[]` and overwrites the saved data, and `JSON.parse(null)` returns `null`.
✅
```jsx
const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem("todos")) ?? []);
```
**Explanation:** Read storage in the initial state, so there is no empty overwrite.

3. ❌
```jsx
const data = JSON.parse(localStorage.getItem("settings"));   // throws on bad JSON
```
**Why it fails:** Invalid or manually edited data throws a `SyntaxError` and crashes the component.
✅
```jsx
try { return JSON.parse(raw) ?? fallback; } catch { return fallback; }
```
**Explanation:** Always guard `JSON.parse`.

## Common Mistakes
- Forgetting `JSON.stringify` / `JSON.parse`.
- Overwriting saved data on first render.
- Storing sensitive data (passwords, access tokens) where scripts can read it.
- Using `localStorage` during server rendering (it only exists in the browser).
- Storing very large data (limit is roughly 5 MB).

## Quick Reference
```jsx
localStorage.setItem("key", JSON.stringify(value));
const value = JSON.parse(localStorage.getItem("key")) ?? fallback;
localStorage.removeItem("key");
const [value, setValue] = useLocalStorage("key", initial);
```
