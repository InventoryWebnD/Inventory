# useContext

## Introduction
Context lets a parent make a value available to **every component below it**, without passing it as a prop through each level ("prop drilling"). You create a context, wrap part of the tree in its Provider, and read the value anywhere inside with `useContext`. It is ideal for app-wide data that rarely changes, like theme, current user or language.

## Subtopics
- `createContext`
- Provider and `value`
- `useContext` to read
- Prop drilling problem
- Storing state in a provider
- Custom `useX` hook for a context
- Default value
- Re-render behaviour and when not to use context

## Syntax
```jsx
// ThemeContext.jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggle = () => setTheme(t => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext value={{ theme, toggle }}>   {/* React 19: no .Provider needed */}
      {children}
    </ThemeContext>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx === null) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
```

```jsx
// main.jsx
createRoot(root).render(<ThemeProvider><App /></ThemeProvider>);

// Any deep child
function ThemeButton() {
  const { theme, toggle } = useTheme();
  return <button onClick={toggle}>Theme: {theme}</button>;
}
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| `createContext(default)` | Create a context | `createContext(null)` |
| Provider | Supply a value to descendants | `<ThemeContext value={v}>` (React 19) or `<ThemeContext.Provider value={v}>` |
| `useContext(Ctx)` | Read the closest value | `const v = useContext(ThemeContext)` |
| Custom hook | Cleaner API + safety check | `useTheme()` |
| `value` | Anything: object, function, state | `{ user, login, logout }` |
| `children` | Content inside the provider | `<AuthProvider><App /></AuthProvider>` |

## Common Use Cases
- **Beginner:** a dark/light theme toggle used in many components.
- **Practical UI:** the logged-in user shown in the navbar and profile.
- **Real-world application:** language (i18n), cart state, auth and notifications shared by the whole app.

## Common Errors
1. ❌
```jsx
function Navbar() {
  const { user } = useContext(AuthContext);   // Navbar is outside the provider
}
```
**Why it fails:** Outside a Provider you get the default value (`null`), so destructuring crashes.
✅
```jsx
<AuthProvider>
  <Navbar />
</AuthProvider>
```
**Explanation:** Wrap every consumer inside the Provider (usually at the app root).

2. ❌
```jsx
<ThemeContext value={{ theme, toggle }}>   // new object every render
```
**Why it fails:** A new object identity forces all consumers to re-render whenever the provider re-renders.
✅
```jsx
const value = useMemo(() => ({ theme, toggle }), [theme]);
<ThemeContext value={value}>
```
**Explanation:** Memoize the value when the provider re-renders often (the React Compiler can do this for you).

3. ❌
```jsx
// Putting fast-changing input text in one big global context
<AppContext value={{ user, cart, theme, searchText }}>
```
**Why it fails:** Typing in the search box re-renders every consumer of that context.
✅
```jsx
// Split into small contexts (AuthContext, CartContext, ThemeContext)
// and keep fast-changing state local to the component that needs it.
```
**Explanation:** Context is for shared, slow-changing data; keep other state close to where it is used.

## Common Mistakes
- Using context for every piece of state instead of simple props.
- One giant context that re-renders the whole app.
- Forgetting the Provider or placing it too low in the tree.
- Using `useContext` without a safe custom hook and clear error.

## Quick Reference
```jsx
const Ctx = createContext(null);
<Ctx value={{ a, b }}>{children}</Ctx>
const { a, b } = useContext(Ctx);

export const useMyCtx = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("Missing provider");
  return c;
};
```
