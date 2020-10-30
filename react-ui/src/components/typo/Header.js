import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * @description based on input props render out a different heading type
 * @param {object} props (destructured)
 */
const Header = ({ component, content, align = "center" }) => {
  switch (component) {
    case "h1": {
      return <HeaderMain align={align}>{content}</HeaderMain>;
    }
    case "h2": {
      return <HeaderSecondary align={align}>{content}</HeaderSecondary>;
    }
    case "h3": {
      return <HeaderTertiary align={align}>{content}</HeaderTertiary>;
    }
    default: {
      return <HeaderMain align={align}>{content}</HeaderMain>;
    }
  }
};

Header.propTypes = {
  component: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

/* STYLED COMPONENTS
------------------------*/

const HeaderMain = styled.h1`
  text-align: ${(props) => props.align};
  font-size: 3.5rem;
  text-transform: uppercase;
  position: relative;
  display: inline-block;
  align-self: flex-start;
  margin-bottom: 3rem;

  &::after,
  &::before {
    content: "";
    position: absolute;
    height: 0.5rem;
    width: 100%;
    transform: scaleX(1);
    left: 0;
    bottom: 1px;
    transition: all 0.3s;
    transform-origin: left;
  }
  &::after {
    background: ${({ theme }) => theme.colors.tertiary};
  }
  &::before {
    background: ${({ theme }) => theme.colors.main};
  }

  &:hover {
    &::after {
      transform: scaleX(1);
    }
    &::after {
      transform: scaleX(0);
    }
  }
`;
const HeaderSecondary = styled.h2`
  font-size: 2.25rem;
`;
const HeaderTertiary = styled.h3`
  font-size: 1.75rem;
`;

export default Header;
