export interface User {
  email: string;
  name: string;
  role: string;
}
export interface AuthContextType {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
}
