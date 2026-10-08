# React Router

## Introduction
React is a Single Page Application library: the page never fully reloads. **React Router** is the standard library that maps URLs to components, so `/products` shows one component and `/products/5` shows another, while the browser Back button and bookmarks still work. Use `Link` for navigation instead of `<a>` so the app does not reload.

## Subtopics
- Installing and `BrowserRouter`
- `Routes` and `Route`
- `Link` and `NavLink`
- Dynamic routes and `useParams`
- Programmatic navigation: `useNavigate`
- Nested routes and `Outlet` (layouts)
- `useSearchParams` for query strings
- 404 (catch-all) route
- Redirects with `Navigate`
- Data routers (`createBrowserRouter`, loaders)

## Syntax
```bash
npm install react-router-dom
```

```jsx
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet,
         useParams, useNavigate, Navigate } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsLayout />}>
          <Route index element={<ProductList />} />
          <Route path=":id" element={<ProductDetail />} />
        </Route>
        <Route path="/old" element={<Navigate to="/products" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function ProductsLayout() {
  return (<><h1>Products</h1><Outlet /></>);     // child routes render here
}

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  return <button onClick={() => navigate(-1)}>Back from product {id}</button>;
}
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| `BrowserRouter` | Enables routing (wrap the app) | `<BrowserRouter><App /></BrowserRouter>` |
| `Route path element` | URL to component | `<Route path="/about" element={<About />} />` |
| `Link` / `NavLink` | Navigate without reload; NavLink knows the active route | `<Link to="/about">` |
| `useParams` | Read `:id` from the URL | `const { id } = useParams()` |
| `useNavigate` | Navigate from code | `navigate("/login")` |
| `Outlet` | Where nested routes render | `<Outlet />` |
| `useSearchParams` | Read/write `?q=...` | `const [params, setParams] = useSearchParams()` |

## Common Use Cases
- **Beginner:** Home, About and Contact pages.
- **Practical UI:** a product list that links to `/products/:id`.
- **Real-world application:** layouts with shared navbar, protected dashboard routes and URL-based filters.

## Common Errors
1. ❌
```jsx
<a href="/about">About</a>
```
**Why it fails:** A normal anchor reloads the whole page and resets all React state.
✅
```jsx
<Link to="/about">About</Link>
```
**Explanation:** `Link` changes the URL client-side without a reload.

2. ❌
```jsx
function Navbar() {
  const navigate = useNavigate();    // Navbar is rendered outside <BrowserRouter>
}
```
**Why it fails:** Router hooks only work inside a Router ("useNavigate() may be used only in the context of a Router").
✅
```jsx
<BrowserRouter>
  <Navbar />
  <Routes>...</Routes>
</BrowserRouter>
```
**Explanation:** Put the Router at the root so all components are inside it.

3. ❌
```jsx
<Route path="/products/:id" element={<Product />} />
const { productId } = useParams();     // wrong name
```
**Why it fails:** The param name must match the path segment, so `productId` is `undefined`.
✅
```jsx
const { id } = useParams();
```
**Explanation:** Use the same name as in the path (`:id`).

4. ❌
```jsx
const { id } = useParams();
useEffect(() => { load(id); }, []);    // does not run when id changes
```
**Why it fails:** Navigating from `/products/1` to `/products/2` reuses the component, so the effect stays stale.
✅
```jsx
useEffect(() => { load(id); }, [id]);
```
**Explanation:** URL params are reactive values; include them in dependencies.

## Common Mistakes
- Using `<a>` tags for internal links.
- Forgetting the `*` route for not-found pages.
- `useParams` values are always **strings** (convert with `Number(id)` if needed).
- Missing `<Outlet />` in parent layout routes.
- Routing hooks used outside the Router.
- On deployment, forgetting server fallback to `index.html` so refresh on `/about` gives 404.

## Quick Reference
```jsx
<Link to="/path">text</Link>
<NavLink to="/path" className={({ isActive }) => (isActive ? "active" : "")}>text</NavLink>
<Route path="/users/:id" element={<User />} />
const { id } = useParams();
const navigate = useNavigate(); navigate("/home"); navigate(-1);
const [searchParams, setSearchParams] = useSearchParams();
```
