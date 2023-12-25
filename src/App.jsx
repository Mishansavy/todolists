import "./App.css";
import { Login } from "./Components/Login/login";
import Todolist from "./Components/Todolist";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route exact path="/" element={<Todolist />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
        {/* <Todolist /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
