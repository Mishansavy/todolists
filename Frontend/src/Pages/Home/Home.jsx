import React from "react";
import { useNavigate } from "react-router";
import MainLogo from "../../assets/Img/mainLogo-removebg.png";
import RemoLogo from "../../assets/Img/todowithtablet-removebg.png";
import {
  Buttons,
  Main,
  LoginBtn,
  SignupBtn,
  HeadingHeader,
  LeftDiv,
  RightDiv,
  HomeImg,
  HomeLogoImage,
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
        <HomeImg src={MainLogo} alt="Remo - Todo App Logo" />
      </LeftDiv>
      <RightDiv>
        <HomeLogoImage src={RemoLogo} alt="Remo - Todo App Logo" />
        <HeadingHeader>Welcome to Remo</HeadingHeader>
        <Buttons>
          <LoginBtn onClick={Login}>Login</LoginBtn>
          <SignupBtn onClick={Signup}>Signup</SignupBtn>
        </Buttons>
      </RightDiv>
    </Main>
  );
};
