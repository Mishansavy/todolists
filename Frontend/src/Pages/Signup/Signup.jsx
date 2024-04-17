import React, { useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import SignForm from "../../Components/Form/SignForm";
import { ToastContainer, toast } from "react-toastify";

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
function showToast(message) {
  toast.success(message, { autoClose: 2500 });
}
export const Signup = () => {
  const navigate = useNavigate();
  const [successMessge, setSuccessMessage] = useState("");
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
          axios
            .post("http://192.168.1.161:8000/accounts/register/user/", values)
            .then((response) => {
              console.log("API Response", response.data);
              console.log("form values", values);
              setSuccessMessage(response.data.message);
              navigate("/todolists/login", {
                state: { successMessage: response.data.message },
              });
            })
            .catch((error) => {
              console.log("errors", error);
              showToast(error.response?.data.message || "An error occurred");
            })
            .finally(() => setSubmitting(false));
        }}
      >
        <SignForm />
      </Formik>

      <ToastContainer position="bottom-left" closeOnClick pauseOnHover />
    </>
  );
};
export default Signup;
