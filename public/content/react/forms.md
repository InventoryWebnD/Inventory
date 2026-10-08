# Forms and Controlled Components

## Introduction

React forms are often built as controlled components: the input value is stored in React state and updated through `onChange`. This gives the application a reliable source of truth for validation and submission.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- Controlled inputs
- Uncontrolled inputs
- Text inputs
- Checkboxes
- Radio buttons
- Selects
- Textarea
- Multiple fields
- Validation
- Submission
- Resetting forms

## Syntax / Core Pattern

```jsx
function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });

  function updateField(event) {
    const { name, value } = event.target;
    setForm(previous => ({ ...previous, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={form.email} onChange={updateField} />
      <input name="password" type="password"
             value={form.password} onChange={updateField} />
      <button type="submit">Login</button>
    </form>
  );
}
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| Controlled | React state owns input value | `value={email}` |
| `onChange` | Synchronizes input with state | `setEmail(e.target.value)` |
| `onSubmit` | Handles form submission | `event.preventDefault()` |
| Validation | Checks data before submission | Required email/password |

## Common Use Cases

- **Beginner:** Login/signup forms.
- **Practical UI:** Inventory item creation/editing.
- **Real-world:** Search/filter forms.

## Common Errors

1. ❌ **Missing `value` or `onChange`**

```jsx
Input becomes inconsistent
```
**Why it is a problem:** Keep controlled input value and handler together.

2. ❌ **Wrong checkbox handling**

```jsx
Using `value` instead of `checked`
```
**Why it is a problem:** Use `checked={state}` and `onChange`.

3. ❌ **Form reload**

```jsx
Default submit behavior
```
**Why it is a problem:** Prevent default when handling submission in React.

## Common Mistakes

- Putting every field into unrelated state variables without a reason.
- Validating only on the server when instant feedback is needed.
- Not displaying accessible error messages.

## Quick Reference

```jsx
<input value={value} onChange={e => setValue(e.target.value)} />
<input type="checkbox" checked={enabled} onChange={...} />
<form onSubmit={handleSubmit}>...</form>
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
