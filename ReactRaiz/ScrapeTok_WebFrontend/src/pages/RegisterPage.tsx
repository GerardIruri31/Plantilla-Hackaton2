import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { replace: true }); // redirige al formulario login/registro
  }, [navigate]);

  return null;
};

export default RegisterPage;
