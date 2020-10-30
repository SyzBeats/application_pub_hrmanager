import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import Employee from "./Employee";
import { GET_EMPLOYEES } from "../../config/querys";
import EditModal from "../modals/EditModal";
import CreateNewModal from "../modals/CreateNewModal";

/**
 * @description Wrapper for Employee Objects
 */
const Employees = () => {
  const { loading, error, data } = useQuery(GET_EMPLOYEES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <EmployeeGrid>
        {data.employees &&
          data.employees.map((employee) => {
            const { _id } = employee;
            return <Employee key={_id} data={employee} />;
          })}
      </EmployeeGrid>
      <EditModal />
      <CreateNewModal />
    </>
  );
};

/* STYLED COMPONENTS
--------------------*/

const EmployeeGrid = styled.section`
  margin-top: 10rem;
  display: grid;
  gap: 3rem;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 35rem));
  grid-template-rows: minmax(20rem, 1fr);
  grid-auto-rows: minmax(20rem, 1fr);
  justify-items: center;
  justify-content: center;
`;

export default Employees;
