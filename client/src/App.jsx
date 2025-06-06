import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ErrorPage from "./pages/ErrorPage";

function App() {

  return (
    <div className="">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
