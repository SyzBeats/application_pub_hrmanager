import React, { useState } from "react";
import styled from "styled-components";
import Input from "./elements/Input";
import Submit from "./elements/Submit";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

/**
 * mutation to login user and receive back the token to store it
 * in the local storage. see useMutation below
 */
const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    loginUser(data: { email: $email, password: $password }) {
      token
    }
  }
`;

const LoginForm = (props) => {
  const history = useHistory();

  /**
   * @description Apollo mutation to log in user and store the
   * jwt inside the local storage
   */
  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ loginUser: { token } }) {
      localStorage.setItem("token", token);
      history.push("/dashboard");
      return;
    },
  });

  // State handler for login form fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  /**
   * @description match form name to targeted field in state
   * @param {Event} e React change Event
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * @description submit formState to authentication route and receive a token back
   * @param {Event} e React Form Submit Event
   */
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await login({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <p>loading...</p>;

  return (
    <FormContainer onSubmit={(e) => handleSubmit(e)}>
      <FormTitle>Login</FormTitle>
      {error && <p style={{ color: "white" }}>{error.message}</p>}
      <Input type="email" name="email" value={formData.email} handleChange={handleChange} />
      <Input type="password" name="password" value={formData.password} handleChange={handleChange} />
      <Submit />
    </FormContainer>
  );
};

/* STYLED COMPONENTS
--------------------*/

const FormContainer = styled.form`
  padding: 7rem 3rem;
  background: ${({ theme }) => theme.colors.main_dark};
  box-shadow: ${({ theme }) => theme.shadows.lvl3};
  border-radius: 0.5rem;

  display: flex;
  flex-direction: column;
  min-width: 30rem;
`;

const FormTitle = styled.h2`
  font-size: 3.5rem;
  color: white;
  margin: 0;
  margin-bottom: 5rem;
  font-weight: 200;
  text-transform: uppercase;
`;

export default LoginForm;
