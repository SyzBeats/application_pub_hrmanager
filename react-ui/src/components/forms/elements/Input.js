import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * @description simple react input component that includes the handleChange function of
 * the employee forms
 * @param {object} props
 */
const Input = ({ type, name, handleChange, value = "" }) => {
  return (
    <Label>
      <Wrapper placeholder={name} type={type} name={name} onChange={(e) => handleChange(e)} value={value} />
    </Label>
  );
};

/* STYLED COMPONENTS
--------------------*/

const Wrapper = styled.input`
  background: ${({ theme }) => theme.colors.secondary};
  border: none;
  border-radius: 0.3rem;
  color: #222;
  margin: 1rem 0;
  padding: 1.5rem 1rem;
  width: 80%;
  font-size: 1.8rem;
`;

const Label = styled.label`
  width: 100%;
`;

Input.propTypes = {
  type: PropTypes.oneOf(["text", "number", "email", "password", "date"]).isRequired,
  name: PropTypes.string.isRequired,
};

export default Input;
