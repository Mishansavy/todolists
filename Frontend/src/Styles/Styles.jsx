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
`;
export const HomeImg = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: contain;
`;
export const RightDiv = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  // background-color:black;
  border-radius: 30px;
  height: 50%;
  box-shadow: 10px 10px 10px 10px #b6b6b659;
`;
export const LoginBtn = styled.button`
  &:hover {
    background-color: #40a2d8;
  }
  color: #fff;
  background-color: #0b60b0;
  border: #0b60b0;
  padding: 15px 30px;
  border-radius: 9px;
  margin: 10px;
  font-size: 15px;
`;
export const HeadingHeader = styled.h1`
  font-size: 25px;
  color: #000000;
`;
export const SignupBtn = styled.button`
  color: #fff;
  background-color: #40a2d8;
  border: #40a2d8;
  padding: 15px 30px;
  border-radius: 9px;
  margin: 10px;
  font-size: 15px;
`;
export const LeftDiv = styled.div`
  width: 50%;
  margin: 0px;
  padding: 0px;
`;
export const Styles = () => {
  return <div>Styles</div>;
};
