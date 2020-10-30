import React from "react";
import styled from "styled-components";
import Header from "../typo/Header";
import AddEmployeeButton from "../buttons/AddEmployeeButton";
import FlexRow from "../layout/FlexRow";
import Employees from "../employees/Employees";

/**
 * @description main Dashboard compnent that includes the dynamic components
 * and displays the current Employees
 */
const Dashboard = () => {
  return (
    <Container>
      <FlexRow align="center" justify="flex-start">
        <Header content="Your employees" component="h1" align="left" />
      </FlexRow>
      <FlexRow align="center" justify="flex-start">
        <AddEmployeeButton content="Add new" />
      </FlexRow>
      <Employees />
    </Container>
  );
};

/* STYLED COMPONENTS
--------------------*/

const Container = styled.section`
  flex: 5;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  background-image: ${({ theme }) => theme.colors.secondary};
  background-size: cover;
`;
export default Dashboard;
