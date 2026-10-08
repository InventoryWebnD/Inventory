# Lifting State Up

## Introduction
When two components need the same changing data, you cannot pass it sideways between siblings. Instead you **move the state to their closest common parent** and pass it down as props, together with functions to change it. This keeps one source of truth and keeps the components in sync. It is the first tool to reach for before Context or a state library.

## Subtopics
- Single source of truth
- Finding the closest common parent
- Passing state down via props
- Passing setter/handler functions down
- Controlled child components
- Derived values instead of duplicated state
- When to stop lifting (and use Context)

## Syntax
```jsx
function TemperatureApp() {
  const [celsius, setCelsius] = useState("");            // lifted state

  return (
    <>
      <TempInput label="Celsius" value={celsius} onChange={setCelsius} />
      <TempInput
        label="Fahrenheit"
        value={celsius === "" ? "" : (celsius * 9) / 5 + 32}
        onChange={f => setCelsius(((f - 32) * 5) / 9)}
      />
    </>
  );
}

function TempInput({ label, value, onChange }) {
  return (
    <label>
      {label}
      <input value={value} onChange={e => onChange(e.target.value)} />
    </label>
  );
}
```

```jsx
// Typical shape: parent owns data, children get data + actions
function ShopPage() {
  const [cart, setCart] = useState([]);
  const addToCart = product => setCart(c => [...c, product]);
  return (
    <>
      <ProductList onAdd={addToCart} />
      <CartSummary items={cart} />
    </>
  );
}
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| Lifted state | Shared data lives in the parent | `const [cart, setCart] = useState([])` |
| Data down | Pass values as props | `<CartSummary items={cart} />` |
| Actions down | Pass functions the child can call | `<ProductList onAdd={addToCart} />` |
| Controlled child | Child shows props, does not own state | `value={value} onChange={...}` |
| Derived value | Compute from state, do not store twice | `const total = cart.length` |

## Common Use Cases
- **Beginner:** two inputs showing the same value.
- **Practical UI:** a search box component and a results list sharing the query.
- **Real-world application:** product list + cart + checkout summary sharing one cart array.

## Common Errors
1. ❌
```jsx
function A() { const [n, setN] = useState(0); /* ... */ }
function B() { const [n, setN] = useState(0); /* wants the same n as A */ }
```
**Why it fails:** Each `useState` is private to its component, so A and B have two different values.
✅
```jsx
function Parent() {
  const [n, setN] = useState(0);
  return <><A n={n} setN={setN} /><B n={n} /></>;
}
```
**Explanation:** Move the state up to the common parent.

2. ❌
```jsx
function Child({ value }) {
  const [text, setText] = useState(value);   // copy of a prop
  return <input value={text} onChange={e => setText(e.target.value)} />;
}
```
**Why it fails:** The copy is only read once, so later changes in the parent never reach the child.
✅
```jsx
function Child({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}
```
**Explanation:** Avoid duplicating props into state when the parent should stay in control.

3. ❌
```jsx
<Child onChange={setValue(5)} />
```
**Why it fails:** `setValue(5)` runs during render (an infinite re-render loop).
✅
```jsx
<Child onChange={setValue} />
<Child onChange={() => setValue(5)} />
```
**Explanation:** Pass the function, do not call it.

## Common Mistakes
- Keeping the same data in two places that drift apart.
- Lifting state much higher than needed (more re-renders and long prop chains).
- Copying props into state without a reason.
- Not lifting at all and trying to sync siblings with effects.

## Quick Reference
```jsx
function Parent() {
  const [value, setValue] = useState(initial);
  return (
    <>
      <ChildA value={value} onChange={setValue} />
      <ChildB value={value} />
    </>
  );
}
```
