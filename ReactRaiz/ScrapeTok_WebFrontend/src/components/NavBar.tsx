import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const NavBar: React.FC = () => {
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center">
      {/* Espacio flexible a la izquierda */}
      <div className="flex-1" />

      {/* Enlaces centrados */}
      <div className="flex space-x-8">
        <NavLink
          to="/expenses_summary"
          className={({ isActive }) =>
            `px-3 py-1 rounded hover:bg-gray-700 transition ${
              isActive ? "border-b-2 border-green-400" : ""
            }`
          }
        >
          Resumen
        </NavLink>
        <NavLink
          to="/expenses_details"
          className={({ isActive }) =>
            `px-3 py-1 rounded hover:bg-gray-700 transition ${
              isActive ? "border-b-2 border-green-400" : ""
            }`
          }
        >
          Detalle Gastos
        </NavLink>

        <NavLink
          to="/expenses_category"
          className={({ isActive }) =>
            `px-3 py-1 rounded hover:bg-gray-700 transition ${
              isActive ? "border-b-2 border-green-400" : ""
            }`
          }
        >
          Categorías
        </NavLink>
        <NavLink
          to="/manage_expenses"
          className={({ isActive }) =>
            `px-3 py-1 rounded hover:bg-gray-700 transition ${
              isActive ? "border-b-2 border-green-400" : ""
            }`
          }
        >
          Gestionar Gastos
        </NavLink>
      </div>

      {/* Logout en extremo derecho */}
      <div className="flex-1 flex justify-end">
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-white transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
