const { gql } = require('apollo-server-express')

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

  type Token {
    token: String
  }

  type Mutation {
    signupUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): User
    signinUser(email: String!, password: String!): Token
  }
`

module.exports = typeDefs
