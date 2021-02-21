const { gql } = require('apollo-server-express');

module.exports = gql`
  type Project {
    id: ID!
    projectKey: String!
    projectName: String!
    projectLead: User!
    projectBugs: [Bug]
    projectMembers: [ProjectMember]
  }

  type ProjectMember {
    user: User!
  }

  type Query {
    getAllProjects: [Project]
    getProject(searchKey: String!): Project
    getUserProjects(userID: ID!): [Project]
    getProjectMembers(projectID: ID!): [User]
  }

  type Mutation {
    createProject(projectKey: String!, projectName: String!): Project
  }
`;
