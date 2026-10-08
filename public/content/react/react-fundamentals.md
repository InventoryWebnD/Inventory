# React Fundamentals

## Introduction
React is a JavaScript library for building user interfaces out of small, reusable **components**. Instead of finding DOM nodes and changing them by hand, you describe what the UI should look like for the current data, and React updates the page when that data changes. The core idea: **UI = function(state)**.

## Subtopics
- What React is (library vs framework)
- Declarative vs imperative UI
- Components and the component tree
- One-way data flow (props down, events up)
- Rendering and re-rendering
- Virtual DOM and reconciliation (the idea)
- `createRoot` and the app entry point
- Single Page Applications (SPA)

## Syntax
```jsx
// main.jsx - the entry point
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
```

```jsx
// App.jsx - a component is a function that returns UI
function App() {
  return <h1>Hello, React!</h1>;
}

export default App;
```

```js
// Imperative (vanilla JS): you describe HOW to change the DOM
const h1 = document.createElement("h1");
h1.textContent = "Count: " + count;
document.body.append(h1);
// Declarative (React): you describe WHAT the UI is
// <h1>Count: {count}</h1>
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| `createRoot(domNode)` | Connects React to one HTML element | `createRoot(root).render(<App />)` |
| Component | Reusable function returning JSX | `function Card() { return <div/>; }` |
| Props | Read-only input passed from parent | `<Card title="Hi" />` |
| State | Data that changes over time and triggers a re-render | `const [n, setN] = useState(0)` |
| Render | Calling your component to compute the UI | Happens on mount and on state/props change |
| Reconciliation | React compares old and new output and updates only what changed | Automatic |

## Common Use Cases
- **Beginner:** a counter button that shows how many times it was clicked.
- **Practical UI:** a product list that updates instantly when you filter it.
- **Real-world application:** dashboards, e-commerce sites and admin panels where many parts of the screen depend on shared data.

## Common Errors
1. ❌
```jsx
const root = createRoot(document.getElementById("root"));
root.render(<App />);
// later, somewhere else in your code:
document.getElementById("root").innerHTML = "<p>Hi</p>"; // fighting React
```
**Why it fails:** Manually editing DOM that React controls creates a mismatch; React will overwrite your change or break.
✅
```jsx
function App() {
  return <p>Hi</p>;
}
```
**Explanation:** Let React own the DOM inside the root. Describe the UI in JSX instead.

2. ❌
```jsx
function app() {            // lowercase name
  return <h1>Hello</h1>;
}
createRoot(root).render(<app />); // treated as an HTML tag <app>
```
**Why it fails:** React treats lowercase tags as built-in HTML elements, not your components.
✅
```jsx
function App() {
  return <h1>Hello</h1>;
}
createRoot(root).render(<App />);
```
**Explanation:** Component names must start with a capital letter.

3. ❌
```jsx
let count = 0;
function Counter() {
  return <button onClick={() => count++}>{count}</button>;
}
```
**Why it fails:** Changing a normal variable does not tell React to re-render, so the screen never updates.
✅
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```
**Explanation:** Use state for any value that should update the UI.

## Common Mistakes
- Thinking React is a full framework (it handles the view layer; routing, data fetching etc. come from other tools).
- Editing the DOM directly with `document.querySelector` inside components.
- Believing the Virtual DOM is "always faster" - its real benefit is a simple, declarative model.
- Forgetting that a component re-runs from top to bottom on every render.

## Quick Reference
```jsx
import { createRoot } from "react-dom/client";
import { useState } from "react";

function App() {
  const [name, setName] = useState("World");
  return <h1 onClick={() => setName("React")}>Hello, {name}!</h1>;
}

createRoot(document.getElementById("root")).render(<App />);
```
