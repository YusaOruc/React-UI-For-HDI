import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./views/login/Login";
import { useEffect } from "react";
import useHasAuthentication from "./hooks/useHasAuthentication";
import Layout from "./layout/Layout";
import { useRoutePermissionCheck } from "./layout/routes";

function App() {
  const hasAuthentication = useHasAuthentication();
  
  const navigate = useNavigate();
  useEffect(() => {
    if (!hasAuthentication) {
      navigate("/login");
    }
  }, [navigate]);
  const navbarRoutes = useRoutePermissionCheck();
  return (
    <Routes>
      <Route path={"/login"} element={<Login />} />
      {hasAuthentication && (
        <Route path="/" element={<Layout />}>
          {navbarRoutes.map((t) => (
            <Route key={t.path} path={t.path} element={t.page} />
          ))}
        </Route>
      )}
    </Routes>
  );
}

export default App;
