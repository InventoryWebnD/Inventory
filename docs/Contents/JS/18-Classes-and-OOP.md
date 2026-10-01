# Classes & OOP

## Introduction
ES6 classes provide a cleaner syntax for creating objects and implementing object-oriented patterns like inheritance and encapsulation, built on top of JavaScript's existing prototype system.

## Subtopics
- Class declaration, constructor
- Instance methods and properties
- Inheritance with `extends` and `super`
- Getters and setters
- Static methods/properties
- Private fields (`#field`)
- `this` inside classes

## Syntax

```js
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  makeSound() {                     // instance method
    return `${this.name} says ${this.sound}`;
  }

  get description() {                 // getter
    return `Animal: ${this.name}`;
  }

  set nickname(value) {                 // setter
    this._nickname = value;
  }

  static compare(a, b) {                  // static method (called on class, not instance)
    return a.name === b.name;
  }

  #secretId = Math.random();               // private field (only accessible inside class)
  getSecret() {
    return this.#secretId;
  }
}

const dog = new Animal("Rex", "Woof");
dog.makeSound();          // "Rex says Woof"
dog.description;            // getter accessed like a property, no ()
dog.nickname = "Rexy";        // setter triggered like a property assignment

Animal.compare(dog, dog);      // static method called on the class itself

// Inheritance
class Dog extends Animal {
  constructor(name) {
    super(name, "Woof");       // must call super() before using `this`
  }
  fetch() {
    return `${this.name} fetches the ball!`;
  }
}

const rex = new Dog("Rex");
rex.makeSound();  // inherited method
rex.fetch();        // own method
```
- `constructor()` — runs automatically when a new instance is created via `new`.
- `extends` — establishes inheritance; the subclass gets access to the parent's methods.
- `super(...)` — calls the parent class's constructor; **must** be called before using `this` in a subclass constructor.
- `get`/`set` — define computed properties accessed like plain properties, not called like methods.
- `static` — methods/properties belong to the class itself, not individual instances.
- `#field` — a truly private instance field, inaccessible from outside the class (unlike a convention like `_field`, which is just a naming hint).

## Important Methods & Properties

| Concept | Purpose | Syntax | Example |
|---|---|---|---|
| `class` | Define a blueprint for objects | `class Name {}` | `class User {}` |
| `constructor()` | Initialize new instances | `constructor(args) {}` | Runs on `new User()` |
| `extends` | Inherit from another class | `class B extends A {}` | `class Dog extends Animal{}` |
| `super()` | Call parent constructor/methods | `super(args)` | Inside subclass constructor |
| `static` | Class-level method/property | `static method() {}` | `Animal.compare()` |
| `get`/`set` | Computed property accessors | `get x() {}` / `set x(v) {}` | `obj.x` (no parens) |
| `#field` | Private instance field | `#name = value;` | Accessible only inside class |
| `instanceof` | Check an object's class | `obj instanceof Class` | `rex instanceof Animal // true` |

## Common Use Cases
- **Beginner:** a `Person` class with a constructor storing `name`/`age` and a `greet()` method.
- **DOM example:** a `Modal` class that manages showing/hiding a DOM element, encapsulating its open/close logic and state.
- **Real-world application:** a class hierarchy like `Shape` → `Circle`/`Square`, each overriding an `area()` method, used to calculate totals across a mixed list of shapes polymorphically.

## Common Errors
1. ❌
```js
class Dog extends Animal {
  constructor(name) {
    this.name = name; // used `this` before calling super()
    super(name, "Woof");
  }
}
```
**Why it fails:** In a subclass, `this` cannot be accessed before `super()` is called, since the parent constructor must initialize the instance first.
✅
```js
class Dog extends Animal {
  constructor(name) {
    super(name, "Woof");
    // now `this` is available
  }
}
```
**Explanation:** Always call `super()` as the first statement in a subclass constructor before using `this`.

2. ❌
```js
class Counter {
  static count = 0;
  increment() {
    count++; // forgot `this.` or `Counter.`
  }
}
```
**Why it fails:** Referring to `count` without a qualifier looks for a variable in scope, not the static class property.
✅
```js
class Counter {
  static count = 0;
  increment() {
    Counter.count++;
  }
}
```
**Explanation:** Access static members via the class name (or `this.constructor.name` in some patterns), not as a bare identifier.

3. ❌
```js
const dog = Animal("Rex", "Woof"); // called without `new`
```
**Why it fails:** Calling a class without `new` throws a `TypeError: Class constructor Animal cannot be invoked without 'new'`.
✅
```js
const dog = new Animal("Rex", "Woof");
```
**Explanation:** Classes must always be instantiated with `new`.

4. ❌
```js
class BankAccount {
  #balance = 0;
}
const acc = new BankAccount();
console.log(acc.#balance); // SyntaxError outside the class
```
**Why it fails:** Private fields (`#field`) are only accessible from *within* the class body, not from external code.
✅
```js
class BankAccount {
  #balance = 0;
  getBalance() {
    return this.#balance; // accessed via a public method instead
  }
}
console.log(new BankAccount().getBalance());
```
**Explanation:** Expose private fields through public getter methods if external access is needed.

5. ❌
```js
class Shape {
  get area() {
    return 0;
  }
}
const s = new Shape();
console.log(s.area()); // treating getter like a method call
```
**Why it fails:** Getters are accessed like plain properties, not invoked with parentheses; calling `s.area()` tries to call the *result* of the getter as a function.
✅
```js
console.log(s.area); // no parentheses
```
**Explanation:** Access getters/setters as properties, without `()`.

## Common Mistakes
- Forgetting to call `super()` (or calling it after using `this`) in a subclass constructor.
- Referencing static properties without the class name qualifier.
- Instantiating a class without `new`.
- Trying to access private `#fields` from outside the class.
- Calling getters/setters with parentheses like regular methods.

## Quick Reference
```js
class Animal {
  #id = Math.random();
  constructor(name) { this.name = name; }
  speak() { return `${this.name} makes a sound`; }
  get info() { return this.name; }
  static create(name) { return new Animal(name); }
}

class Dog extends Animal {
  constructor(name) { super(name); }
  bark() { return `${this.name} barks`; }
}

const d = new Dog("Rex");
d.speak(); d.bark(); d.info;
d instanceof Animal; // true
```
