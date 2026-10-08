# Project Architecture

## Introduction
As a React app grows, a clear folder structure keeps it easy to read and change. There is no official layout; good structures follow a few ideas: group files by **feature**, keep reusable UI separate from page-specific code, extract logic into hooks and a small API layer, and keep components small and focused.

## Subtopics
- Folder structure: by type vs by feature
- `components`, `pages`, `hooks`, `services`/`api`, `context`, `utils`
- Feature folders (`features/products/...`)
- Separation of concerns (UI, logic, data)
- Naming conventions and file organization
- Index files and imports/aliases
- Colocation (keep related files together)
- Environment-specific config

## Syntax
```text
src/
├─ main.jsx
├─ App.jsx
├─ routes.jsx
├─ components/            <- shared, reusable UI
│  ├─ Button/
│  │  ├─ Button.jsx
│  │  └─ Button.module.css
│  └─ Modal.jsx
├─ features/
│  ├─ products/
│  │  ├─ ProductList.jsx
│  │  ├─ ProductCard.jsx
│  │  ├─ useProducts.js
│  │  └─ productsApi.js
│  └─ auth/
│     ├─ LoginForm.jsx
│     ├─ AuthContext.jsx
│     └─ ProtectedRoute.jsx
├─ pages/                 <- route-level components
│  ├─ Home.jsx
│  └─ ProductPage.jsx
├─ hooks/                 <- shared hooks (useDebounce, useLocalStorage)
├─ lib/ or utils/         <- helpers: formatPrice, api client
└─ assets/
```

```jsx
// features/products/productsApi.js : only talks to the server
const BASE = import.meta.env.VITE_API_URL;
export const getProducts = () => fetch(`${BASE}/products`).then(r => r.json());

// features/products/useProducts.js : logic + state
export function useProducts() { /* useState/useEffect + getProducts */ }

// features/products/ProductList.jsx : presentation
export function ProductList() {
  const { products, loading } = useProducts();
  return loading ? <Spinner /> : products.map(p => <ProductCard key={p.id} product={p} />);
}
```

## Important Methods & Properties
| Folder | Purpose | Example |
|---|---|---|
| `components/` | Shared UI | Button, Modal, Input |
| `features/` | Code for one domain | `products/`, `cart/` |
| `pages/` | Route screens | `Home.jsx` |
| `hooks/` | Reusable logic | `useDebounce.js` |
| `services/` or `api/` | Server communication | `productsApi.js` |
| `context/` | Global providers | `AuthContext.jsx` |

## Common Use Cases
- **Beginner:** splitting `App.jsx` into components and pages.
- **Practical UI:** moving fetch calls from components into an API file.
- **Real-world application:** feature folders so a team can work on products and auth separately.

## Common Errors
1. ❌
```jsx
function ProductPage() {
  // 400 lines: fetch, filtering, forms, modals, styles and layout in one component
}
```
**Why it fails:** The component is hard to read, test and reuse.
✅
```jsx
function ProductPage() {
  const { products } = useProducts();
  return <><ProductFilters /><ProductList products={products} /></>;
}
```
**Explanation:** Split by responsibility.

2. ❌
```jsx
fetch("https://api.example.com/products")    // repeated in 8 components
```
**Why it fails:** Changing the base URL or error handling means editing many files.
✅
```jsx
import { getProducts } from "../features/products/productsApi";
```
**Explanation:** Centralize API calls in one layer.

3. ❌
```text
src/components/ has 120 files, everything mixed together
```
**Why it fails:** Nobody can find anything and ownership is unclear.
✅
```text
src/features/products/, src/features/cart/, src/components/ (only shared UI)
```
**Explanation:** Group by feature and keep the shared folder small.

4. ❌
```jsx
import Button from "../../../../components/Button";
```
**Why it fails:** Deep relative paths are fragile.
✅
```jsx
import Button from "@/components/Button";     // alias in vite.config.js
```
**Explanation:** Configure an alias for `src`.

## Common Mistakes
- One giant component or one giant `components` folder.
- Mixing data fetching, business logic and styling in every component.
- Over-engineering a tiny app with too many layers.
- Inconsistent naming (`product.jsx`, `Product.jsx`, `productcard.jsx`).
- Putting everything in global state/context.

## Quick Reference
```text
Component = UI | Hook = logic | api file = server calls
Page = route | Feature folder = domain | Shared components = reusable UI
Rule: keep related files close; extract only when reused or too large.
```
