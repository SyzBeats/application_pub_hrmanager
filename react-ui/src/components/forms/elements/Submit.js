import React from "react";
import styled from "styled-components";
import { editModalOpenVar } from "../../../config/cache";
/**
 * @description handles the login submission of the form
 */
const Submit = ({ content = "login" }) => {
  /**
   * close modals after submit to return back to dashboard view
   * I suspect that after editing a user wants to close the modal.
   * after adding it, they might want to add more users, therefore the modal stays open
   */
  const handleClick = () => {
    editModalOpenVar(false);
  };
  return (
    <SubmitButton onClick={() => handleClick()} type="submit" name="submit">
      {content}
    </SubmitButton>
  );
};

/* STYLED COMPONENTS
--------------------*/

const SubmitButton = styled.button`
  min-width: 15rem;
  align-self: center;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 0.3rem;
  margin: 2rem 0 1rem 0;
  border: 2px solid ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.main};
  box-shadow: ${({ theme }) => theme.shadows.lvl1};

  transition: all 0.2s ease;
  font-size: 1.8rem;

  &:hover {
    background: ${({ theme }) => theme.colors.main};
    color: #f2f2f2;
    cursor: pointer;
  }
`;
export default Submit;
