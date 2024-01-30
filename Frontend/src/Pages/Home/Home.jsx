import React from "react";
import { useNavigate } from "react-router";
import { Buttons, Main, LoginBtn, SignupBtn } from "../../Styles/Styles";
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
      <div>Welcome to Todo Remo</div>
      <Buttons>
        <LoginBtn onClick={Login}>Login</LoginBtn>
        <SignupBtn onClick={Signup}>Signup</SignupBtn>
      </Buttons>
    </Main>
  );
};
