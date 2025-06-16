export interface User {
  id: number;
  email: string;
  password: string;
  username: string;
  role: string;
}
export interface AuthContextType {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
}

export interface UserAuthResponse {
  id: number;
  email: string;
  password: string;
  username: string;
  token: string;
  role: string;
}
