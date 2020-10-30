import { gql } from "@apollo/client";

/*= REMOTE QUERYS
-----------------------*/
export const GET_EMPLOYEES = gql`
  query getEmployee {
    employees {
      _id
      firstName
      lastName
      department
      position
    }
  }
`;

export const DELETE_CURRENT_EMPLOYEE = gql`
  mutation deleteEmployee($_id: ID!) {
    deleteEmployee(_id: $_id) {
      _id
    }
  }
`;

export const EDIT_CURRENT_EMPLOYEE = gql`
  mutation editCurrentEmployee(
    $_id: ID!
    $firstName: String
    $lastName: String
    $position: String
    $department: String
  ) {
    editEmployee(_id: $_id, department: $department, firstName: $firstName, lastName: $lastName, position: $position) {
      _id
      firstName
      lastName
      position
      department
    }
  }
`;

export const ADD_NEW_EMPLOYEE = gql`
  mutation addNewEmployee(
    $firstName: String!
    $lastName: String!
    $gender: Gender
    $dob: Date!
    $position: String!
    $department: String!
  ) {
    addEmployee(
      department: $department
      firstName: $firstName
      gender: $gender
      dob: $dob
      lastName: $lastName
      position: $position
    ) {
      _id
      firstName
      lastName
      gender
      dob
      position
      department
    }
  }
`;

/*= LOCAL STATE QUERYS
-----------------------*/

export const GET_CURRENT_EMPLYOYEE = gql`
  query getCurrentEmployee {
    currentEmployee @client
  }
`;

export const IS_MODAL_OPEN = gql`
  query getModalOpen {
    modalOpen @client
  }
`;

export const IS_CREATE_MODAL_OPEN = gql`
  query getCreateModalOpen {
    createModalOpen @client
  }
`;
