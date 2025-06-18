import React, { type FormEvent, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { login, register } from "../service/authService";
import axios, { AxiosError } from "axios";

// Animated gradient keyframes
const GradientStyles = () => (
  <style>{`
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `}</style>
);

type FormMode = "login" | "signup";
export const URL = import.meta.env.VITE_API_URL;

const AuthForm: React.FC = () => {
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<FormMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
  if (mode === "login") {
    const data = await login(email, password);
    const { token } = data.result;
    setToken(token);
    setUser({ email });
    navigate("/expenses_summary");
  } else {
    if (password.length < 12) {
      alert("⚠️ Passwords mínimo 12 caracteres");
      return;
    }
    await register(email, password);
    navigate("/expenses_summary");
  }
} catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    console.error("Axios Error:", err.response?.data || err.message);
    throw new AxiosError("Axios Error: " + err.message, err.code);
  } else if (err instanceof Error) {
    throw new Error("Server Error: " + err.message);
  } else {
    throw new Error("Server Error desconocido");
  }
}
  };

  return (
    <>
      <GradientStyles />
      <div className="relative overflow-hidden min-h-screen flex items-center justify-center px-4">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-[length:200%_200%] bg-gradient-to-r from-indigo-500 via-pink-400 to-purple-500 animate-[gradientShift_8s_ease_infinite]" />

        {/* Decorative Blobs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-300 rounded-full opacity-20 blur-3xl animate-pulse delay-2000" />

        {/* Card Container */}
        <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:shadow-2xl hover:-translate-y-3">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            {mode === "login" ? "Iniciar Sesión" : "Registro"}
          </h2>
          {/* Mode Toggle */}
          <div className="mt-4 flex justify-center space-x-2">
            {(["login", "signup"] as FormMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`px-3 py-1 text-sm font-medium uppercase tracking-wide rounded-full transition-colors duration-200 focus:outline-none ${
                  mode === m
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {m === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Email Field */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                {/* Simple icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12H8m0 0l4-4m-4 4l4 4"
                  />
                </svg>
              </span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                className="block w-full border-b-2 border-gray-300 pl-10 pr-3 pb-2 text-gray-800 placeholder-gray-400 focus:border-indigo-600 focus:outline-none transition"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c0-1.105.895-2 2-2s2 .895 2 2v1H10v-1c0-1.105.895-2 2-2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 11V9a5 5 0 00-10 0v2M5 11h14v10H5V11z"
                  />
                </svg>
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="block w-full border-b-2 border-gray-300 pl-10 pr-3 pb-2 text-gray-800 placeholder-gray-400 focus:border-indigo-600 focus:outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:from-indigo-700 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
            >
              {mode === "login" ? "Access" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
