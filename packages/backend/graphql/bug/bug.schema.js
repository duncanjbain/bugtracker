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
    created: String!
  }

  type UsersBugs {
    createdBugs: [Bug]
    assignedBugs: [Bug]
  }

  type Query {
    getAllBugs: [Bug]
    getBug(bugId: ID!): Bug
    getUsersBugs(userId: ID!): UsersBugs
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
      bugId: ID!
      key: String
      summary: String
      description: String
      priority: String
      author: ID
      assignee: ID
      project: ID
      type: String
    ): Bug
    deleteExistingBug(_id: ID!): Bug
  }
`;
