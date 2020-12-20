const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
      id: ID!
      firstName: String!
      lastName: String!
      password: String!
      email: String!
      userName: String!
      joinDate: String!
  }

  type Token {
    token: String!
  }

  type Query {
    getCurrentUser: User
  }

  type Mutation {
    signupUser(firstName: String!, lastName: String!, email: String!, password: String!): User
  }
`;

module.exports = typeDefs;