---
title: Learning Typescript
date: "2019-05-21T23:46:37.121Z"
layout: post
draft: false
path: "/posts/typescript"
category: "Learning"
tags:
  - "learning" 
  - "javascript"
  - "typescript"
description: "Learning Typescript"
---
**Typescript Fundamentals**
- a typed, syntactic superset of Javascript 
- adds modern language features that Javascript lacks (in regards to older browsers)
- complies to readable Javascript (types disappear during build time)
- comprised of three parts: Language, Language Server (helps with annotations, autocompletions and errors in your code editor) and Compiler (transforms Typescript to readable Javascript) 

**Why use Typescript?**
- enforces constraints and removes assumptions when writing code e.g. a function designed to take a string as parameter, this is enforced, as opposed to using documentation via comments
- helps catch common mistakes e.g. spelling errors, invalid types passed as parameters etc.
- errors move from runtime to compile time (faster developer experience if you can find the errors earlier and faster)

**Compiling TS to JS**

`tsc index.ts --target ES2017 --module commonjs --watch`

**Configuring Typescript to your project**
- use a `tsconfig.json` to specify all your rules for your TS project:
```
{
        "compilerOptions": {
          "module": "commonjs",
          "target": "es2017",
          "outDir": "lib" // publish the compiled output to a file
        },
        "include": ["src"]
}
```

**How Typescript differs from other strongly-typed languages (i.e. Java)**

Consider this function

```javascript
function validInputfield(input: HTMLInputElement) {
  /* ... */ 
}

validInputfield(x)
```
Nominal type systems:
  - Java would attempt to answer the following question: is `x` an instance of a class named `HTMLInputElement`? Your code will need to be setup in an _object-oriented_ way, as in, you'll need to define classes with their constructors and methods, and create instances of these classes.

Structural type systems:
  - Typescript (or Javascript in general) is only concerned with the shape of an object, and would attempt to answer the following question: what is the shape of `x` in terms of it's properties, and the types of those values for those properties? For example, an object `Car` could have the properties `make` of type `string`,  `model` of type `string` and `age` of type `number`. This information is important to structural type languages such as Typescript 


**Difference between Types and Interfaces in Typescript**
type aliases used to define simple types, for example

```javascript
const x: string | number
```



## H2
### H3
#### H4
##### H5
###### H6