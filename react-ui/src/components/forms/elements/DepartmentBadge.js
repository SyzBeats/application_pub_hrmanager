import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * @description receives props and renders out a small badge to indicate the department
 * of the referenced Employee
 * @param {object} props
 */
const DepartmentBadge = ({ department }) => {
  switch (department) {
    case "IT": {
      return <ITBadge>IT Department</ITBadge>;
    }
    case "MG": {
      return <MGBadge>Management</MGBadge>;
    }
    case "HR": {
      return <HRBadge>Human Ressources</HRBadge>;
    }
    default: {
      return <BadgeDefault>No Department</BadgeDefault>;
    }
  }
};

const Badge = styled.div`
  width: auto;
  min-width: 10rem;
  padding: 0.5rem;
  position: absolute;
  right: 0rem;
  top: 1rem;
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: 400;
  box-shadow: ${({ theme }) => theme.shadows.lvl3};
  border-radius: 3px;
  transition: all 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lvl2};
  }
`;

const ITBadge = styled(Badge)`
  background: ${({ theme }) => theme.colors.department_it};
  color: white;
`;
const MGBadge = styled(Badge)`
  background: ${({ theme }) => theme.colors.department_mg};
  color: white;
`;
const HRBadge = styled(Badge)`
  background: ${({ theme }) => theme.colors.department_hr};
  color: white;
`;
const BadgeDefault = styled(Badge)`
  background: ${({ theme }) => theme.colors.secondary};
`;

DepartmentBadge.propTypes = {
  department: PropTypes.string.isRequired,
};

export default DepartmentBadge;
