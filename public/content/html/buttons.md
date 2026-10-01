# Buttons and Actions

The `<button>` element is the standard interactive element designed for user triggers, dialog controls, and form submissions.

## What It Is

Unlike anchor tags (`<a>`), which navigate across URLs or page anchors, buttons represent in-page programmatic actions: submitting forms, toggling menus, expanding panels, or sending asynchronous requests.

## Button Types

- `type="button"`: A generic clickable button that performs no default browser action unless wired up with JavaScript.
- `type="submit"`: The default type inside `<form>` elements; submits the enclosing form when clicked or activated with Enter.
- `type="reset"`: Resets all controls in the parent form back to initial default values.

## Basic Syntax

```html
<!-- Generic button with JavaScript handler -->
<button type="button" class="btn" aria-expanded="false">
  Toggle Navigation
</button>

<!-- Form submit button -->
<button type="submit" class="btn-primary">
  Save Changes
</button>
```

## Button vs Link

- **Use a `<button>`** when triggering an action, changing application state, or submitting data.
- **Use an `<a>` link** when navigating to a new URL, switching routes, or jumping to an in-page anchor.

## Common Mistakes

- Forgetting to specify `type="button"` inside forms when a non-submitting action is intended, causing unintentional form submissions.
- Using `<div>` or `<span>` styled to look like buttons without implementing keyboard focus (`tabindex`) or ARIA roles.
