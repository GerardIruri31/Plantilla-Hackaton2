export interface User {
  email: string;
}
export interface AuthContextType {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
}

export interface UserAuthResponse {
  result: {
    token: string;
    username: string;
  };
}
