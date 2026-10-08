# Data Fetching in React

## Introduction
Most real apps load data from an API. In React you fetch inside an effect (or an event handler), store the result in state, and render based on three situations: **loading**, **error** and **success**. Because `fetch` is asynchronous, you use `async/await` or promises, and you must handle both failure and the "no data yet" moment.

## Subtopics
- `fetch` and `response.json()`
- `async/await` inside `useEffect`
- Loading, error and data state
- `response.ok` (HTTP errors do not throw)
- Fetching on mount vs on a changing value
- POST/PUT/DELETE requests
- Re-fetching and refresh buttons
- Creating a reusable `useFetch` hook

## Syntax
```jsx
function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setUsers(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">Error: {error}</p>;
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

```jsx
// Sending data
async function addTodo(todo) {
  const res = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error("Could not save");
  return res.json();
}
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| `fetch(url, options)` | Make an HTTP request | `fetch("/api/items")` |
| `res.ok` | `true` for status 200-299 | `if (!res.ok) throw ...` |
| `res.json()` | Parse the JSON body (returns a Promise) | `await res.json()` |
| `loading` state | Show a spinner | `const [loading, setLoading] = useState(true)` |
| `error` state | Show a message | `setError(err.message)` |
| `finally` | Always stop loading | `finally { setLoading(false) }` |

## Common Use Cases
- **Beginner:** list users from a public API.
- **Practical UI:** load a product when the `id` in the URL changes.
- **Real-world application:** dashboards that load, refresh and update server data with POST/PATCH/DELETE.

## Common Errors
1. ❌
```jsx
const res = await fetch(url);
const data = await res.json();      // a 404 page still gets here
```
**Why it fails:** `fetch` only rejects on network failure, not on 404 or 500.
✅
```jsx
const res = await fetch(url);
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const data = await res.json();
```
**Explanation:** Always check `res.ok`.

2. ❌
```jsx
function Users() {
  const [users, setUsers] = useState([]);
  fetch(url).then(r => r.json()).then(setUsers);   // runs on every render
  return ...;
}
```
**Why it fails:** Fetching in the render body triggers state updates, which re-render, which fetch again: an infinite loop.
✅
```jsx
useEffect(() => {
  fetch(url).then(r => r.json()).then(setUsers);
}, []);
```
**Explanation:** Run side effects in `useEffect`.

3. ❌
```jsx
const [user, setUser] = useState(null);
return <h1>{user.name}</h1>;
```
**Why it fails:** `user` is `null` until the request finishes, so reading `.name` crashes.
✅
```jsx
if (!user) return <p>Loading...</p>;
return <h1>{user.name}</h1>;
```
**Explanation:** Render a loading state before the data exists.

4. ❌
```jsx
const [data, setData] = useState([]);
const res = await fetch(url);
setData(res);                      // the Response, not the data
```
**Why it fails:** `res` is a Response object; the data is in `await res.json()`.
✅
```jsx
setData(await res.json());
```
**Explanation:** Parse the body before saving it.

## Common Mistakes
- Not handling errors or the loading state.
- Forgetting `Content-Type: application/json` and `JSON.stringify` in POST requests.
- Missing dependencies, so changing an id does not re-fetch.
- Setting state after the component unmounted or after a newer request (see Advanced Data Fetching).
- Hard-coding API URLs everywhere instead of one service file.

## Quick Reference
```jsx
useEffect(() => {
  let ignore = false;
  async function load() {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.statusText);
      const json = await res.json();
      if (!ignore) setData(json);
    } catch (e) { if (!ignore) setError(e.message); }
    finally { if (!ignore) setLoading(false); }
  }
  load();
  return () => { ignore = true; };
}, [url]);
```
