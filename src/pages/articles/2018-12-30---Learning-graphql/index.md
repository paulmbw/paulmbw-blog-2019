---
title: GraphQL - Is this the end of RESTful API's?
date: "2019-01-04T23:46:37.121Z"
layout: post
draft: false
path: "/posts/learning-graphql/"
category: "Learnings"
tags:
  - "learning"
  - "graphql"
description: "In this post I embark on a journey through understanding and demystifying GraphQL, and I discuss whether this may be a good replacement for traditional RESTFul design. Read and comment!"
---
In order to understand what GraphQL is, we need to consider the issues presented with previous technologies (in this case RESTful API's) and what this new language provides as a solution.

Traditional endpoints usually take the following structure (I will use the context of a book store):
```javascript
http://london-book-store.com/api/v1/books
```
Performing a `GET` request to the above endpoint should result in the following:
```javascript
[
  {
    "title": "The Kind Worth Killing",
    "genre": "Thriller"
    "authorId": "123"
    "author": "Peter Swanson",
  }
  ...
]
```

Great, we have a list of books from the book store, the first being [ _The Kind Worth Killing_](https://www.amazon.co.uk/Kind-Worth-Killing-Peter-Swanson/dp/057130219X) (an awesome read! Check it out!).

What if we wanted more information about the author? Easy, we would just create a new endpoint:

```javascript
http://london-book-store.com/api/v1/authors/:authorId
```
and we should get back the following result:

```javascript
{
  "authorName": "Peter Swanson",
  "location": "London, United Kingdom",
  "prizes": ["LA Times Book Award", "New England Society Book Award"]
}
```

Awesome. Hmm, what if I wanted to get more information about other books written by Peter Swanson? Again, we would have to construct a new endpoint to return the desired information. Recognize a pattern here? As each endpoint corresponds to a single entity,  we have to continue to build new endpoints if we require more information, which can often take more time to implement and can also be considered as resource-intensive. 

The other limitation RESTful API's suffer from is the bloatware that comes with each response. Going back to the previous example, performing a `GET` request to retrieve information about a book returns all the fields pertaining to that request, however, what if we only wanted to know the name and genre of a book? Once more, we would have to implement another endpoint with only the fields we require. 

**So where does GraphQL come in?**

Here is the official definition from Wikipedia:

> GraphQL is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data.

Here is my interpretation! GraphQL is query language that behaves in the same way as traditional RESTful API's, with the distinction we can _declaratively_ ask for the data we need, all within a single endpoint. Take for instance a request for getting information about a specific book. GraphQL allows us to model what data we're require, and the response mirrors exactly what has been defined in the request:

```javascript
{
  book(id:123) { //we are looking for a book object with the id 123
    title
    genre
    releaseDate
    pages
    synopsis
}
```
Once a GraphQL server receives this request, it would respond with the following:

```javascript
{
  "data": {
    "book": {
      "title": "The Kind Worth Killing",
      "genre": "Thriller",
      "releaseDate": "3 February 2015",
      "pages": "260",
      "synopsis": "Delayed in London, Ted Severson..."
    }
  }
}
```

This is all one HTTP request that can be implemented in a server, as opposed to defining _n_ number of routes that describe what data will be returned. Moreover, what if we only wanted information about the title and genre of the book? We would simply adjust our query to achieve the desired result:

```javascript
{
  book(id: "123") {
    title
    genre
  }
}
```

```javascript
{
  "data": {
    "book": {
      "title": "The Kind Worth Killing",
      "genre": "Thriller",
  }
}
```

**Nested Queries**

The wonderful thing about declaratively specifying what information we want is how easy it is to extend our quires and retrieve more data. Our initial query requested information about a book, however, what if we wanted information about the author in addition? Again, we can adjust our query to achieve this:

```javascript
{
  book(id: "123") {
    title
    genre
    author {
      name
      age
    }
  }
}
```

So, what should happen? You guessed it!

```javascript
{
  "data": {
    "book": {
      "name": "The Kind Worth Killing",
      "genre": "Thriller",
      "author": {
        "name": "Peter Swanson",
        "age": "50"
      }
    }
  }
}
```

**Modifying data with GraphQL**

You may want to perform operations other than querying data, and GraphQL provides a mechanism called _mutations_ which allow us to do so. Here is a simple implementation for creating a new book entry:

```javascript
mutation {
  addBook(name: "The Knife of Never Letting Go", genre: "Thriller", author:"Patraick Ness") {
    name
    genre
    author {
      name
    }
  },
}
```

A GraphQL server would interpret this the same way a `POST` request would be performed to create a resource, and the result would look like the following:

```javascript
{
  "data": {
    "addBook": {
      "name": "The Knife of Never Letting Go",
      "genre": "Thriller",
      "author": {
        "name": "Patraick Ness"
      }
    }
  }
}
```

**Is this a good replacement for RESTful API's?**

From this learning experience, I would definitely advocate for adopting GraphQL; it's relatively easy to learn, and there are tones of resources to get a proof of concept going (here is a [4 hour long tutorial](https://www.youtube.com/watch?v=ed8SzALpx1Q&t=10057s), and it's free!). Instead of calling multiple endpoints to fetch related resources, we can define one endpoint and request whatever information we want, all by adjusting and extending our query through adding/removing fields (as described with querying information about a book and an author). However, with anything, it's important to discuss your use case and determine whether this technology is appropriate for any problem you're trying to solve.

**Conclusion**

The intention of this post was to give you at most a very brief and simple insight into what exactly GraphQL is and how it's used. If you're curious about this topic more, checkout my [github page](https://github.com/paulmbw/learning-graphql) which contains a project for creating books and authors (this app is comprised of React and Apollo on the front-end, with Node.js, GraphQL and MongoDB with mLab on the backend).

If you have any questions, please reach out! I hope you've enjoyed reading this post! 😁
