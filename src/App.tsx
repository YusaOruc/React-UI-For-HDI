import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./views/login/Login";
import "./App.css";
import Home from "./views/home/Home";
import { useEffect } from "react";
import useHasAuthentication from "./hooks/useHasAuthentication";

function App() {
  const hasAuthentication = useHasAuthentication();

  const navigate = useNavigate();
  useEffect(() => {
    if (!hasAuthentication) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path={"/login"} element={<Login />} />
      {hasAuthentication && <Route path={"/home"} element={<Home />} />}
    </Routes>
  );
}

export default App;
