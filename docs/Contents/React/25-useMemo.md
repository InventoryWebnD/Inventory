# useMemo

## Introduction
`useMemo` caches the **result of a calculation** between renders and only recalculates it when its dependencies change. It helps in two cases: skipping an expensive computation, and keeping an object/array reference stable so memoized children or effects do not re-run needlessly.

## Subtopics
- `useMemo(() => value, [deps])`
- Expensive calculations (filtering/sorting big lists)
- Referential equality for objects and arrays
- Dependency array rules
- `useMemo` vs `useCallback`
- Not a guarantee (React may discard the cache)
- Measuring before optimizing
- React Compiler

## Syntax
```jsx
import { useMemo, useState } from "react";

function Products({ products }) {
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(false);

  // Recomputed only when products or query change (not when dark toggles)
  const visible = useMemo(
    () => products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())),
    [products, query]
  );

  const total = useMemo(() => visible.reduce((s, p) => s + p.price, 0), [visible]);

  return (
    <div className={dark ? "dark" : ""}>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={() => setDark(d => !d)}>Theme</button>
      <p>Total: ₹{total}</p>
      <List items={visible} />
    </div>
  );
}
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| Calculate function | Returns the value to cache | `() => items.filter(...)` |
| Dependencies | When to recompute | `[items, query]` |
| Return value | Used like a normal variable | `const visible = useMemo(...)` |
| `useCallback(fn, deps)` | Equivalent to `useMemo(() => fn, deps)` | Caches a function |
| Profiler | Check if it helps | React DevTools |

## Common Use Cases
- **Beginner:** caching a total price calculation.
- **Practical UI:** filtering/sorting hundreds or thousands of rows.
- **Real-world application:** a stable `options` object passed to a chart library or a context `value`.

## Common Errors
1. ❌
```jsx
const sorted = useMemo(() => items.sort(compare), [items]);
```
**Why it fails:** `sort` mutates `items` (state/props), breaking immutability.
✅
```jsx
const sorted = useMemo(() => [...items].sort(compare), [items]);
```
**Explanation:** The calculation must be pure.

2. ❌
```jsx
const result = useMemo(() => compute(a, b), [a]);    // b missing
```
**Why it fails:** The memo ignores changes to `b`, so `result` becomes stale.
✅
```jsx
const result = useMemo(() => compute(a, b), [a, b]);
```
**Explanation:** Include everything used inside the calculation.

3. ❌
```jsx
const style = useMemo(() => ({ color: "red" }), [{}]);   // new object dependency
```
**Why it fails:** A new object in the dependency list changes every render, so the cache is always invalid.
✅
```jsx
const style = useMemo(() => ({ color: "red" }), []);
```
**Explanation:** Dependencies must be stable values.

4. ❌
```jsx
const count = useMemo(() => a + b, [a, b]);    // trivial calculation
```
**Why it fails:** The overhead of memoizing is more than just adding two numbers.
✅
```jsx
const count = a + b;
```
**Explanation:** Memoize only expensive work or reference-sensitive values.

## Common Mistakes
- Using `useMemo` for every variable.
- Putting side effects (fetch, `setState`) inside `useMemo`.
- Relying on it for correctness (it is only an optimization).
- Missing or wrong dependencies.

## Quick Reference
```jsx
const value = useMemo(() => expensive(a, b), [a, b]);
const obj = useMemo(() => ({ a, b }), [a, b]);
```
