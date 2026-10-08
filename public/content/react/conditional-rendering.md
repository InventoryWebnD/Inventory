# Conditional Rendering

## Introduction
Conditional rendering means showing different UI depending on state or props. In React you use plain JavaScript - `if`, the ternary operator `? :`, and `&&` - to decide what a component returns. There is no special template syntax like `v-if` or `*ngIf`.

## Subtopics
- `if` / early return
- Ternary operator (`condition ? A : B`)
- Logical AND (`condition && <UI/>`)
- Returning `null` to render nothing
- Choosing between several views
- Showing/hiding vs mounting/unmounting
- The `0 && ...` pitfall
- Loading / error / empty / data states

## Syntax
```jsx
function Status({ isLoggedIn, unread, role }) {
  if (role === "banned") return null;                 // render nothing

  return (
    <div>
      {isLoggedIn ? <p>Welcome back!</p> : <a href="/login">Log in</a>}
      {unread > 0 && <span className="badge">{unread}</span>}
    </div>
  );
}
```

```jsx
// Multiple branches: pick a view by value
function Page({ status }) {
  if (status === "loading") return <Spinner />;
  if (status === "error") return <ErrorMessage />;
  return <Content />;
}

// Style/class toggling is also conditional rendering
<li className={done ? "done" : ""}>{text}</li>
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| `if` + return | Early exit for a whole component | `if (!user) return <Login />;` |
| Ternary | Choose between two outputs | `{ok ? <A /> : <B />}` |
| `&&` | Show something or nothing | `{show && <Modal />}` |
| `null` | Render nothing | `return null;` |
| Variable | Store JSX then use it | `let view; if (...) view = <A />;` |
| Optional chaining | Safely read nested data | `{user?.name}` |

## Common Use Cases
- **Beginner:** show "Login" or "Logout" depending on a boolean.
- **Practical UI:** open/close a modal or dropdown.
- **Real-world application:** a data page that switches between spinner, error, empty message and results.

## Common Errors
1. ❌
```jsx
{items.length && <List items={items} />}
```
**Why it fails:** When `items.length` is `0`, React renders the number `0` on screen.
✅
```jsx
{items.length > 0 && <List items={items} />}
```
**Explanation:** Make the left side a real boolean.

2. ❌
```jsx
<div>
  {if (loggedIn) { <p>Hi</p> }}
</div>
```
**Why it fails:** `{ }` accepts expressions only; `if` is a statement.
✅
```jsx
<div>{loggedIn ? <p>Hi</p> : null}</div>
```
**Explanation:** Use a ternary or `&&` inside JSX, or `if` outside the return.

3. ❌
```jsx
function Profile({ user }) {
  return <h1>{user.name}</h1>;      // crashes when user is null
}
```
**Why it fails:** Reading a property of `null` throws and breaks the render.
✅
```jsx
function Profile({ user }) {
  if (!user) return <p>No user</p>;
  return <h1>{user.name}</h1>;
}
```
**Explanation:** Guard against missing data before using it.

## Common Mistakes
- Using `&&` with numbers (`count && ...`) and printing `0`.
- Nesting many ternaries until the code is unreadable (use early returns or small components).
- Hiding with CSS when you actually want to unmount (state inside is kept or lost differently).
- Forgetting an `else` / empty state when data is missing.

## Quick Reference
```jsx
{cond && <A />}
{cond ? <A /> : <B />}
{cond ? <A /> : null}
if (!data) return null;
if (loading) return <Spinner />;
{list.length === 0 ? <Empty /> : <List data={list} />}
```
