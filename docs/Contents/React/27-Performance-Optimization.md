# Performance Optimization

## Introduction
Most React apps are fast enough without special effort. Optimize **after measuring**, and start with the biggest wins: avoid unnecessary work, render less, load less code and keep state close to where it is used. React offers `memo`, `useMemo` and `useCallback`; you also have code-splitting with `lazy`, list virtualization, and transitions for heavy updates.

## Subtopics
- Measuring with React DevTools Profiler
- Why components re-render
- Moving state down / splitting components
- Passing `children` to avoid re-renders
- `memo`, `useMemo`, `useCallback` (when needed)
- Code-splitting: `lazy` and `Suspense`
- List virtualization for long lists
- `useTransition` / `useDeferredValue` for heavy updates
- Stable `key`s and avoiding remounts
- Bundle size and image optimization

## Syntax
```jsx
// 1. Move state down so only a small part re-renders
function Page() {
  return (<><SearchBox /><ExpensiveChart /></>);     // typing inside SearchBox doesn't touch the chart
}
function SearchBox() {
  const [q, setQ] = useState("");
  return <input value={q} onChange={e => setQ(e.target.value)} />;
}
```

```jsx
// 2. Code-splitting
import { lazy, Suspense } from "react";
const AdminPanel = lazy(() => import("./AdminPanel"));

<Suspense fallback={<p>Loading...</p>}>
  <AdminPanel />
</Suspense>
```

```jsx
// 3. Keep typing responsive while filtering a huge list
const [query, setQuery] = useState("");
const deferredQuery = useDeferredValue(query);
const results = useMemo(() => filterBig(items, deferredQuery), [items, deferredQuery]);

// 4. Mark a slow update as non-urgent
const [isPending, startTransition] = useTransition();
startTransition(() => setTab("reports"));
```

## Important Methods & Properties
| Tool | Purpose | Example |
|---|---|---|
| React DevTools Profiler | Find slow renders | "Highlight updates", flamegraph |
| `memo` | Skip re-render with equal props | `memo(Row)` |
| `lazy` + `Suspense` | Load code on demand | `lazy(() => import("./Page"))` |
| `useDeferredValue` | Lag heavy UI behind input | `useDeferredValue(query)` |
| `useTransition` | Mark updates as non-urgent | `startTransition(() => ...)` |
| Virtualization | Render only visible rows | `react-window`, TanStack Virtual |

## Common Use Cases
- **Beginner:** noticing and fixing a laggy search input.
- **Practical UI:** lazy-loading the admin/dashboard route.
- **Real-world application:** virtualized tables with thousands of rows and deferred filtering.

## Common Errors
1. ❌
```jsx
function App() {
  const [text, setText] = useState("");
  return (<><input value={text} onChange={...} /><HugeTable /></>);   // HugeTable re-renders per keystroke
}
```
**Why it fails:** State in `App` makes every child re-render on each keystroke.
✅
```jsx
function SearchInput() { const [text, setText] = useState(""); return <input ... />; }
function App() { return (<><SearchInput /><HugeTable /></>); }
```
**Explanation:** Colocate state with the component that needs it.

2. ❌
```jsx
{items.map(i => <Row key={Math.random()} item={i} />)}
```
**Why it fails:** A new key each render forces React to destroy and recreate every row.
✅
```jsx
{items.map(i => <Row key={i.id} item={i} />)}
```
**Explanation:** Keys must be stable.

3. ❌
```jsx
import { Chart } from "heavy-chart-lib";     // loaded for all users on first page
```
**Why it fails:** Large libraries slow down the first load even if only one page needs them.
✅
```jsx
const Chart = lazy(() => import("./Chart"));
```
**Explanation:** Split large, rarely used code into separate chunks.

4. ❌
```jsx
// optimizing everything with memo/useMemo/useCallback before any measurement
```
**Why it fails:** It adds complexity, can hide bugs (stale values) and often gives no speed-up.
✅
```jsx
// Profile -> find the slow component -> fix that one.
```
**Explanation:** Measure first, optimize second.

## Common Mistakes
- Premature optimization.
- Rendering thousands of DOM nodes instead of virtualizing.
- Creating new objects/functions for memoized children.
- Large global state causing app-wide re-renders.
- Ignoring bundle size and image sizes.

## Quick Reference
```jsx
const C = memo(Component);
const v = useMemo(() => heavy(a), [a]);
const f = useCallback(() => {}, []);
const Lazy = lazy(() => import("./Lazy"));
const deferred = useDeferredValue(value);
const [pending, startTransition] = useTransition();
```
