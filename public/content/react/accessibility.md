# Accessibility in React

## Introduction
Accessibility (a11y) means everyone can use your app, including people who use a keyboard only, screen readers or high zoom. Most accessibility comes from writing **semantic HTML** correctly in JSX. React supports all ARIA attributes (written `aria-*`) and gives tools like `useId` for linking labels and inputs.

## Subtopics
- Semantic elements (`button`, `nav`, `main`, `header`)
- Labels for inputs: `htmlFor` + `id`, `useId`
- `alt` text for images
- Keyboard navigation and focus
- Managing focus with refs
- ARIA attributes (`aria-label`, `aria-live`, `role="alert"`)
- Colour contrast
- Accessible modals and menus
- Linting with `eslint-plugin-jsx-a11y`

## Syntax
```jsx
import { useId, useRef, useEffect } from "react";

function EmailField({ error }) {
  const id = useId();                                  // unique, SSR-safe id
  return (
    <div>
      <label htmlFor={id}>Email</label>
      <input
        id={id}
        type="email"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
      />
      {error && <p id={`${id}-err`} role="alert">{error}</p>}
    </div>
  );
}
```

```jsx
// Use real buttons, not clickable divs
<button type="button" onClick={open}>Open menu</button>

// Icon-only button needs a name
<button aria-label="Close dialog" onClick={close}>✕</button>

// Move focus into a dialog when it opens
function Dialog({ onClose }) {
  const ref = useRef(null);
  useEffect(() => { ref.current?.focus(); }, []);
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="dlg-title">
      <h2 id="dlg-title" ref={ref} tabIndex={-1}>Settings</h2>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| Semantic tags | Built-in roles & keyboard support | `<button>`, `<nav>`, `<main>` |
| `htmlFor` / `id` | Connect label and input | `<label htmlFor="a">` |
| `useId()` | Generate unique ids | `const id = useId()` |
| `alt` | Describe images | `<img alt="Red shoes" />` |
| `aria-label` | Name for icon-only controls | `aria-label="Search"` |
| `aria-live` / `role="alert"` | Announce dynamic changes | `<p role="alert">` |
| `tabIndex` | Control focus order | `tabIndex={-1}` for programmatic focus |

## Common Use Cases
- **Beginner:** adding `alt` text and labels.
- **Practical UI:** keyboard-friendly dropdowns and tabs.
- **Real-world application:** accessible forms, dialogs and live notifications.

## Common Errors
1. ❌
```jsx
<div onClick={save}>Save</div>
```
**Why it fails:** A `div` cannot be focused with the keyboard and screen readers do not announce it as a button.
✅
```jsx
<button type="button" onClick={save}>Save</button>
```
**Explanation:** Use the correct semantic element.

2. ❌
```jsx
<input placeholder="Email" />
```
**Why it fails:** Placeholder is not a label; it disappears and is not reliable for screen readers.
✅
```jsx
<label htmlFor="email">Email</label>
<input id="email" placeholder="you@example.com" />
```
**Explanation:** Always provide a real label.

3. ❌
```jsx
<img src="/logo.png" />
```
**Why it fails:** Missing `alt` means screen readers read the file name.
✅
```jsx
<img src="/logo.png" alt="WebnD logo" />
<img src="/decor.png" alt="" />       // decorative: empty alt
```
**Explanation:** Describe meaningful images, use empty `alt` for decorative ones.

4. ❌
```jsx
<input id="name" />      // hard-coded id used in a component rendered many times
```
**Why it fails:** Duplicate ids break label association.
✅
```jsx
const id = useId();
<input id={id} />
```
**Explanation:** Generate ids with `useId`.

## Common Mistakes
- Clickable `div`/`span` elements.
- Missing labels, alt text or accessible names for icon buttons.
- Removing focus outlines without a replacement.
- Colour as the only way to show information.
- Not testing with keyboard (Tab, Enter, Space, Esc).

## Quick Reference
```jsx
<button type="button" aria-label="Close">✕</button>
<label htmlFor={id}>Name</label><input id={id} />
<p role="alert">{error}</p>
<img alt="Description" />
<nav aria-label="Main"> ... </nav>
```
