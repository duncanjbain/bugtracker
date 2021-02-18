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
`

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
`

describe('project GraphQL queries', () => {
  test('can get all projects', async () => {
    const newAdminUser = await new User({
      firstName: 'Firstname',
      lastName: 'Lastname',
      username: 'testadmin',
      email: 'testadmin@email.com',
      password: 'password',
      siteRole: 'ADMIN',
    }).save();

    const firstNewProject = await new Project({
        projectKey: "KEY01",
        projectName: "ProjectOne"
    }).save();

    const secondNewProject = await new Project({
        projectKey: "KEY02",
        projectName: "ProjectTwo"
    }).save();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => ({ Project, User, Bug, currentUser: newAdminUser }),
    });

    const { query } = createTestClient(server);

    const response = await query({query: GET_ALL_PROJECTS, })
    expect(response.data.getAllProjects).toEqual([{"projectKey": "KEY01"}, {"projectKey": "KEY02"}])

  });
  test('can get project from key', async () => {
    const newAdminUser = await new User({
        firstName: 'Firstname',
        lastName: 'Lastname',
        username: 'testadmin',
        email: 'testadmin@email.com',
        password: 'password',
        siteRole: 'ADMIN',
      }).save();
  
      const firstNewProject = await new Project({
          projectKey: "KEY01",
          projectName: "ProjectOne"
      }).save();

      const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req }) => ({ Project, User, Bug, currentUser: newAdminUser }),
      });
  
      const { query } = createTestClient(server);

      const response = await query({query: GET_PROJECT, variables: { searchKey: "KEY01"}})

      expect(response.data.getProject).toEqual({projectName:"ProjectOne"})
  })
});
