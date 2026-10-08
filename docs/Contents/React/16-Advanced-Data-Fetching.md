# Advanced Data Fetching

## Introduction
Basic `useEffect` fetching works, but real apps hit extra problems: requests that finish out of order, requests for components that already left the screen, repeated loading of the same data, and the need for refetching and caching. This topic covers how to cancel and ignore stale requests, build a reusable hook, and when to use a library such as **TanStack Query**.

## Subtopics
- Race conditions (old response arrives last)
- `AbortController` to cancel requests
- Ignoring stale results with a flag
- Reusable `useFetch` hook
- Caching and deduplication
- Refetching, polling and revalidation
- Optimistic updates
- Pagination and infinite scroll
- Query libraries (TanStack Query, SWR)

## Syntax
```jsx
function useFetch(url) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => setState({ data, loading: false, error: null }))
      .catch(err => {
        if (err.name === "AbortError") return;      // cancelled: ignore
        setState({ data: null, loading: false, error: err.message });
      });

    return () => controller.abort();                // cleanup cancels
  }, [url]);

  return state;
}

const { data, loading, error } = useFetch(`/api/products/${id}`);
```

```jsx
// TanStack Query: caching, retries and refetch handled for you
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function Products() {
  const { data, isPending, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetch("/api/products").then(r => r.json()),
  });
  // ...
}
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| `AbortController` | Cancel an in-flight request | `controller.abort()` |
| `signal` | Connect fetch to the controller | `fetch(url, { signal })` |
| `ignore` flag | Skip state updates from old effects | `if (!ignore) setData(x)` |
| `useQuery` | Cached, auto-refetching reads | `useQuery({ queryKey, queryFn })` |
| `useMutation` | Writes (POST/PUT/DELETE) | `useMutation({ mutationFn })` |
| `queryKey` | Cache identity of a query | `["product", id]` |

## Common Use Cases
- **Beginner:** cancelling a request when the user leaves the page.
- **Practical UI:** a search box that fetches results as the user types.
- **Real-world application:** dashboards with cached lists, background refresh and optimistic "like" buttons.

## Common Errors
1. ❌
```jsx
useEffect(() => {
  fetch(`/api/search?q=${query}`).then(r => r.json()).then(setResults);
}, [query]);
```
**Why it fails:** If the response for "re" arrives after the response for "react", the screen shows results for the wrong query (a race condition).
✅
```jsx
useEffect(() => {
  let ignore = false;
  fetch(`/api/search?q=${query}`)
    .then(r => r.json())
    .then(json => { if (!ignore) setResults(json); });
  return () => { ignore = true; };
}, [query]);
```
**Explanation:** The cleanup marks the previous request as stale so its result is ignored.

2. ❌
```jsx
.catch(err => setError(err.message));    // also catches AbortError
```
**Why it fails:** Aborting on cleanup throws an `AbortError`, which then shows a fake error.
✅
```jsx
.catch(err => { if (err.name !== "AbortError") setError(err.message); });
```
**Explanation:** Ignore the abort error; it is expected.

3. ❌
```jsx
// Every component that needs products fetches them again
function A() { useEffect(() => { fetch("/api/products")...}, []); }
function B() { useEffect(() => { fetch("/api/products")...}, []); }
```
**Why it fails:** Duplicate requests, loading flashes and inconsistent data.
✅
```jsx
const { data } = useQuery({ queryKey: ["products"], queryFn: getProducts });   // shared cache
```
**Explanation:** A query library shares one cached result between components.

## Common Mistakes
- Not cancelling or ignoring outdated requests.
- Sending a request on every keystroke (use debouncing).
- Re-implementing caching and retry logic by hand in many components.
- Showing a blank screen while refetching instead of keeping old data.
- Forgetting loading and error states for mutations (POST/DELETE).

## Quick Reference
```jsx
const controller = new AbortController();
fetch(url, { signal: controller.signal });
return () => controller.abort();          // in useEffect cleanup

// debounce a value
function useDebounce(value, ms = 400) {
  const [v, setV] = useState(value);
  useEffect(() => { const t = setTimeout(() => setV(value), ms); return () => clearTimeout(t); }, [value, ms]);
  return v;
}
```
