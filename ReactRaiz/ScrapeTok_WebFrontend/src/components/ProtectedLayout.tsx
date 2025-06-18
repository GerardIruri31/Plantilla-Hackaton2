import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import NavBar from "../components/NavBar";

const ProtectedLayout: React.FC = () => {
  const { token } = useAuth();

  // Si no hay token, redirige al login
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
