# State Variants

## Introduction
Variants are prefixes that apply a utility only in a certain state — `hover:`, `focus:`, `active:`, `disabled:`, `group-hover:` and many more. They let you build interactive UI entirely in markup.

## Subtopics
- Pseudo-classes: `hover`, `focus`, `focus-visible`, `active`, `disabled`
- Form states: `checked`, `invalid`, `placeholder`
- Structural: `first`, `last`, `odd`, `even`
- `group` and `peer` for parent/sibling state
- Pseudo-elements: `before`, `after`, `marker`, `selection`
- `has-*`, `aria-*` and `data-*` variants
- Stacking variants

## Syntax

```html
<button class="bg-indigo-600 hover:bg-indigo-500 active:scale-95 disabled:opacity-50">
  Save
</button>

<input class="border focus:border-indigo-500 focus:ring-2 invalid:border-red-500" />

<ul>
  <li class="odd:bg-slate-50 first:rounded-t last:rounded-b">Row</li>
</ul>

<a class="group flex gap-2" href="#">
  <span>Read more</span>
  <span class="transition group-hover:translate-x-1">→</span>
</a>

<input type="checkbox" class="peer" />
<p class="hidden peer-checked:block">Checked!</p>

<div class="before:content-['★'] before:mr-1">Starred</div>

<button data-active="true" class="data-[active=true]:bg-sky-500">Tab</button>
```

- `group` on the parent + `group-hover:` on a child reacts to the parent's hover.
- `peer` on a sibling + `peer-checked:` reacts to an earlier sibling's state.
- `before:` / `after:` need `content-['…']` (or `content-['']`) to render.
- Variants stack: `md:hover:bg-sky-500`, `dark:md:hover:bg-sky-300`.

## Important Properties

| Variant | Purpose | Syntax | Example |
|---|---|---|---|
| `hover:` | Mouse over | `hover:{utility}` | `hover:underline` |
| `focus-visible:` | Keyboard focus | `focus-visible:{utility}` | `focus-visible:ring-2` |
| `disabled:` | Disabled control | `disabled:{utility}` | `disabled:opacity-50` |
| `group-hover:` | Parent hover | `group-hover:{utility}` | `group-hover:text-sky-500` |
| `peer-*:` | Sibling state | `peer-checked:{utility}` | custom toggles |
| `aria-*:` / `data-*:` | Attribute state | `aria-expanded:{utility}` | accordions |

## Common Use Cases
- **Beginner:** change a button color on hover with `hover:bg-indigo-500`.
- **Practical UI:** show a "copy" button only when the parent card is hovered (`group` + `group-hover:opacity-100`).
- **Real-world:** CSS-only toggle switches and accordions using `peer` and `aria-expanded`.

## Common Errors
1. ❌ `before:` pseudo-element not visible → ✅ add `before:content-['']` and give it size/position.
2. ❌ `peer-checked:` not working → ✅ the `peer` element must come *before* the styled element in the DOM.
3. ❌ `group-hover:` on an element outside the `group` → ✅ the `group` class must be on an ancestor.
4. ❌ `focus:` showing outlines on mouse click → ✅ prefer `focus-visible:` for keyboard-only focus rings.
5. ❌ `hover:` styles being the only affordance on touch devices → ✅ make sure the base state is usable without hover.

## Common Mistakes
- Forgetting that `disabled:` needs the real `disabled` attribute.
- Overusing nested groups without names (use `group/card` and `group-hover/card:`).
- Putting important information only in hover states.
- Writing custom CSS for states Tailwind already provides.

## Quick Reference
```html
<button class="rounded-lg bg-sky-600 px-4 py-2 text-white transition hover:bg-sky-500 focus-visible:ring-2 focus-visible:ring-sky-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">
  Click me
</button>
```
