import React from "react";
import { editModalOpenVar } from "../../config/cache";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { IS_MODAL_OPEN, GET_CURRENT_EMPLYOYEE } from "../../config/querys";
import EditEmployeeForm from "../forms/EditEmployeeForm";

const EditModal = () => {
  /**
   * to prevent destructure name interference the names are changed by destructuring
   */
  const { data: dataModal, error: errorModal, loading: loadingModal } = useQuery(IS_MODAL_OPEN);
  const { data: dataEmployee, error: errorEmployee, loading: loadingEmployee } = useQuery(GET_CURRENT_EMPLYOYEE);

  // checks if the modal should be opened
  const modalIsOpen = dataModal.modalOpen;

  // set local reactive Var to false which closes the modal
  const handleClose = (e) => {
    editModalOpenVar(false);
  };

  if (errorModal || errorEmployee) {
    return <p>something went wrong</p>;
  }

  if (loadingModal || loadingEmployee) {
    return <p>loading...</p>;
  }

  return (
    <>
      {modalIsOpen ? (
        <BackLayer>
          <Modal>
            <CloseButton onClick={(e) => handleClose(e)}>&times;</CloseButton>
            {dataEmployee && <EditEmployeeForm />}
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
  width: 40vw;
  height: 60vh;
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
export default EditModal;
