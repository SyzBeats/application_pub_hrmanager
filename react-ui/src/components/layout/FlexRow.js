import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

/**
 * @description layout flexrow
 * @param {object} props - destructured
 */
const FlexRow = ({ justify, align, children }) => {
  return (
    <Row align={align} justify={justify}>
      {children}
    </Row>
  );
};

/* STYLED COMPONENTS
--------------------*/

const Row = styled.div`
  display: flex;
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align};
  margin: 1rem 0;
`;

FlexRow.propTypes = {
  justify: PropTypes.oneOf(["flex-start", "flex-end", "center"]).isRequired,
  align: PropTypes.oneOf(["flex-start", "flex-end", "center", "stretch"]).isRequired,
};
export default FlexRow;
