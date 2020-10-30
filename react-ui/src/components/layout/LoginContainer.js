import React from "react";
import styled from "styled-components";
import LoginForm from "../forms/LoginForm";
import HireFox from "../../assets/images/hirefox.svg";
const LoginContainer = (props) => {
  return (
    <Wrapper>
      <FormContainer>
        <LoginForm />
      </FormContainer>
      <Sidebar>
        <BrandLogo src={HireFox} alt="logo" />
        <BrandTitle>
          Hirefox<sup>TM</sup>
        </BrandTitle>
        <SubTitle>The HR Browser to make your life easier</SubTitle>
      </Sidebar>
    </Wrapper>
  );
};

/*= STYLED COMPONENTS
----------------------*/

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`;
const FormContainer = styled.div`
  flex: 4;
  background: ${({ theme }) => theme.colors.main};

  display: flex;
  justify-content: center;
  align-items: center;
`;
const Sidebar = styled.aside`
  flex: 1;
  min-width: 15rem;
  background: ${({ theme }) => theme.colors.main_dark};

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
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

export default LoginContainer;
