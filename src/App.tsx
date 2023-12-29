import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./views/login/Login";
import "./App.css";
import Home from "./views/home/Home";
import { useEffect } from "react";
import useHasAuthentication from "./hooks/useHasAuthentication";
import Layout from "./layout/Layout";
import Survey from "./views/survey/Survey";
import Report from "./views/report/Report";
import useGetUserInfoFromSession from "./hooks/useGetTokenFromSession";
import { useRoutePermissionCheck } from "./layout/routes";

function App() {
  const hasAuthentication = useHasAuthentication();
  const {role} = useGetUserInfoFromSession()
  console.log(role,"rolerole")
  const navigate = useNavigate();
  useEffect(() => {
    if (!hasAuthentication) {
      navigate("/login");
    }
  }, [navigate]);
  const navbarRoutes = useRoutePermissionCheck()
  return (
    <Routes>
      <Route path={"/login"} element={<Login />} />
      {hasAuthentication && (
        <Route path="/" element={<Layout />}>
         { navbarRoutes.map(t=>(
           <Route path={t.path} element={t.page} />
         ))}
        </Route>
      )}
    </Routes>
  );
}

export default App;
