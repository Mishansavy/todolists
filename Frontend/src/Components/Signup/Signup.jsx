import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  middle_name: Yup.string(),
  last_name: Yup.string().required("Last name is required"),
  username: Yup.string().required("username is required"),
  email: Yup.string()
    .email("Invalild email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
export const Signup = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Signup to Todo App</h1>
      <Formik
        initialValues={{
          first_name: "",
          middle_name: "",
          last_name: "",
          email: "",
          username: "",
          password: "",
        }}
        validateSchema={validationSchema}
        onSubmit={(values) => {
          // alert(JSON.stringify(values, null, 2));
          navigate("/todolists/login");
          axios
            .post("http://192.168.1.161:8000/accounts/register/user/", values)
            .then((response) => {
              console.log("API Response", response.data);
              console.log("form values", values);
            })
            .catch((erro) => {
              console.log("errors", error);
            });
        }}
      >
        <Form>
          <div>
            <ErrorMessage name="first_name" component="div" />
            <Field
              type="text"
              id="first_name"
              name="first_name"
              placeholder="Enter your Firstname"
            />
          </div>
          <div>
            <Field
              type="text"
              id="middle_name"
              name="middle_name"
              placeholder="Enter your Middle Name"
            />
          </div>
          <div>
            <ErrorMessage name="last_name" component="div" />
            <Field
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Enter your Last Name"
            />
          </div>
          <div>
            <ErrorMessage name="username" component="div" />
            <Field
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <ErrorMessage name="email" component="div" />
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
            />
          </div>
          <div>
            <ErrorMessage name="password" component="div" />
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Enter your Password"
            />
          </div>
          <br />
          <button type="submit">Sigup</button>
        </Form>
      </Formik>
    </>
  );
};
export default Signup;
