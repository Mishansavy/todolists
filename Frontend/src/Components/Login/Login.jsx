import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [errorData, setErrorData] = useState("");
  // console.log("🚀 ~ Login ~ errorData:", errorData);
  const [loading, setLoding] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoding(true);

      // const response = await axios.post(
      //   "http://127.0.0.1:8000/accounts/login/",
      //   { username, password }
      // );
      const response = await axios.post(
        "http://192.168.1.161:8000/accounts/login/",
        { username, password }
      );


      if (response.data.result) {
        setIsLoggedIn(true);
        console.log("Login successful");

        const user_data = response.data.user_data;
        //set the user data in the state
        setUserData(user_data);

        //redirect to the homepage
        console.log(user_data);
        navigate("/remo", { state: { userData: user_data } });
      } else {
        console.log("login failed. Server response:", response.data);
      }
    } catch (error) {
      console.error("error during login: ", error);

      // log detailed info about the error response if available
      if (error.response) {
        console.log("error response data : ", error.response.data.message);
        setErrorData(error.response.data.message);
      }
    } finally {
      setLoding(false);
    }
  };
  return (
    <div>
      {errorData && <p>{errorData}</p>}
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        style={{
          marginTop: "10px",
          marginBottom: "10px",
        }}
        placeholder="enter your password"
        onChange={(e) => setPassword(e.target.value)}
      />{" "}
      <br />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "logging in.." : "login"}
      </button>
    </div>
  );
};
export default Login;
