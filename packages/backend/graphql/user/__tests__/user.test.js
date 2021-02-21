const { createTestClient } = require('apollo-server-testing');
const { ApolloServer } = require('apollo-server-express');

const { createToken } = require('../../../utils/createToken');
const User = require('../../../models/User');
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
      username
    }
  }
`;

const LOGIN_USER_MUTATION = `
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      user {
        username
      }
    }
  }
`;

const UPDATE_PROFILE = `
  mutation UpdateUser($id: ID!, $firstName: String) {
    updateUser(id: $id, firstName: $firstName) {
      firstName
    }
  }
`;

describe('user GraphQL queries', () => {
  test('can signup user', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => ({ User }),
    });

    const { mutate } = createTestClient(server);

    const response = await mutate({
      query: ADD_USER,
      variables: {
        firstName: 'Firstname',
        lastName: 'Lastname',
        username: 'testusername',
        email: 'test@email.com',
        password: 'password',
      },
    });

    expect(response.data.signupUser).toEqual({
      user: {
        firstName: 'Firstname',
        lastName: 'Lastname',
        username: 'testusername',
        email: 'test@email.com',
      },
    });
  });

  test('unable to signup user with same username', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => ({ User }),
    });

    const newUser = await new User({
      firstName: 'Firstname',
      lastName: 'Lastname',
      username: 'testusername',
      email: 'test@email.com',
      password: 'password',
    }).save();

    const { mutate } = createTestClient(server);

    const response = await mutate({
      query: ADD_USER,
      variables: {
        firstName: 'Firstname',
        lastName: 'Lastname',
        username: 'testusername',
        email: 'test@email.com',
        password: 'password',
      },
    });
    expect(response.errors[0].message).toEqual(
      'User with this username already exists'
    );
  });

  test('can get user by ID', async () => {
    // add new user to database with admin role
    const newAdminUser = await new User({
      firstName: 'Firstname',
      lastName: 'Lastname',
      username: 'testusername',
      email: 'test@email.com',
      password: 'password',
      siteRole: 'ADMIN',
    }).save();

    // create apollo server with admin passed as currentUser context in order to check user permissions for query
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => ({
        User,
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
      firstName: 'Firstname',
      lastName: 'Lastname',
      username: 'testusername',
      email: 'test@email.com',
    });
  });

  test('can get user info from currentUser context', async () => {
    const newUser = await new User({
      firstName: 'Firstname',
      lastName: 'Lastname',
      username: 'testusername',
      email: 'test@email.com',
      password: 'password',
    }).save();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => ({
        User,
        currentUser: newUser,
      }),
    });

    const { query } = createTestClient(server);

    const response = await query({ query: GET_WHOAMI });
    expect(response.data.getWhoAmI.username).toBe('testusername');
  });

  test('can login user', async () => {
    const newUser = await new User({
      firstName: 'Firstname',
      lastName: 'Lastname',
      username: 'testusername',
      email: 'test@email.com',
      password: 'password',
    }).save();

    // create token to compare to returned token
    const token = createToken(newUser);

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => ({
        User,
        currentUser: newUser,
      }),
    });

    const { mutate } = createTestClient(server);

    const response = await mutate({
      query: LOGIN_USER_MUTATION,
      variables: { username: 'testusername', password: 'password' },
    });
    expect(response.data.loginUser).toEqual({
      user: { username: 'testusername' },
    });
  });

  test('can update user', async () => {
    const newUser = await new User({
      firstName: 'Firstname',
      lastName: 'Lastname',
      username: 'testusername',
      email: 'test@email.com',
      password: 'password',
    }).save();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => ({
        User,
        currentUser: newUser,
      }),
    });

    const { mutate } = createTestClient(server);

    const response = await mutate({
      query: UPDATE_PROFILE,
      variables: { id: newUser.id, firstName: 'New' },
    });
    expect(response.data.updateUser.firstName).toEqual('New');
  });
});
