const { gql } = require('apollo-server-express');

module.exports = gql`
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

  type Query {
    getWhoAmI: User
    getUser(userId: ID!): User
    getAllUsers: [User]
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
  }
`;
