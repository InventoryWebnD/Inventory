# Error Boundaries

## Introduction
If a component throws an error while rendering, React unmounts the whole tree and the user sees a blank page. An **error boundary** is a component that catches rendering errors in its children and shows a fallback UI instead. Errors in event handlers, async code and effects are *not* caught by boundaries, so you handle those with `try/catch` and error state.

## Subtopics
- What error boundaries catch (render, lifecycle, constructors of children)
- What they do not catch (events, async, SSR, errors in the boundary itself)
- Class-based boundary (`getDerivedStateFromError`, `componentDidCatch`)
- `react-error-boundary` library
- Fallback UI and "Try again" (reset)
- Placing boundaries (app level and feature level)
- Logging errors
- `try/catch` for async and event errors

## Syntax
```jsx
// Built by hand (the only place classes are still required)
import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };                       // switch to fallback UI
  }
  componentDidCatch(error, info) {
    console.error("Caught:", error, info.componentStack);   // log to a service
  }
  render() {
    if (this.state.hasError) return this.props.fallback ?? <p>Something went wrong.</p>;
    return this.props.children;
  }
}

<ErrorBoundary fallback={<p>Widget failed.</p>}>
  <Widget />
</ErrorBoundary>
```

```jsx
// With the react-error-boundary package
import { ErrorBoundary } from "react-error-boundary";

<ErrorBoundary
  fallbackRender={({ error, resetErrorBoundary }) => (
    <div role="alert">
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )}
>
  <Dashboard />
</ErrorBoundary>
```

```jsx
// Errors boundaries do NOT catch these - use try/catch + state
async function handleSave() {
  try { await save(); } catch (e) { setError(e.message); }
}
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| `getDerivedStateFromError` | Update state to show fallback | `return { hasError: true }` |
| `componentDidCatch` | Log the error | `console.error(error, info)` |
| `fallback` | UI to show after an error | `fallback={<ErrorPage />}` |
| `resetErrorBoundary` | Retry rendering children | `react-error-boundary` |
| `try/catch` | Handle event/async errors | `try { await api() } catch {...}` |

## Common Use Cases
- **Beginner:** a friendly message instead of a white screen.
- **Practical UI:** isolating a failing widget so the rest of the page works.
- **Real-world application:** reporting crashes to Sentry and offering "Reload".

## Common Errors
1. ❌
```jsx
<ErrorBoundary>
  <button onClick={() => { throw new Error("Oops"); }}>Click</button>
</ErrorBoundary>
```
**Why it fails:** Error boundaries do not catch errors thrown in event handlers.
✅
```jsx
<button onClick={() => { try { risky(); } catch (e) { setError(e.message); } }}>Click</button>
```
**Explanation:** Use `try/catch` inside handlers.

2. ❌
```jsx
useEffect(() => {
  fetch(url).then(r => { throw new Error("bad"); });     // async: not caught
}, []);
```
**Why it fails:** Asynchronous errors happen outside React's render phase.
✅
```jsx
fetch(url).then(...).catch(err => setError(err.message));
```
**Explanation:** Catch async errors and store them in state (you can then `throw` during render if you want a boundary to handle it).

3. ❌
```jsx
// One boundary around the whole app only
<ErrorBoundary><App /></ErrorBoundary>
```
**Why it fails:** A tiny widget crash replaces the entire page with the fallback.
✅
```jsx
<ErrorBoundary><Sidebar /></ErrorBoundary>
<ErrorBoundary><Chart /></ErrorBoundary>
```
**Explanation:** Add granular boundaries around independent features, plus one at the root.

## Common Mistakes
- Expecting boundaries to catch event handler or async errors.
- No fallback or no way to retry.
- Not logging errors anywhere.
- One boundary for everything.

## Quick Reference
```jsx
<ErrorBoundary fallback={<p>Error</p>}><Feature /></ErrorBoundary>
try { await action(); } catch (e) { setError(e.message); }
```
