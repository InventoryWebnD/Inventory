# Protected Routes and Auth UI

## Introduction
Authentication in React is about **the user interface**: tracking who is logged in, showing the right buttons and redirecting guests away from private pages. The real security check always happens on the server. In React you typically keep the current user in a Context, write `login`/`logout` functions, and create a **protected route** component that redirects when there is no user.

## Subtopics
- Auth state in Context (`user`, `login`, `logout`)
- Login form and calling an API
- Protected route component
- Redirect to login and back (`Navigate`, `useLocation`)
- Conditional navbar (Login / Logout)
- Role-based UI (admin vs user)
- Loading state while checking the session
- Security basics: the UI hides, the server protects

## Syntax
```jsx
// AuthContext.jsx
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/me", { credentials: "include" })        // session cookie
      .then(r => (r.ok ? r.json() : null))
      .then(setUser)
      .finally(() => setChecking(false));
  }, []);

  async function login(email, password) {
    const res = await fetch("/api/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Invalid credentials");
    setUser(await res.json());
  }
  const logout = () => fetch("/api/logout", { method: "POST", credentials: "include" }).then(() => setUser(null));

  return <AuthContext value={{ user, checking, login, logout }}>{children}</AuthContext>;
}
export const useAuth = () => useContext(AuthContext);
```

```jsx
// ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function ProtectedRoute({ role }) {
  const { user, checking } = useAuth();
  const location = useLocation();

  if (checking) return <p>Checking session...</p>;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  if (role && user.role !== role) return <p>403 - Not allowed</p>;
  return <Outlet />;
}

// Routes
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
</Route>
<Route element={<ProtectedRoute role="admin" />}>
  <Route path="/admin" element={<Admin />} />
</Route>
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| `AuthContext` | App-wide user state | `const { user } = useAuth()` |
| `ProtectedRoute` | Guard private routes | `<Route element={<ProtectedRoute />}>` |
| `Navigate` | Redirect | `<Navigate to="/login" replace />` |
| `useLocation` | Remember where the user was going | `state={{ from: location }}` |
| `checking` flag | Avoid flashing the login page | `if (checking) return <Spinner />` |
| Role check | Show admin-only UI | `user.role === "admin"` |

## Common Use Cases
- **Beginner:** show "Login" or the user's name in the navbar.
- **Practical UI:** `/dashboard` only for logged-in users.
- **Real-world application:** admin pages, role-based menus and redirecting back to the page the user wanted.

## Common Errors
1. ❌
```jsx
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}
// user is null for a moment while the session is still loading
```
**Why it fails:** On refresh, a logged-in user is briefly `null`, so they are redirected to login before the session check finishes.
✅
```jsx
if (checking) return <p>Loading...</p>;
```
**Explanation:** Track a loading/checking state separately from "no user".

2. ❌
```jsx
{user.role === "admin" && <DeleteAllButton />}   // user may be null
```
**Why it fails:** Reading `.role` of `null` crashes for guests.
✅
```jsx
{user?.role === "admin" && <DeleteAllButton />}
```
**Explanation:** Use optional chaining for possibly-missing users.

3. ❌
```jsx
if (!isAdmin) return <Navigate to="/" />;     // only protection is in React
// API: GET /api/admin/users has no server check
```
**Why it fails:** Anyone can call the API directly or edit the front-end code; hiding UI is not security.
✅
```jsx
// Server validates the session/token and role on every request.
```
**Explanation:** React protects the experience; the backend protects the data.

4. ❌
```jsx
localStorage.setItem("password", password);
```
**Why it fails:** Anything in storage can be read by scripts (XSS) and by anyone with access to the device.
✅
```jsx
// Never store passwords. Prefer HttpOnly cookies set by the server for session tokens.
```
**Explanation:** Keep secrets out of client-side storage.

## Common Mistakes
- Relying only on front-end checks.
- Redirecting before the session check completes.
- Not remembering the intended destination after login.
- Storing sensitive tokens carelessly.
- Not clearing user state (and cached data) on logout.

## Quick Reference
```jsx
const { user, login, logout } = useAuth();
<Navigate to="/login" replace state={{ from: location }} />
<Route element={<ProtectedRoute />}><Route path="/dashboard" element={<Dashboard />} /></Route>
{user ? <button onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}
```
