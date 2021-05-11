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
    dateDue: String!
  }

  type UsersBugs {
    createdBugs: [Bug]
    assignedBugs: [Bug]
  }

  type Query {
    getAllBugs: [Bug]
    getBug(bugId: ID!): Bug
    getUsersBugs(userId: ID!): UsersBugs
    getBugByKey(bugKey: String!): Bug
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
      dateDue: String!
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
      dateDue: String
    ): Bug
    deleteExistingBug(bugId: ID!): Bug
  }
`;
