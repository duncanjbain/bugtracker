const { createTestClient } = require('apollo-server-testing');
const { ApolloServer } = require('apollo-server-express');

const User = require('../../../models/User');
const Bug = require('../../../models/Bug');
const Project = require('../../../models/Project');
const typeDefs = require('../../typedefs.js');
const resolvers = require('../../rootResolvers');

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
  }
}
`;

const GET_USER = `
query GetUser(
  $userId: ID!
) {
  getUser(
    userId: $userId
  ) {
      firstName
      lastName
      username
      email
    }
}
`;

const GET_WHOAMI = `
  query {
    getWhoAmI {
      _id
    }
  }
`;

describe('user GraphQL queries', () => {
  test('signup user', async () => {
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

    expect(response.data.signupUser).toEqual({
      user: {
        firstName: 'Duncan',
        lastName: 'Bain',
        username: 'duncanbain',
        email: 'duncan@bain.io',
      },
    });
  });

  test('unable to signup user with same username', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => ({ User, Bug, Project }),
    });

    const newUser = await new User({
      firstName: 'Duncan',
      lastName: 'Bain',
      username: 'duncanbain',
      email: 'duncan@bain.io',
      password: 'password',
    }).save();

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
    expect(response.errors[0].message).toEqual(
      'User with this username already exists'
    );
  });

  test('get user by ID', async () => {
    // add new user to database with admin role
    const newAdminUser = await new User({
      firstName: 'Duncan',
      lastName: 'Bain',
      username: 'duncanbain',
      email: 'duncan@bain.io',
      password: 'password',
      siteRole: 'ADMIN',
    }).save();

    // create apollo server with admin passed as currentUser context in order to check user permissions for query
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => ({
        User,
        Bug,
        Project,
        currentUser: newAdminUser,
      }),
    });

    const { query } = createTestClient(server);

    const response = await query({
      query: GET_USER,
      variables: {
        userId: newAdminUser.id,
      },
    });

    expect(response.data.getUser).toEqual({
      firstName: 'Duncan',
      lastName: 'Bain',
      username: 'duncanbain',
      email: 'duncan@bain.io',
    });
  });

  test('get user info from currentUser context', async () => {
    const newUser = await new User({
      firstName: 'Duncan',
      lastName: 'Bain',
      username: 'duncanbain',
      email: 'duncan@bain.io',
      password: 'password',
    }).save();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => ({
        User,
        Bug,
        Project,
        currentUser: newUser,
      }),
    });

    const { query } = createTestClient(server);

    const response = await query({ query: GET_WHOAMI });
    expect(JSON.stringify(response.data.getWhoAmI)).toBe(JSON.stringify({_id: newUser.id}));
  });
});
