const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    _dummy: String
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
    password: String!
    email: String!
    joinDate: String!
  }

  type AuthInfo {
    token: String!
    user: User!
  }

  type Project {
    id: ID!
    projectKey: String!
    projectName: String!
    projectLead: User!
  }

  type Bug {
    id: ID!
    key: String!
    summary: String!
    description: String!
    priority: String!
    author: User!
    project: Project!
    labels: [BugLabel]
  }

  type BugLabel {
    id: ID!
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
    createBugLabel(
      labelName: String!
      labelDescription: String!
      bugsWithLabel: [String]
    ): BugLabel
  }
`;

module.exports = typeDefs;
