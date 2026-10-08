# CRUD in React

## Introduction
CRUD stands for **Create, Read, Update, Delete**, the four actions almost every data-driven interface needs. In React you keep the list in state, call an API (or a mock like `json-server`) for each action, and update state so the UI matches. This topic focuses on the React side: forms, handlers, an API service layer and keeping state consistent. The backend can be any server that exposes a REST API.

## Subtopics
- CRUD to HTTP methods (POST, GET, PUT/PATCH, DELETE)
- Reading a list and a single item
- Add form (Create)
- Edit mode and pre-filled form (Update)
- Delete with confirmation
- Updating local state after each action
- API service file
- Loading, error and disabled states per action
- Optimistic updates
- Re-fetching vs updating local state

## Syntax
```jsx
// api/products.js : the only place that knows URLs
const BASE = import.meta.env.VITE_API_URL;

async function request(path, options) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.status === 204 ? null : res.json();
}

export const getProducts   = ()         => request("/products");
export const createProduct = (data)     => request("/products", { method: "POST", body: JSON.stringify(data) });
export const updateProduct = (id, data) => request(`/products/${id}`, { method: "PATCH", body: JSON.stringify(data) });
export const deleteProduct = (id)       => request(`/products/${id}`, { method: "DELETE" });
```

```jsx
function Products() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);       // product being edited or null
  const [error, setError] = useState("");

  useEffect(() => { getProducts().then(setProducts).catch(e => setError(e.message)); }, []);

  async function handleCreate(data) {
    const created = await createProduct(data);               // server returns the saved item with id
    setProducts(prev => [...prev, created]);
  }
  async function handleUpdate(id, changes) {
    const updated = await updateProduct(id, changes);
    setProducts(prev => prev.map(p => (p.id === id ? updated : p)));
    setEditing(null);
  }
  async function handleDelete(id) {
    if (!confirm("Delete this product?")) return;
    await deleteProduct(id);
    setProducts(prev => prev.filter(p => p.id !== id));
  }

  return (
    <>
      {error && <p role="alert">{error}</p>}
      <ProductForm key={editing?.id ?? "new"} initial={editing}
        onSubmit={editing ? data => handleUpdate(editing.id, data) : handleCreate} />
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name}
            <button onClick={() => setEditing(p)}>Edit</button>
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
```

## Important Methods & Properties
| Action | HTTP | State update |
|---|---|---|
| Create | `POST /products` | `[...prev, created]` |
| Read | `GET /products` | `setProducts(data)` |
| Update | `PATCH/PUT /products/:id` | `prev.map(p => p.id === id ? updated : p)` |
| Delete | `DELETE /products/:id` | `prev.filter(p => p.id !== id)` |
| `key` on form | Reset form when switching item | `key={editing?.id ?? "new"}` |
| `try/catch` | Handle failed requests | `catch (e) { setError(e.message) }` |

## Common Use Cases
- **Beginner:** a todo list with add, toggle and delete.
- **Practical UI:** an inventory table with edit and delete actions.
- **Real-world application:** admin panels for products, users and orders.

## Common Errors
1. ❌
```jsx
async function handleDelete(id) {
  setProducts(prev => prev.filter(p => p.id !== id));
  await deleteProduct(id);                       // if this fails, the UI is now wrong
}
```
**Why it fails:** The UI shows the item as deleted even if the server rejected the request.
✅
```jsx
async function handleDelete(id) {
  try {
    await deleteProduct(id);
    setProducts(prev => prev.filter(p => p.id !== id));
  } catch (e) { setError(e.message); }
}
```
**Explanation:** Update state after success (or roll back if you use optimistic updates).

2. ❌
```jsx
setProducts([...products, { name, price }]);       // fake id, never saved
```
**Why it fails:** The new item has no real `id` and is missing from the server.
✅
```jsx
const created = await createProduct({ name, price });
setProducts(prev => [...prev, created]);
```
**Explanation:** Use the object the server returns.

3. ❌
```jsx
const [form, setForm] = useState(product);    // edit form keeps old values when product changes
```
**Why it fails:** `useState` only reads its initial value once.
✅
```jsx
<ProductForm key={product.id} initial={product} />
```
**Explanation:** Use a `key` to reset the form for each item.

4. ❌
```jsx
<button onClick={handleDelete(p.id)}>Delete</button>
```
**Why it fails:** It deletes while rendering.
✅
```jsx
<button onClick={() => handleDelete(p.id)}>Delete</button>
```
**Explanation:** Wrap handlers that take arguments.

## Common Mistakes
- Updating the UI before the server confirms (without rollback).
- Using array index as the identifier of an item.
- No loading/disabled state, so users double-click and create duplicates.
- Not handling errors for individual actions.
- Not validating form data before sending.

## Quick Reference
```jsx
setList(prev => [...prev, created]);                                 // create
setList(prev => prev.map(x => x.id === id ? updated : x));           // update
setList(prev => prev.filter(x => x.id !== id));                      // delete
```
