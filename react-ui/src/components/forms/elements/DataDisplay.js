import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import DepartmentBadge from "./DepartmentBadge";

/**
 * @description displays a preview for new created employees
 * @param {object} props
 */
const DataDisplay = ({ data }) => {
  const { firstName, lastName, position, department, gender, dob } = data;
  return (
    <Wrapper>
      <TopSection>
        <DepartmentBadge department={department} />
      </TopSection>
      <AvatarImage src="https://robohash.org/Well-thanks.png?set=set2" />
      <DataSet>
        Name: <span>{`${firstName} ${lastName}`}</span>
      </DataSet>
      <DataSet>
        Gender: <span>{`${gender && gender}`}</span>
      </DataSet>
      <DataSet>
        DoB: <span>{`${dob && dob}`}</span>
      </DataSet>
      <DataSet>
        Position: <span>{`${position && position}`}</span>
      </DataSet>
    </Wrapper>
  );
};

DataDisplay.propTypes = {
  data: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    position: PropTypes.string,
    department: PropTypes.string,
    gender: PropTypes.string,
  }),
};

const Wrapper = styled.div`
  min-height: 80%;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const TopSection = styled.div`
  position: relative;
  width: 100%;
`;

const AvatarImage = styled.img`
  margin: 5rem 0 2rem 0;
  width: 15rem;
  height: auto;
  height: 15rem;
  border-radius: 100rem;
  object-fit: cover;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.lvl3};
`;

const DataSet = styled.div`
  color: white;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 1rem 0;
  font-size: ${({ theme }) => theme.fontSize.medium};
  border-bottom: 1px solid #fff1;
  & span {
    margin-left: 1rem;
  }
`;

export default DataDisplay;
