const { createTestClient } = require('apollo-server-testing');
const { ApolloServer } = require('apollo-server-express');

const Project = require('../../../models/Project');
const User = require('../../../models/User');
const Bug = require('../../../models/Bug');
const typeDefs = require('../../typedefs.js');
const resolvers = require('../../rootResolvers');

const GET_ALL_PROJECTS = `
query {
        getAllProjects {
        projectKey
    }
}
`;

const GET_PROJECT = `
query GetProject(
    $searchKey: String!
){
        getProject(
            searchKey: $searchKey
        ) {
        projectName
  }
}
`;

const GET_PROJECT_MEMBERS = `
  query GetProjectMembers($projectKey: String!) {
    getProjectMembers(projectKey: $projectKey) {
      name
    }
  }
`;

const CREATE_PROJECT = `
  mutation CreateProject($projectKey: String!, $projectName: String!) {
    createProject(projectKey: $projectKey, projectName: $projectName) {
      projectName
    }
  }
`;

const GET_USER_PROJECTS = `
query GetUserProjects($userID: ID!) {
  getUserProjects(userID: $userID) {
    projectName
  }
}
`

const ADD_USER_TO_PROJECT = `
mutation AddUserToProject($projectKey: String!, $userId: ID!){
  addUserToProject(projectKey: $projectKey, userId: $userId) {
    projectName
  }
}
`

describe('project GraphQL queries', () => {
  test('can create a project', async () => {
    const newAdminUser = await new User({
      name: 'Test Admin',
      email: 'testadmin@email.com',
      password: 'password',
      siteRole: 'ADMIN',
    }).save();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => ({
        Project,
        User,
        Bug,
        currentUser: newAdminUser,
      }),
    });

    const { mutate } = createTestClient(server);

    const response = await mutate({
      query: CREATE_PROJECT,
      variables: { projectKey: 'KEY01', projectName: 'ProjectOne' },
    });
    expect(response.data.createProject.projectName).toEqual('ProjectOne');
  });

  test('can get all projects', async () => {
    const newAdminUser = await new User({
      name: 'Test Admin',
      email: 'testadmin@email.com',
      password: 'password',
      siteRole: 'ADMIN',
    }).save();

    const firstNewProject = await new Project({
      projectKey: 'KEY01',
      projectName: 'ProjectOne',
    }).save();

    const secondNewProject = await new Project({
      projectKey: 'KEY02',
      projectName: 'ProjectTwo',
    }).save();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => ({
        Project,
        User,
        Bug,
        currentUser: newAdminUser,
      }),
    });

    const { query } = createTestClient(server);

    const response = await query({ query: GET_ALL_PROJECTS });
    expect(response.data.getAllProjects).toEqual([
      { projectKey: 'KEY01' },
      { projectKey: 'KEY02' },
    ]);
  });
  test('can get project from key', async () => {
    const newAdminUser = await new User({
      name: 'Test Admin',
      email: 'testadmin@email.com',
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
        currentUser: newAdminUser,
      }),
    });

    const { query } = createTestClient(server);

    const response = await query({
      query: GET_PROJECT,
      variables: { searchKey: 'KEY01' },
    });
    expect(response.data.getProject).toEqual({ projectName: 'ProjectOne' });
  });

  test('can get all projects a user belongs to', async () => {
    const newAdminUser = await new User({
      name: 'Test Admin',
      email: 'testadmin@email.com',
      password: 'password',
      siteRole: 'ADMIN',
    }).save();

    const firstNewProject = await new Project({
      projectKey: 'KEY01',
      projectName: 'ProjectOne',
      projectMembers: [newAdminUser.id],
    }).save();

    const secondNewProject = await new Project({
      projectKey: 'KEY02',
      projectName: 'ProjectTwo',
      projectMembers: [newAdminUser.id],
    }).save();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => ({
        Project,
        User,
        Bug,
        currentUser: newAdminUser,
      }),
    });

    const { query } = createTestClient(server);

    const response = await query({
      query: GET_PROJECT_MEMBERS,
      variables: { projectKey: firstNewProject.projectKey },
    });
    expect(response.data.getProjectMembers).toEqual([
      { name: 'Test Admin' },
    ]);
  });

  test('can get all projects that a user belongs to', async () => {
    const firstUser = await new User({
      name: 'First User',
      email: 'first@email.com',
      password: 'password',
    }).save();

    const firstNewProject = await new Project({
      projectKey: 'KEY01',
      projectName: 'ProjectOne',
      projectMembers: [firstUser.id],
    }).save();
    
    const secondNewProject = await new Project({
      projectKey: 'KEY02',
      projectName: 'ProjectTwo',
      projectMembers: [firstUser.id],
    }).save();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => ({
        Project,
        User,
        Bug,
        currentUser: firstUser,
      }),
    });

    const { query } = createTestClient(server);

    const response = await query({query: GET_USER_PROJECTS, variables: { userID: firstUser.id}})
    expect(response.data.getUserProjects).toEqual([{projectName: "ProjectOne"}, {projectName: "ProjectTwo"}])
  });

  test('can add user to project', async () => {
    const firstUser = await new User({
      name: 'First User',
      email: 'first@email.com',
      password: 'password',
    }).save();

    const secondUser = await new User({
      name: 'Second User',
      email: 'second@email.com',
      password: 'password',
    }).save();

    const firstNewProject = await new Project({
      projectKey: 'KEY01',
      projectName: 'ProjectOne',
      projectMembers: [firstUser.id],
    }).save();
    
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => ({
        Project,
        User,
        currentUser: firstUser,
      }),
    });

    const { mutate } = createTestClient(server);

    const response = await mutate({query: ADD_USER_TO_PROJECT, variables: { projectKey: 'KEY01', userId: secondUser.id}})
    expect(response.data.addUserToProject).toEqual({projectName: "ProjectOne"})
  });
  

});
