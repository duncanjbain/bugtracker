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

  type Bug {
    id: ID!
    key: String!
    summary: String!
    description: String!
    priority: String!
    author: String!
    project: String!
    labels: [String!]
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
    ): Bug
  }
`;

module.exports = typeDefs;
