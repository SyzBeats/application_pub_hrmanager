import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";

/**
 * @description Dashboard Wrapper for layout purposes
 */
const DashboardContainer = () => {
  return (
    <Container>
      <Sidebar />
      <Dashboard />
    </Container>
  );
};

/* STYLED COMPONENTS
--------------------*/

const Container = styled.main`
  display: flex;
  min-height: 100vh;
`;

export default DashboardContainer;
