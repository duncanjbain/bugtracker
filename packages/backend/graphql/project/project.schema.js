const { gql } = require('apollo-server-express');

module.exports = gql`
  type Project {
    _id: ID!
    projectKey: String!
    projectName: String!
    projectLead: User!
    projectBugs: [Bug]
    projectMembers: [ProjectMember]
  }

  type ProjectMember {
    user: User!
    role: String!
  }

  type Query {
    getAllProjects: [Project]
    getProject(searchKey: String!): Project
    getUserProjects(userID: String!): [Project]
    getProjectMembers(projectID: String!): [User]
  }

  type Mutation {
    createProject(projectKey: String!, projectName: String!): Project
  }
`;
