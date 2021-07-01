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

const GET_ALL_USERS = `
query {
  getAllUsers {
    name
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
      'Account with this email already exists'
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

  test('must be authenticated to get user by ID', async () => {
    // add new user to database with admin role
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
      }),
    });

    const { query } = createTestClient(server);

    const response = await query({
      query: GET_USER,
      variables: {
        userId: newUser.id,
      },
    });

    expect(response.errors[0].message).toEqual(
      'You do not have permission for this request'
    );
  });

  test('can get all users', async () => {
    const firstUser = await new User({
      name: 'First User',
      email: 'firstuser@email.com',
      password: 'password',
    }).save();

    const secondUser = await new User({
      name: 'Second User',
      email: 'seconduser@email.com',
      password: 'password',
    }).save();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => ({
        User,
        currentUser: firstUser,
      }),
    });

    const { query } = createTestClient(server);

    const response = await query({
      query: GET_ALL_USERS,
    });

    expect(response.data.getAllUsers).toEqual([
      { name: 'First User' },
      { name: 'Second User' },
    ]);
  });

  test('must be authenticated to get all users', async () => {
    const firstUser = await new User({
      name: 'First User',
      email: 'firstuser@email.com',
      password: 'password',
    }).save();

    const secondUser = await new User({
      name: 'Second User',
      email: 'seconduser@email.com',
      password: 'password',
    }).save();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => ({
        User,
      }),
    });

    const { query } = createTestClient(server);

    const response = await query({
      query: GET_ALL_USERS,
    });

    expect(response.errors[0].message).toEqual(
      'You do not have permission for this request'
    );
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

  test('no user info returned if no context user is set', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => ({
        User,
      }),
    });

    const { query } = createTestClient(server);

    const response = await query({ query: GET_WHOAMI });
    expect(response.data.getWhoAmI).toBe(null);
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

  test('cant login without correct email', async () => {
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
      query: LOGIN_USER_MUTATION,
      variables: { email: 'wrong@email.com', password: 'password' },
    });
    expect(response.errors[0].message).toEqual('Invalid email or password');
  });

  test('cant login without correct password', async () => {
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
      query: LOGIN_USER_MUTATION,
      variables: { email: 'test@email.com', password: 'wrong password' },
    });
    expect(response.errors[0].message).toEqual('Invalid email or password');
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
    expect(response.data.updateUser.name).toEqual('Updated User');
  });

  test('cant update user info unless you are the user', async () => {
    const newUser = await new User({
      name: 'Test User',
      email: 'test@email.com',
      password: 'password',
    }).save();

    const secondUser = await new User({
      name: 'Second User',
      email: 'seconduser@email.com',
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
      variables: { id: secondUser.id, name: 'Updated User' },
    });
    expect(response.errors[0].message).toEqual(
      'You do not have permission for this request'
    );
  });
});
