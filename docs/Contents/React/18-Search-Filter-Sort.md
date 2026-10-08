# Search, Filter and Sort

## Introduction
Search, filter and sort are among the most common features in real React apps. The key idea: keep the **original data** and the **user's choices** (search text, selected category, sort order) in state, then **derive** the visible list during render. Never store the filtered list as separate state, because it can go out of sync.

## Subtopics
- Controlled search input
- Case-insensitive matching
- Filtering by category / status
- Sorting without mutating
- Combining search + filter + sort
- Derived data vs duplicated state
- Debouncing the search
- Pagination basics
- Empty results message

## Syntax
```jsx
function ProductBrowser({ products }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const visible = products
    .filter(p => p.name.toLowerCase().includes(query.trim().toLowerCase()))
    .filter(p => category === "all" || p.category === category)
    .toSorted((a, b) =>                          // toSorted returns a new array
      sortBy === "price" ? a.price - b.price : a.name.localeCompare(b.name)
    );

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..." />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="books">Books</option>
        <option value="tech">Tech</option>
      </select>
      <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>

      {visible.length === 0 ? <p>No products found.</p> : (
        <ul>{visible.map(p => <li key={p.id}>{p.name} - ₹{p.price}</li>)}</ul>
      )}
    </>
  );
}
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| `filter()` | Keep matching items | `list.filter(x => x.active)` |
| `includes()` | Substring test | `name.toLowerCase().includes(q)` |
| `toSorted()` / `[...a].sort()` | Sorted copy | `[...list].sort(fn)` |
| `localeCompare()` | Correct text sorting | `a.name.localeCompare(b.name)` |
| Derived value | Compute during render | `const visible = ...` |
| `useMemo` | Cache expensive derivations | `useMemo(() => ..., [list, query])` |

## Common Use Cases
- **Beginner:** filter a list of names as you type.
- **Practical UI:** category dropdown and price sort for a shop.
- **Real-world application:** admin tables with search, filters, sorting and pagination stored in the URL.

## Common Errors
1. ❌
```jsx
const [filtered, setFiltered] = useState(products);
function onSearch(e) {
  setFiltered(products.filter(p => p.name.includes(e.target.value)));
}
```
**Why it fails:** Filtering permanently replaces the list, so clearing the search or changing another filter cannot recover removed items, and `filtered` goes stale when `products` changes.
✅
```jsx
const [query, setQuery] = useState("");
const visible = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
```
**Explanation:** Store the user's input and derive the list while rendering.

2. ❌
```jsx
const sorted = products.sort((a, b) => a.price - b.price);
```
**Why it fails:** `sort` mutates the original array (state or props).
✅
```jsx
const sorted = [...products].sort((a, b) => a.price - b.price);
```
**Explanation:** Copy first (or use `toSorted`).

3. ❌
```jsx
p.name.includes(query)      // "Phone" does not match "phone"
```
**Why it fails:** `includes` is case-sensitive.
✅
```jsx
p.name.toLowerCase().includes(query.toLowerCase())
```
**Explanation:** Normalize both sides.

4. ❌
```jsx
a.name > b.name ? 1 : -1    // inconsistent for equal values and accents
```
**Why it fails:** Comparison functions must return a consistent number and handle equality.
✅
```jsx
a.name.localeCompare(b.name)
```
**Explanation:** Use `localeCompare` for strings and subtraction for numbers.

## Common Mistakes
- Saving derived lists in state.
- Mutating the original array when sorting.
- Case-sensitive or whitespace-sensitive search.
- Not showing an empty-results message.
- Filtering huge lists on every keystroke without debounce or memoization.

## Quick Reference
```jsx
const visible = items
  .filter(i => i.title.toLowerCase().includes(q.toLowerCase()))
  .filter(i => cat === "all" || i.category === cat)
  .toSorted((a, b) => a.price - b.price);
```
