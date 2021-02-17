// testing library
const { createTestClient } = require('apollo-server-testing');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const User = require('./models/User');
const Bug = require('./models/Bug');
const Project = require('./models/Project');
const typeDefs = require('./graphql/typedefs.js');
const resolvers = require('./graphql/rootResolvers');


const ADD_USER = `
mutation SignupUser(
  $firstName: String!
  $lastName: String!
  $username: String!
  $email: String!
  $password: String!
) {
  signupUser(
    firstName: $firstName
    lastName: $lastName
    username: $username
    email: $email
    password: $password
  ) {
    user {
      firstName
      lastName
      username
      email
    }
    token
  }
}
`;

describe('mongo tests', () => {
  let connection;
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('create user and return user information', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => ({ User, Bug, Project }),
    });

    const { mutate } = createTestClient(server);

    // initially empty
    const response = await mutate({
      query: ADD_USER,
      variables: {
        firstName: 'Duncan',
        lastName: 'Bain',
        username: 'duncanbain',
        email: 'duncan@bain.io',
        password: 'password',
      },
    });

    expect(response.data.signupUser).toEqual({
      user: {
        firstName: 'Duncan',
        lastName: 'Bain',
        username: 'duncanbain',
        email: 'duncan@bain.io',
      },
      token: expect.any(String),
    });
  });

  test('unable to sign up with same username', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => ({ User, Bug, Project }),
    });

    const { mutate } = createTestClient(server);

    const response = await mutate({
      query: ADD_USER,
      variables: {
        firstName: 'Duncan',
        lastName: 'Bain',
        username: 'duncanbain',
        email: 'duncan@bain.io',
        password: 'password',
      },
    });
    expect(response.errors[0].message).toEqual("User with this username already exists");
  });

});
