const { gql } = require('apollo-server-express');

module.exports = gql`
  type Bug {
    _id: ID!
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
    getBug(bugId: String!): Bug
  }

  type Mutation {
    createBug(
      key: String!
      summary: String!
      description: String!
      priority: String!
      author: String!
      assignee: String!
      project: String!
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
