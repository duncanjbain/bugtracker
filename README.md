# Bug Tracker

![CircleCI](https://img.shields.io/circleci/build/github/duncanjbain/bugtracker/main?logo=circleci&style=for-the-badge) ![Netlify](https://img.shields.io/netlify/e5ab9f0a-0f9a-407b-a53c-98e1ba463b1e?logo=netlify&style=for-the-badge) ![Codecov](https://img.shields.io/codecov/c/github/duncanjbain/bugtracker?logo=codecov&style=for-the-badge) ![GitHub](https://img.shields.io/github/license/duncanjbain/bugtracker?logo=github&style=for-the-badge) ![Website](https://img.shields.io/website?logo=Google%20Chrome&style=for-the-badge&url=https%3A%2F%2Fbugtracker.duncanbain.dev) ![GitHub commit activity](https://img.shields.io/github/commit-activity/w/duncanjbain/bugtracker?logo=github&style=for-the-badge)

### Table of Contents
- [Introduction](#introduction)
- [Stack](#stack)
- [Installation and Deployment](#contributors)
- [Acknowledgments](#acknowledgments)

## Introduction
Bug Tracker is a bug and issue tracker created with React, Node.JS, GraphQL and MongoDB.

A hosted demo is available at **[https://bugtracker.duncanbain.dev](https://bugtracker.duncanbain.dev)**. 

*Note: As the backend is hosted on a free tier Heroku node, it may require a 5-10 second spin up time before loading for the first time*

It has the following functionality:
- Can register
- Can login
- View and update their profile and login information
- Create a Project
- Add a bug to a Project
- Assign users to a Bug
- View created and assigned bugs using a dashboard
- Edit Projects or Bugs

## Stack
The frontend uses the following:
- [React](https://reactjs.org/)
- [Styled Components](https://styled-components.com/)
- [React Hook Form](https://react-hook-form.com/)
- [GraphQL](https://graphql.org/) in conjunction with [Apollo](https://www.apollographql.com/)

The backend uses:
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/) in conjunction with [Mongoose](https://mongoosejs.com/)
- [GraphQL](https://graphql.org/) in conjunction with [Apollo](https://www.apollographql.com/)

Authentication is implemented using a JSON Web Token (JWT) saved in local storage. Upon a successful login attempt made to the GraphQL endpoint, the response is a JWT containing the name and user ID of the user. This token is then added to every API request that requires authorisation.

Testing is carried out with [**Jest**](https://jestjs.io/) handling the **GraphQL** and **MongoDB** integration testing, with [**Cypress**](https://www.cypress.io/) used for end-to-end testing.

[**CircleCI**](https://circleci.com/) is used for continuous  integration and performs both the integration and end-to-end testing upon a pull request made to the repository. **[CodeCov](https://about.codecov.io/)** is used to provide code coverage information. 

Following a successful testing and build process, once the pull request is merged **CircleCI** conducts a deployment of the frontend to [**Netlify**](https://www.netlify.com/) and the backend is deployed to [**Heroku**](https://heroku.com).

## Installation

Clone the repository
```console 
git clone https://github.com/duncanjbain/bugtracker.git
```

Then install dependencies
```console
cd bugtracker
yarn install
```

Create a .env file in the directory ```packages/backend``` containing the following two variables:
```
#JWT_SECRET is used in the JWT generation for signing
JWT_SECRET=EXAMPLE

#MONGODB_URI is the MongoDB to use
MONGODB_URI=mongodb+srv://[...]
```

If you do not wish to use a hosted MongoDB instance you can leave MONGODB_URI blank, we will cover launching a development instance using [MongoDB Memory Server](https://www.npmjs.com/package/mongodb-memory-server) next.

#### Run development environment with hosted MongoDB
If you wish to run the development environment using a hosted MongoDB instance, then run the following command from the monorepo root:

```yarn start:dev```

You can then access it at https://localhost:3000. The GraphQL API is available at https://localhost:4000.

#### Run development environment with MongoDB Memory Server
If you do not have a hosted MongoDB instance available, you can run the development environment using a MongoDB instance hosted in memory. However, the database is not stored anywhere following the shutting down of the development environment.

```yarn start:mongodb-memory```

You can then access it at https://localhost:3000. The GraphQL API is available at https://localhost:4000.
