import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null); // state to store user data
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/login/",
        { username, password }
      );

      if (response.data.result) {
        setIsLoggedIn(true);
        console.log("Login successful");

        const user_data = response.data.user_data;

        // Set the user data in the state
        setUserData(user_data);
        //redirect to the homepage
        // console.log("User data:", user_data);4
        navigate("/", { state: { userData: user_data } });
      } else {
        console.log("Login failed. Server response:", response.data);
      }
    } catch (error) {
      console.error("Error during login:", error);

      // Log detailed information about the error response if available
      if (error.response) {
        console.log("Error response data:", error.response.data);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
