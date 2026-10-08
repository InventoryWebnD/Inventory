# State Management

## Introduction
"State management" is deciding **where each piece of state lives** and how components share it. Start simple: keep state local, lift it when siblings need it, use Context for app-wide values, and only add an external library (Redux Toolkit, Zustand) when the app grows. Also separate **client state** (UI: modals, forms) from **server state** (data from an API), which is better handled by a query library.

## Subtopics
- Local state vs shared state
- Lifting state and prop drilling
- Context + `useReducer` as a built-in store
- Server state vs client state
- URL as state (search params)
- Redux Toolkit and Zustand overview
- Choosing the simplest tool
- Derived state and normalization

## Syntax
```jsx
// Built-in store: Context + useReducer
const CartContext = createContext(null);

function cartReducer(items, action) {
  switch (action.type) {
    case "add":    return [...items, action.product];
    case "remove": return items.filter(p => p.id !== action.id);
    case "clear":  return [];
    default: throw new Error("Unknown action");
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  return <CartContext value={{ items, dispatch }}>{children}</CartContext>;
}
export const useCart = () => useContext(CartContext);
```

```jsx
// Zustand: a small external store
import { create } from "zustand";

const useCartStore = create(set => ({
  items: [],
  add: product => set(s => ({ items: [...s.items, product] })),
  clear: () => set({ items: [] }),
}));

const count = useCartStore(s => s.items.length);   // subscribe to only what you need
```

## Important Methods & Properties
| Option | Best for | Example |
|---|---|---|
| `useState` | Local UI state | Input text, open/closed |
| Lift state | Siblings share data | Search + results |
| Context (+ `useReducer`) | Small/medium global state | Theme, auth, cart |
| Zustand | Simple global store | `create(set => ...)` |
| Redux Toolkit | Large apps, strict patterns | `createSlice` |
| TanStack Query | Server state (API data) | `useQuery` |
| URL search params | Shareable filters | `useSearchParams` |

## Common Use Cases
- **Beginner:** `useState` in one component.
- **Practical UI:** a cart accessible from navbar and product pages.
- **Real-world application:** a dashboard using TanStack Query for API data and Zustand/Context for UI preferences.

## Common Errors
1. ❌
```jsx
// Everything global from day one
const store = { user, cart, modalOpen, searchText, hoverId };
```
**Why it fails:** Fast-changing UI state in a global store re-renders big parts of the app and complicates simple features.
✅
```jsx
// Keep modalOpen, searchText, hoverId local to the components using them.
```
**Explanation:** Share only what truly needs sharing.

2. ❌
```jsx
const [products, setProducts] = useState([]);
const [cartCount, setCartCount] = useState(0);     // duplicates cart.length
```
**Why it fails:** Two sources of truth can drift apart.
✅
```jsx
const cartCount = cart.length;
```
**Explanation:** Derive values instead of storing them twice.

3. ❌
```jsx
<CartContext value={{ items, dispatch }}>   // each render creates a new object
```
**Why it fails:** All consumers re-render whenever the provider renders.
✅
```jsx
const value = useMemo(() => ({ items, dispatch }), [items]);
```
**Explanation:** Memoize the context value or split context for state and dispatch.

## Common Mistakes
- Reaching for Redux before the app needs it.
- Putting API data in Context/Redux by hand and writing caching logic yourself.
- Storing derived values.
- Mixing UI state and server state in one store.
- Mutating store state directly.

## Quick Reference
```text
Local only          -> useState / useReducer
Two siblings        -> lift state to parent
Many distant parts  -> Context (+ useReducer) or Zustand
Server data         -> TanStack Query / SWR
Shareable filters   -> URL search params
Big team / strict   -> Redux Toolkit
```
