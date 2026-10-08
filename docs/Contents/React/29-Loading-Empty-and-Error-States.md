# Loading, Empty and Error States

## Introduction
Any screen that shows data can be in more than one situation: **loading**, **error**, **empty** (no results) or **success**. Good React UIs plan for all of them so users never see a blank page or a crash. Make the state explicit, and render each case deliberately.

## Subtopics
- The four states: loading, error, empty, success
- Status variable vs separate booleans
- Spinners and skeleton placeholders
- `Suspense` fallback for lazy/async content
- Empty-state messages with a call to action
- Retry buttons
- Disabled buttons while submitting
- Accessible status messages (`aria-live`, `role="alert"`)

## Syntax
```jsx
function ProductList() {
  const [status, setStatus] = useState("loading");   // loading | error | success
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => { setProducts(data); setStatus("success"); })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") return <SkeletonList />;
  if (status === "error") return <ErrorBox onRetry={() => setStatus("loading")} />;
  if (products.length === 0) return <EmptyState text="No products yet." action={<Link to="/new">Add one</Link>} />;

  return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}
```

```jsx
// Disable while saving + announce errors
<button disabled={saving}>{saving ? "Saving..." : "Save"}</button>
{error && <p role="alert">{error}</p>}
```

```jsx
// Suspense for lazy components
<Suspense fallback={<Spinner />}><Settings /></Suspense>
```

## Important Methods & Properties
| State | What to show | Example |
|---|---|---|
| Loading | Spinner/skeleton | `<Skeleton />` |
| Error | Message + retry | `<p role="alert">...</p>` |
| Empty | Friendly message + action | "No orders yet" |
| Success | Data | `<List items={...} />` |
| Submitting | Disabled button + progress | `disabled={saving}` |
| `Suspense` | Fallback while code/data loads | `<Suspense fallback={...}>` |

## Common Use Cases
- **Beginner:** show "Loading..." until a fetch completes.
- **Practical UI:** show "No results" when a search returns nothing.
- **Real-world application:** skeleton screens, retry buttons and inline form errors.

## Common Errors
1. ❌
```jsx
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);
const [data, setData] = useState([]);
// nothing stops loading and error from both being true
```
**Why it fails:** Separate booleans allow contradictory states and messy conditions.
✅
```jsx
const [status, setStatus] = useState("loading");  // one source of truth
```
**Explanation:** Use a single status value (or a reducer) so only valid states exist.

2. ❌
```jsx
try { await load(); setLoading(false); } catch (e) { setError(e); }   // loading stays true
```
**Why it fails:** After an error the spinner never goes away.
✅
```jsx
try { await load(); } catch (e) { setError(e); } finally { setLoading(false); }
```
**Explanation:** Use `finally` to always end the loading state.

3. ❌
```jsx
return <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>;   // empty page when items is []
```
**Why it fails:** Users cannot tell whether the data is loading, missing or empty.
✅
```jsx
if (items.length === 0) return <p>No items yet. Click "Add item" to get started.</p>;
```
**Explanation:** Always handle the empty case with helpful text.

## Common Mistakes
- Showing nothing while data loads.
- Not resetting error state on retry.
- Letting users double-submit a form.
- Generic "Something went wrong" with no next step.
- Layout jumping because the loading UI has a different size than the final UI.

## Quick Reference
```jsx
if (loading) return <Spinner />;
if (error) return <ErrorMessage error={error} onRetry={reload} />;
if (!data || data.length === 0) return <Empty />;
return <Content data={data} />;
```
