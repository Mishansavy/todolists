import "./App.css";
import Login from "./Components/Login/login";
import { Logout } from "./Components/Logout/Logout";
import { Signup } from "./Components/Signup/Signup";
import Todolist from "./Components/Todolist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Todolist /> */}
        {/* login route  */}
        <Routes>
          <Route path="/" element={<Todolist />} />
          <Route path="/todolists/login" element={<Login />} />
          <Route path="/todolists/logout" element={<Logout />} />
          <Route path="/todolist/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
