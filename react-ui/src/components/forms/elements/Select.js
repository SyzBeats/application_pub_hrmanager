import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * @description simple react select component that includes the handleChange function of
 * the employee forms
 * @param {object} props
 */
const Input = ({ name, handleChange, value = "", children }) => {
  return (
    <Label>
      <Wrapper placeholder={name} name={name} onChange={(e) => handleChange(e)} value={value}>
        {children}
      </Wrapper>
    </Label>
  );
};

/* STYLED COMPONENTS
--------------------*/

const Wrapper = styled.select`
  background: ${({ theme }) => theme.colors.secondary};
  border: none;
  border-radius: 0.3rem;
  color: #222;
  margin: 1rem 0;
  padding: 1.5rem 0.5rem;
  width: calc(80% + 2rem);
  font-size: 1.8rem;
`;

const Label = styled.label`
  width: 100%;
`;

Input.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Input;
