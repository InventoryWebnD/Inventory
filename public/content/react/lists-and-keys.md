# Lists and Keys

## Introduction
To show a collection of data, you transform an array into an array of JSX elements with `.map()`. Each element in the list needs a stable, unique `key` so React can tell which item is which when the list changes. Combining `map`, `filter` and `sort` lets you build most list UIs from a single piece of state.

## Subtopics
- Rendering arrays with `.map()`
- The `key` prop and why it matters
- Choosing a good key (id vs index)
- Filtering before mapping (`filter().map()`)
- Sorting a copy (`[...arr].sort()`)
- Rendering lists of components
- Nested lists
- Empty list handling

## Syntax
```jsx
const products = [
  { id: 1, name: "Pen", price: 10, inStock: true },
  { id: 2, name: "Book", price: 120, inStock: false },
];

function ProductList() {
  return (
    <ul>
      {products
        .filter(p => p.inStock)
        .map(p => (
          <li key={p.id}>
            {p.name} - ₹{p.price}
          </li>
        ))}
    </ul>
  );
}
```

```jsx
// Component per item, key goes on the element returned from map
{products.map(p => <ProductCard key={p.id} product={p} />)}

// Fragments in a list need an explicit key
{rows.map(r => (
  <Fragment key={r.id}>
    <dt>{r.term}</dt><dd>{r.text}</dd>
  </Fragment>
))}
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| `.map()` | Turn data into elements | `items.map(i => <li key={i.id}>{i.name}</li>)` |
| `.filter()` | Keep matching items | `items.filter(i => i.price < 100)` |
| `[...arr].sort()` | Sort without mutating state | `[...items].sort((a,b) => a.price - b.price)` |
| `key` | Stable identity for each item | `key={item.id}` |
| `.reduce()` | Compute totals | `items.reduce((s, i) => s + i.price, 0)` |
| `Fragment` | Group without extra DOM, accepts `key` | `<Fragment key={id}>` |

## Common Use Cases
- **Beginner:** list names from an array in a `<ul>`.
- **Practical UI:** a todo list with delete and complete buttons.
- **Real-world application:** a product catalogue with filtering, sorting and pagination.

## Common Errors
1. ❌
```jsx
{todos.map(t => <li>{t.text}</li>)}
```
**Why it fails:** React warns "Each child in a list should have a unique key" and can mis-update items.
✅
```jsx
{todos.map(t => <li key={t.id}>{t.text}</li>)}
```
**Explanation:** Give every list item a stable key from your data.

2. ❌
```jsx
{todos.map((t, index) => <TodoItem key={index} todo={t} />)}
```
**Why it fails:** When items are added, removed or reordered, the index points at different data, so state (like input text or checkboxes) jumps to the wrong row.
✅
```jsx
{todos.map(t => <TodoItem key={t.id} todo={t} />)}
```
**Explanation:** Use a unique id. Index is only safe for static lists that never change.

3. ❌
```jsx
const sorted = items.sort((a, b) => a.price - b.price);   // mutates state array
```
**Why it fails:** `sort` changes the original array, which breaks immutability.
✅
```jsx
const sorted = [...items].sort((a, b) => a.price - b.price);
```
**Explanation:** Copy first, then sort.

4. ❌
```jsx
{users.map(u => (
  <div>
    <UserCard key={u.id} user={u} />   // key on the wrong element
  </div>
))}
```
**Why it fails:** The key must be on the outermost element returned by `map`.
✅
```jsx
{users.map(u => <div key={u.id}><UserCard user={u} /></div>)}
```
**Explanation:** Place `key` on the top-level element inside the `map` callback.

## Common Mistakes
- Using `Math.random()` as a key (new key every render, everything remounts).
- Using array index as key for dynamic lists.
- Forgetting to return JSX from `map` when using braces `{ }`.
- Sorting or reversing the state array in place.
- No message when the filtered list is empty.

## Quick Reference
```jsx
{list.map(item => <Item key={item.id} {...item} />)}
{list.filter(x => x.active).map(x => <li key={x.id}>{x.name}</li>)}
const sorted = [...list].sort((a, b) => a.name.localeCompare(b.name));
{list.length === 0 && <p>Nothing here yet.</p>}
```
