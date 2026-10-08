# DevTools and Debugging

## Introduction
Debugging React means finding out why the UI differs from what you expect. Your tools are the browser console, the **React Developer Tools** extension (Components and Profiler tabs), the ESLint plugin for hooks, and careful reading of React's warnings. Almost every bug comes down to wrong state, wrong props, stale closures or missing keys/dependencies.

## Subtopics
- React Developer Tools: Components tab (props, state, hooks)
- Profiler tab (why did it render)
- `console.log` in the right place
- Reading error messages and stack traces
- Common React warnings
- ESLint `react-hooks` rules
- Debugging effects and dependencies
- Network tab for API problems
- Breakpoints and `debugger`
- Isolating a bug with a minimal example

## Syntax
```jsx
function Cart({ items }) {
  console.log("Cart render", items);                   // check what you actually receive

  useEffect(() => {
    console.log("effect ran, items length =", items.length);
  }, [items]);

  // Temporary breakpoint
  // debugger;

  return <p>{items.length} items</p>;
}
```

```jsx
// Label values for DevTools
const [filter, setFilter] = useState("all");
useDebugValue(filter);           // inside a custom hook: shows a label in DevTools

// ESLint (eslint-plugin-react-hooks)
// warns: React Hook useEffect has a missing dependency: 'id'
```

## Important Methods & Properties
| Tool | Use it to | Where |
|---|---|---|
| React DevTools: Components | Inspect and edit props/state/hooks | Browser DevTools |
| React DevTools: Profiler | Find slow or unnecessary renders | Record then interact |
| Console | Log values, see warnings/errors | `console.log`, `console.table` |
| Network tab | Check API requests, status codes, payloads | Browser DevTools |
| `debugger` | Pause execution | Sources tab |
| ESLint hooks plugin | Catch hook mistakes | `react-hooks/exhaustive-deps` |

## Common Use Cases
- **Beginner:** reading "Cannot read properties of undefined" and finding which prop is missing.
- **Practical UI:** checking in DevTools why a button's state did not change.
- **Real-world application:** profiling a slow list and reducing needless re-renders.

## Common Errors
1. ❌
```jsx
console.log(user.name);        // TypeError: Cannot read properties of null
```
**Why it fails:** `user` has not loaded yet.
✅
```jsx
console.log(user?.name);
if (!user) return <p>Loading...</p>;
```
**Explanation:** Read the first line of the error, find the variable, and handle the empty case.

2. ❌
```jsx
// Warning: Each child in a list should have a unique "key" prop.
items.map(i => <li>{i}</li>)
```
**Why it fails:** React cannot track list items.
✅
```jsx
items.map(i => <li key={i.id}>{i.name}</li>)
```
**Explanation:** Follow the warning; it names the component.

3. ❌
```jsx
setCount(count + 1);
console.log(count);          // "still old value, so state is broken"?
```
**Why it fails:** The state is not broken; the variable is a snapshot of the current render.
✅
```jsx
useEffect(() => console.log("count is now", count), [count]);
```
**Explanation:** Log inside an effect or in the next render.

4. ❌
```jsx
// "Too many re-renders. React limits the number of renders..."
<button onClick={setOpen(true)}>Open</button>
```
**Why it fails:** `setOpen(true)` runs during render.
✅
```jsx
<button onClick={() => setOpen(true)}>Open</button>
```
**Explanation:** This error nearly always means state is set during render.

## Common Mistakes
- Guessing instead of inspecting actual props/state.
- Ignoring console warnings.
- Suppressing ESLint dependency warnings instead of fixing them.
- Debugging in the minified production build.
- Not checking the Network tab for failed requests.

## Quick Reference
```text
1. Read the error + component stack
2. Components tab: are props/state what you expect?
3. Network tab: did the API return what you expect?
4. console.log inside render / effects / handlers
5. Profiler: why did this render?
6. Reduce to the smallest example that still fails
```
