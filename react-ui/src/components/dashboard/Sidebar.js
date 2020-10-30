import React from "react";
import styled from "styled-components";
import Hirefox from "../../assets/images/hirefox.svg";

/**
 * @description: Displayed as Sidebar in the Dasboard Component
 */
const Sidebar = () => {
  return (
    <Container>
      <BrandLogo src={Hirefox} />
      <BrandTitle>
        HireFox<sup>TM</sup>
      </BrandTitle>
      <SubTitle>The HR Browser to make your life easier</SubTitle>
    </Container>
  );
};

/* STYLED COMPONENTS
--------------------*/

const Container = styled.aside`
  background: #0a112c;
  min-width: 20rem;
  flex: 1;
`;

const BrandLogo = styled.img`
  width: 15rem;
  margin: 3rem;
`;

const BrandTitle = styled.h2`
  color: #f2f2f2;
  font-weight: 300;
  letter-spacing: 0.2rem;
  font-size: ${({ theme }) => theme.fontSize.huge};
  sup {
    font-size: 1rem;
    margin: 1rem;
    display: inline-block;
    border-radius: 100rem;
  }
`;

const SubTitle = styled.p`
  color: #eee;
  margin-top: 1rem;
  font-size: ${({ theme }) => theme.fontSize.small};
`;
export default Sidebar;
