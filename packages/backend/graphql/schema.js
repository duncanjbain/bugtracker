const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    _dummy: String
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    password: String!
    email: String!
    joinDate: String!
  }

  type AuthInfo {
    token: String!
    user: User!
  }

  type Mutation {
    signupUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): AuthInfo
    signinUser(email: String!, password: String!): AuthInfo
  }
`;

module.exports = typeDefs;
