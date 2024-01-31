import React from "react";
import { useNavigate } from "react-router";
import checklist from "../../assets/Img/checklist.png";
import {
  Buttons,
  Main,
  LoginBtn,
  SignupBtn,
  HeadingHeader,
  LeftDiv,
  RightDiv,
  HomeImg,
} from "../../Styles/Styles";
export const Home = () => {
  const navigate = useNavigate();
  //routing
  const Login = () => {
    navigate("/todolists/login");
  };
  const Signup = () => {
    navigate("/todolist/signup");
  };

  return (
    <Main>
      <LeftDiv>
        <HomeImg src={checklist} alt="" />
      </LeftDiv>
      <RightDiv>
        
        <HeadingHeader>Welcome to Remo</HeadingHeader>
        <Buttons>
          <LoginBtn onClick={Login}>Login</LoginBtn>
          <SignupBtn onClick={Signup}>Signup</SignupBtn>
        </Buttons>
      </RightDiv>
    </Main>
  );
};
