# Reusable Components and Composition

## Introduction
React favours **composition over inheritance**: build complex UIs by combining small components and letting parents decide what goes inside through `children` and props. A good reusable component has a clear purpose, a small, predictable API (props), sensible defaults and is easy to customize without being rewritten.

## Subtopics
- `children` and slot props
- Props for variants (`variant`, `size`)
- Default props
- Spreading extra props to the DOM element
- Composition vs configuration
- Wrapper/layout components
- Controlled vs uncontrolled reusable components
- Keeping components generic and small
- Avoiding "prop explosion"

## Syntax
```jsx
// A flexible Button
function Button({ variant = "primary", size = "md", className = "", children, ...rest }) {
  return (
    <button className={`btn btn-${variant} btn-${size} ${className}`} {...rest}>
      {children}
    </button>
  );
}

<Button>Save</Button>
<Button variant="danger" size="sm" onClick={remove} disabled={busy}>Delete</Button>
```

```jsx
// Composition with children
function Card({ children }) { return <div className="card">{children}</div>; }
function CardHeader({ children }) { return <h3 className="card-header">{children}</h3>; }
function CardBody({ children }) { return <div className="card-body">{children}</div>; }

<Card>
  <CardHeader>Profile</CardHeader>
  <CardBody><p>Content goes here.</p></CardBody>
</Card>
```

```jsx
// Slot props: pass JSX through named props
function Layout({ sidebar, children }) {
  return <div className="layout"><aside>{sidebar}</aside><main>{children}</main></div>;
}
<Layout sidebar={<Menu />}><Dashboard /></Layout>
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| `children` | Content slot | `<Card>...</Card>` |
| Slot prop | Named content area | `<Layout sidebar={<Menu />} />` |
| Variant props | Control look | `variant="danger"` |
| Rest props `...rest` | Forward `onClick`, `aria-*`, etc. | `<button {...rest}>` |
| Default values | Reasonable behaviour out of the box | `size = "md"` |
| Composition | Combine small parts | `Card` + `CardHeader` |

## Common Use Cases
- **Beginner:** a `Button` used in many places.
- **Practical UI:** a `Modal` that accepts any content as `children`.
- **Real-world application:** a design-system library with `Input`, `Select`, `Card`, `Table`.

## Common Errors
1. ❌
```jsx
function Button({ label }) {
  return <button>{label}</button>;       // cannot add icons or markup
}
<Button label={<><Icon /> Save</>} />
```
**Why it fails:** The component is too rigid; `label` pretends to be text.
✅
```jsx
function Button({ children }) { return <button>{children}</button>; }
<Button><Icon /> Save</Button>
```
**Explanation:** Use `children` for flexible content.

2. ❌
```jsx
function Button({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>;     // swallows disabled, aria-label, type...
}
```
**Why it fails:** Every new DOM attribute requires another prop.
✅
```jsx
function Button({ children, ...rest }) { return <button {...rest}>{children}</button>; }
```
**Explanation:** Forward remaining props to the underlying element.

3. ❌
```jsx
<Card showHeader showFooter headerText="..." footerText="..." headerIcon="..." footerAlign="..." />
```
**Why it fails:** "Prop explosion" makes a component hard to use and extend.
✅
```jsx
<Card><CardHeader>...</CardHeader><CardFooter>...</CardFooter></Card>
```
**Explanation:** Prefer composition over many configuration props.

## Common Mistakes
- Hard-coding text/styles inside reusable components.
- Not forwarding `className`, `onClick` and accessibility props.
- Components that do too many things.
- Too many boolean props controlling layout (`isA`, `isB`, `isC`).
- Making everything reusable too early: extract when you see repetition.

## Quick Reference
```jsx
function Box({ children, className = "", ...rest }) {
  return <div className={`box ${className}`} {...rest}>{children}</div>;
}
<Box className="mt-4" id="intro"><p>Hi</p></Box>
```
