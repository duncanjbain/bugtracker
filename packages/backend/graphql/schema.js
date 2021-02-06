const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    getWhoAmI: User
    getUser: User
    getAllUsers: [User]
    getAllBugs: [Bug]
    getBug(bugId: String!): Bug
    getAllProjects: [Project]
    getProject(projectID: String!): Project
    getUserProjects(userID: String!): [Project]
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
    memberOfProjects: [Project]
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

  type Mutation {
    signupUser(
      firstName: String!
      lastName: String!
      username: String!
      email: String!
      password: String!
    ): AuthInfo
    loginUser(username: String!, password: String!): AuthInfo
    updateUser(
      _id: ID!
      firstName: String
      lastName: String
      password: String
      email: String
    ): User
    createBug(
      key: String!
      summary: String!
      description: String!
      priority: String!
      author: String!
      project: String!
      labels: [String!]
    ): Bug
    updateExistingBug(
      _id: ID!
      key: String
      summary: String
      description: String
      priority: String
      author: String
      project: String
      labels: [String]
    ): Bug
    deleteExistingBug(_id: ID!): Bug
    createProject(projectKey: String!, projectName: String!): Project
    createBugLabel(
      labelName: String!
      labelDescription: String!
      bugsWithLabel: [String]
    ): BugLabel
  }
`;

module.exports = typeDefs;
