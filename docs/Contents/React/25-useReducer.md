# `useReducer`

## Introduction

`useReducer` manages state transitions through a reducer function. It is useful when state has many related transitions or when updates are easier to describe as actions than scattered setters.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- Reducer function
- State
- Action
- Dispatch
- Initial state
- Immutable updates
- Multiple related fields
- Reducer purity
- Lazy initialization basics

## Syntax / Core Pattern

```jsx
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <button onClick={() => dispatch({ type: "increment" })}>
    {state.count}
  </button>;
}
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| Reducer | Pure state transition function | `(state, action) => nextState` |
| Action | Describes what happened | `{type:'add', payload:item}` |
| Dispatch | Sends action | `dispatch(action)` |
| Immutable update | Return new state | `{...state, count: ...}` |

## Common Use Cases

- **Beginner:** Complex forms.
- **Practical UI:** Shopping cart state.
- **Real-world:** Multi-step workflows.

## Common Errors

1. ❌ **Mutating reducer state**

```jsx
`state.items.push(...)`
```
**Why it is a problem:** Return a new state.

2. ❌ **Unknown action silently ignored**

```jsx
Typos become hard to debug
```
**Why it is a problem:** Throw or use exhaustive handling in development.

3. ❌ **Overusing reducer**

```jsx
Simple boolean becomes verbose
```
**Why it is a problem:** Use `useState` when state transitions are simple.

## Common Mistakes

- Putting side effects inside reducers.
- Making action names vague.
- Mixing unrelated state domains into one reducer.

## Quick Reference

```text
UI event
  ↓
dispatch(action)
  ↓
reducer(state, action)
  ↓
new state
  ↓
render
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
