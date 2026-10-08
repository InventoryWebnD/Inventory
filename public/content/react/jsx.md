# JSX

## Introduction
JSX is a syntax extension that lets you write HTML-like markup inside JavaScript. It is not HTML: a build tool (Vite/Babel) compiles every JSX tag into a plain JavaScript function call. Because JSX lives inside JavaScript, you can put any JavaScript expression inside `{ }`.

## Subtopics
- JSX is compiled to JavaScript
- Embedding expressions with `{ }`
- Attributes: `className`, `htmlFor`, camelCase events
- One parent element and Fragments (`<>...</>`)
- Self-closing tags
- Inline `style` objects
- Comments in JSX
- Rendering rules: what is and is not printed

## Syntax
```jsx
const user = { name: "Asha", age: 20 };

function Profile() {
  return (
    <>
      <h1 className="title">Hello, {user.name}</h1>
      <p style={{ color: "teal", fontSize: "18px" }}>
        Next year you will be {user.age + 1}.
      </p>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" />
      {/* this is a JSX comment */}
    </>
  );
}
```

```jsx
// What the compiler produces (simplified)
<h1 className="title">Hi</h1>
// becomes
jsx("h1", { className: "title", children: "Hi" });
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| `{ }` | Insert any JS expression | `<p>{a + b}</p>` |
| `className` | CSS class (since `class` is reserved in JS) | `<div className="box">` |
| `htmlFor` | Label target (since `for` is reserved) | `<label htmlFor="n">` |
| Fragment | Group elements without an extra DOM node | `<>...</>` |
| `style={{ }}` | Inline styles as an object with camelCase keys | `style={{ marginTop: 8 }}` |
| Self-closing | Tags with no children must close | `<img />`, `<input />` |

## Common Use Cases
- **Beginner:** showing a variable or a calculation inside a heading.
- **Practical UI:** building a card with a dynamic title, image `src` and CSS class.
- **Real-world application:** a layout where attributes (`disabled`, `href`, `className`) depend on data.

## Common Errors
1. ❌
```jsx
function App() {
  return (
    <h1>Title</h1>
    <p>Text</p>
  );
}
```
**Why it fails:** A component must return a single root; two siblings are two separate expressions.
✅
```jsx
function App() {
  return (
    <>
      <h1>Title</h1>
      <p>Text</p>
    </>
  );
}
```
**Explanation:** Wrap siblings in a Fragment (or a real element).

2. ❌
```jsx
<div class="box" onclick="save()">Hi</div>
```
**Why it fails:** JSX uses JavaScript property names; `class` and string handlers are not valid.
✅
```jsx
<div className="box" onClick={save}>Hi</div>
```
**Explanation:** Use `className` and camelCase events that receive a function.

3. ❌
```jsx
<p style="color: red">Hi</p>
<img src="a.png">
```
**Why it fails:** `style` must be an object, and every tag must be closed in JSX.
✅
```jsx
<p style={{ color: "red" }}>Hi</p>
<img src="a.png" alt="" />
```
**Explanation:** The outer `{}` is JSX, the inner `{}` is the style object.

4. ❌
```jsx
<p>{user}</p>   // user = { name: "Asha" }
```
**Why it fails:** Objects cannot be rendered as children ("Objects are not valid as a React child").
✅
```jsx
<p>{user.name}</p>
```
**Explanation:** Render strings, numbers or elements. Convert objects/arrays into those first.

## Common Mistakes
- Using `class`, `for` or `onclick` instead of `className`, `htmlFor`, `onClick`.
- Writing `<Component>` when it has no children (use `<Component />` for consistency).
- Expecting `true`, `false`, `null` and `undefined` to print - they render nothing, but `0` does print.
- Putting statements (`if`, `for`) inside `{ }` - only expressions are allowed.

## Quick Reference
```jsx
<Tag attr="string" other={expression}>
  {value} {a > b ? "yes" : "no"} {list.map(i => <li key={i}>{i}</li>)}
</Tag>

<>{/* Fragment */}</>
<img src={url} alt="desc" />
<div style={{ backgroundColor: "pink" }} className="card" />
```
