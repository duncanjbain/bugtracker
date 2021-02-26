const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    name: String
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
      name: String!
      email: String!
      password: String!
    ): AuthInfo
    loginUser(email: String!, password: String!): AuthInfo
    updateUser(
      id: ID!
      name: String
      password: String
      email: String
    ): User
  }
`;
