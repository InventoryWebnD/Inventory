# Forms and Controlled Components

## Introduction
In React, form inputs are usually **controlled**: their value lives in state, and every keystroke updates that state through `onChange`. React is then the single source of truth, which makes validation, formatting and resetting simple. An **uncontrolled** input lets the browser keep the value and you read it later (for example with a ref or `FormData`).

## Subtopics
- Controlled inputs (`value` + `onChange`)
- Text, checkbox, radio, select and textarea
- One state object for many fields
- Handling submit and `preventDefault`
- Validation and error messages
- Resetting a form
- Uncontrolled inputs and `FormData`
- Form submission with React 19 actions (see Modern React)

## Syntax
```jsx
function SignupForm() {
  const [form, setForm] = useState({ name: "", email: "", agree: false });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.includes("@")) next.email = "Enter a valid email";
    setErrors(next);
    if (Object.keys(next).length === 0) console.log("Submit", form);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input name="name" value={form.name} onChange={handleChange} />
      {errors.name && <p role="alert">{errors.name}</p>}
      <input name="email" type="email" value={form.email} onChange={handleChange} />
      <label>
        <input name="agree" type="checkbox" checked={form.agree} onChange={handleChange} />
        I agree
      </label>
      <button disabled={!form.agree}>Sign up</button>
    </form>
  );
}
```

```jsx
// Uncontrolled: read once on submit
function Quick() {
  function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);
  }
  return <form onSubmit={onSubmit}><input name="q" defaultValue="" /></form>;
}
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| `value` + `onChange` | Controlled text input | `<input value={v} onChange={...} />` |
| `checked` | Controlled checkbox/radio | `<input type="checkbox" checked={on} />` |
| `defaultValue` | Initial value for uncontrolled input | `<input defaultValue="Hi" />` |
| `name` + `[name]` | Update the right field with one handler | `{ ...prev, [name]: value }` |
| `FormData` | Read all fields at once | `new FormData(e.currentTarget)` |
| `disabled` | Block invalid submit | `<button disabled={!valid}>` |

## Common Use Cases
- **Beginner:** a single text input that shows what you type.
- **Practical UI:** login or registration form with validation messages.
- **Real-world application:** multi-field "add product" forms with select menus, file inputs and server errors.

## Common Errors
1. ❌
```jsx
<input value={name} />
```
**Why it fails:** The input has a `value` but no `onChange`, so it becomes read-only (React warns about it).
✅
```jsx
<input value={name} onChange={e => setName(e.target.value)} />
```
**Explanation:** A controlled input needs both `value` and `onChange`.

2. ❌
```jsx
const [name, setName] = useState();          // undefined
<input value={name} onChange={e => setName(e.target.value)} />
```
**Why it fails:** The input switches from uncontrolled (`undefined`) to controlled, which triggers a warning and odd behaviour.
✅
```jsx
const [name, setName] = useState("");
```
**Explanation:** Always start controlled inputs with a defined value like `""`.

3. ❌
```jsx
function handleSubmit() {
  saveForm(form);            // page reloads, state is lost
}
```
**Why it fails:** The browser reloads the page after a normal form submit.
✅
```jsx
function handleSubmit(e) {
  e.preventDefault();
  saveForm(form);
}
```
**Explanation:** Prevent the default submit when you handle it in JavaScript.

4. ❌
```jsx
setForm({ email: e.target.value });   // loses other fields
```
**Why it fails:** The new object replaces the whole state.
✅
```jsx
setForm(prev => ({ ...prev, email: e.target.value }));
```
**Explanation:** Spread the previous state and override only what changed.

## Common Mistakes
- Using `value` without `onChange` (or `checked` without `onChange`).
- Starting with `undefined` or `null` as input state.
- Using `e.target.value` for checkboxes instead of `e.target.checked`.
- Validating only on the front end (the server must validate too).
- Forgetting `<label htmlFor>` so inputs are not accessible.

## Quick Reference
```jsx
const [text, setText] = useState("");
<input value={text} onChange={e => setText(e.target.value)} />
<input type="checkbox" checked={on} onChange={e => setOn(e.target.checked)} />
<select value={size} onChange={e => setSize(e.target.value)}>...</select>
<textarea value={msg} onChange={e => setMsg(e.target.value)} />
<form onSubmit={e => { e.preventDefault(); /* validate and save */ }} />
```
