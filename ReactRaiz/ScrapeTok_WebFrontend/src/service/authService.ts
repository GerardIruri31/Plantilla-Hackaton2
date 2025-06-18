import axios from "axios";
import type { UserAuthResponse } from "../interfaces/User";

export const URL = import.meta.env.VITE_API_URL;

export const login = async (email: string, password: string): Promise<UserAuthResponse> => {
  const body = { email, passwd: password };
  const { data } = await axios.post<UserAuthResponse>(`${URL}/authentication/login`, body);
  return data;
};

export const register = async (email: string, password: string): Promise<void> => {
  const body = { email, passwd: password };
  await axios.post<UserAuthResponse>(`${URL}/authentication/register`, body);
};
