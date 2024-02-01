import React from "react";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import SignForm from "../../Components/Form/SignForm";

const validationSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  middle_name: Yup.string(),
  last_name: Yup.string().required("Last name is required"),
  username: Yup.string().required("Username is required"),
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
      <Formik
        initialValues={{
          first_name: "",
          middle_name: "",
          last_name: "",
          email: "",
          username: "",
          password: "",
        }}
        validationSchema={validationSchema}
        validate={() => ({})}
        onSubmit={(values, { setSubmitting }) => {
          // alert(JSON.stringify(values, null, 2));
          navigate("/todolists/login");
          axios
            .post("http://192.168.1.161:8000/accounts/register/user/", values)
            .then((response) => {
              console.log("API Response", response.data);
              console.log("form values", values);
            })
            .catch((error) => {
              console.log("errors", error);
            })
            .finally(() => setSubmitting(false));
        }}
      >
        <SignForm />
      </Formik>
    </>
  );
};
export default Signup;
