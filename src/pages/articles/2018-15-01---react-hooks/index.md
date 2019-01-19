---
title: React Hooks
date: "2019-01-19T23:46:37.121Z"
layout: post
draft: false
path: "/posts/react-hooks/"
category: "Learnings"
tags:
  - "learning"
  - "react"
description: "A recent update from the React team introduces Hooks, a neat way of handling state inside of functional components. Curious? Let's take a look!"
---

**Goal**

In this new post I aim to explain and reinforce my own understand of  [React Hooks](https://reactjs.org/docs/hooks-overview.html), whilst providing a very simple example of its use.

**Prerequisites**

Before diving into the topic, let's take a brief moment to understand the difference between _stateful_ and _functional_ components in React, as this is key in seeing how Hooks work.

**Stateful vs Functional Components**

If this is all repetition to you, please do skip to the next part. Let's take a very quick glance at the difference between the two, starting with Stateful components; they do exactly what it says on the tin - components that handle state.

```javascript
import React, { Component } from 'react';

class Library extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      availableBooks: ['How To Stop Time', 'The Gustuv Sonata']
    }
  }
  
  render() {
    return() {
      ...
    }
  }
}
```
Here, we have a `Library` class that holds state specific to a list of books available for borrowing. Great! What about  _functional_ components? The key distinction is functional components are responsible for rendering information to the screen only (or in other words, functions that take an optional input and return JSX as an output). Take a look below:

```javascript
import React from 'react';

function BookTitle(props) {
  return(
    <div>
      <p>The name of the book is {props.bookTitle}</p>
    </div>
  );
}
```

This component is limited to rendering some html only, with `props` passed as a parameter. We would use this component like this:

```javascript
<BookTitle bookTitle={'The Knife of Never Letting Go'} />
```

**Understanding React Hooks**

So, now that we understand the difference between the two types of components, how does that help with defining Hooks? When building applications in React, you may run into situations where you need to construct a class and identify how to manage state (like the `Library` class we defined earlier). The main goal of Hooks is to allow you to reap the benefits that come with writing functional components, whilst being able to maintain state:

- **reduced boilerplate**: quite often,  React components start out as simple and overtime become more complex when state management is involved and side effects are performed. The introduction of component life cycle methods also add to this complexity, as each method handles logic differently. Ultimately, code becomes harder to maintain and reuse. 
- **learning curve that comes with classes**: for me, learning how the `this` keyword has been quite a challenge when I first got into React, and this may be an even bigger learning curve for those starting out. Functions are far more easier to understand in my opinion.
- **we can write more functional code**: a key advantage of using Hooks is the ability to write functional code (no side effects, code is less verbose) whilst maintaining the use of classes. Hooks allow us to use state inside of functional components!

**Okay...but what on earth is a Hook?!**

Thought you'd ask that question! The React [docs](https://reactjs.org/docs/hooks-overview.html#but-what-is-a-hook) do a pretty good job explaining what a Hook is:

 > Hooks are functions that let you “hook into” React state and lifecycle features from function components. Hooks don’t work inside classes — they let you use React without classes. 

In other other words, I've defined a functional component, but I would now like to introduce some state management without having to refactor my functional component into a class component. Therefore, I am going to use a Hook which will allow me to connect my function to some sort of internal state.

**Cool, what does a Hook look like?**

`useState` is an example of a Hook, which is a method that returns a pair; the current state, and a function that will later update the state:

```javascript
/*
initalState can be any value, but for the purpose of this post I will use an array
*/
const initalState = [];
const [currentState, functionToUpdateState] = useState(initalState);
```
Here is a more concrete example relating to our Library:

```javascript
import React from 'react';
import { useState, useRef } from 'react';

function Library() {
  const [books, setBooks] = useState(['The Kind Worth Killing']);
}

setBooks([...books, 'How To Stop Time']);
```

Here, we have `books`(our current state) as the first element in our array, and `setBooks` being the second, which is a function that appends to our initial `books` array.

**Full example**

Below we have a `Library` function that makes use of the `useState` Hook for connecting internal state. This function contains a form which, once submitted, adds a new book to our state and renders a list of books as a result. Let's take a look:

```javascript
import React from 'react';
import { useState, useRef } from 'react';

function Library() {
  const [books, setBooks] = useState(['The Kind Worth Killing']);

  const inputElement = useRef(); // used to read the current value in an input field

  function onSubmit(event) {
    event.preventDefault();
    setBooks([...books, inputElement.current.value]);
  }

  return (
    <div>
      <form onSubmit={event => onSubmit(event)}>
        <div className="field">
          <label>Book Name</label>
          <input type="text" ref={inputElement} />
        </div>

        <button>Add Book</button>
      </form>
      <div>
        {
          books.map((book, index) => (
            <li key={index}>{book}</li>
          ))
        }
      </div>
    </div>
  );
}
```

Running the application should yield the following result:

![Alt Text](./addBook.gif)

**Conclusion**

The intention of this post was to introduce React Hooks and provide at most a very brief explanation and an example of how to use them. Later on, I will take a deeper dive into this topic, outlining other hooks such as `useEffect` and will provide more examples and real-world use cases. Thanks for tuning in! 🙅🏾‍♂️



