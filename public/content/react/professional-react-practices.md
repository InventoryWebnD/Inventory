# Professional React Practices

## Introduction
Professional React code is not about clever tricks; it is about clear, predictable, maintainable code. This topic collects the habits that separate a beginner project from production-quality work: small focused components, minimal and derived state, correct dependencies, accessible markup, error handling, tests, and good use of the ecosystem (TypeScript, ESLint, Prettier, a router, a data library).

## Subtopics
- Keep components small and focused
- Minimal state; derive everything else
- Colocate state; lift only when needed
- Correct hook dependencies
- Immutable updates
- Stable keys
- Handling loading, error and empty states
- Accessibility basics
- TypeScript or PropTypes for props
- ESLint + Prettier
- Naming conventions
- Avoid premature optimization
- Ecosystem choices: router, forms, data fetching, UI library
- Reading the official docs (react.dev)

## Syntax
```jsx
// Before: too much state, duplicated data, magic strings
const [items, setItems] = useState([]);
const [count, setCount] = useState(0);              // duplicate of items.length
const [status, setStatus] = useState("");           // "loadng"? typo risk

// After: minimal state, derived values, clear names
const [items, setItems] = useState([]);
const count = items.length;                          // derived
const STATUS = { LOADING: "loading", ERROR: "error", SUCCESS: "success" };
```

```tsx
// TypeScript documents and enforces props
type ProductCardProps = {
  product: { id: number; name: string; price: number };
  onAdd: (id: number) => void;
};

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article>
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button type="button" onClick={() => onAdd(product.id)}>Add to cart</button>
    </article>
  );
}
```

```text
Typical professional stack
Build:      Vite (or Next.js)       Routing:    React Router
Data:       TanStack Query          Forms:      React Hook Form + Zod
State:      Context / Zustand       Styling:    Tailwind or CSS Modules
Quality:    TypeScript, ESLint, Prettier         Tests: Vitest + Testing Library
```

## Important Methods & Properties
| Practice | Why | Example |
|---|---|---|
| Single responsibility | Easier to read/test | `ProductCard`, `useProducts` |
| Derived state | One source of truth | `const total = items.reduce(...)` |
| Immutable updates | Reliable re-renders | `setList(prev => [...prev, x])` |
| Typed props | Catch bugs early | TypeScript types |
| ESLint hooks rules | Prevent stale closures | `react-hooks/exhaustive-deps` |
| Error boundaries + states | Resilient UI | See Error Boundaries |
| Tests for key flows | Safe refactoring | Testing Library |

## Common Use Cases
- **Beginner:** refactoring a long `App.jsx` into components.
- **Practical UI:** replacing duplicated state with derived values.
- **Real-world application:** a team project with linting, types, tests and a clear folder structure.

## Common Errors
1. ❌
```jsx
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [fullName, setFullName] = useState("");
useEffect(() => setFullName(`${firstName} ${lastName}`), [firstName, lastName]);
```
**Why it fails:** `fullName` is redundant state kept in sync by an effect; it renders once with a stale value first.
✅
```jsx
const fullName = `${firstName} ${lastName}`;
```
**Explanation:** Compute values that can be derived.

2. ❌
```jsx
useEffect(() => { load(userId); }, []);       // eslint-disable-line react-hooks/exhaustive-deps
```
**Why it fails:** Silencing the linter hides a real stale-data bug.
✅
```jsx
useEffect(() => { load(userId); }, [userId]);
```
**Explanation:** Fix the dependencies instead of disabling the rule.

3. ❌
```jsx
function App() { /* 600 lines: fetching, forms, tables, modals, styles */ }
```
**Why it fails:** Nobody can safely change it.
✅
```jsx
function App() { return <Layout><ProductsPage /></Layout>; }
```
**Explanation:** Split by responsibility and extract hooks.

4. ❌
```jsx
<div onClick={handleClick}>Buy</div>
```
**Why it fails:** Not keyboard accessible and not announced as a button.
✅
```jsx
<button type="button" onClick={handleClick}>Buy</button>
```
**Explanation:** Use semantic HTML.

## Common Mistakes
- Adding libraries before understanding the problem they solve.
- Too much global state, too little local state.
- Copy-pasting tutorial code without understanding it.
- Premature `memo`/`useMemo`/`useCallback`.
- Not reading error messages or the official docs.
- Skipping loading, error and empty states.

## Quick Reference
```text
Small components | minimal state | derived values | stable keys
Correct deps | immutable updates | semantic HTML
Loading + error + empty states | tests for key flows
TypeScript + ESLint + Prettier | measure before optimizing
```
