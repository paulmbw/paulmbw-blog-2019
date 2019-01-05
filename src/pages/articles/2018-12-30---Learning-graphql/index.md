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
description: "In this post I embark on a journey through understanding and demystifying Graphql, and I discuess whether this may be a good replacement for traditional RESTFul design. Read and comment!"
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
    "author": "Peter Swanson",
    "genre": "Thriller",
    "authorId": "123"
  }
  ...
]
```

Great, we have a list of books from the book store, the first being  _The Kind Worth Killing_ (which btw, is an awesome book!).

What if we wanted more information about the author? Easy, we would just a new endpoint:

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

Awesome. Hmm, what if I wanted to get more information about other books written by Peter Swanson? Again, we would have to construct a new endpoint to return the desired information. Recognize a pattern here? As each endpoint corresponds to a single entity,  we have to build new endpoints if we require more information, which can often take more time to implement and can also be considered as resource-intensive. 

The other limitation RESTful API's suffer from is the bloatware that comes with each response. Going back to the previous example, performing a `GET` request to retrieve information about a book returns all the fields pertaining to that request, however, what if we only wanted to know the name and genre of a book? Once more, we would have to implement another endpoint with only the fields we require. 

**So where does GraphQL come in?**

GraphQL is query language that behaves in the same way as traditional RESTful API's, with the distinction we can _declaratively_ ask for the data we need, all within a single endpoint. Take for instance a request for getting information about a specific book. GraphQL allows us to model what data we're requiring, and the response mirrors exactly what has been defined in the request:

```javascript
{
  book(id:123) { //we are looking for a book object with the id 123
    title
    genre
}
```
This is all one HTTP request from Graphql, rather than sending _n_ number of requests to gather the same information.

The second problem GraphQL solves is it provides the ability to query only the information we need. For instance, if we didn't care for the reviews of the books, location and prizes of the author, we would simply adjust our query 

```javascript
{
  book(id:123) {
    title
    genre
    author {
      name,
      books {
        name
      }
    }
  }
}
```
and the output would be the following:
```javascript
{
  "data": {
    "book": {
      "name": "The Kind Worth Killing",
      "genre": "Thriller",
      "id": "123"
    }
  }
}
```

Here is the official definition from Wikipedia:
> GraphQL is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data.

A query language used to communicate data between a client (i.e. the browser) and the server.

**What are mutations in GraphQL?**

Performing operations such as creating, updating and deleting resources in a database (or whatever data source in question) are called _mutations_ (sensibly). Here is an example for creating a new author:

```javascript
mutation {
  addAuthor(name: "Paul Waweru", age: 23, location: "North London") {
    name, 
    age,
    location
  }
}
```

with the result:

```javascript
{
  "data": {
    "addAuthor": {
      "name": "Paul Waweru",
      "age": "23",
      "location": "North London"
      }
    }
 }
```
