import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { currentEmployeeVar, editModalOpenVar } from "../../config/cache";
import { DELETE_CURRENT_EMPLOYEE, GET_EMPLOYEES } from "../../config/querys";
import { useMutation } from "@apollo/client";
const Employee = ({ data }) => {
  const { _id, department, firstName, lastName, position } = data;

  /**
   * @description Apollo mutation
   * use delete mutation to remove single employee from DB
   */
  const [deleteEmployee, { loading, error }] = useMutation(DELETE_CURRENT_EMPLOYEE, {
    onCompleted(data) {
      return;
    },
  });

  /**
   * @description As the cache persists data from Apollo Client
   * the update function provides an API to mutate the cache. As the data should be immutable
   * Object.assign is used. This prevents the "cannot assign to readonly" error
   * @param {Event} e ClickEvent
   */
  const handleDelete = async (e) => {
    try {
      await deleteEmployee({
        variables: {
          _id,
        },
        update: (cache) => {
          let data = cache.readQuery({ query: GET_EMPLOYEES });
          data = Object.assign({}, data);
          data.employees = data.employees.filter((employee) => employee._id !== _id);
          cache.writeQuery({ query: GET_EMPLOYEES, data });
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * on Click the current Employee should be loaded into the local State
   * to be available in the Apollo cache and accessible by other components
   */
  const handleCardClick = () => {
    currentEmployeeVar({
      _id,
      department,
      firstName,
      lastName,
      position,
    });
  };

  /**
   * @description executed when Edit Button is clicked,
   * to open the edit modal, the reactive var will be set to true
   */
  const handleEditClick = () => {
    editModalOpenVar(true);
  };

  if (error) return <p>error</p>;
  if (loading) return <p>loading</p>;

  /**
   * @description The cards are divided by different departments
   * which are stored in the DB.
   */
  switch (department) {
    case "IT": {
      return (
        <ITCard onClick={() => handleCardClick()}>
          <h3>{`${firstName} ${lastName} `}</h3>
          <p>Department: {department}</p>
          <ActionContainer>
            <EditButton onClick={() => handleEditClick()}>Edit</EditButton>
            <DeleteButton onClick={() => handleDelete(_id)}>Delete</DeleteButton>
            {loading && <p>loading...</p>}
          </ActionContainer>
        </ITCard>
      );
    }
    case "MG": {
      return (
        <MGCard onClick={() => handleCardClick()}>
          <h3>{`${firstName} ${lastName} `}</h3>
          <p>Department: {department}</p>
          <ActionContainer>
            <EditButton onClick={() => handleEditClick()}>Edit</EditButton>
            <DeleteButton onClick={() => handleDelete(_id)}>Delete</DeleteButton>
            {loading && <p>loading...</p>}
          </ActionContainer>
        </MGCard>
      );
    }
    case "HR": {
      return (
        <HRCard onClick={() => handleCardClick()}>
          <h3>{`${firstName} ${lastName} `}</h3>
          <p>Department: {department}</p>
          <ActionContainer>
            <EditButton onClick={() => handleEditClick()}>Edit</EditButton>
            <DeleteButton onClick={() => handleDelete(_id)}>Delete</DeleteButton>
            {loading && <p>loading...</p>}
          </ActionContainer>
        </HRCard>
      );
    }
    default: {
      return (
        <CardDefault>
          <h3>{`${firstName} ${lastName} `}</h3>
          <p>Department: {department}</p>
          <ActionContainer>
            <EditButton onClick={() => handleEditClick()}>Edit</EditButton>
            <DeleteButton onClick={() => handleDelete(_id)}>Delete</DeleteButton>
            {loading && <p>loading...</p>}
          </ActionContainer>
        </CardDefault>
      );
    }
  }
};

Employee.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    department: PropTypes.string,
  }),
};

/*= STYLED COMPONENTS
--------------------*/

const Card = styled.div`
  width: 100%;
  position: relative;
  background: #ffffff;
  box-shadow: ${({ theme }) => theme.shadows.lvl1};
  border-radius: 3px;
  transition: all 0.2s;
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lvl2};
  }
`;

const ITCard = styled(Card)`
  border-top: 0.4rem solid ${({ theme }) => theme.colors.department_it};
`;
const MGCard = styled(Card)`
  border-top: 0.4rem solid ${({ theme }) => theme.colors.department_mg};
`;
const HRCard = styled(Card)`
  border-top: 0.4rem solid ${({ theme }) => theme.colors.department_hr};
`;
const CardDefault = styled(Card)`
  border-top: 0.4rem solid ${({ theme }) => theme.colors.main};
`;

const EditButton = styled.button`
  padding: 0.5rem 2rem;
  border-radius: 0.3rem;
  margin: 0.3rem;
  border: none;
  font-weight: 600;
  background: #e0d5ae;
  text-decoration: none;
  color: #222;
  box-shadow: ${({ theme }) => theme.shadows.lvl1};
  &:hover {
    cursor: pointer;
  }
`;

const DeleteButton = styled(EditButton)`
  background: #e25764;
`;

const ActionContainer = styled.div`
  position: absolute;
  bottom: 0rem;
  right: 0rem;
  border: none;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
`;

export default Employee;
