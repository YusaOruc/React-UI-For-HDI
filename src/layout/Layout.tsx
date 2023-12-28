import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";

const Layout = () => {
  //const minHeight = `calc(100vh - 285px)`;
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
