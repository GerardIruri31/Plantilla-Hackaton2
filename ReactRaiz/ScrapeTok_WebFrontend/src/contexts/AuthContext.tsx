import React, {
  createContext,
  useContext,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import {
  type User,
  type AuthContextType,
} from "../interfaces/User";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");
    if (storedToken) setToken(storedToken);
    if (storedUser)
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error on storage user details: ", error);
        setUser(null);
      }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("authUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("authUser");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ token, user, setToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
