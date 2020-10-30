import React, { useState } from "react";
import styled from "styled-components";
import Input from "./elements/Input";
import Select from "./elements/Select";
import Submit from "./elements/Submit";
// get current employee data
import { useMutation } from "@apollo/client";
import { ADD_NEW_EMPLOYEE, GET_EMPLOYEES } from "../../config/querys";
import DataDisplay from "./elements/DataDisplay";

const AddEmployeeForm = () => {
  // local state handler form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    position: "",
    department: "",
    gender: "",
    dob: 0,
  });

  /**
   * @description Apollo mutation
   * use add mutation to add new employee to DB Store
   * update function manipulates Apollo cache and concats new object into array
   */
  const [addNewEmployee, { loading, error }] = useMutation(ADD_NEW_EMPLOYEE, {
    onCompleted(data) {
      return;
    },
    variables: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      position: formData.position,
      department: formData.department,
      gender: formData.gender,
      dob: formData.dob,
    },
    update: (cache, result) => {
      let data = cache.readQuery({ query: GET_EMPLOYEES });
      data = Object.assign({}, data);
      data.employees = [...data.employees, result.data.addEmployee];
      cache.writeQuery({ query: GET_EMPLOYEES, data });
      return;
    },
  });

  /**
   * @description As the cache persists data from Apollo Client
   * the update function provides an API to mutate the cache. As the data should be immutable
   * Object.assign is used. This prevents the "cannot assign to readonly" error
   * @param {Event} e ClickEvent
   */
  const handleSubmit = async (e) => {
    // check if fields are filled, alert box to indicate user error
    e.preventDefault();

    if (
      !formData.department ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.position ||
      !formData.gender ||
      !formData.dob
    ) {
      return window.alert("please fill all fields");
    }

    try {
      await addNewEmployee();
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

  if (loading) return <p>loading</p>;
  if (error) return <p>error</p>;

  return (
    <>
      <FormContainer method="POST" onSubmit={(e) => handleSubmit(e)}>
        <FormTitle>Create</FormTitle>
        <Input label="label" type="text" name="firstName" value={formData.firstName} handleChange={handleChange} />
        <Input type="text" name="lastName" value={formData.lastName} handleChange={handleChange} />

        <Select label="label" name="gender" value={formData.gender} handleChange={handleChange}>
          <option value=""></option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </Select>

        <Select label="label" name="department" value={formData.department} handleChange={handleChange}>
          <option value=""></option>
          <option value="IT">IT</option>
          <option value="MG">Management</option>
          <option value="HR">Human Ressources</option>
        </Select>

        <Input type="date" name="dob" value={formData.dob} handleChange={handleChange} />

        <Input type="text" name="position" value={formData.position} handleChange={handleChange} />
        <Submit content="Create" />
      </FormContainer>
      <Preview>
        <DataDisplay data={formData} />
      </Preview>
    </>
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
  margin: 0.5rem;
`;

const FormTitle = styled.h2`
  font-size: 3.5rem;
  color: #222;
  margin: 0;
  margin-bottom: 5rem;
  font-weight: 200;
  text-transform: uppercase;
`;

const Preview = styled.div`
  padding: 3rem;
  margin: 0.5rem;
  background: ${({ theme }) => theme.colors.main};
  box-shadow: 2px 2px 9px #111c;
  border-radius: 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 30rem;
  width: 100%;
  color: #222;
`;
export default AddEmployeeForm;
