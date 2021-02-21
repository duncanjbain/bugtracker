const { createTestClient } = require('apollo-server-testing');
const { ApolloServer } = require('apollo-server-express');

const Project = require('../../../models/Project');
const User = require('../../../models/User');
const Bug = require('../../../models/Bug');
const typeDefs = require('../../typedefs.js');
const resolvers = require('../../rootResolvers');

const GET_ALL_BUGS = `
query {
    getAllBugs {
        key
    }
}
`;

const GET_BUG = `
query GetBug($bugId: ID!) {
    getBug(bugId: $bugId) {
        key
    }
}
`;

const CREATE_BUG = `
mutation CreateBug(
    $key: String!
    $summary: String!
    $description: String!
    $priority: String!
    $author: ID!
    $project: ID!
    $assignee: ID!
    $type: String!
) {
    createBug(
        key: $key
        summary: $summary
        description: $description
        priority: $priority
        author: $author
        project: $project
        assignee: $assignee
        type: $type
    ) {
        key
    }
}
`;

const UPDATE_EXISTING_BUG = `
mutation UpdateExistingBug(
    $bugId: ID!
    $summary: String!
) {
    updateExistingBug(
        bugId: $bugId
        summary: $summary
    ) {
        summary
    }
}
`;

describe('bug GraphQL queries', () => {
  test('can get all bugs', async () => {
    const newUser = await new User({
      firstName: 'Firstname',
      lastName: 'Lastname',
      username: 'newuser',
      email: 'newuser@email.com',
      password: 'password',
      siteRole: 'ADMIN',
    }).save();

    const firstNewProject = await new Project({
      projectKey: 'KEY01',
      projectName: 'ProjectOne',
    }).save();

    const newBug = await new Bug({
      key: 'BUG01',
      summary: 'First bug summary',
      description: 'First bug description',
      priority: 'medium',
      type: 'defect',
      author: newUser.id,
      project: firstNewProject.id,
      assignee: newUser.id,
    }).save();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => ({
        Project,
        User,
        Bug,
        currentUser: newUser,
      }),
    });

    const { query } = createTestClient(server);

    const response = await query({ query: GET_ALL_BUGS });

    expect(response.data.getAllBugs).toEqual([{ key: 'BUG01' }]);
  });

  test('can get bug by id', async () => {
    const newUser = await new User({
      firstName: 'Firstname',
      lastName: 'Lastname',
      username: 'newuser',
      email: 'newuser@email.com',
      password: 'password',
      siteRole: 'ADMIN',
    }).save();

    const firstNewProject = await new Project({
      projectKey: 'KEY01',
      projectName: 'ProjectOne',
    }).save();

    const newBug = await new Bug({
      key: 'BUG01',
      summary: 'First bug summary',
      description: 'First bug description',
      priority: 'medium',
      type: 'defect',
      author: newUser.id,
      project: firstNewProject.id,
      assignee: newUser.id,
    }).save();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => ({
        Project,
        User,
        Bug,
        currentUser: newUser,
      }),
    });

    const { query } = createTestClient(server);

    const response = await query({
      query: GET_BUG,
      variables: { bugId: newBug.id },
    });

    expect(response.data.getBug).toEqual({ key: 'BUG01' });
  });
  test('can create new bug', async () => {
    const newUser = await new User({
      firstName: 'Firstname',
      lastName: 'Lastname',
      username: 'newuser',
      email: 'newuser@email.com',
      password: 'password',
      siteRole: 'ADMIN',
    }).save();

    const firstNewProject = await new Project({
      projectKey: 'KEY01',
      projectName: 'ProjectOne',
    }).save();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => ({
        Project,
        User,
        Bug,
        currentUser: newUser,
      }),
    });

    const { mutate } = createTestClient(server);

    const response = await mutate({
      query: CREATE_BUG,
      variables: {
        key: 'BUG01',
        summary: 'First bug summary',
        description: 'First bug description',
        priority: 'medium',
        type: 'defect',
        author: newUser.id,
        project: firstNewProject.id,
        assignee: newUser.id,
      },
    });

    expect(response.data.createBug).toEqual({ key: 'BUG01' });
  });

  test('can update existing bug', async () => {
    const newUser = await new User({
      firstName: 'Firstname',
      lastName: 'Lastname',
      username: 'newuser',
      email: 'newuser@email.com',
      password: 'password',
      siteRole: 'ADMIN',
    }).save();

    const firstNewProject = await new Project({
      projectKey: 'KEY01',
      projectName: 'ProjectOne',
      projectMembers: [newUser.id],
    }).save();

    const newBug = await new Bug({
      key: 'BUG01',
      summary: 'First bug summary',
      description: 'First bug description',
      priority: 'medium',
      type: 'defect',
      author: newUser.id,
      project: firstNewProject.id,
      assignee: newUser.id,
    }).save();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => ({
        Project,
        User,
        Bug,
        currentUser: newUser,
      }),
    });

    const { mutate } = createTestClient(server);

    const response = await mutate({
      query: UPDATE_EXISTING_BUG,
      variables: { bugId: newBug.id, summary: 'Updated bug summary' },
    });

    expect(response.data.updateExistingBug).toEqual({
      summary: 'Updated bug summary',
    });
  });
});
