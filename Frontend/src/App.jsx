import { Home } from "./Pages/Home/Home";
import Login from "./Components/Login/login";
import { Logout } from "./Components/Logout/Logout";
import Todolist from "./Components/Todolist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Todolist /> */}
        {/* login route  */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todolists/login" element={<Login />} />
          <Route path="/remo" element={<Todolist />} />
          <Route path="/todolists/logout" element={<Logout />} />
          <Route path="/todolist/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
