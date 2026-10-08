# Authentication and Protected UI

## Introduction

Authentication determines who a user is; authorization determines what that user may do. React typically represents authentication state and conditionally renders protected pages or controls while the backend remains the real security boundary.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- Login/signup UI
- Auth state
- Tokens/cookies concepts
- Protected routes
- Logout
- Persistent session
- Auth context
- Role-based UI
- Unauthorized vs unauthenticated
- Frontend security limitations

## Syntax / Core Pattern

```jsx
function ProtectedRoute({ user, children }) {
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
```

A context pattern:

```jsx
const AuthContext = createContext(null);

function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be inside AuthProvider");
  return value;
}
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| Authentication | Who are you? | Logged-in user |
| Authorization | What may you do? | Admin can delete |
| Protected route | UI gate | Redirect unauthenticated user |
| Auth context | Shared auth state | Current user/logout |

## Common Use Cases

- **Beginner:** Login/dashboard flow.
- **Practical UI:** Admin-only inventory controls.
- **Real-world:** Role-based navigation.

## Common Errors

1. ❌ **Frontend-only security**

```jsx
Hiding a button is not authorization
```
**Why it is a problem:** Backend must enforce permissions.

2. ❌ **Storing secrets in source**

```jsx
Public bundle exposes them
```
**Why it is a problem:** Never put private credentials in frontend code.

3. ❌ **Stale auth state**

```jsx
UI doesn't update after logout
```
**Why it is a problem:** Centralize auth state and clear it reliably.

## Common Mistakes

- Assuming route protection alone secures an API.
- Putting long-lived sensitive secrets in localStorage without evaluating risk.
- Mixing authentication state with unrelated UI state.

## Quick Reference

```text
Login
 ↓
Session established
 ↓
Auth state
 ├── authenticated → app
 └── unauthenticated → login
```

## Inventory Checkpoints

A strong candidate should be able to:

1. **Explain** the concept in simple words.
2. **Write** a working implementation without blindly copying a tutorial.
3. **Debug** at least one common mistake.
4. **Combine** this topic with previously learned React concepts.
5. **Recognize** when the concept should *not* be used.

## Practical Challenge Ideas

- Build a small feature using this topic from scratch.
- Modify an existing component so the topic becomes necessary.
- Debug a deliberately broken implementation.
- Combine this topic with state, props, events and API data where appropriate.
