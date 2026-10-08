# `useContext` and Context API

## Introduction

Context lets components read shared values without passing props through every intermediate component. It is useful for themes, authentication, locale and other broadly shared data.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- `createContext`
- Provider
- `useContext`
- Default values
- Context value identity
- Avoiding prop drilling
- Context and state
- Context performance

## Syntax / Core Pattern

```jsx
const ThemeContext = createContext("light");

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Dashboard />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const { theme, setTheme } = useContext(ThemeContext);
  return <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
    Theme: {theme}
  </button>;
}
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| Context | Shared value channel | `ThemeContext` |
| Provider | Supplies value to descendants | `<ThemeContext.Provider ...>` |
| Consumer | Reads context | `useContext(ThemeContext)` |

## Common Use Cases

- **Beginner:** Theme switching.
- **Practical UI:** Authenticated user access.
- **Real-world:** Locale/preferences.

## Common Errors

1. ❌ **Missing provider**

```jsx
Consumer gets default/undefined value
```
**Why it is a problem:** Wrap the consumer in the provider.

2. ❌ **Putting all app state in context**

```jsx
Everything causes broad re-renders
```
**Why it is a problem:** Use context for genuinely shared concerns.

3. ❌ **Unstable provider value**

```jsx
New object every render
```
**Why it is a problem:** Memoize only when it materially helps and architecture warrants it.

## Common Mistakes

- Using context merely to avoid passing one prop one level.
- Creating many unrelated contexts without boundaries.
- Treating context as a replacement for every state-management solution.

## Quick Reference

```text
Provider
   ↓
Any descendant
   ↓
useContext(Context)
   ↓
Shared value
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
