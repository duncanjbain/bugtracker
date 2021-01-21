const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    getAllBugs: [Bug]
    getBug(bugId: String!): Bug
    getAllProjects: [Project]
    getProject(projectID: String!): Project
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    username: String!
    password: String
    email: String!
    joinDate: String!
    siteRole: String!
  }

  type AuthInfo {
    token: String!
    user: User!
  }

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

  type Bug {
    _id: ID!
    key: String!
    summary: String!
    description: String!
    priority: String!
    author: User!
    project: Project!
    labels: [BugLabel]
  }

  type BugLabel {
    _id: ID!
    labelName: String!
    labelDescription: String!
    bugsWithLabel: [Bug]
  }

  type newBugDetails {
    Bug: Bug!
    BugAuthor: User!
  }

  type Mutation {
    signupUser(
      firstName: String!
      lastName: String!
      username: String!
      email: String!
      password: String!
    ): AuthInfo
    signinUser(username: String!, password: String!): AuthInfo
    createBug(
      key: String!
      summary: String!
      description: String!
      priority: String!
      author: String!
      project: String!
      labels: [String!]
    ): newBugDetails
    createProject(
      projectKey: String!
      projectName: String!
      projectLead: String!
    ): Project
    createBugLabel(
      labelName: String!
      labelDescription: String!
      bugsWithLabel: [String]
    ): BugLabel
  }
`;

module.exports = typeDefs;
