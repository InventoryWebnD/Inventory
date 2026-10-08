# Props

## Introduction
Props (short for properties) are how a parent component passes data to a child. They work like function arguments: the child receives one object and reads values from it. Props are **read-only** - a component must never change the props it receives. Data flows one way: from parent down to child.

## Subtopics
- Passing props (strings, numbers, booleans, objects, functions)
- Destructuring props
- Default values
- The `children` prop
- Spread props (`{...props}`)
- Passing functions as props (callbacks)
- Props are read-only
- Prop validation ideas (TypeScript / PropTypes)

## Syntax
```jsx
function Greeting({ name, age = 18, isAdmin = false }) {
  return (
    <p>
      {name} ({age}) {isAdmin && <strong>Admin</strong>}
    </p>
  );
}

<Greeting name="Asha" age={21} isAdmin />
<Greeting name="Ravi" />              {/* age defaults to 18 */}
```

```jsx
const user = { name: "Meera", age: 30 };
<Greeting {...user} />                  {/* spread an object as props */}
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| Prop with string | Pass text | `<Card title="Hi" />` |
| Prop with `{ }` | Pass numbers, arrays, objects, functions | `<Card price={99} />` |
| Boolean shorthand | `true` when only the name is written | `<Input disabled />` |
| Default value | Fallback when a prop is missing | `function A({ size = "md" })` |
| `children` | Content between tags | `<Modal>...</Modal>` |
| Callback prop | Child talks back to parent | `<Button onSave={handleSave} />` |

## Common Use Cases
- **Beginner:** passing a `name` to a `Greeting` component.
- **Practical UI:** a `ProductCard` that receives `title`, `price` and `image`.
- **Real-world application:** a `Button` with `variant`, `size` and `onClick` props reused across the whole app.

## Common Errors
1. ❌
```jsx
function Card(props) {
  props.title = "Changed";    // mutating props
  return <h2>{props.title}</h2>;
}
```
**Why it fails:** Props are read-only. React freezes the props object in development, so this throws a `TypeError`, and mutation would break one-way data flow anyway.
✅
```jsx
function Card({ title }) {
  const [text, setText] = useState(title);
  return <h2 onClick={() => setText("Changed")}>{text}</h2>;
}
```
**Explanation:** Copy a prop into state if the child needs its own editable version.

2. ❌
```jsx
<Product price="100" />        // string
function Product({ price }) { return <p>{price + 10}</p>; }   // "10010"
```
**Why it fails:** Quotes make a string, so `+` concatenates instead of adding.
✅
```jsx
<Product price={100} />
```
**Explanation:** Use `{ }` for anything that is not a plain string.

3. ❌
```jsx
<Button onClick={handleClick()} />     // runs during render
```
**Why it fails:** Adding `()` calls the function immediately and passes its return value.
✅
```jsx
<Button onClick={handleClick} />
<Button onClick={() => handleDelete(id)} />
```
**Explanation:** Pass the function itself, or wrap it in an arrow when arguments are needed.

## Common Mistakes
- Trying to modify props inside the child.
- Passing numbers/booleans as strings (`price="100"`).
- Calling functions in the prop instead of passing them.
- Passing the whole object when only a few fields are needed, which hides what the component really depends on.
- Prop drilling through many levels (see Context).

## Quick Reference
```jsx
function Child({ title, count = 0, onAdd, children }) {
  return (
    <div>
      <h3>{title}: {count}</h3>
      <button onClick={onAdd}>+</button>
      {children}
    </div>
  );
}

<Child title="Cart" count={3} onAdd={() => setCount(c => c + 1)}>
  <small>extra</small>
</Child>
```
