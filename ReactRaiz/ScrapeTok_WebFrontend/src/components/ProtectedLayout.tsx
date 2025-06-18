import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const ProtectedLayout: React.FC = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

export default ProtectedLayout;
