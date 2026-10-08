# React Router

## Introduction

Client-side routing lets a React application display different screens based on the URL without requiring a full document reload. Routes can be static, dynamic, nested and protected.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- Router setup
- Routes and Route
- Link
- NavLink
- Nested routes
- Dynamic parameters
- `useParams`
- `useNavigate`
- `useLocation`
- Query strings
- 404 routes
- Protected routes

## Syntax / Core Pattern

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function ProductDetails() {
  const { id } = useParams();
  return <h1>Product {id}</h1>;
}
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| Route | Maps URL to UI | `path="/products"` |
| Link | Client navigation | `<Link to="/products" />` |
| Dynamic route | Variable URL segment | `/products/:id` |
| `useParams` | Reads route parameters | `id` |
| `useNavigate` | Programmatic navigation | `navigate('/login')` |

## Common Use Cases

- **Beginner:** Multi-page-feeling dashboard.
- **Practical UI:** Product details by ID.
- **Real-world:** Protected admin routes.

## Common Errors

1. ❌ **Using `<a>` for internal navigation**

```jsx
May cause full reload
```
**Why it is a problem:** Use router links for app routes.

2. ❌ **Missing wildcard route**

```jsx
Unknown URL has no friendly UI
```
**Why it is a problem:** Add a 404 route.

3. ❌ **Assuming params are numbers**

```jsx
URL params are strings
```
**Why it is a problem:** Parse/validate before numeric use.

## Common Mistakes

- Putting routing logic in every component.
- Creating duplicate routes for similar data.
- Ignoring refresh/deployment configuration for SPA routes.

## Quick Reference

```text
URL
 ↓
Router
 ↓
Matching Route
 ↓
Component
 ↓
Page UI
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
