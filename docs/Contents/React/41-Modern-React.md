# Modern React (React 19)

## Introduction
React 19 made common tasks simpler: forms can use **Actions**, pending/optimistic UI have dedicated hooks, `ref` is a normal prop, and a `use` API reads promises and context. The **React Compiler** can also memoize code automatically. Modern React also means function components and hooks only, Vite as the toolchain, and (optionally) a framework like Next.js or React Router for routing and server features.

## Subtopics
- Actions and `<form action={fn}>`
- `useActionState`
- `useFormStatus`
- `useOptimistic`
- `useTransition` with async functions
- `use()` to read promises and context
- `ref` as a prop (no `forwardRef`)
- `<Context>` as provider (no `.Provider`)
- Document metadata (`<title>`, `<meta>` in components)
- React Compiler
- Server Components (overview)
- Frameworks: Next.js, React Router

## Syntax
```jsx
import { useActionState, useOptimistic } from "react";
import { useFormStatus } from "react-dom";

// Form action: receives previous state and FormData
async function addTodoAction(prev, formData) {
  const text = formData.get("text")?.toString().trim();
  if (!text) return { error: "Please enter some text." };
  await saveTodo(text);
  return { error: null };
}

function AddTodo() {
  const [state, formAction, isPending] = useActionState(addTodoAction, { error: null });
  return (
    <form action={formAction}>
      <input name="text" />
      <SubmitButton />
      {state.error && <p role="alert">{state.error}</p>}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();           // must be rendered inside a <form>
  return <button disabled={pending}>{pending ? "Adding..." : "Add"}</button>;
}
```

```jsx
// Optimistic UI: show the result immediately, roll back automatically on failure
function Likes({ post }) {
  const [optimistic, addOptimistic] = useOptimistic(post.likes, (cur, n) => cur + n);

  async function like() {
    addOptimistic(1);
    await sendLike(post.id);
  }
  return <form action={like}><button>Likes: {optimistic}</button></form>;
}
```

```jsx
// ref is a plain prop in React 19
function TextInput({ ref, ...props }) { return <input ref={ref} {...props} />; }

// Context is its own provider
<ThemeContext value="dark"><App /></ThemeContext>

// Metadata can live in any component
function Post() { return (<><title>My Post</title><meta name="description" content="..." /><article>...</article></>); }
```

## Important Methods & Properties
| API | Purpose | Example |
|---|---|---|
| `<form action={fn}>` | Submit with a function (gets `FormData`) | `<form action={save}>` |
| `useActionState` | State + pending for an action | `[state, action, isPending]` |
| `useFormStatus` | Pending status of the parent form | `const { pending } = useFormStatus()` |
| `useOptimistic` | Temporary UI while a request runs | `[value, addOptimistic]` |
| `use(promise \| context)` | Read a promise (with Suspense) or context | `const data = use(promise)` |
| `useTransition` | Non-urgent async updates | `startTransition(async () => ...)` |
| React Compiler | Automatic memoization | Build-time plugin |

## Common Use Cases
- **Beginner:** a form that submits with `action` instead of manual `onSubmit`.
- **Practical UI:** a pending button state and an instant "like".
- **Real-world application:** forms with server validation messages and optimistic list updates.

## Common Errors
1. ❌
```jsx
function Form() {
  const { pending } = useFormStatus();      // in the same component that renders <form>
  return <form action={save}><button disabled={pending}>Save</button></form>;
}
```
**Why it fails:** `useFormStatus` reads the status of a *parent* form, so it never sees this one.
✅
```jsx
function SubmitButton() { const { pending } = useFormStatus(); return <button disabled={pending}>Save</button>; }
function Form() { return <form action={save}><SubmitButton /></form>; }
```
**Explanation:** Call `useFormStatus` in a child component rendered inside the form.

2. ❌
```jsx
function Profile() {
  const data = use(fetch("/api/me").then(r => r.json()));   // new promise every render
}
```
**Why it fails:** Creating the promise during render makes a new one on every render, so it suspends forever.
✅
```jsx
// Create the promise once (in a parent, a cache, a router loader or a Server Component) and pass it down
function Profile({ mePromise }) { const me = use(mePromise); return <h1>{me.name}</h1>; }
```
**Explanation:** `use` needs a stable promise.

3. ❌
```jsx
const [state, action] = useActionState(saveUser, null);
<form onSubmit={action}>...</form>
```
**Why it fails:** The action expects form data via the `action` prop, not `onSubmit`.
✅
```jsx
<form action={action}>...</form>
```
**Explanation:** Pass the action to `action`.

4. ❌
```jsx
const Input = forwardRef((props, ref) => <input ref={ref} {...props} />);   // still works but unnecessary
```
**Why it fails:** It is not an error; it is outdated code for React 19.
✅
```jsx
function Input({ ref, ...props }) { return <input ref={ref} {...props} />; }
```
**Explanation:** Prefer the simpler form on React 19 (`forwardRef` will be deprecated later).

## Common Mistakes
- Copying old tutorials that use class components, CRA or `ReactDOM.render`.
- Manually adding `useMemo`/`useCallback` everywhere when the React Compiler may handle it.
- Using `use` with a promise created in render.
- Mixing old and new patterns without need.
- Assuming Server Components work in plain Vite (they need a framework/bundler support).

## Quick Reference
```jsx
const [state, formAction, isPending] = useActionState(action, initial);
const { pending } = useFormStatus();
const [optimistic, addOptimistic] = useOptimistic(value, reducer);
const value = use(promiseOrContext);
function C({ ref }) { return <input ref={ref} />; }
```
