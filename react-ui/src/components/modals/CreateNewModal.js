import React from "react";
import { createModalOpenVar } from "../../config/cache";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { IS_CREATE_MODAL_OPEN } from "../../config/querys";
import AddEmployeeForm from "../forms/AddEmployeeForm";

const CreateNewModal = () => {
  // to determine if the modal should be open, use local reactive var
  const { data, error, loading } = useQuery(IS_CREATE_MODAL_OPEN);

  // checks if the modal should be opened
  const modalIsOpen = data.createModalOpen;

  const handleClose = (e) => {
    createModalOpenVar(false);
  };

  if (error) {
    return <p>something went wrong</p>;
  }

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <>
      {modalIsOpen ? (
        <BackLayer>
          <Modal>
            <CloseButton onClick={(e) => handleClose(e)}>&times;</CloseButton>
            <AddEmployeeForm />
          </Modal>
        </BackLayer>
      ) : (
        <></>
      )}
    </>
  );
};

/* STYLED COMPONENTS
--------------------*/

const BackLayer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
  background: #2228;
`;

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 50vw;
  min-height: 60vh;
  padding: 2rem;
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  position: relative;
`;

const CloseButton = styled.button`
  padding: 0.5rem 1rem;
  background: #333;
  color: white;
  position: absolute;
  top: 5%;
  right: 5%;
  border: none;
  font-size: 2rem;
  &:hover {
    cursor: pointer;
  }
`;
export default CreateNewModal;
