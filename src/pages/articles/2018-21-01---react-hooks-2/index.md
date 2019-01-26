---
title: React Hooks (Continued)
date: "2019-01-26T23:46:37.121Z"
layout: post
draft: false
path: "/posts/react-hooks-use-effect/"
category: "Learnings"
tags:
  - "learning"
  - "react"
description: "As promised, today we take a look into useEffect, another hook used for managing side effects."
---
**Goal**

As with any other post, today's goal is to clearly define `useEffect`, indentify its use case and provide a basic example of its use. **Warning:** this will be a lengthy post with a few more detailed code examples, so please bear with! Don't hesistate to grab a cup of tea, or a glass of whiskey, whatever tickles your fancy.

Last week, we touched on the topic of [React Hooks](http://localhost:8000/posts/react-hooks) where I introduced this new feature in React, some motivations behind the idea and a simple example of their use. Today, I hope to dig a little further into this, outlining another hook called `useEffect` which essentially allows us to expand on our stateful functional components through performing _side effects_ (these usually happen in lifecycle methods such as  `componentDidMount`), all whilst avoiding having to write a _class_.

**Recap**

The whole idea of hooks is to allow us to continue our functional approach to writing apps in React  while utilizing the full features of the framework. We introduced `useState` which is a hook for attaching functional components to some sort of internal state. However, what if we want trigger operations such as interacting with a database, or perhaps, make a HTTP request to retrieve some data? Typically, we would have our already defined _class_ and would appropriately make use of the available component lifecycle methods (for the sake of brevity you can read more about these methods [here](https://reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class)). Now, we're going to use `useEffect`, another hook allowing use to perform these operations all inside our functional component. 

**Implementation**

Let's take a quick glance of the `useEffect` hook:

```javascript
  useEffect(() => {
    console.log('RENDERING!');
  });
```

It's important to note that this method gets called after each and every render (quite similar to `componentDidMount` or `componentDidUpdate`). Let's integrate this with our `Library` functional component from last week's post, and let's observe the behavior:

```javascript
import React from 'react';
import { useState, useRef, useEffect } from 'react';

function Library() {
  const [books, setBooks] = useState([]);

  const inputElement = useRef();

  function onSubmit(event) {
    event.preventDefault();
    setBooks([...books, inputElement.current.value]);
  }

  useEffect(() => {
    console.log('RENDERING!');
  });

  return (
    ...
  );
}
```

![Alt Text](./addBook.gif)

As you can see, whenever we press the Add Book button, the `Library` component is re-rendered and our `console.log('RENDERING'`) appears. 

**Pause!**

Okay, let's recap a little. What has happened so far? We've defined `useEffect` as another example of a hook (in addition to `useState`), and the clear distinction between the two is the former allows us to perform side effects (so, operations such as database access or API requests) which would have otherwise been implemented in a class using lifecycle methods. Still with me? Let's improve our `Library` component to do something more useful, such as making a `GET` request to list all the books from my favorite author [Matt Haig](http://www.matthaig.com):

```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';

function Library() {
  // like before, we are 'hooking' our component to state
  const [books, setBooks] = useState([]);

  // we now want to perform a side effect through calling an endpoint
  useEffect(async () => {
    const response = await axios('https://www.googleapis.com/books/v1/volumes?q=matt+haig');
    // response is an array of book titles, so we want to update our state 
    setBooks(response.data.items.map(item => item.volumeInfo.title));
  });
  
  return (
    <div className="library">
      <div>
        {books &&
          books.map((book, index) => (
            <li key={index}>{book}</li>
          ))
        }
      </div>
    </div>
  );
}
```
![Alt Text](./listBooks.png)

Awesome! We have a list of books written by Mr Haig, however, we have an enormous problem that's raging inside of our console logs:

![Alt Text](./mess.gif)

**What's wrong? 🤷🏾‍♂️**

Casting back to our initial understanding of `useEffect`, we learned that this method is invoked after every render. So, when our effect is performed (that is, when we fetch our list of books), our _state is updated_ with a new list of books, which consequently re-renders our component and triggers our `useEffect` again; we're now in an infinite loop!

We can avoid this infinite loop by passing a second parameter to the `useEffect` method which is an array of two items:
```javascript
useEffect(() => {
  // HTTP request implementation
}, [value, hook]);
``` 

```javascript
useEffect(async () => {
    const response = await axios('https://www.googleapis.com/books/v1/volumes?q=peter+swanson');
    setData(response.data.items.map(item => item.volumeInfo.title));
  },[url, setData]); 
```

This is telling React to watch the value of `url`, and **only** call the `setData` hook when this value changes. In the following example, we are changing the `url` parameter, which will then invoke our `setData` to fetch the new list of books, finally updating the state; note that this flow only happens when we change the value of `url`:

![Alt Text](./nomess.gif)

**Okay, can we recap again?**

Sure! Let's go through it again. We now know what `useEffect` does, and hopefully we understand why we need to use it in this case. However, we ran into the problem of indefinitely updating our component because our hook is called after every re-render, which updates the state, triggering a re-render, which calls our effect again...so on so fourth. To solve this, we pass one more parameter (an array containing a value and an effect) to our hook which tells React to only re-run our effect when a value changes. 

**Note: using componentWillUnmount with useEffect**

The `componentWillUnmount` lifecycle method can also be performed with `useEffect` through returning a callback function like this:

```javascript
 useEffect(() => {
   // we want to subscribe to an author so we know when he/she releases a new book!
    BooksAPI.subscribeToAuthor(props.authorName);
    
    // Specify how to clean up after this effect:
    return () => {
      BooksAPI.unsubscribeFromAuthor(props.authorName);
    };
  });
```

**Conclusion**

That was pretty long, wasn't it?! Hopefully I did a decent job at demystifying `useEffect`and it's use cases. In all honesty, all these updates from React did take some time to understand, but  breaking things down and using simple examples helped with writing up today's post. Hope you enjoyed reading, and stay tuned for more posts coming soon! 🕵🏾‍♂️