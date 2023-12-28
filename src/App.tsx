import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./views/login/Login";
import "./App.css";
import Home from "./views/home/Home";
import { useEffect } from "react";
import useHasAuthentication from "./hooks/useHasAuthentication";
import Layout from "./layout/Layout";
import Survey from "./views/survey/Survey";
import Report from "./views/report/Report";

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
      {hasAuthentication && (
        <Route path="/" element={<Layout />}>
          <Route path={"/survey"} element={<Survey />} />
          <Route path={"/report"} element={<Report />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
