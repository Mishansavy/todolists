import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import SignForm from "../../Components/Form/SignForm";
import { ToastContainer, toast } from "react-toastify";
import api from "../../api/api";

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
import { useNavigate, useLocation } from "react-router-dom";

export const Signup = () => {
  const showToast = (message) => {
    toast.success(message, { autoClose: 2500 });
  };
  const location = useLocation();

  console.log(location);
  useEffect(() => {
    if (location.state && location.state.successMessage) {
      showToast(location.state.successMessage);
    }
  }, [location]);
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
          axios
            .post(
              "https://todoapp-backend-sad2.onrender.com/accounts/register/user/",
              values
            )
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
      <ToastContainer position="center" closeOnClick pauseOnHover />
    </>
  );
};
export default Signup;
