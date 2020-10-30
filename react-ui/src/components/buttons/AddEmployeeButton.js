import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { createModalOpenVar } from "../../config/cache";

const AddEmployeeButton = ({ content }) => {
  /**
   * @description to open the Add New Employee Modal the reactive
   * variable will be triggered and set to true
   * @param {React.MouseEvent} e
   */
  const handleClick = (e) => {
    createModalOpenVar(true);
  };
  return <Button onClick={(e) => handleClick(e)}>{content}</Button>;
};

AddEmployeeButton.propTypes = {
  content: PropTypes.string.isRequired,
};

/* STYLED COMPONENTS
----------------------------*/

const Button = styled.button`
  background: ${({ theme }) => theme.colors.main};

  padding: 1.25rem 2.75rem;
  color: white;
  box-shadow: 1px 3px 6px #1114;
  border: none;
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fontSize.normal};
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
  }
`;
export default AddEmployeeButton;
