import React from "react";
import styled from "styled-components";
export const Buttons = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #1c1c1c;
`;
export const Main = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0px;
  padding: 0px;
  @media (min-width: 320px) and (max-width: 768px) {
    flex-direction: column;
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 74%;
  height: 100vh;
  @media (min-width: 320px) and (max-width: 768px) {
    width: 90%;
    height: 80vh;
  }
`;
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const HomeImg = styled.img`
  width: 100%;
  height: 50vh;
  border-radius: 40px;
  object-fit: contain;
  @media (min-width: 320px) and (max-width: 768px) {
    height: 20vh;
  }
`;
export const RemoImg = styled.img`
  width: 30%;
  height: 10vh;
`;
export const RightDiv = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 30px;
  height: 70%;
  box-shadow: 10px 10px 10px 10px #b6b6b659;
  @media (min-width: 320px) and (max-width: 768px) {
    width: 90%;
    height: 51%;
  }
`;
export const LoginBtn = styled.button`
  &:hover {
    background-color: #40a2d8;
  }
  color: #fff;
  background-color: #0b60b0;
  border: #0b60b0;
  padding: 10px 30px;
  border-radius: 9px;
  margin: 10px;
  font-size: 15px;
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 10px 20px;
  }
`;
export const HeadingHeader = styled.h1`
  font-size: 25px;
  color: #0b60b0;
  @media (min-width: 320px) and (max-width: 768px) {
    font-size: 20px;
  }
`;
export const SignupBtn = styled.button`
  color: #fff;
  background-color: #40a2d8;
  border: #40a2d8;
  padding: 10px 30px;
  border-radius: 9px;
  margin: 10px;
  font-size: 15px;
  @media (min-width: 320px) and (max-width: 768px) {
    font-size: 12px;
    padding: 10px 20px;
  }
`;
export const LeftDiv = styled.div`
  width: 50%;
  margin: 0px;
  padding: 0px;
  @media (min-width: 320px) and (max-width: 768px) {
    height: 25%;
  }
`;
export const Field = styled.input`
  &:focus {
    outline: #40a2d8;
  }
  padding: 15px 10px;
  border: 1px solid #0b60b0;
  margin: 5px 10px;
  border-radius: 12px;
  width: 90%;
`;
export const HomeLogoImage = styled.img`
  width: 40%;
  height: 40%;
  object-fit: contain;
`;

export const Styles = () => {
  return <div>Styles</div>;
};
