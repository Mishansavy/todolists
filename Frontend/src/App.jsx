import "./App.css";
import Login from "./Components/Login/login";
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
