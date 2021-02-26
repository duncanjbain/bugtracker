const { createTestClient } = require('apollo-server-testing');
const { ApolloServer } = require('apollo-server-express');

const { createToken } = require('../../../utils/createToken');
const User = require('../../../models/User');
const typeDefs = require('../../typedefs.js');
const resolvers = require('../../rootResolvers');

const ADD_USER = `
mutation SignupUser(
  $name: String!
  $email: String!
  $password: String!
) {
  signupUser(
    name: $name
    email: $email
    password: $password
  ) {
    user {
      name
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
      name
      email
    }
}
`;

const GET_WHOAMI = `
  query {
    getWhoAmI {
      name
    }
  }
`;

const LOGIN_USER_MUTATION = `
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        name
      }
    }
  }
`;

const UPDATE_PROFILE = `
  mutation UpdateUser($id: ID!, $name: String) {
    updateUser(id: $id, name: $name) {
      name
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
        name: 'Test User',
        email: 'test@email.com',
        password: 'password',
      },
    });

    expect(response.data.signupUser).toEqual({
      user: {
        name: 'Test User',
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
      name: 'Test User',
      email: 'test@email.com',
      password: 'password',
    }).save();

    const { mutate } = createTestClient(server);

    const response = await mutate({
      query: ADD_USER,
      variables: {
        name: 'Test User',
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
      name: 'Test User',
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
      name: 'Test User',
      email: 'test@email.com',
    });
  });

  test('can get user info from currentUser context', async () => {
    const newUser = await new User({
      name: 'Test User',
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
    expect(response.data.getWhoAmI.name).toBe('Test User');
  });

  test('can login user', async () => {
    const newUser = await new User({
      name: 'Test User',
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
      variables: { email: 'test@email.com', password: 'password' },
    });
    expect(response.data.loginUser).toEqual({
      user: { name: 'Test User' },
    });
  });

  test('can update user', async () => {
    const newUser = await new User({
      name: 'Test User',
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
      variables: { id: newUser.id, name: 'Updated User' },
    });
    console.log(response)
    expect(response.data.updateUser.name).toEqual('Updated User');
  });
});
