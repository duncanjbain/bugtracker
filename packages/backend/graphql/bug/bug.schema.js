const { gql } = require('apollo-server-express');

module.exports = gql`
  type Bug {
    id: ID!
    key: String!
    summary: String!
    description: String!
    priority: String!
    author: User!
    project: Project!
    assignee: User!
    type: String!
  }

  type Query {
    getAllBugs: [Bug]
    getBug(bugId: ID!): Bug
  }

  type Mutation {
    createBug(
      key: String!
      summary: String!
      description: String!
      priority: String!
      author: ID!
      assignee: ID!
      project: ID!
      type: String!
    ): Bug
    updateExistingBug(
      _id: ID!
      key: String
      summary: String
      description: String
      priority: String
      author: String
      project: String
    ): Bug
    deleteExistingBug(_id: ID!): Bug
  }
`;
