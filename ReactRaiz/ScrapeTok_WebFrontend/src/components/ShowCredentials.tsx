import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// ESTO ES TEMPORAL -> REMPLAZAR POR CONTENIDO DEL TASK EN HACKATON 2
const ShowCredentials: React.FC = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center p-4">
      {/* Logout Button outside the card */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 right-6 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-md focus:outline-none"
      >
        Log Out
      </button>

      <div className="bg-white max-w-lg w-full rounded-3xl shadow-xl p-6 md:p-10">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4 text-center">
          ¡Bienvenido!
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Estas son tus credenciales de acceso.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* ID Field */}
          <div>
            <span className="block w-full text-sm font-semibold text-white bg-indigo-600 rounded-t-lg text-center py-1">
              ID
            </span>
            <p className="px-4 py-2 bg-gray-50 rounded-b-lg text-gray-800 text-center">
              {user?.id}
            </p>
          </div>

          {/* Username Field */}
          <div>
            <span className="block w-full text-sm font-semibold text-white bg-indigo-600 rounded-t-lg text-center py-1">
              Usuario
            </span>
            <p className="px-4 py-2 bg-gray-50 rounded-b-lg text-gray-800 text-center">
              {user?.username}
            </p>
          </div>

          {/* Email Field */}
          <div>
            <span className="block w-full text-sm font-semibold text-white bg-indigo-600 rounded-t-lg text-center py-1">
              Email
            </span>
            <p className="px-4 py-2 bg-gray-50 rounded-b-lg text-gray-800 break-all text-center">
              {user?.email}
            </p>
          </div>

          {/* Role Field */}
          <div>
            <span className="block w-full text-sm font-semibold text-white bg-indigo-600 rounded-t-lg text-center py-1">
              Rol
            </span>
            <p className="px-4 py-2 bg-gray-50 rounded-b-lg text-gray-800 uppercase text-center">
              {user?.role}
            </p>
          </div>

          {/* Password Field */}
          <div className="sm:col-span-2">
            <span className="block w-full text-sm font-semibold text-white bg-indigo-600 rounded-t-lg text-center py-1">
              Contraseña
            </span>
            <div className="px-4 py-2 bg-gray-50 rounded-b-lg text-gray-800 break-words text-center">
              {user?.password}
            </div>
          </div>

          {/* Token Field */}
          <div className="sm:col-span-2">
            <span className="block w-full text-sm font-semibold text-white bg-indigo-600 rounded-t-lg text-center py-1">
              Token
            </span>
            <div className="px-4 py-2 bg-gray-50 rounded-b-lg text-gray-700 overflow-auto max-h-32 text-center">
              {token}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCredentials;
