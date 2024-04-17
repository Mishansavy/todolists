import React from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import MainLogo from "../../assets/Img/mainLogo-removebg.png";

import {
  Container,
  FormContainer,
  HeadingHeader,
  LoginBtn,
  Main,
  RightDiv,
  LeftDiv,
  HomeImg,
} from "../../Styles/Styles";

export const SignForm = () => {
  return (
    <Form>
      <Main>
        <LeftDiv>
          <HomeImg src={MainLogo} alt="" />
        </LeftDiv>
        <RightDiv style={{ justifyContent: "start" }}>
          <Container>
            <HeadingHeader style={{ color: "#0B60B0" }}>
              Signup to Remo
            </HeadingHeader>
            <FormContainer>
              <div style={{ display: "flex" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Field
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder="Enter your First name"
                  />
                  <ErrorMessage name="first_name" component="div" />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Field
                    type="text"
                    id="middle_name"
                    name="middle_name"
                    placeholder="Enter your Middle Name"
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Field
                    type="text"
                    id="last_name"
                    name="last_name"
                    placeholder="Enter your Last Name"
                  />
                  <ErrorMessage name="last_name" component="div" />
                </div>
              </div>
              <div style={{ display: "flex", margin: "20px 0px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your Username"
                  />
                  <ErrorMessage name="username" component="div" />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your Email"
                  />
                  <ErrorMessage name="email" component="div" />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your Password"
                  />
                  <ErrorMessage name="password" component="div" />
                </div>
              </div>
            </FormContainer>
            {/* <br /> */}
            <LoginBtn
              style={{ padding: "15px 75px", margin: "-10px" }}
              type="submit"
            >
              Signup
            </LoginBtn>{" "}
          </Container>
        </RightDiv>
      </Main>
    </Form>
  );
};
export default SignForm;
