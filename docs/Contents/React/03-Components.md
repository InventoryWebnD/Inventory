# Components

## Introduction
A component is a JavaScript function that returns JSX. Components are the building blocks of every React app: you split the UI into small pieces (a `Navbar`, a `ProductCard`, a `Button`), then nest and reuse them like HTML tags. Modern React uses **function components** only for new code.

## Subtopics
- Function components
- Naming rules (PascalCase)
- Nesting and composing components
- Default and named exports
- One component per file
- `children` as a special prop
- Pure components (same input, same output)
- Splitting a UI into a component tree

## Syntax
```jsx
// Button.jsx
export default function Button({ label }) {
  return <button className="btn">{label}</button>;
}
```

```jsx
// App.jsx
import Button from "./Button";

function Header() {
  return <header><h1>My Shop</h1></header>;
}

export default function App() {
  return (
    <div>
      <Header />
      <Button label="Buy now" />
      <Button label="Add to cart" />
    </div>
  );
}
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| Function component | Returns UI | `function Card() { return <div/>; }` |
| PascalCase name | Tells React it is a component, not an HTML tag | `<ProductCard />` |
| `export default` | One main export per file | `import Card from "./Card"` |
| Named export | Several exports per file | `import { Card } from "./Card"` |
| `children` | Content placed between the tags | `<Box><p>Hi</p></Box>` |
| Pure function | No side effects while rendering | Same props give the same JSX |

## Common Use Cases
- **Beginner:** extracting a repeated `<button>` into a `Button` component.
- **Practical UI:** a `Navbar`, `Footer` and `Sidebar` used on every page.
- **Real-world application:** a design system of reusable `Input`, `Modal` and `Card` components.

## Common Errors
1. ❌
```jsx
function App() {
  function Card() {            // defined inside another component
    return <div>Card</div>;
  }
  return <Card />;
}
```
**Why it fails:** `Card` is re-created on every render, so React sees a brand-new component each time and resets its state.
✅
```jsx
function Card() {
  return <div>Card</div>;
}
function App() {
  return <Card />;
}
```
**Explanation:** Always declare components at the top level of the file.

2. ❌
```jsx
function card() { return <div>Card</div>; }
<card />
```
**Why it fails:** Lowercase names are treated as HTML tags.
✅
```jsx
function Card() { return <div>Card</div>; }
<Card />
```
**Explanation:** Start component names with a capital letter.

3. ❌
```jsx
function Clock() {
  document.title = "Hi";   // side effect while rendering
  return <p>{Math.random()}</p>;
}
```
**Why it fails:** Rendering must be pure. Random values and DOM changes during render cause unpredictable output.
✅
```jsx
function Clock() {
  useEffect(() => { document.title = "Hi"; }, []);
  return <p>Clock</p>;
}
```
**Explanation:** Put side effects in `useEffect` or event handlers.

## Common Mistakes
- Defining components inside other components.
- Calling a component like a function: `Card()` instead of `<Card />`.
- Building one giant component instead of splitting it into small ones.
- Forgetting to `import`/`export` the component.

## Quick Reference
```jsx
export default function Card({ title, children }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

<Card title="Hello"><p>Body content</p></Card>
```
