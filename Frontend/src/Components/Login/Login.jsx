import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {
  Main,
  RightDiv,
  LeftDiv,
  HomeImg,
  HeadingHeader,
  Container,
  Field,
  LoginBtn,
  SignupBtn,
} from "../../Styles/Styles";
import MainLogo from "../../assets/Img/mainLogo-removebg.png";
import { BASE_USER_URL, userendpoints } from "../../api/api";
function showToast(message) {
  toast.success(message, { autoClose: 2500 });
}
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [errorData, setErrorData] = useState("");
  const [loading, setLoding] = useState(false);
  const navigate = useNavigate();
  //passing the success response
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState("");
  // console.log(location);
  useEffect(() => {
    if (location.state && location.state.successMessage) {
      showToast(location.state.successMessage);
    }
  }, [location]);
  const handleLogin = async () => {
    try {
      setLoding(true);
      const response = await axios.post(BASE_USER_URL + userendpoints.login, {
        username,
        password,
      });
      if (response.data.result) {
        setIsLoggedIn(true);
        console.log("Login successful");
        const user_data = response.data.user_data;
        const successMessage = response.data.message;
        setSuccessMessage(successMessage);
        //set the user data in the state
        setUserData(user_data);
        //redirect to the homepage
        // console.log(user_data);
        navigate("/remo", {
          state: { userData: user_data, successMsg: successMessage },
        });
        showToast(successMessage);
      } else {
        console.log("login failed. Server response:", response.data);
      }
    } catch (error) {
      console.error("error during login: ", error);
      // log detailed info about the error response if available
      if (error.response) {
        // console.log("error response data : ", error.response.data.message);
        setErrorData(error.response.data.message);
      }
    } finally {
      setLoding(false);
    }
  };
  const Signup = () => {
    navigate("/todolist/signup");
  };
  return (
    <Main>
      <LeftDiv>
        <HomeImg src={MainLogo} alt="" />
      </LeftDiv>
      <RightDiv>
        <Container className="check">
          <HeadingHeader style={{ color: "#0B60B0" }}>
            Login to Remo
          </HeadingHeader>
          <div>
            {errorData && <p>{errorData}</p>}
            <Field
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <Field
              type="password"
              style={{
                marginTop: "10px",
                marginBottom: "10px",
              }}
              placeholder="enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
            <br />
            <LoginBtn onClick={handleLogin} disabled={loading}>
              {loading ? "logging in.." : "login"}
            </LoginBtn>
            <SignupBtn onClick={Signup}>Signup</SignupBtn>
          </div>{" "}
        </Container>
      </RightDiv>
      <ToastContainer position=" bottom-left" closeOnClick pauseOnHover />
    </Main>
  );
};
export default Login;
