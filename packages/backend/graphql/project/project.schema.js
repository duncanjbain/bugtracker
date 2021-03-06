const { gql } = require('apollo-server-express');

module.exports = gql`
  type Project {
    id: ID!
    projectKey: String!
    projectName: String!
    projectLead: User!
    projectBugs: [Bug]
    projectMembers: [User]
  }

  type Query {
    getAllProjects: [Project]
    getProject(searchKey: String!): Project
    getUserProjects(userID: ID!): [Project]
    getProjectMembers(projectKey: String!): [User]
  }

  type Mutation {
    createProject(projectKey: String!, projectName: String!): Project
    addUserToProject(projectKey: String!, userId: ID!): Project
  }
`;
