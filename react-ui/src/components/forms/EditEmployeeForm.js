import React, { useState } from "react";
import styled from "styled-components";
import Input from "./elements/Input";
import Select from "./elements/Select";
import Submit from "./elements/Submit";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CURRENT_EMPLYOYEE, EDIT_CURRENT_EMPLOYEE } from "../../config/querys";

const EditEmployeeForm = () => {
  // State handler for login form fields
  const { data, error, loading } = useQuery(GET_CURRENT_EMPLYOYEE);
  const {
    currentEmployee: { _id, firstName, lastName, department, position },
  } = data;

  // local formState to store input data
  const [formData, setFormData] = useState({
    _id: _id || "",
    firstName: firstName || "",
    lastName: lastName || "",
    position: position || "",
    department: department || "",
  });

  /**
   * @description Apollo mutation
   * use delete mutation to remove single employee from DB
   */
  const [editCurrentEmployee, { loading: editLoading, error: editError }] = useMutation(EDIT_CURRENT_EMPLOYEE, {
    onCompleted(data) {
      return;
    },
    variables: {
      _id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      position: formData.position,
      department: formData.department,
    },
  });

  /**
   * @description As the cache persists data from Apollo Client
   * the update function provides an API to mutate the cache. As the data should be immutable
   * Object.assign is used. This prevents the "cannot assign to readonly" error
   * @param {Event} e ClickEvent
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editCurrentEmployee();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * @param {Event} e React change Event
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading || editLoading) return <p>loading</p>;
  if (error || editError) return <p>error</p>;
  return (
    <FormContainer method="POST" onSubmit={(e) => handleSubmit(e)}>
      <FormTitle>
        Edit: <EmployeeName>{`${firstName} ${lastName}`}</EmployeeName>
      </FormTitle>
      <Input type="text" name="firstName" value={formData.firstName} handleChange={handleChange} />
      <Input type="text" name="lastName" value={formData.lastName} handleChange={handleChange} />
      <Select label="label" name="department" value={formData.department} handleChange={handleChange}>
        <option value=""></option>
        <option value="IT">IT</option>
        <option value="MG">Management</option>
        <option value="HR">Human Ressources</option>
      </Select>{" "}
      <Input type="text" name="position" value={formData.position} handleChange={handleChange} />
      <Submit content="Edit" />
    </FormContainer>
  );
};

/*= STYLED COMPONENTS
------------------------*/

const FormContainer = styled.form`
  padding: 3rem;
  background: #f2f2f2;
  box-shadow: 2px 2px 9px #111c;
  border-radius: 0.5rem;

  display: flex;
  flex-direction: column;
  min-width: 30rem;
  width: 100%;
  color: #222;
`;

const FormTitle = styled.h2`
  font-size: 3.5rem;
  color: #222;
  margin: 0;
  margin-bottom: 5rem;
  font-weight: 200;
  text-transform: uppercase;
`;

const EmployeeName = styled.span`
  color: #bbb;
`;

export default EditEmployeeForm;
