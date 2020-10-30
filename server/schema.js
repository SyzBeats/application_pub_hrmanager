const { gql } = require("apollo-server");

/**
 * @description definition of types in DB and
 * all Querys / Mutations
 */

const typeDefs = gql`
  # custom scalar for dates
  scalar Date

  #enums
  enum Gender {
    MALE
    FEMALE
  }

  #input types
  input UserInput {
    email: String!
    password: String!
  }

  # types
  type Employee {
    _id: ID!
    firstName: String!
    lastName: String!
    position: String!
    department: String!
    dob: Date
    gender: Gender
    profileURL: String
  }

  type AuthPayload {
    token: String!
  }

  type User {
    email: String!
    password: String!
  }

  # Querys

  type Query {
    employees: [Employee!]
    employee(_id: ID!): [Employee!]!
  }

  # Mutations

  type Mutation {
    # employee mutations
    addEmployee(
      firstName: String!
      lastName: String!
      position: String!
      department: String!
      gender: Gender
      dob: Date
    ): Employee!
    editEmployee(
      _id: ID!
      firstName: String
      lastName: String
      position: String
      department: String
      gender: Gender
    ): Employee!
    deleteEmployee(_id: ID!): [Employee!]!

    # user mutations
    signupUser(data: UserInput): AuthPayload!
    loginUser(data: UserInput): AuthPayload!
  }
`;

module.exports = typeDefs;
